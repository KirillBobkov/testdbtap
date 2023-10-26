import { merge as mergeObj } from '@devexperts/dxcharts-lite/dist/chart/utils/merge.utils';
import { array, option, record } from 'fp-ts';
import { fold as eitherFold } from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { combineLatest, from, merge } from 'rxjs';
import { tap, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { context } from '../../../context/context2';
import { newSink } from '../../../context/sink2';
import { tryMigrate } from '../../../layout-migration/layout-migration';
import { getSelectedLayout } from '../../../providers/layout-provider';
import { Providers } from '../../../providers/providers';
import { createPropertyAdapter } from '../../../utils/property.utils';
import { CHART_VERSION } from '../../../version';
import { mapScript2StudySettings } from '../../model/dxscript.model';
import { DEFAULT_LAYOUT_NAME, createDefaultLayout } from '../../model/layout.model';
import { sortStudies } from '../../model/studies.model';
import { getChartDataKeysFromLayout } from './loading.utils';
import { observable } from 'fp-ts-rxjs';
import { CHART_REACT_TRIAL_ID } from '../../../config/build-config';
const DEFAULT_WEIGHTS = {
    js: 2,
    scripts: 1,
    keywords: 1,
    layouts: 1,
    userData: 1,
};
export const SPY_TRIAL_URL = 'https://webdev.prosp.devexperts.com:8095/api/lib-alive';
/**
 * Controls the initial loading of required chart parts: layout, user data.
 * Anything we need to load before chart is ready to work.
 * @doc-tags chart-react,loading,layout
 */
export const initialLoaderVM = context.combine(context.key()('initialInstrument'), context.key()('chartConfig'), context.key()('chartReactConfig'), context.key()('initialChartReactSettings'), context.key()('initialStudies'), context.key()('initialAggregation'), context.key()('chartTypesConfig'), context.key()('initialUserData'), context.key()('initialLoading'), Providers, (initialInstrument, chartConfig, chartReactConfig, initialChartReactSettings, initialStudies, initialAggregation, chartTypesConfig, _initialUserData, initialLoading, { dxScriptProvider, userDataProvider, layoutProvider, dxScriptRunner, dxStudiesProvider }) => {
    const initialSymbol = option.toUndefined(initialInstrument);
    const [setIsLoaded, isLoaded] = createPropertyAdapter(false);
    const [setLoadedPercentage, loadedPercentage] = createPropertyAdapter(0);
    const [setInitialLoadingState, initialLoadingState] = createPropertyAdapter({
        // js 'done' is needed to show some loading state (not zero) when application bundle is started
        // (because we actually have done some piece of loading)
        js: 'done',
        scripts: 'initial',
        keywords: 'initial',
        layouts: 'initial',
        userData: 'initial',
        ...initialLoading.reduce((items, item) => ({ ...items, [item.itemName]: 'initial' }), {}),
    });
    const [setChartDataLoading, chartDataLoadingState] = createPropertyAdapter({});
    const [setLoadingWeights, loadingWeights] = createPropertyAdapter({
        ...DEFAULT_WEIGHTS,
        ...initialLoading.reduce((items, item) => ({ ...items, [item.itemName]: item.itemWeight ?? 1 }), {}),
    });
    initialLoading.forEach(i => i.item.then(() => updateLoadingState(i.itemName, 'done')));
    // initial read from layout provider
    // either load data correctly or create default layout
    const layoutLoaded = from(layoutProvider
        .getLayouts()
        .then(layoutData => {
        if (layoutData && checkLayoutNotEmpty(layoutData)) {
            const updatedLayouts = pipe(layoutData.layouts, array.map(processUserLayout));
            const layoutDataMigrated = {
                ...layoutData,
                layouts: updatedLayouts,
            };
            return layoutDataMigrated;
        }
        else {
            return doCreateDefaultLayout();
        }
    })
        .then(layoutData => {
        const layout = getSelectedLayout(layoutData);
        const chartDataLoadingState = getChartDataKeysFromLayout(layout).reduce((acc, key) => ({ ...acc, [chartDataID(key)]: 'initial' }), {});
        const chartDataWeights = record.map(() => 1)(chartDataLoadingState);
        setLoadingWeights({
            ...loadingWeights.getValue(),
            ...chartDataWeights,
        });
        setChartDataLoading({
            ...chartDataLoadingState,
        });
        return layoutData;
    })
        .catch(e => {
        if (e) {
            console.error('Error while fetching layouts data', e);
        }
        return doCreateDefaultLayout();
    })
        .finally(() => setInitialLoadingState({
        ...initialLoadingState.getValue(),
        layouts: 'done',
    })));
    const userDataLoaded = from(
    // load user data from provider
    // if no loaded - use mock values
    userDataProvider
        .getUserData()
        .then(userData => (userData === null ? _initialUserData : userData))
        .catch(() => _initialUserData)
        .finally(() => setInitialLoadingState({
        ...initialLoadingState.getValue(),
        userData: 'done',
    })));
    const dxScriptLoaded = from(
    // pre-load scripts
    dxScriptProvider
        .fetchAllScripts()
        .then(scripts => {
        // we need to update studies list in provider here, so during the first layout mapping script studies are loaded
        const filteredStudies = dxStudiesProvider.getStudies().filter(study => study.type !== 'dxScript');
        const scriptStudies = scripts.map(script => mapScript2StudySettings(script));
        dxStudiesProvider.setStudies(sortStudies([...filteredStudies, ...scriptStudies]));
        return scripts;
    })
        .catch(e => {
        console.error('Unable to load dxscripts', e);
        return [];
    })
        .finally(() => setInitialLoadingState({
        ...initialLoadingState.getValue(),
        scripts: 'done',
    })));
    const dxScriptKeywordsLoaded = from(dxScriptRunner
        .keywords()
        .catch(e => {
        console.error('Unable to load keywords', e);
        return [];
    })
        .finally(() => setInitialLoadingState({
        ...initialLoadingState.getValue(),
        keywords: 'done',
    })));
    const doCreateDefaultLayout = () => {
        const multiChartLayout = createDefaultLayout(initialSymbol, initialAggregation, undefined, chartConfig, chartReactConfig, initialChartReactSettings, initialStudies, chartTypesConfig.initialChartType);
        const newNamedLayout = { name: DEFAULT_LAYOUT_NAME, ...multiChartLayout };
        return layoutProvider
            .createLayout(newNamedLayout)
            .then(newLayoutId => {
            const newLayout = {
                ...newNamedLayout,
                id: newLayoutId,
                lastUpdateTimeStamp: new Date().getTime(),
            };
            const layoutData = {
                selectedLayoutId: newLayoutId,
                layouts: [newLayout],
            };
            return layoutData;
        })
            .catch(err => {
            console.warn('Error while creating layout:', err);
            const newLayout = {
                ...newNamedLayout,
                id: '',
                lastUpdateTimeStamp: new Date().getTime(),
            };
            const layoutData = {
                selectedLayoutId: '',
                layouts: [newLayout],
            };
            return layoutData;
        });
    };
    /**
     * Processes layout from user. Either takes as-is, performs migration, or resets to default.
     * @param layout - user's layout
     */
    const processUserLayout = (layout) => {
        const hasVersion = checkLayoutHasVersion(layout.version);
        let updatedLayout = { ...layout };
        // it's dangerous to do a migration if layout doesn't have any version
        if (hasVersion) {
            const migrationNeeded = checkLayoutMigrationNeeded(layout);
            if (migrationNeeded) {
                // perform migration
                // on error - reset to default
                const migratedLayout = pipe(tryMigrate(layout), eitherFold(() => {
                    console.warn(`Failed to migrate - resetting layout ${layout.name} to default`);
                    return createDefaultLayout(initialSymbol, initialAggregation, undefined, chartConfig, chartReactConfig, initialChartReactSettings);
                }, migratedLayout => {
                    console.log(`Successfully migrated layout ${layout.name}: ${layout.version} => ${CHART_VERSION}`);
                    return migratedLayout;
                }));
                updatedLayout = {
                    id: layout.id,
                    name: layout.name,
                    lastUpdateTimeStamp: new Date().getTime(),
                    ...migratedLayout,
                };
            }
            // Merge with default layout, so we don't miss anything in the layout object
            const mergedLayout = mergeMultichartLayoutWithDefault(updatedLayout, chartConfig, chartReactConfig, initialChartReactSettings);
            layoutProvider.updateLayout(mergedLayout);
            return mergedLayout;
        }
        // Merge with default layout, so we don't miss anything in the layout object
        return mergeMultichartLayoutWithDefault(layout, chartConfig, chartReactConfig, initialChartReactSettings);
    };
    const updateLoadingState = (key, state) => {
        const initialLoading = initialLoadingState.getValue();
        const chartData = chartDataLoadingState.getValue();
        initialLoading[key] !== undefined &&
            initialLoading[key] !== state &&
            setInitialLoadingState({
                ...initialLoading,
                [key]: state,
            });
        chartData[key] !== undefined &&
            chartData[key] !== state &&
            setChartDataLoading({
                ...chartData,
                [key]: state,
            });
    };
    const allLoadedEffect = pipe(combineLatest([initialLoadingState, chartDataLoadingState]), tap(([initial, chartData]) => {
        setLoadedPercentage(calculateLoadedStatus({ ...initial, ...chartData }, loadingWeights.getValue()));
        checkAllLoaded(initial) && setIsLoaded(true);
    }));
    const checkTrialEffect = pipe(isLoaded, distinctUntilChanged(), observable.filter(isLoaded => isLoaded && Boolean(CHART_REACT_TRIAL_ID) && Math.random() <= 0.001), switchMap(() => pipe(
    // eslint-disable-next-line no-restricted-syntax
    from(checkTrial(CHART_REACT_TRIAL_ID)))));
    const effects = merge(allLoadedEffect, checkTrialEffect);
    return newSink({
        isLoaded,
        layoutLoaded,
        userDataLoaded,
        dxScriptLoaded,
        dxScriptKeywordsLoaded,
        loadedPercentage,
        updateLoadingState,
        processUserLayout,
    }, effects);
});
export const chartDataID = (key) => `chartData_${key}`;
const checkLayoutNotEmpty = (layoutData) => layoutData.layouts.length !== 0 && layoutData.selectedLayoutId && layoutData.selectedLayoutId !== '';
const checkLayoutHasVersion = (version) => version !== '' && version !== undefined;
const checkLayoutMigrationNeeded = (layout) => {
    // strict equality required for correct migration
    const isValid = layout.version === CHART_VERSION;
    if (!isValid) {
        console.log(`Layout ${layout.name} version does not match current chart version: ${layout.version} !== ${CHART_VERSION}, trying to migrate.`);
    }
    return !isValid;
};
export const checkAllLoaded = (loadingState) => pipe(loadingState, record.every(p => p === 'done'));
export const calculateLoadedStatus = (loadingState, weights) => {
    const overallWeight = Object.values(weights).reduce((acc, v) => acc + v, 0);
    const currentWeight = Object.entries(loadingState)
        .filter(([, v]) => v === 'done')
        .reduce((acc, [k]) => acc + weights[k], 0);
    return (currentWeight / overallWeight) * 100;
};
/**
 * Here we merge potentially incomplete layout with default complete layout.
 * For example layout is:
 * {
 *     charts: [chart1, chart2],
 *     multiChart: ...
 * }
 * But default layout has 4 charts and a new property:
 * {
 *     charts: [chart1, chart2, chart3, chart4],
 *     multiChart: ...,
 *     newProperty: ...
 * }
 * So the result would be complete layout.
 */
const mergeMultichartLayoutWithDefault = (layout, defaultChartConfig, chartReactConfig, initialChartReactSettings) => {
    const defaultLayout = createDefaultLayout(layout.charts[0].symbol, layout.charts[0].aggregation, layout.charts[0].timeframePreset, defaultChartConfig, chartReactConfig, initialChartReactSettings);
    const result = mergeObj(layout, defaultLayout);
    // merge the charts separately
    // merge fn currently cannot merge arrays (need to know key in order to merge array items)
    result.charts = defaultLayout.charts.map(chart => {
        const existingChartLayout = result.charts.find(c => c.index === chart.index);
        if (existingChartLayout) {
            return mergeObj(existingChartLayout, chart);
        }
        else {
            return chart;
        }
    });
    return result;
};
const checkTrial = (id) => {
    return fetch(`${SPY_TRIAL_URL}?token=${id}`).catch(err => err);
};
