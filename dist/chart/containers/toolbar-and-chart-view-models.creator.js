import { option } from 'fp-ts';
import { pipe } from 'fp-ts/function';
import { Configs } from '../../config/configs';
import { context } from '../../context/context2';
import { Providers } from '../../providers/providers';
import { createDxScriptStudiesDataProvider } from '../../providers/studies/dx-script-studies-data-provider';
import { createCombinedStudiesProvider } from '../../providers/studies/dx-studies-combined-data-provider';
import { createDxStudiesWebWorkerProvider } from '../../providers/studies/dx-studies-webworker-provider';
import { sink } from '../../utils/sink';
import { drawingTypes } from '../model/drawing.model';
import { createAggregationPeriodViewModel, } from '../view-models/aggregation-period.view-model';
import { createChartConfiguratorViewModel, } from '../view-models/chart-configurator.view-model';
import { createChartDataViewModel } from '../view-models/data/chart-data.view-model';
import { createChartLegendViewModel } from '../view-models/chart-legend/chart-legend.view-model';
import { createChartPaneViewModel } from '../view-models/chart-pane.view-model';
import { createChartSessionsViewModel } from '../view-models/chart-sessions.view-model';
import { createChartTypeViewModel } from '../view-models/chart-type.view-model';
import { createCompareChartViewModel } from '../view-models/data/compare-chart.view-model';
import { createCrosshairVM } from '../view-models/cross-tool.vm';
import { createDrawingViewModel } from '../view-models/drawings/drawing.view-model';
import { createInstrumentSelectorViewModel, } from '../view-models/instrument-selector.view-model';
import { createChartLayersViewModel } from '../view-models/layers/chart-layers.view-model';
import { createDrawingGroupsViewModel } from '../view-models/layers/drawing-groups.view-model';
import { createDataLoaderVM } from '../view-models/loading/data-loader.vm';
import { createNewsViewModel } from '../view-models/news/news.view-model';
import { createStudiesSettingsViewModel, } from '../view-models/studies/studies-settings.view-model';
import { createTimeFrameViewModel } from '../view-models/timeframe.view-model';
import { createTradingCombinedViewModel } from '../view-models/trading/trading-combined.view-model';
import { createYAxisConfiguratorViewModel, } from '../view-models/y-axis/y-axis-configurator.view-model';
import { createExecutedOrdersViewModel, } from '../view-models/trading/executed-orders.view-model';
import { createDynamicObjectsViewModel } from '../view-models/dynamic-objects.view-model';
// it's just another way to group vm together, so we avoid current limit related to fp-ts product map
const VMsWithoutDefer = context.combine(createTimeFrameViewModel, createInstrumentSelectorViewModel, createDynamicObjectsViewModel, (createTimeFrameViewModel, createInstrumentSelectorViewModel, createDynamicObjectsViewModel) => ({
    createTimeFrameViewModel,
    createInstrumentSelectorViewModel,
    createDynamicObjectsViewModel,
}));
/**
 * Creates common VM's for toolbar, sidebar and main chart containers.
 */
export const ToolbarAndChartViewModelsCreator = context.combine(Providers, context.defer(createChartDataViewModel, 'instrumentSelectorViewModel', 'aggregationPeriodViewModel', 'dataLoaderVM', 'initialInstrument', 'initialPriceType', 'initialExtendedHours'), VMsWithoutDefer, context.defer(createAggregationPeriodViewModel, 'initialAggregationPeriod'), context.defer(createChartConfiguratorViewModel, 'chartDataViewModel', 'chartTypeViewModel', 'aggregationPeriodViewModel', 'initialChartSettings', 'chartId'), context.defer(createYAxisConfiguratorViewModel, 'chartDataViewModel', 'chartConfiguratorViewModel', 'initialGeneralSettings', 'chartId'), context.defer(createCompareChartViewModel, 'chartDataViewModel', 'initialCompareInstruments', 'instrumentSelectorViewModel'), context.defer(createStudiesSettingsViewModel, 'chartConfiguratorViewModel', 'studiesDataProvider', 'dxScriptEditViewModel', 'chartId'), context.defer(createChartTypeViewModel, 'initialChartType', 'chartId'), context.defer(createDrawingViewModel, 'initialDrawings', 'availableDrawings', 'initialConfig', 'chartId', 'dataLoaderVM', 'chartDataViewModel'), context.defer(createChartSessionsViewModel, 'aggregationPeriodViewModel', 'chartConfiguratorViewModel', 'chartDataViewModel'), context.defer(createChartLegendViewModel, 'chartTypeViewModel', 'chartDataViewModel', 'chartConfiguratorViewModel', 'compareChartViewModel', 'studiesSettingsViewModel', 'aggregationPeriodViewModel'), context.defer(createChartLayersViewModel, 'drawingViewModel', 'chartDataViewModel', 'initialLayerItems'), context.defer(createDrawingGroupsViewModel, 'chartLayersViewModel', 'chartDataViewModel', 'drawingViewModel', 'chartId', 'initialSelectedGroup'), Configs, context.key()('chart'), context.key()('dxScriptEditViewModel'), context.defer(createNewsViewModel, 'chartConfiguratorViewModel', 'chartDataViewModel'), context.defer(createChartPaneViewModel, 'chartId'), context.defer(createTradingCombinedViewModel, 'chartConfiguratorViewModel', 'chartDataViewModel', 'yAxisConfiguratorViewModel', 'dataLoaderVM'), context.defer(createCrosshairVM, 'chartConfiguratorViewModel'), ({ dxScriptProvider, dxScriptRunner, dxStudiesProvider, tradingSessionsProvider, orderProvider }, createChartDataViewModel, { createTimeFrameViewModel, createInstrumentSelectorViewModel, createDynamicObjectsViewModel }, createAggregationPeriodViewModel, createChartConfiguratorViewModel, createYAxisConfiguratorViewModel, createCompareChartViewModel, createStudiesSettingsViewModel, createChartTypeViewModel, createDrawingViewModel, createChartSessionsViewModel, createChartLegendViewModel, createChartLayersViewModel, createDrawingGroupsViewModel, { drawingsConfig, chartReactConfig }, chart, dxScriptEditViewModel, createNewsViewModel, createChartPaneViewModel, createTradingCombinedViewModel, createCrosshairVM) => (chartInfo) => {
    const id = chartInfo.id;
    const defaultInstrument = chartInfo.instrument;
    const initialExtendedHours = chartInfo.extendedHours;
    const initialPriceType = chartInfo.chartSettings.chartReact.candlesData.price;
    const initialGeneralSettings = chartInfo.chartSettings;
    const initialAggregationPeriod = chartInfo.period;
    const chartPaneViewModelSink = createChartPaneViewModel({
        chartId: id,
    }).value;
    const dataLoaderVMSink = createDataLoaderVM();
    const instrumentSelectorViewModelSink = createInstrumentSelectorViewModel;
    const aggregationPeriodViewModelSink = createAggregationPeriodViewModel({
        initialAggregationPeriod,
    }).value;
    const aggregationPeriodViewModel = aggregationPeriodViewModelSink.value;
    const chartDataViewModelSink = createChartDataViewModel({
        instrumentSelectorViewModel: instrumentSelectorViewModelSink.value,
        aggregationPeriodViewModel,
        dataLoaderVM: dataLoaderVMSink.value,
        initialInstrument: defaultInstrument,
        initialExtendedHours,
        initialPriceType,
    }).value;
    const chartDataViewModel = chartDataViewModelSink.value;
    const timeFrameViewModelSink = createTimeFrameViewModel;
    const dynamicObjectsViewModelSink = createDynamicObjectsViewModel;
    const chartTypeViewModelSink = createChartTypeViewModel({
        initialChartType: chartInfo.chartType,
        chartId: id,
    }).value;
    const chartTypeViewModel = chartTypeViewModelSink.value;
    const chartConfiguratorViewModelSink = createChartConfiguratorViewModel({
        chartDataViewModel,
        aggregationPeriodViewModel,
        chartTypeViewModel,
        initialChartSettings: initialGeneralSettings,
        chartId: id,
    }).value;
    const chartConfiguratorViewModel = chartConfiguratorViewModelSink.value;
    const crosshairVMSink = createCrosshairVM({
        chartConfiguratorViewModel,
    }).value;
    const yAxisConfiguratorViewModelSink = createYAxisConfiguratorViewModel({
        chartConfiguratorViewModel,
        chartDataViewModel,
        initialGeneralSettings,
        chartId: id,
    }).value;
    const yAxisConfiguratorViewModel = yAxisConfiguratorViewModelSink.value;
    const compareChartViewModelSink = createCompareChartViewModel({
        chartDataViewModel,
        initialCompareInstruments: chartInfo.compareInstruments,
        instrumentSelectorViewModel: instrumentSelectorViewModelSink.value,
    }).value;
    const compareChartViewModel = compareChartViewModelSink.value;
    const dxScriptStudiesDataProvider = createDxScriptStudiesDataProvider(dxScriptRunner, chart);
    const dxStudiesStudiesDataProvider = createDxStudiesWebWorkerProvider(chart, tradingSessionsProvider, () => option.toUndefined(chartDataViewModel.instrument.getValue())?.tradingHours, chartReactConfig.disableWorkers);
    const studiesDataProvider = createCombinedStudiesProvider(dxScriptStudiesDataProvider, dxStudiesStudiesDataProvider, dxStudiesProvider, dxScriptProvider);
    const studiesSettingsViewModelSink = createStudiesSettingsViewModel({
        chartConfiguratorViewModel,
        studiesDataProvider,
        dxScriptEditViewModel,
        chartId: id,
    }).value;
    const studiesSettingsViewModel = studiesSettingsViewModelSink.value;
    const drawingViewModelSink = createDrawingViewModel({
        initialDrawings: chartInfo.drawings,
        availableDrawings: drawingTypes,
        initialConfig: drawingsConfig,
        chartId: id,
        dataLoaderVM: dataLoaderVMSink.value,
        chartDataViewModel,
    }).value;
    const drawingVM = drawingViewModelSink.value;
    const chartLegendVMSink = createChartLegendViewModel({
        chartTypeViewModel,
        chartDataViewModel,
        chartConfiguratorViewModel,
        compareChartViewModel,
        studiesSettingsViewModel,
        aggregationPeriodViewModel,
    }).value;
    const chartLayersVMSink = createChartLayersViewModel({
        drawingViewModel: drawingVM,
        chartDataViewModel,
        initialLayerItems: chartInfo.layers.layerItems,
    }).value;
    const drawingGroupsVMSink = createDrawingGroupsViewModel({
        chartLayersViewModel: chartLayersVMSink.value,
        chartDataViewModel,
        drawingViewModel: drawingVM,
        chartId: id,
        initialSelectedGroup: chartInfo.layers.selectedGroup,
    }).value;
    const chartSessionsViewModelSink = createChartSessionsViewModel({
        aggregationPeriodViewModel,
        chartConfiguratorViewModel,
        chartDataViewModel,
    }).value;
    const chartNewsViewModelSink = createNewsViewModel({
        chartConfiguratorViewModel,
        chartDataViewModel,
    }).value;
    const { tradingVMSink, tradingCoreVMSink, orderEntryVMSink } = createTradingCombinedViewModel({
        chartConfiguratorViewModel,
        chartDataViewModel,
        yAxisConfiguratorViewModel,
        dataLoaderVM: dataLoaderVMSink.value,
    }).value;
    const executedOrdersVMSink = createExecutedOrdersViewModel({
        chartConfiguratorViewModel,
        chart,
        chartDataViewModel,
        orderProvider,
    }).value;
    return pipe(
    // order plays crucial role here, in which order we pass VMs determines the order of subscriptions
    sink.sequenceT(
    // chartPaneVM should be before studiesVM
    chartPaneViewModelSink, chartDataViewModelSink, chartConfiguratorViewModelSink, timeFrameViewModelSink, aggregationPeriodViewModelSink, compareChartViewModelSink, yAxisConfiguratorViewModelSink, studiesSettingsViewModelSink, chartTypeViewModelSink, drawingViewModelSink, chartLegendVMSink, chartSessionsViewModelSink, chartLayersVMSink, drawingGroupsVMSink, instrumentSelectorViewModelSink, chartNewsViewModelSink, dataLoaderVMSink, tradingVMSink, tradingCoreVMSink, orderEntryVMSink, crosshairVMSink, executedOrdersVMSink, dynamicObjectsViewModelSink), sink.map(([chartPaneViewModel, chartDataViewModel, chartConfiguratorViewModel, timeFrameViewModel, aggregationPeriodViewModel, compareChartViewModel, yAxisConfiguratorViewModel, studiesSettingsViewModel, chartTypeViewModel, drawingViewModel, chartLegendVM, chartSessionsViewModel, chartLayersViewModel, drawingGroupsViewModel, instrumentSelectorViewModel, newsViewModel, dataLoaderVM, tradingVM, tradingCoreVM, orderEntryVM, crosshairVM, executedOrdersVM, dynamicObjectsVM,]) => ({
        chartPaneViewModel,
        chartDataViewModel,
        chartConfiguratorViewModel,
        timeFrameViewModel,
        aggregationPeriodViewModel,
        compareChartViewModel,
        yAxisConfiguratorViewModel,
        studiesSettingsViewModel,
        chartTypeViewModel,
        drawingViewModel,
        chartLegendVM,
        chartSessionsViewModel,
        chartLayersViewModel,
        drawingGroupsViewModel,
        instrumentSelectorViewModel,
        newsViewModel,
        dataLoaderVM,
        tradingVM,
        tradingCoreVM,
        orderEntryVM,
        crosshairVM,
        executedOrdersVM,
        dynamicObjectsVM,
    })));
});
export const ChartReactApiViewModels = context.combine(context.key()('chartDataViewModel'), context.key()('chartConfiguratorViewModel'), context.key()('compareChartViewModel'), context.key()('yAxisConfiguratorViewModel'), context.key()('studiesSettingsViewModel'), context.key()('chartTypeViewModel'), context.key()('drawingViewModel'), context.key()('chartLegendVM'), context.key()('chartLayersViewModel'), context.key()('aggregationPeriodViewModel'), context.key()('drawingGroupsViewModel'), context.key()('tradingViewModel'), context.key()('tradingCoreViewModel'), context.key()('orderEntryViewModel'), context.key()('crosshairVM'), (chartDataViewModel, chartConfiguratorViewModel, compareChartViewModel, yAxisConfiguratorViewModel, studiesSettingsViewModel, chartTypeViewModel, drawingViewModel, chartLegendVM, chartLayersViewModel, aggregationPeriodViewModel, drawingGroupsViewModel, tradingViewModel, tradingCoreViewModel, orderEntryViewModel, crosshairVM) => ({
    chartDataViewModel,
    chartConfiguratorViewModel,
    compareChartViewModel,
    yAxisConfiguratorViewModel,
    studiesSettingsViewModel,
    chartTypeViewModel,
    drawingViewModel,
    chartLegendVM,
    chartLayersViewModel,
    aggregationPeriodViewModel,
    drawingGroupsViewModel,
    tradingViewModel,
    tradingCoreViewModel,
    orderEntryViewModel,
    crosshairVM,
}));
