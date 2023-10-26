import { ChartPalette } from './chart-palette';
import { FullChartColorsWithModules, FullChartConfigWithModules } from '../chart/components/canvas-chart-renderer/chart-with-modules.config';
import { DeepPartial } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
import { ThemeType } from '../chart/model/theme.model';
import { ChartCoreSettingsColors } from '../chart/model/chart.model';
export type FullChartCoreConfig = Omit<FullChartConfigWithModules, 'colors'> & {
    themes: ThemesSettings;
};
export type PartialFullChartCoreConfig = DeepPartial<FullChartCoreConfig>;
export type ThemesSettings = Record<ThemeType, ChartCoreSettingsColors>;
/**
 * Default chart config in chart-react.
 * @param chartPalette
 * @doc-tags chart-react,default-config
 */
export declare const config: (chartPaletteDark: ChartPalette, chartPaletteLight: ChartPalette) => PartialFullChartCoreConfig;
export declare const mapPalette2ChartColors: (chartPalette: ChartPalette) => FullChartColorsWithModules;
export declare const getDefaultChartConfig: (chartPaletteDark: ChartPalette, chartPaletteLight: ChartPalette) => FullChartCoreConfig;
export declare const DEFAULT_CHART_CONFIG: FullChartCoreConfig;
