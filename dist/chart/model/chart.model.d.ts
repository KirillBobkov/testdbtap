import { YAxisAlign, YAxisLabelMode } from '@devexperts/dxcharts-lite/dist/chart/chart.config';
import { MagnetTarget } from '@devexperts/dxcharts-lite/dist/chart/components/cross_tool/cross-tool.component';
import { EventType } from '@devexperts/dxcharts-lite/dist/chart/components/events/events.model';
import { Candle } from '@devexperts/dxcharts-lite/dist/chart/model/candle.model';
import { CandleSeriesModel, PartialCandleSeriesColors } from '@devexperts/dxcharts-lite/dist/chart/model/candle-series.model';
import { Instrument } from './instrument.model';
import { CrossToolType } from '@devexperts/dxcharts-lite/dist/chart/components/cross_tool/cross-tool.model';
import { CandleAlignment, ChartCandleData, PriceType } from '../../providers/chart-data-provider';
import { DataSeriesType } from '@devexperts/dxcharts-lite/dist/chart/model/data-series.config';
import { PriceAxisType } from '@devexperts/dxcharts-lite/dist/chart/components/labels_generator/numeric-axis-labels.generator';
import { eq } from 'fp-ts';
import { Lens } from 'monocle-ts';
import { PartialExcept } from '../../utils/types';
import { TimeframeChangeStrategy } from '../view-models/global-effects/keep-same-timestamp-range-aggregation.effect';
import { LegendMode } from './chart-legend.model';
import { ExecutedOrdersDisplayMode } from './executed-orders.model';
import { FullChartCoreConfig, ThemesSettings } from '../../config/chart-config';
export type VolumesType = 'overlay' | 'separate';
export interface InfoBoxPaddings {
    top: number;
    left: number;
}
export interface ChartCoreConfigOffsets {
    visible?: boolean;
    top?: number;
    bottom?: number;
    right?: number;
    left?: number;
}
export declare const ChartOffsetsEq: eq.Eq<{
    readonly visible?: boolean | undefined;
    readonly top?: number | undefined;
    readonly bottom?: number | undefined;
    readonly right?: number | undefined;
    readonly left?: number | undefined;
}>;
export interface ConfigurableYAxisLabelConfig {
    mode: YAxisLabelMode;
}
export type DefaultYAxisLabelType = 'lastPrice' | 'countdownToBarClose';
export type ConfigurableYAxisLabelType = 'studies' | 'bidAsk' | 'highLow' | 'prevDayClose' | 'prePostMarket';
export type AllYAxisLabelType = DefaultYAxisLabelType | ConfigurableYAxisLabelType;
type ConfigurableYAxisLabelsSettings = PartialExcept<Record<AllYAxisLabelType, ConfigurableYAxisLabelConfig>, DefaultYAxisLabelType>;
export interface ConfigurableYAxisLabels {
    descriptions: boolean;
    settings: ConfigurableYAxisLabelsSettings;
}
export declare const defaultChartTypes: readonly ["candle", "bar", "line", "area", "equivolume", "heikinAshi", "scatterPlot", "hollow", "histogram", "baseline", "trend"];
export type ChartType = (typeof defaultChartTypes)[number];
export interface ChartTypesConfig {
    initialChartType: ChartType;
    listOfChartTypes: Readonly<Array<ChartType>>;
}
export interface ChartCoreSettingsColors {
    candleTheme: {
        upColor: string;
        downColor: string;
        noneColor: string;
        upWickColor: string;
        downWickColor: string;
    };
    barTheme: {
        upColor: string;
        downColor: string;
        noneColor: string;
    };
    lineTheme: {
        upColor: string;
        downColor: string;
        noneColor: string;
    };
    equivolumeTheme: {
        upColor: string;
        downColor: string;
        noneColor: string;
    };
    chartAreaTheme: {
        backgroundMode: 'regular' | 'gradient';
        backgroundColor: string;
        backgroundGradientTopColor: string;
        backgroundGradientBottomColor: string;
        gridColor: string;
    };
    scatterPlot: {
        mainColor: string;
    };
    areaTheme: {
        lineColor: string;
        startColor?: string;
        stopColor?: string;
    };
    baseLineTheme: {
        lowerSectionStrokeColor: string;
        upperSectionStrokeColor: string;
        lowerSectionFillColor: string;
        upperSectionFillColor: string;
        baselineColor: string;
    };
    histogram: {
        upCap: string;
        upBottom: string;
        upBright: string;
        downCap: string;
        downBottom: string;
        downBright: string;
        noneCap: string;
        noneBottom: string;
        noneBright: string;
    };
    crossTool: {
        lineColor: string;
        labelBoxColor: string;
        labelTextColor: string;
    };
    waterMarkTheme: {
        firstRowColor: string;
        secondRowColor: string;
        thirdRowColor: string;
    };
    newsTheme: {
        backgroundColor: string;
    };
    xAxis: {
        labelTextColor: string;
    };
    yAxis: {
        labelTextColor: string;
    };
}
export interface ChartCoreSettings {
    rtl: boolean;
    scale: {
        auto: boolean;
        lockPriceToBarRatio: boolean;
        inverse: boolean;
    };
    components: {
        chart: {
            showCandlesBorder: boolean;
            showWicks: boolean;
            equivolume: {
                showClosePrice: boolean;
            };
        };
        drawings: {
            magnet: number;
        };
        yAxis: {
            type: PriceAxisType;
            labels: ConfigurableYAxisLabels;
            align: YAxisAlign;
            visible: boolean;
        };
        grid: {
            visible: boolean;
            vertical: boolean;
            horizontal: boolean;
        };
        volumes: {
            visible: boolean;
            showSeparately: boolean;
        };
        offsets: ChartCoreConfigOffsets;
        waterMark: {
            visible: boolean;
        };
        crossTool: {
            magnetTarget: MagnetTarget;
            type: CrossToolType;
        };
        highLow: {
            visible: boolean;
        };
        events: {
            visible: boolean;
            eventsVisibility: Record<EventType, boolean>;
        };
        news: {
            visible: boolean;
        };
    };
    themes: ThemesSettings;
}
export interface ChartReactSettings {
    legend: {
        opened: boolean;
        showOHLC: boolean;
        showVolume: boolean;
        showInstrument: boolean;
        showPeriod: boolean;
        mode: LegendMode;
    };
    sessionBreaks: {
        visible: boolean;
    };
    extendedHours: {
        visible: boolean;
    };
    timeframeChangeStrategy: {
        aggregations: TimeframeChangeStrategy;
        instrument: TimeframeChangeStrategy;
    };
    trading: {
        visible: boolean;
        showOrders: boolean;
        showPositions: boolean;
        executedOrders: {
            enabled: boolean;
            displayMode: ExecutedOrdersDisplayMode;
        };
        bounds: {
            min: number;
            max: number;
        };
        rightOffset: number;
    };
    candlesData: {
        price: PriceType;
        candleAlignment: CandleAlignment;
    };
    aggregationPeriod: {
        applyUponCreation: boolean;
    };
    scale: {
        fit: {
            studies: boolean;
            orders: boolean;
            positions: boolean;
        };
    };
}
export interface ChartSettings {
    readonly chartCore: ChartCoreSettings;
    readonly chartReact: ChartReactSettings;
}
export type PartialInstrument = PartialExcept<Instrument, 'symbol'>;
export interface CompareInstrument {
    symbol: Instrument['symbol'];
    chartType: DataSeriesType;
    color: string;
}
export declare const DEFAULT_CHART_REACT_SETTINGS: ChartReactSettings;
export declare const toChartSettings: (config: FullChartCoreConfig, initialChartReactSettings: ChartReactSettings) => ChartSettings;
export declare const mapFullChartConfig2ChartCoreConfig: (config: FullChartCoreConfig) => ChartCoreSettings;
/**
 * Make a copy of chart core settings. Required when saving layout.
 * Make sure we save only required fields and nothing more (something else may be in old layouts).
 * @param config
 * @doc-tags tricky,migration
 */
export declare const copyChartCoreSettings: (config: ChartCoreSettings) => ChartCoreSettings;
/**
 * Make a copy of chart react settings. Required when saving layout.
 * Make sure we save only required fields and nothing more (something else may be in old layouts).
 * @param config
 * @doc-tags tricky,migration
 */
export declare const copyChartReactSettings: (config: ChartReactSettings) => ChartReactSettings;
export declare const map2ChartCoreColors: (colors: ChartCoreSettingsColors) => ChartCoreSettingsColors;
export declare const chartSettingsAutoScalePriceAxis: Lens<ChartSettings, boolean>;
export declare const chartSettingsLockPriceToBarRatio: Lens<ChartSettings, boolean>;
export declare const chartSettingsPriceAxisFit: Lens<ChartSettings, {
    studies: boolean;
    orders: boolean;
    positions: boolean;
}>;
export declare const chartSettingsAxisType: Lens<ChartSettings, PriceAxisType>;
export declare const setChartSettingsAutoScalePriceAxisToFalseIfNoFitSelected: (oldSettings: ChartSettings) => (newSettings: ChartSettings) => ChartSettings;
export declare const setChartSettingsAutoScalePriceAxisToTrueIfFitSelected: (oldSettings: ChartSettings) => (newSettings: ChartSettings) => ChartSettings;
export declare const resetChartSettingsPriceAxisFitToDefaultIfAutoScale: (oldSettings: ChartSettings) => (newSettings: ChartSettings) => ChartSettings;
export declare const getSingleColorFromCandleSeriesColors: (model: CandleSeriesModel) => {
    area: string;
    line: string;
};
export declare const getNativeChartColorsFromMainColor: (color: string, chartType: DataSeriesType) => {
    areaTheme: {
        lineColor: string;
        startColor: string;
        stopColor: string;
        fillColor: string;
    };
    lineTheme?: undefined;
} | {
    lineTheme: {
        upColor: string;
        downColor: string;
        noneColor: string;
    };
    areaTheme?: undefined;
};
export declare const toNativeChartSeriesConfig: (color: string, chartType: DataSeriesType) => PartialCandleSeriesColors;
export declare const toCandles: (data: ChartCandleData) => Candle;
export declare const sortChartCandle: <A extends ChartCandleData>(as: A[]) => A[];
export declare function getAvailableCrosstoolMagnetTargets(chartType: ChartType): MagnetTarget[];
export {};
