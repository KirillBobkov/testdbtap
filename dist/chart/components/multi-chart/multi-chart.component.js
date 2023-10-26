import { deviceDetector } from '@devexperts/dxcharts-lite/dist/chart/utils/device/device-detector.utils';
import { getDefaultConfig, mergeWithDefaultConfig } from '@devexperts/dxcharts-lite/dist/chart/chart.config';
import { cloneUnsafe } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
import { array, option } from 'fp-ts';
import { isNone, isSome } from 'fp-ts/Option';
import { constNull, pipe } from 'fp-ts/function';
import React, { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { PopupStackProvider } from '../../../chart-kit/PopupStack/PopupStack';
import { useFocusVisibleWithinHelper } from '../../../chart-kit/accessibility/use-focus-visible-within-helper';
import { useKeyboardMode } from '../../../chart-kit/accessibility/use-keyboard-mode';
import { TEST_IDS } from '../../../config/e2e/test-ids';
import { context } from '../../../context/context2';
import { waitIdle } from '../../../utils/browser-api.utils';
import { windowGlobal } from '../../../utils/debug/chart-window-global';
import { sink } from '../../../utils/sink';
import { initTimezones } from '../../../utils/timezones/timezones';
import { usePersistentValue } from '../../../utils/use-persistent-value';
import { useProperty } from '../../../utils/use-property';
import { useResizeObserver } from '../../../utils/use-resize-observer';
import { useSink } from '../../../utils/use-sink';
import { DrawingsSidebarContainer } from '../../containers/chart-drawings-sidebar.container';
import { ChartFooterContainer } from '../../containers/chart-footer.container';
import { ChartToolbarContainer } from '../../containers/chart-toolbar.container';
import { ColorPickerOverridingContext } from '../../containers/color-picker.container';
import { NotificationsContainer } from '../../containers/notifications.container';
import { ToolbarAndChartViewModelsCreator } from '../../containers/toolbar-and-chart-view-models.creator';
import { createChartReactApiVM } from '../../view-models/api/chart-react-api.view-model';
import { createIndicatorsTemplateViewModel } from '../../view-models/studies/indicator-template.view-model';
import { getChartsAmount } from '../../view-models/multi-chart.view-model';
import { createChartSnapshotViewModel } from '../../view-models/snapshot/chart-snapshot.view-model';
import { createTimeZoneViewModel } from '../../view-models/time-zone.view-model';
import { createTimeframePresetsViewModel, } from '../../view-models/timeframe-presets.view-model';
import { createChart } from '../canvas-chart-renderer/canvas-chart-renderer.component';
import { ChartReactAPIPropsContext } from './chart-react-api.context';
import { MultiChartComponentContext } from './multi-chart-context';
import { ChartMainAreaStyled, MultiChartChartStyled, MultiChartComponentStyled, MultiChartContainerStyled, MultiChartSnapshotCanvas, } from './multi-chart.styled';
const ChartContainer = context.lazy(() => import(/* webpackChunkName: "chart-container" */ '../../containers/chart-container/chart.container'), constNull, waitIdle);
/**
 * Renders main chart containers - toolbar, sidebar and chart.
 * Manages multi-chart rendering logic.
 */
export const MultiChartComponent = context.combine(context.defer(ToolbarAndChartViewModelsCreator, 'chart', 'dxScriptEditViewModel', 'chartId'), context.defer(ChartToolbarContainer, 'chartDataViewModel', 'aggregationPeriodViewModel', 'chartConfiguratorViewModel', 'compareChartViewModel', 'dxScriptEditViewModel', 'studiesSettingsViewModel', 'chartTypeViewModel', 'yAxisConfiguratorViewModel', 'drawingViewModel', 'chartReactApiViewModel', 'chart', 'chartId', 'chartLayersViewModel', 'instrumentSelectorViewModel', 'snapshotSharingVM', 'indicatorsTemplateVM'), context.defer(DrawingsSidebarContainer, 'drawingViewModel'), context.defer(ChartContainer, 'chartDataViewModel', 'chartConfiguratorViewModel', 'studiesSettingsViewModel', 'chartTypeViewModel', 'drawingViewModel', 'chart', 'aggregationPeriodViewModel', 'chartLegendVM', 'timeFrameViewModel', 'newsViewModel', 'executedOrdersVM', 'yAxisConfiguratorViewModel', 'chartPaneViewModel', 'timeframePresetsViewModel', 'timeZoneViewModel', 'dataLoaderVM', 'tradingVM', 'orderEntryVM', 'tradingCoreVM', 'chartSessionsViewModel', 'dynamicObjectsVM', 'chartId', 'compareChartViewModel'), ColorPickerOverridingContext, context.defer(createChartReactApiVM, 'snapshotSharingVM'), context.key()('dxScriptEditViewModel'), context.key()('multiChartViewModel'), context.key()('layoutViewModel'), context.key()('localization'), context.key()('initialTimeframePresets'), context.defer(createTimeframePresetsViewModel, 'chart', 'chartId', 'aggregationPeriodViewModel', 'initialTimeframePresets', 'chartSessionsViewModel', 'chartConfiguratorViewModel'), context.defer(ChartFooterContainer, 'timeframePresetsViewModel', 'chartConfiguratorViewModel', 'multiChartViewModel', 'yAxisConfiguratorViewModel', 'drawingGroupsViewModel', 'chartLayersViewModel', 'timeZoneViewModel'), context.defer(createChartSnapshotViewModel, 'charts', 'chartLegendVMs', 'periodVMs', 'snapshotCanvasRef'), context.defer(createIndicatorsTemplateViewModel, 'studiesSettingsVMs', 'multiChartViewModel'), NotificationsContainer, context.defer(createTimeZoneViewModel, 'multiChartViewModel', 'chart', 'chartDataViewModel', 'localization', 'aggregationPeriodViewModel', 'initialTimezones'), context.key()('timezones'), context.key()('chartReactConfig'), context.key()('chartConfig'), (ToolbarAndChartViewModelsCreator, ChartToolbarContainer, DrawingsSidebarContainer, ChartContainer, ColorPickerOverridingContext, createChartReactApiVM, dxScriptEditViewModel, multiChartViewModel, layoutViewModel, localization, timeframePresetsConfig, createTimeframePresetsViewModelDefer, createChartFooterContainerDefer, createChartSnapshotViewModel, createIndicatorsTemplateViewModel, NotificationsContainer, createTimezoneViewModelDefer, timezones, chartReactConfig, initialChartConfig) => memo(props => {
    const { multiChartLayout, maximizedChartId, className } = props;
    const selectedChartId = useProperty(multiChartViewModel.selectedChartId);
    const selectedChartIdNumber = parseInt(selectedChartId, 10);
    const snapshotCanvasRef = useRef(null);
    const layout = useProperty(layoutViewModel.selectedLayout);
    // direct access without useProperty is intentional, since we need only chart ids and chart instances
    // which should never be changed
    const chartInfos = useMemo(() => multiChartViewModel.state.getValue().charts, []);
    const shownCharts = useMemo(() => chartInfos.slice(0, getChartsAmount(multiChartLayout)), [multiChartLayout, chartInfos]);
    const charts = useCharts(layout, initialChartConfig);
    const multichartCharts = multiChartViewModel.state.getValue().charts;
    // view models are still created 3 times
    const chartViewModels = useSink(() => pipe(multichartCharts, array.map(chartInfo => {
        const chartId = chartInfo.id;
        const chartIdx = parseInt(chartId, 10);
        const chart = charts[chartIdx];
        return ToolbarAndChartViewModelsCreator({
            chart,
            dxScriptEditViewModel,
            chartId,
        }).value(chartInfo);
    }), sink.sequenceArray), [charts]);
    const createChartSnapshotVM = useSink(() => createChartSnapshotViewModel({
        snapshotCanvasRef,
        charts,
        chartLegendVMs: chartViewModels.map(vms => vms.chartLegendVM),
        periodVMs: chartViewModels.map(vms => vms.aggregationPeriodViewModel),
    }), [chartViewModels, charts]);
    const snapshotSharingVM = useSink(() => createChartSnapshotVM, [chartViewModels, charts]);
    const chartReactApiViewModelSink = useSink(() => createChartReactApiVM({ snapshotSharingVM }), []);
    const chartReactApiViewModel = useSink(() => chartReactApiViewModelSink, []);
    const createIndicatorsTemplateVM = useSink(() => createIndicatorsTemplateViewModel({
        multiChartViewModel,
        studiesSettingsVMs: chartViewModels.map(vms => vms.studiesSettingsViewModel),
    }), [chartViewModels]);
    const indicatorsTemplateVM = useSink(() => createIndicatorsTemplateVM, [chartViewModels]);
    const ChartToolbars = useSink(() => pipe(chartViewModels, array.mapWithIndex((idx, vms) => ChartToolbarContainer({
        ...vms,
        dxScriptEditViewModel,
        chartReactApiViewModel,
        snapshotSharingVM,
        indicatorsTemplateVM,
        chart: charts[idx],
        chartId: `${idx}`,
    })), sink.sequenceArray), [chartViewModels, chartReactApiViewModel, charts]);
    const SelectedToolbar = useMemo(() => ChartToolbars[selectedChartIdNumber], [ChartToolbars, selectedChartIdNumber]);
    const ChartSidebars = useSink(() => pipe(chartViewModels, array.map(DrawingsSidebarContainer), sink.sequenceArray), [chartViewModels]);
    const SelectedSidebar = useMemo(() => ChartSidebars[selectedChartIdNumber], [ChartSidebars, selectedChartIdNumber]);
    const timeframePresetsVMs = useSink(() => pipe(chartViewModels, array.mapWithIndex((idx, vms) => {
        return createTimeframePresetsViewModelDefer({
            chart: charts[idx],
            chartId: `${idx}`,
            aggregationPeriodViewModel: vms.aggregationPeriodViewModel,
            initialTimeframePresets: timeframePresetsConfig,
            chartSessionsViewModel: vms.chartSessionsViewModel,
            chartConfiguratorViewModel: vms.chartConfiguratorViewModel,
        }).value;
    }), sink.sequenceArray), [chartViewModels, charts]);
    const timeZonesList = chartReactConfig.timezoneControls.enabled
        ? timezones.listOfTimezones
        : timezones.currentTimezone
            ? [timezones.currentTimezone]
            : [];
    const initialTimezones = usePersistentValue(() => initTimezones(timeZonesList, chartReactConfig.disableWorkers));
    const timezoneVMs = useSink(() => pipe(chartViewModels, array.mapWithIndex((idx, vms) => {
        return createTimezoneViewModelDefer({
            chart: charts[idx],
            aggregationPeriodViewModel: vms.aggregationPeriodViewModel,
            multiChartViewModel,
            chartDataViewModel: vms.chartDataViewModel,
            localization,
            initialTimezones,
        }).value;
    }), sink.sequenceArray), [chartViewModels, charts]);
    const ChartFooter = useSink(() => pipe(chartViewModels, array.mapWithIndex((idx, vms) => {
        return createChartFooterContainerDefer({
            timeframePresetsViewModel: timeframePresetsVMs[idx],
            chartConfiguratorViewModel: vms.chartConfiguratorViewModel,
            multiChartViewModel,
            yAxisConfiguratorViewModel: vms.yAxisConfiguratorViewModel,
            drawingGroupsViewModel: vms.drawingGroupsViewModel,
            chartLayersViewModel: vms.chartLayersViewModel,
            timeZoneViewModel: timezoneVMs[idx],
        });
    }), sink.sequenceArray), [chartViewModels, timezoneVMs, charts]);
    const SelectedFooter = useMemo(() => ChartFooter[selectedChartIdNumber], [ChartFooter, selectedChartIdNumber]);
    const ChartContainers = useSink(() => pipe(chartViewModels, array.mapWithIndex((idx, vms) => ChartContainer({
        ...vms,
        chart: charts[idx],
        chartId: `${idx}`,
        timeframePresetsViewModel: timeframePresetsVMs[idx],
        timeZoneViewModel: timezoneVMs[idx],
    })), sink.sequenceArray), [chartViewModels, timeframePresetsVMs, timezoneVMs]);
    useEffect(() => {
        multiChartViewModel.setcharts(charts);
        const combinedVMs = pipe(chartViewModels, array.mapWithIndex((idx, els) => ({
            ...els,
            timeframePresetsViewModel: timeframePresetsVMs[idx],
            timezoneViewModel: timezoneVMs[idx],
        })));
        combinedVMs.forEach((vms, chartIdx) => {
            const chartId = `${chartIdx}`;
            const chart = charts[chartIdx];
            chartReactApiViewModel.addChartVMsAndInstance(chartId, vms, chart);
        });
    }, [charts, chartViewModels, chartReactApiViewModel]);
    const keyboardModeEnabled = useKeyboardMode();
    useFocusVisibleWithinHelper();
    const device = deviceDetector();
    const MultiCharts = useMemo(() => shownCharts.map(chartInfo => {
        const chartId = chartInfo.id;
        const chartIdx = parseInt(chartId, 10);
        const ChartContainer = ChartContainers[chartIdx];
        const isMaximized = pipe(maximizedChartId, option.exists(id => id === chartId));
        const isHidden = pipe(maximizedChartId, option.exists(expandedId => expandedId !== chartId));
        const selected = chartId === selectedChartId && isNone(maximizedChartId) && multiChartLayout !== '1x1';
        // since we redispatch events from chart legend to canvas in order to show cross tool on the canvas and allow panning
        // we need to trigger canvas leave subject when mouse leaves chart pane, because legend overlays canvas and there is a case
        // when canvas mouseleave event is not triggered because mouse leaves chart pane through chart legend area and cross tool remains shown
        const handleMouseLeaveChart = () => {
            chartViewModels.forEach(vms => vms.chartPaneViewModel.setHoveredPane(option.none));
            charts[chartIdx].canvasInputListener.mouseLeavesCanvasSubject.next(true);
        };
        const Toolbar = ChartToolbars[chartIdx];
        return (React.createElement(ChartReactAPIPropsContext.Provider, { key: chartId, value: { chartId, chartReactAPI: chartReactApiViewModel.api.getValue() } },
            React.createElement(MultiChartChartStyled, { maximized: isMaximized, hidden: isHidden, selected: selected, onMouseEnter: () => {
                    multiChartViewModel.setHoveredChartId(chartId);
                }, onMouseLeave: handleMouseLeaveChart, "data-test-id": TEST_IDS.multi_chart_template },
                React.createElement(React.Fragment, null,
                    chartReactConfig.toolbarMode === 'multiple' && React.createElement(Toolbar, null),
                    React.createElement(ChartContainer, null)))));
    }), [ChartContainers, charts, maximizedChartId, multiChartLayout, selectedChartId, shownCharts]);
    const multiChartRef = useRef(null);
    // handle chart window resize (including sidebar expand/collapse)
    useResizeObserver(multiChartRef, () => pipe(charts, array.filter(ci => ci.canvasBoundsContainer.isChartBoundsAvailable()), array.map(ci => ci.drawingManager.redrawCanvasesImmediate())), false);
    // handle multi-chart layout change
    useLayoutEffect(() => {
        charts.forEach(chart => chart.drawingManager.redrawCanvasesImmediate());
    }, [charts, maximizedChartId, shownCharts]);
    return (React.createElement(PopupStackProvider, null,
        React.createElement(MultiChartComponentContext.Provider, { value: { keyboardModeEnabled, localization, device } },
            React.createElement(ColorPickerOverridingContext, null,
                React.createElement(MultiChartComponentStyled, null,
                    React.createElement(NotificationsContainer, null),
                    React.createElement(SelectedSidebar, null),
                    React.createElement(ChartMainAreaStyled, { "data-test-id": TEST_IDS.chart_main_area, ref: multiChartRef },
                        chartReactConfig.toolbarMode === 'single' && React.createElement(SelectedToolbar, null),
                        React.createElement(MultiChartContainerStyled, { "data-test-id": TEST_IDS.multichart_container, maximized: !isSome(maximizedChartId), className: className, layout: multiChartLayout },
                            React.createElement(MultiChartSnapshotCanvas, { ref: snapshotCanvasRef }),
                            MultiCharts),
                        React.createElement(SelectedFooter, null)))))));
}));
// This function is intended to memoize last created chart instances and recreate them only if layout id was changed
const useCharts = (layout, initialConfig) => {
    const [charts, setCharts] = useState([]);
    const [lastLayoutId, setLastLayoutId] = useState('');
    if (layout.id !== lastLayoutId || charts.length === 0) {
        setLastLayoutId(layout.id);
        const instances = pipe(layout.charts, array.map(chartLayout => {
            const chartIdx = chartLayout.index;
            const chartId = `${chartIdx}`;
            const config = mergeWithDefaultConfig(cloneUnsafe(chartLayout.chartCoreConfig), cloneUnsafe({ ...initialConfig, colors: getDefaultConfig().colors }));
            const chart = createChart(config);
            chart.id = chartId;
            // here we create an instance for debug
            windowGlobal.chart(chartId, chart);
            return chart;
        }));
        setCharts(instances);
        return instances;
    }
    return charts;
};
export default MultiChartComponent;
