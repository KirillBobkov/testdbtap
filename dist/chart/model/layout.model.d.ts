import { MultiChartLayoutType } from './multichart.model';
import { AggregationPeriod } from './aggregation.model';
import { StudyLineType, StudyParameterType, StudyParamSelectableType, TStudySettings } from './studies.model';
import { DrawingType } from './drawing.model';
import { ChartCoreSettings, ChartReactSettings, ChartType, CompareInstrument } from './chart.model';
import { ChartReactConfig } from '../../config/chart-react-config';
import { LayerItem } from './chart-layers.model';
import { Drawing } from '@dx-private/dxchart5-modules/dist/drawings/drawings.config';
import { DataSeriesType } from '@devexperts/dxcharts-lite/dist/chart/model/data-series.config';
import { Instrument } from './instrument.model';
import { TimeframePreset } from './timeframe-presets.model';
import { FullChartCoreConfig } from '../../config/chart-config';
import { ThemeType } from './theme.model';
export declare const INITIAL_INSTRUMENT = "AAPL";
export type InstrumentSymbol = string;
export declare const DEFAULT_LAYOUT_NAME = "Default Layout";
export declare const RETRY_SAVE_LAYOUT = 5;
export interface SecondarySeries {
    symbol: InstrumentSymbol;
    chartType: DataSeriesType;
    color: string;
}
export interface ChartLayout {
    index: number;
    symbol?: InstrumentSymbol;
    aggregation: AggregationPeriod;
    timeframePreset?: TimeframePreset;
    chartType: ChartType;
    studies: ChartStudiesLayout[];
    chartCoreConfig: ChartCoreSettings;
    chartReactConfig: ChartReactSettings;
    secondarySeries: SecondarySeries[];
    drawings: Record<InstrumentSymbol, Drawing<DrawingType>[]>;
    layers: {
        layerItems: Record<InstrumentSymbol, LayerItem[]>;
        /**
         * @description
         * `LayerItemsGroup` id - needed for the DrawingGroups feature
         * @see
         * If value is not present, DrawingGroupsVM defaults it to `DEFAULT_GROUP_ID`
         * @default
         * `DEFAULT_GROUP_ID`
         */
        selectedGroup?: string;
    };
    panes: {
        order: string[];
        heightRatio: Record<string, number>;
    };
    xScaleViewport: {
        startTimestamp: number;
        endTimestamp: number;
    };
}
export interface MultiChartLayout {
    version: string;
    global: {
        drawingMode: boolean;
        magnetMode: boolean;
        drawingSyncMode: boolean;
        theme: ThemeType;
    };
    multiChart: {
        layout: MultiChartLayoutType;
        selectedChartIndex: string;
        sync: {
            crossTool: boolean;
            instrument: boolean;
            chartType: boolean;
            aggregation: boolean;
            appearance: boolean;
            studies: boolean;
        };
    };
    charts: ChartLayout[];
}
export interface ChartStudiesLayout {
    id: string;
    parameters?: Array<ChartStudyLayoutParameter>;
    lines?: Array<ChartStudyLayoutLine>;
    overlaying?: boolean;
    uuid?: string;
}
interface ChartStudyLayoutParameter {
    id: string;
    value: StudyParamSelectableType | string | number | boolean;
    studyParamType: StudyParameterType;
}
interface ChartStudyLayoutLine {
    title: string;
    studyLineType: StudyLineType;
    thickness: number;
    colors: Array<string>;
    visible: boolean;
}
export declare const mapTStudySettings2ChartStudiesLayout: (studies: TStudySettings[]) => ChartStudiesLayout[];
export declare const mapChartStudiesLayouts2TStudySetting: (studies: ChartStudiesLayout[], defaultStudies: TStudySettings[]) => TStudySettings[];
export declare const createMockLayoutData: (config: FullChartCoreConfig, chartReactConfig: ChartReactConfig, initialChartReactSettings: ChartReactSettings, instrument?: Instrument['symbol']) => {
    selectedLayoutId: string;
    layouts: {
        version: string;
        global: {
            drawingMode: boolean;
            magnetMode: boolean;
            drawingSyncMode: boolean;
            theme: ThemeType;
        };
        multiChart: {
            layout: MultiChartLayoutType;
            selectedChartIndex: string;
            sync: {
                crossTool: boolean;
                instrument: boolean;
                chartType: boolean;
                aggregation: boolean;
                appearance: boolean;
                studies: boolean;
            };
        };
        charts: ChartLayout[];
        id: string;
        name: string;
        lastUpdateTimeStamp: number;
    }[];
};
export declare const createDefaultLayout: (instrument: InstrumentSymbol | undefined, aggregation: AggregationPeriod, timeframePreset: TimeframePreset | undefined, config: FullChartCoreConfig, chartReactConfig: ChartReactConfig, initialChartReactSettings: ChartReactSettings, initialStudies?: Array<TStudySettings['id']>, initialChartType?: ChartType) => MultiChartLayout;
export declare const createDefaultChartLayout: (index: number, instrument: InstrumentSymbol | undefined, aggregation: AggregationPeriod, timeframePreset: TimeframePreset | undefined, config: FullChartCoreConfig, initialStudies: Array<TStudySettings['id']>, initialChartType: ChartType, initialChartReactSettings: ChartReactSettings) => ChartLayout;
export declare const compareInstrumentsToSecondarySeries: (compareInstruments: CompareInstrument[]) => SecondarySeries[];
export declare const secondarySeriesToCompareInstruments: (secondarySeries: SecondarySeries[]) => CompareInstrument[];
export {};
