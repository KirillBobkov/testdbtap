import { array, option, record } from 'fp-ts';
import { observable } from 'fp-ts-rxjs';
import { constVoid, identity, pipe } from 'fp-ts/function';
import { Lens } from 'monocle-ts';
import { merge } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { context } from '../../../context/context2';
import { MIGRATIONS_LIST } from '../../../layout-migration/migrations-list';
import { windowGlobal } from '../../../utils/debug/chart-window-global';
import { createPropertyAdapter } from '../../../utils/property.utils';
import { sink } from '../../../utils/sink';
import { ChartDataExporter } from '../../containers/chart-export-data/ChartDataExporter';
import { chartLayout2MultiChartState } from '../layout/layout-to-multichart.mapper';
/**
 * This VM contains all external API.
 * Use this VM to bind API with our internal VM's structure.
 */
export const createChartReactApiVM = context.combine(context.key()('initialLoaderVM'), context.key()('multiChartViewModel'), context.key()('drawingSyncVM'), context.key()('themeViewModel'), context.key()('actionsHistoryVM'), context.key()('onApiCreated'), context.key()('notificationVM'), context.key()('snapshotSharingVM'), context.key()('layoutViewModel'), context.key()('layoutProvider'), chartLayout2MultiChartState, (initialLoaderVM, multiChartVM, drawingSyncVM, themeVM, actionsHistoryVM, onApiCreated, notificationVM, snapshotSharingVM, layoutViewModel, layoutProvider, chartLayout2MultiChartState) => {
    const [setChartVms, chartVms] = createPropertyAdapter({});
    const [setcharts, charts] = createPropertyAdapter({});
    const parseChartId = (chartId) => pipe(parseInt(chartId, 10), n => (isNaN(n) ? undefined : chartId));
    const iterateViewModels = (cb) => {
        const vms = chartVms.getValue();
        return record.keys(vms).map(chartId => cb(vms[chartId]));
    };
    // utility fn that either changes all charts or only one
    // the changeFn is applied with CombinedViewModels context
    const changeSomethingInOneChartOrEverywhere = (changeFn) => (value, chartId = '') => pipe(option.fromNullableK(parseChartId)(chartId), option.fold(() => {
        iterateViewModels(vm => changeFn(vm)(value));
        return void 0;
    }, idx => pipe(chartVms.getValue(), record.lookup(idx), option.fold(constVoid, vm => changeFn(vm)(value)))));
    const subscribeOnSomethingInOneChartOrEverywhere = (subscribeFn) => (callback, chartId = '') => pipe(option.fromNullableK(parseChartId)(chartId), option.fold(() => {
        const unsubs = iterateViewModels(vm => subscribeFn(vm)(callback));
        return () => unsubs.forEach(unsub => unsub());
    }, idx => pipe(chartVms.getValue(), record.lookup(idx), option.fold(() => constVoid, vm => subscribeFn(vm)(callback)))));
    const changeInstrument = changeSomethingInOneChartOrEverywhere(vm => (instrument) => vm.chartDataViewModel.changeInstrument(option.fromNullable(instrument)));
    const changePeriod = changeSomethingInOneChartOrEverywhere(vm => vm.aggregationPeriodViewModel.changeAggregationPeriod);
    const changeChartType = changeSomethingInOneChartOrEverywhere(vm => vm.chartTypeViewModel.setType);
    const changeAppearance = changeSomethingInOneChartOrEverywhere(vm => (settings) => vm.chartConfiguratorViewModel.setConfig(settings, false));
    const setStudies = changeSomethingInOneChartOrEverywhere(vm => vm.studiesSettingsViewModel.setStudies);
    const setDrawings = changeSomethingInOneChartOrEverywhere(vm => vm.drawingViewModel.setDrawings);
    const setLayerItems = changeSomethingInOneChartOrEverywhere(vm => vm.chartLayersViewModel.setAllLayerItems);
    const setCurrentTimezone = changeSomethingInOneChartOrEverywhere(vm => vm.timezoneViewModel.setTimezoneSafe);
    const setSelectedDrawingGroup = changeSomethingInOneChartOrEverywhere(vm => vm.drawingGroupsViewModel.selectGroup);
    const setStudiesByIds = changeSomethingInOneChartOrEverywhere(vm => vm.studiesSettingsViewModel.setStudiesByIds);
    const setYAxisAlign = changeSomethingInOneChartOrEverywhere(vm => vm.yAxisConfiguratorViewModel.setYAxisAlign);
    const setAggregationTimeframeChangeStrategy = changeSomethingInOneChartOrEverywhere(vm => vm.chartConfiguratorViewModel.setAggregationTimeframeChangeStrategy);
    const setInstrumentTimeframeChangeStrategy = changeSomethingInOneChartOrEverywhere(vm => vm.chartConfiguratorViewModel.setInstrumentTimeframeChangeStrategy);
    const setChartSettings = changeSomethingInOneChartOrEverywhere(vm => vm.chartConfiguratorViewModel.setConfig);
    const changeTheme = themeVM.changeTheme;
    const setAggregationRestrictionRule = changeSomethingInOneChartOrEverywhere(vm => (rule) => {
        vm.aggregationPeriodViewModel.setAggregationRestrictionRule(rule);
        vm.timeframePresetsViewModel.setAggregationRestrictionRule(rule);
    });
    const addCompareInstrument = changeSomethingInOneChartOrEverywhere(vm => vm.chartDataViewModel.addCompareInstrumentFromApi);
    const removeCompareInstrument = changeSomethingInOneChartOrEverywhere(vm => vm.chartDataViewModel.removeCompareInstrument);
    const setCompareInstruments = changeSomethingInOneChartOrEverywhere(vm => vm.chartDataViewModel.setCompareInstrumentsFromApi);
    const onChartCreated = (cb) => {
        const instances = charts.getValue();
        record.keys(instances).forEach(chartId => {
            const chart = instances[chartId];
            cb(chartId, chart);
        });
    };
    const onChartSettingsChanged = subscribeOnSomethingInOneChartOrEverywhere(vm => vm.chartConfiguratorViewModel.onChartSettingsChanged);
    const onLayerItemsChanged = subscribeOnSomethingInOneChartOrEverywhere(vm => vm.chartLayersViewModel.onLayerItemsChanged);
    const onPeriodChanged = subscribeOnSomethingInOneChartOrEverywhere(vm => vm.aggregationPeriodViewModel.onPeriodChanged);
    const onOrderClick = subscribeOnSomethingInOneChartOrEverywhere(vm => vm.tradingVM.onOrderClickEventRegister);
    const onOrderDblClick = subscribeOnSomethingInOneChartOrEverywhere(vm => vm.tradingVM.onOrderDblClickEventRegister);
    const getChartInfo = (id) => {
        const internalChartInfo = multiChartVM.getChartInfo(id);
        const instances = charts.getValue();
        const chart = instances[internalChartInfo.id];
        return {
            ...internalChartInfo,
            instrument: option.toUndefined(internalChartInfo.instrument),
            chart,
        };
    };
    const exportChartData = (chartId) => {
        const vms = chartVms.getValue();
        const instances = charts.getValue();
        const vm = vms[chartId];
        const chart = instances[chartId];
        const period = vm.aggregationPeriodViewModel.selectedPeriod.getValue();
        const chartDataExporter = new ChartDataExporter(chart.chartModel, chart.studies.model, `${period.duration}${period.durationType}`);
        chartDataExporter.exportChartData();
    };
    const clearChartData = (chartId) => {
        const changeFn = (vm) => {
            vm.studiesSettingsViewModel.onRemoveAllStudies();
            vm.chartDataViewModel.clearChartDataFromApi();
        };
        if (chartId !== undefined) {
            const vms = chartVms.getValue();
            const selectedVM = vms[chartId];
            changeFn(selectedVM);
        }
        else {
            iterateViewModels(currentVM => changeFn(currentVM));
        }
    };
    const getSelectedChartId = () => multiChartVM.selectedChartId.getValue();
    const setVolumesEnabled = changeSomethingInOneChartOrEverywhere(vm => vm.chartConfiguratorViewModel.setVolumesEnabled);
    const setVolumesVisible = changeSomethingInOneChartOrEverywhere(vm => vm.chartConfiguratorViewModel.toggleVolumesVisible);
    const setVolumesMode = changeSomethingInOneChartOrEverywhere(vm => (mode) => vm.chartConfiguratorViewModel.toggleVolumesVisible(mode === 'separate'));
    const setPriceType = changeSomethingInOneChartOrEverywhere(vm => vm.chartConfiguratorViewModel.setPriceType);
    const setCandlesAlignment = changeSomethingInOneChartOrEverywhere(vm => vm.chartConfiguratorViewModel.setCandlesAlignment);
    const setApplyPeriodUponCreation = changeSomethingInOneChartOrEverywhere(vm => vm.chartConfiguratorViewModel.setApplyPeriodUponCreation);
    const setNextCandleTimeOffset = changeSomethingInOneChartOrEverywhere(vm => (offsetInMs) => vm.chartSessionsViewModel.changeNextCandleTimestampOffset(offsetInMs));
    const setTradingBoundaries = changeSomethingInOneChartOrEverywhere(vm => vm.chartConfiguratorViewModel.setTradingBoundaries);
    const setTradingQuantity = changeSomethingInOneChartOrEverywhere(vm => vm.orderEntryVM.setOrderQuantity);
    const setTradingQuantityPrecision = changeSomethingInOneChartOrEverywhere(vm => vm.orderEntryVM.setTradingQuantityPrecision);
    const setTradingQuantityStep = changeSomethingInOneChartOrEverywhere(vm => vm.orderEntryVM.setTradingQuantityStep);
    const setExecutedOrders = changeSomethingInOneChartOrEverywhere(vm => vm.executedOrdersVM.setExecutedOrders);
    const syncLayoutParts = (layout, options) => pipe(initialLoaderVM.processUserLayout(layout), migratedLayout => {
        const multiChartSync = options?.multiChartSync || false;
        const multiChartLayout = options?.multiChartLayout || false;
        const syncInstrument = options?.instrument || false;
        const syncChartType = options?.chartType || false;
        const syncAggregation = options?.aggregation || false;
        const syncAppearance = options?.appearance || false;
        const syncStudies = options?.studies || false;
        const syncDrawings = options?.drawings || false;
        const syncSelectedDrawingGroup = options?.selectedDrawingGroup || false;
        if (multiChartSync) {
            multiChartVM.setInstrumentSync(migratedLayout.multiChart.sync.instrument);
            multiChartVM.setChartTypeSync(migratedLayout.multiChart.sync.chartType);
            multiChartVM.setAggregationPeriodTypeSync(migratedLayout.multiChart.sync.aggregation);
            multiChartVM.setGeneralSettingsSync(migratedLayout.multiChart.sync.appearance);
            multiChartVM.setStudiesSync(migratedLayout.multiChart.sync.studies);
        }
        if (multiChartLayout) {
            multiChartVM.setLayout(migratedLayout.multiChart.layout);
        }
        const mappedVMState = chartLayout2MultiChartState(migratedLayout);
        if (syncInstrument) {
            migratedLayout.charts.forEach(chart => {
                const mappedChartState = mappedVMState.charts[chart.index];
                if (option.isSome(mappedChartState.instrument)) {
                    changeInstrument(mappedChartState.instrument.value, chart.index + '');
                }
            });
        }
        if (syncChartType) {
            migratedLayout.charts.forEach(chart => {
                const mappedChartState = mappedVMState.charts[chart.index];
                changeChartType(mappedChartState.chartType, chart.index + '');
            });
        }
        if (syncAggregation) {
            migratedLayout.charts.forEach(chart => {
                const mappedChartState = mappedVMState.charts[chart.index];
                changePeriod(mappedChartState.period, chart.index + '');
            });
        }
        if (syncAppearance) {
            migratedLayout.charts.forEach(chart => {
                const mappedChartState = mappedVMState.charts[chart.index];
                changeAppearance(mappedChartState.chartSettings, chart.index + '');
            });
        }
        if (syncStudies) {
            migratedLayout.charts.forEach(chart => {
                const mappedChartState = mappedVMState.charts[chart.index];
                setStudies(mappedChartState.studies, chart.index + '');
            });
        }
        if (syncDrawings) {
            migratedLayout.charts.forEach(chart => {
                const mappedChartState = mappedVMState.charts[chart.index];
                setDrawings(mappedChartState.drawings, chart.index + '');
                setLayerItems(mappedChartState.layers.layerItems, chart.index + '');
                const selectedGroup = getChartInfo(chart.index + '').layers.selectedGroup;
                // apply current selected group, so only drawing from the group will be shown
                // if we don't do this, the drawings from synced layout will be shown (even if they are not in the group)
                selectedGroup && setSelectedDrawingGroup(selectedGroup, chart.index + '');
            });
        }
        if (syncSelectedDrawingGroup) {
            migratedLayout.charts.forEach(chart => {
                const mappedChartState = mappedVMState.charts[chart.index];
                if (mappedChartState.layers.selectedGroup) {
                    setSelectedDrawingGroup(mappedChartState.layers.selectedGroup, chart.index + '');
                }
            });
        }
    });
    const applyMigrationScript = (name) => pipe(MIGRATIONS_LIST, array.chain(list => list.scripts), array.findFirst(script => script.name === name), option.map(script => script.migrateFn(layoutViewModel.selectedLayout.getValue())), option.map(layout => {
        layoutProvider.updateLayout({ ...layoutViewModel.selectedLayout.getValue(), ...layout });
        window.location.reload();
    }));
    const exportLayout = () => console.log(JSON.stringify(layoutViewModel.layoutData.getValue()));
    const supported = {
        setNextCandleTimeOffset,
        sendNotification: notificationVM.sendNotification,
        onPeriodChanged,
        setVolumesEnabled,
        setVolumesVisible,
        setApplyPeriodUponCreation,
        setVolumesMode,
        setPriceType,
        setCandlesAlignment,
        setAggregationTimeframeChangeStrategy,
        getChartInfo,
        setDrawingSync: drawingSyncVM.setDrawingSync,
        getSelectedChartInfo: () => getChartInfo(getSelectedChartId()),
        getSelectedChartId,
        changeInstrument,
        changePeriod,
        changeTheme,
        setStudies,
        setStudiesByIds,
        undo: actionsHistoryVM.undo,
        redo: actionsHistoryVM.redo,
        setYAxisAlign,
        onChartCreated,
        onThemeChanged: themeVM.onThemeChanged,
        onChartSelected: multiChartVM.onSelectedChartIdChanged,
        onOrderDblClick,
        onOrderClick,
        syncLayoutParts,
        setInstrumentTimeframeChangeStrategy,
        exportChartData,
        clearChartData,
        setAggregationRestrictionRule,
        setChartSettings,
        onChartSettingsChanged,
        setLayerItems,
        setCurrentTimezone,
        onLayerItemsChanged,
        addCompareInstrument,
        removeCompareInstrument,
        setCompareInstruments,
        setTradingBoundaries,
        setTradingQuantity,
        setTradingQuantityPrecision,
        setTradingQuantityStep,
        setExecutedOrders,
    };
    const chartReactAPI = {
        internal: {
            chartVMs: {},
            snapshotSharingVM,
            multiChartViewModel: multiChartVM,
            destroy: () => Object.values(charts.getValue()).forEach(ci => ci.destroy()),
            exportLayout,
            applyMigrationScript,
        },
        supported,
        ...supported,
        //todo wtf
    };
    const [setApi, api] = createPropertyAdapter(chartReactAPI);
    const value = {
        api,
        addChartVMsAndInstance: (chartId, vms, chart) => {
            setcharts({
                ...charts.getValue(),
                [chartId]: chart,
            });
            // setChartVms should come in the end because apiReadyEffect depends on switchMap from chartVms
            setChartVms({
                ...chartVms.getValue(),
                [chartId]: vms,
            });
        },
    };
    const apiReadyEffect = pipe(initialLoaderVM.isLoaded, observable.filter(identity), switchMap(() => {
        // once isLoaded is true, we still have old VMs, and because of that onApiCreated called two times
        // so I empty it, and wait until it repopulated with VMs again
        // TODO rework we need more solid logic here
        setChartVms({});
        return chartVms;
    }), observable.filter(vms => record.size(vms) === multiChartVM.state.getValue().charts.length), tap(vms => {
        const lens = Lens.fromPath()(['internal', 'chartVMs']);
        const updatedApi = lens.set(vms)(api.getValue());
        setApi(updatedApi);
        windowGlobal.chartReactAPI(chartReactAPI);
        onApiCreated(updatedApi);
    }));
    const effects = merge(apiReadyEffect);
    return sink.newSink(value, effects);
});
