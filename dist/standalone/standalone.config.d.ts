import { TStudySettings } from '../chart/model/studies.model';
import { ThemeType } from '../chart/model/theme.model';
import { PartialTimeframePresetsConfigMode } from '../config/chart-react-config';
import { ChartAppDependencies } from '../chart/chart-react-app';
import { ChartReactAPI } from '../chart/view-models/api/chart-react-api.view-model';
import { ChartType } from '../chart/model/chart.model';
export interface FeatureToggleOptionsChartReact {
    readonly toolbarEnabled?: boolean;
    readonly sidebarEnabled?: boolean;
    readonly yAxisEnabled?: boolean;
    readonly instrumentSuggestEnabled?: boolean;
    readonly instrumentSuggestVisible?: boolean;
    readonly studyTemplatesEnabled?: boolean;
    readonly layoutEnabled?: boolean;
    readonly dataExportEnabled?: boolean;
    readonly tradingEnabled?: boolean;
    readonly customPeriodInputEnabled?: boolean;
    readonly sessionBreaksEnabled?: boolean;
    readonly extendedHoursEnabled?: boolean;
    readonly priceTypeEnabled?: boolean;
    readonly candlesAlignmentEnabled?: boolean;
    readonly eventsEnabled?: boolean;
}
export interface FeatureToggleOptionsChartCore {
    readonly navigationMapEnabled?: boolean;
    readonly xAxisEnabled?: boolean;
    readonly yAxisEnabled?: boolean;
}
export interface DataProviderOptions {
    readonly symbol?: string;
    readonly period?: string;
}
export interface ChartStorageOptions {
    readonly useLocalStorageForLayout?: boolean;
}
export interface StudiesOptions {
    readonly studies?: Array<TStudySettings['id']>;
}
export interface ChartDisplayOptions {
    readonly width?: number;
    readonly height?: number;
}
export interface ChartTypeOptions {
    readonly chartType?: ChartType;
}
export interface ChartThemeOptions {
    readonly chartTheme?: ThemeType;
}
export interface ChartSettingsOptions {
    readonly timezone?: string;
    readonly timeframePresetsMode?: PartialTimeframePresetsConfigMode;
    readonly chartType?: ChartType;
    readonly chartTheme?: ThemeType;
}
export declare const symbolSuggestConfigurableKeys: readonly ["ipfURL", "ipfUsername", "ipfPassword"];
export declare const chartDataConfigurableKeys: readonly ["dxFeedURL", "dxFeedToken"];
export declare const newsDataConfigurableKeys: readonly ["newsURL", "newsUsername", "newsPassword"];
export type SymbolSuggestKeys = (typeof symbolSuggestConfigurableKeys)[number];
export type ChartDataKeys = (typeof chartDataConfigurableKeys)[number];
export type NewsDataKeys = (typeof newsDataConfigurableKeys)[number];
export type DxFeedProvidersOptions = {
    [key in SymbolSuggestKeys | ChartDataKeys | NewsDataKeys]: string;
};
export interface WidgetRenderingOptions {
    svgShapeRendering?: string;
}
export interface ChartReactWidgetProps extends DataProviderOptions, ChartDisplayOptions, StudiesOptions, FeatureToggleOptionsChartCore, FeatureToggleOptionsChartReact, ChartStorageOptions, ChartTypeOptions, ChartThemeOptions, DxFeedProvidersOptions, WidgetRenderingOptions, ChartSettingsOptions {
    readonly dependencies?: ChartAppDependencies;
    readonly onAPICreated?: (api: ChartReactAPI) => void;
}
export interface DXChartWidget {
    readonly createWidget: (container: HTMLElement, props: ChartReactWidgetProps) => Promise<void>;
    readonly destroy: () => void;
}
export declare const SCRIPTS_URL = "https://webdev.prosp.devexperts.com:8095/widget";
export declare const SNAPSHOT_URL = "https://webdev.prosp.devexperts.com:8095/api/snapshot";
