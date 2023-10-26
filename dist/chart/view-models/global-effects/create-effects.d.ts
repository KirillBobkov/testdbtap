export declare const CreateEffects: import("../../../context/context2").Context<Record<"chart", import("../../components/canvas-chart-renderer/chart-with-modules").ChartWithModules> & Record<"aggregationPeriodViewModel", import("../aggregation-period.view-model").AggregationPeriodViewModel> & Record<"chartTypeViewModel", import("../chart-type.view-model").ChartTypeViewModel> & Record<"chartConfiguratorViewModel", import("../chart-configurator.view-model").ChartConfiguratorViewModel> & Record<"timeFrameViewModel", import("../timeframe.view-model").TimeFrameViewModel> & Record<"chartDataViewModel", import("../data/chart-data.view-model").ChartDataViewModel> & Record<"timeframePresetsViewModel", import("../timeframe-presets.view-model").TimeframePresetsViewModel> & Record<"notificationVM", import("../notification.view-model").NotificationViewModel> & Record<"drawingViewModel", import("../drawings/drawing.view-model").ChartDrawingViewModel> & Record<"multiChartViewModel", import("../multi-chart.view-model").MultiChartViewModel> & Record<"chartId", string> & Record<"chartReactConfig", import("../../../config/chart-react-config").ChartReactConfig>, import("rxjs").Observable<boolean | void | import("../../../providers/chart-data-provider").ChartCandleData[] | import("../../model/timeframe-presets.model").TimeframePreset | import("../../model/timeframe.model").TimestampRange | {
    start: number;
    end: number;
} | import("@devexperts/dxcharts-lite/dist/chart/inputlisteners/canvas-input-listener.component").Point | [[import("../../model/aggregation.model").AggregationPeriod, import("../../model/aggregation.model").AggregationPeriod], import("../../model/timeframe.model").TimestampRange] | null>>;
