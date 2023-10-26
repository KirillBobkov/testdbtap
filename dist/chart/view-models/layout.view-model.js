import { cloneUnsafe } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
import { either, option, string } from 'fp-ts';
import { observable } from 'fp-ts-rxjs';
import { constVoid, pipe } from 'fp-ts/function';
import { combineLatest, from, interval, merge, skip, timer } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, retryWhen, skipWhile, switchMap, tap } from 'rxjs/operators';
import { CHART_REACT_PRODUCTION_MODE } from '../../config/build-config';
import { context } from '../../context/context2';
import { newSink } from '../../context/sink2';
import { getSelectedLayout } from '../../providers/layout-provider';
import { callTracerProxy } from '../../utils/debug/call-tracer';
import { createPropertyAdapter } from '../../utils/property.utils';
import { subscribeSingle } from '../../utils/rx.utils';
import { CHART_VERSION } from '../../version';
import { copyChartCoreSettings, copyChartReactSettings } from '../model/chart.model';
import { fromNativeChartDrawings } from '../model/drawing.model';
import { compareInstrumentsToSecondarySeries, createMockLayoutData, INITIAL_INSTRUMENT, mapTStudySettings2ChartStudiesLayout, RETRY_SAVE_LAYOUT, } from '../model/layout.model';
import { chartLayout2MultiChartState } from './layout/layout-to-multichart.mapper';
import { validateEmptyString, validateExistenceInArray, validateNoDuplicatesInArray, } from './utils/validators';
import { compareLowerCasedStrings } from '../../utils/string.utils';
export const createLayoutViewModel = context.combine(context.key()('multiChartViewModel'), context.key()('drawingSyncVM'), context.key()('layoutProvider'), context.key()('chartConfig'), context.key()('browserApiViewModel'), context.key()('chartReactConfig'), context.key()('initialChartReactSettings'), context.key()('initialLayout'), context.key()('localization'), chartLayout2MultiChartState, (multiChartViewModel, drawingSyncVM, layoutProvider, chartConfig, browserApiViewModel, chartReactConfig, initialChartReactSettings, initialLayout, localization, chartLayout2MultiChartState) => {
    const [setLayoutData, layoutData] = createPropertyAdapter(initialLayout);
    const [setSelectedLayout, selectedLayout] = createPropertyAdapter(getSelectedLayout(initialLayout));
    const [setIsLayoutSaving, isLayoutSaving] = createPropertyAdapter(false);
    const [setIsErrorLayoutSaving, isErrorLayoutSaving] = createPropertyAdapter(false);
    const [setLastUpdateTimeStamp, lastUpdateTimeStamp] = createPropertyAdapter(Date.now());
    const [setShouldUpdateLayout, shouldUpdateLayout] = createPropertyAdapter(false);
    const [setPopupOpen, popupOpen] = createPropertyAdapter(false);
    const [setEditableLayout, editableLayout] = createPropertyAdapter('');
    // calling layouts while view-model initialization
    layoutProvider
        .getLayouts()
        .then(newLayoutData => {
        newLayoutData && setLayoutData(newLayoutData);
    })
        .catch(() => {
        console.warn('No exising layouts have found during initialization');
    });
    const generateLayout = () => map2MultiChartLayout(multiChartViewModel.state.getValue(), drawingSyncVM.isDrawingSyncEnabled.getValue(), multiChartViewModel.selectedChartId.getValue());
    const togglePopupOpen = (open) => {
        setPopupOpen(open);
        setEditableLayout('');
    };
    const addLayout = (name) => pipe(name, string.trim, validateEmptyString(), either.chain(validateLayoutName(localization.layout.validation_nameAlreadyExists)(layoutData.getValue().layouts)), either.fold(either.left, name => {
        const multiChartLayout = generateLayout();
        layoutProvider.createLayout({ name, ...multiChartLayout }).then(id => {
            const layoutToAdd = {
                ...multiChartLayout,
                id,
                name,
                lastUpdateTimeStamp: Date.now(),
            };
            setLayoutData({
                ...layoutData.getValue(),
                layouts: [...layoutData.getValue().layouts, { ...layoutToAdd }],
            });
            updateSelectedLayout(id);
        });
        return either.right(void 0);
    }));
    const setLastLayoutToBeDefault = (layout) => {
        const defaultLayoutData = createMockLayoutData(chartConfig, chartReactConfig, initialChartReactSettings, INITIAL_INSTRUMENT);
        const defaultLayout = {
            ...layout,
            name: 'Default Layout',
            charts: [...defaultLayoutData.layouts[0].charts],
        };
        layoutProvider.updateLayout({ ...defaultLayout });
        const multiChartViewModelState = chartLayout2MultiChartState(defaultLayout);
        multiChartViewModel.setState(multiChartViewModelState);
        const updatedData = { ...layoutData.getValue(), selectedLayoutId: defaultLayout.id };
        setLayoutData({
            ...updatedData,
            layouts: [{ ...defaultLayout }],
        });
    };
    const deleteLayout = (id) => {
        const layouts = layoutData.getValue();
        const layoutToDeleteIndex = layouts.layouts.findIndex(l => l.id === id);
        const layoutToDelete = layouts.layouts[layoutToDeleteIndex];
        // deleting last layout should cause changing it to default
        if (layoutToDelete && layoutData.getValue().layouts.length === 1) {
            setLastLayoutToBeDefault(layoutToDelete);
            return;
        }
        if (layoutToDelete) {
            if (layoutToDelete.id === selectedLayout.getValue().id && layouts.layouts.length > 1) {
                const nextId = layoutToDeleteIndex < layouts.layouts.length - 1
                    ? layouts.layouts[layoutToDeleteIndex + 1].id
                    : layouts.layouts[layoutToDeleteIndex - 1].id;
                updateSelectedLayout(nextId);
            }
            layoutProvider.deleteLayout(id);
            const filteredLayouts = layoutData.getValue().layouts.filter(l => l.id !== layoutToDelete.id);
            setLayoutData({ ...layoutData.getValue(), layouts: [...filteredLayouts] });
        }
    };
    const updateSelectedLayout = (id) => {
        if (id === layoutData.getValue().selectedLayoutId) {
            return;
        }
        layoutProvider.updateSelectedLayout(id);
        const layout = layoutData.getValue().layouts.find(l => l.id === id);
        if (layout) {
            // helps not to run fireLayoutUpdate unnecessarily, because layout is not changed basically
            // only the selectedLayoutId has been changed
            setShouldUpdateLayout(false);
            const multiChartViewModelState = chartLayout2MultiChartState(layout);
            multiChartViewModel.setState(multiChartViewModelState);
            setLayoutData({
                ...layoutData.getValue(),
                selectedLayoutId: id,
            });
        }
    };
    const updateLayoutById = (id, name) => pipe(id, validateLayoutExists(localization.layout.validation_cannotFindLayoutToUpdate)(layoutData.getValue().layouts), either.chain(layout => pipe(name, string.trim, validateEmptyString(), either.chain(validateLayoutNameWithId(localization.indicatorTemplates.validation_nameAlreadyExists)(layout, layoutData.getValue().layouts)), either.map(name => [layout, name]))), either.fold(either.left, ([currentLayout, name]) => {
        const updatedLayout = { ...currentLayout, name };
        const updatedLayouts = layoutData
            .getValue()
            .layouts.map(layout => (layout.id === currentLayout.id ? updatedLayout : layout));
        layoutProvider.updateLayout(updatedLayout).then(() => {
            setLayoutData({
                ...layoutData.getValue(),
                layouts: [...updatedLayouts],
            });
        });
        return either.right(void 0);
    }));
    const fireLayoutUpdate = () => {
        if (!shouldUpdateLayout.getValue()) {
            setShouldUpdateLayout(true);
            return;
        }
        const updatedLayout = generateLayout();
        const currentLayout = getSelectedLayout(layoutData.getValue());
        const lastUpdateTimeStamp = Date.now();
        const newLayout = {
            ...updatedLayout,
            id: currentLayout.id,
            name: currentLayout.name,
            lastUpdateTimeStamp,
        };
        const updatedLayouts = layoutData
            .getValue()
            .layouts.map(layout => (layout.id === newLayout.id ? newLayout : layout));
        setLayoutData({
            ...layoutData.getValue(),
            layouts: [...updatedLayouts],
        });
        setIsLayoutSaving(true);
        pipe(from(layoutProvider.updateLayout(newLayout)), catchError(error => {
            setIsLayoutSaving(false);
            setIsErrorLayoutSaving(true);
            return error;
        }), retryWhen(errors => {
            return combineLatest([errors, interval(5000)]).pipe(skipWhile(() => !browserApiViewModel.isOnline.getValue()), switchMap(([error], i) => {
                const retryCount = i + 1;
                console.log(error, retryCount);
                if (retryCount >= RETRY_SAVE_LAYOUT) {
                    throw error;
                }
                return timer(retryCount * 1000);
            }));
        }), subscribeSingle(() => {
            setIsLayoutSaving(false);
            setIsErrorLayoutSaving(false);
            setLastUpdateTimeStamp(Date.now());
            if (!CHART_REACT_PRODUCTION_MODE) {
                console.log('Chart layout updated', newLayout);
            }
        }));
    };
    const multiChartStateUpdateLayoutEffect = pipe(multiChartViewModel.state, skip(1), debounceTime(chartReactConfig.layout.saveDelay), observable.filter(() => !isErrorLayoutSaving.getValue()), tap(() => {
        fireLayoutUpdate();
    }));
    const lastUpdateTimeStampEffect = pipe(popupOpen, tap(value => {
        value && setLastUpdateTimeStamp(Date.now());
    }));
    const syncSelectedLayoutEffect = pipe(layoutData, observable.map(getSelectedLayout), distinctUntilChanged((a, b) => a.id === b.id), tap(setSelectedLayout));
    const effects = merge(multiChartStateUpdateLayoutEffect, lastUpdateTimeStampEffect, syncSelectedLayoutEffect);
    return newSink(callTracerProxy('layoutViewModel', {
        layoutData,
        editableLayout,
        selectedLayout,
        lastUpdateTimeStamp,
        isLayoutSaving,
        isErrorLayoutSaving,
        popupOpen,
        generateLayout,
        fireLayoutUpdate,
        updateSelectedLayout,
        addLayout,
        deleteLayout,
        updateLayoutById,
        togglePopupOpen,
        onEditLayout: setEditableLayout,
    }), effects);
});
const validateLayoutExists = (errorMessage) => (layouts) => (id) => validateExistenceInArray(errorMessage)(layouts)(t => t.id === id);
const validateLayoutName = (errorMessage) => (layouts) => (name) => validateNoDuplicatesInArray(errorMessage)(layouts, t => compareLowerCasedStrings(t.name, name))(name);
const validateLayoutNameWithId = (errorMessage) => (layout, layouts) => (name) => pipe(name, either.fromPredicate(name => compareLowerCasedStrings(name, layout.name), constVoid), either.fold(() => validateLayoutName(errorMessage)(layouts)(name), either.right));
/**
 * Exports the multi-chart VM state to multi chart layout.
 * @param multiChartState
 * @param selectedChartId
 */
export const map2MultiChartLayout = (multiChartState, isDrawingSyncEnabled, selectedChartId) => ({
    version: CHART_VERSION,
    global: {
        drawingMode: multiChartState.drawingMode,
        magnetMode: multiChartState.magnetMode,
        drawingSyncMode: isDrawingSyncEnabled,
        theme: multiChartState.theme,
    },
    charts: multiChartState.charts.map(map2ChartLayout),
    multiChart: {
        layout: multiChartState.layout,
        selectedChartIndex: selectedChartId,
        sync: {
            instrument: multiChartState.isInstrumentSyncEnabled,
            chartType: multiChartState.isChartTypeSyncEnabled,
            aggregation: multiChartState.isAggregationPeriodTypeSyncEnabled,
            crossTool: multiChartState.isCrosshairSyncEnabled,
            appearance: multiChartState.isGeneralSettingsSyncEnabled,
            studies: multiChartState.isStudiesSyncEnabled,
        },
    },
});
export const map2ChartLayout = (chart) => ({
    index: parseInt(chart.id, 10),
    symbol: option.toUndefined(chart.instrument),
    aggregation: chart.period,
    timeframePreset: chart.timeframePreset,
    chartType: chart.chartType,
    studies: mapTStudySettings2ChartStudiesLayout(chart.studies),
    chartCoreConfig: copyChartCoreSettings(chart.chartSettings.chartCore),
    chartReactConfig: copyChartReactSettings(chart.chartSettings.chartReact),
    secondarySeries: compareInstrumentsToSecondarySeries(chart.compareInstruments),
    drawings: getDrawings(chart),
    layers: cloneUnsafe(chart.layers),
    panes: chart.panes,
    xScaleViewport: chart.xScaleViewport,
});
const getDrawings = (chart) => {
    return fromNativeChartDrawings(chart.drawings);
};
