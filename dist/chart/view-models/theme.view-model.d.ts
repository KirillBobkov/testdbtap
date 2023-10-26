import { Sink } from '../../context/sink2';
import { MultiChartViewModel } from './multi-chart.view-model';
import { Lens } from 'monocle-ts';
import { ChartCoreSettingsColors, ChartSettings } from '../model/chart.model';
import { Property } from '../../utils/property.utils';
import { ThemesSettings } from '../../config/chart-config';
import { ChartAppPalette } from '../../config/theme/chart-palette';
import { LayoutViewModel } from './layout.view-model';
import { ThemeType } from '../model/theme.model';
import { UnsubscribeCallback } from './api/chart-react-api.view-model';
export type ThemeChangedCB = (theme: ThemeType) => void;
export declare const chartSettingsThemes: Lens<ChartSettings, ThemesSettings>;
export interface ThemeViewModel {
    readonly changeTheme: (theme: ThemeType) => void;
    readonly activeTheme: Property<ThemeType>;
    readonly onThemeChanged: (cb: ThemeChangedCB) => UnsubscribeCallback;
    readonly onRestoreDefaultTheme: (defaultTypeConfig: ChartCoreSettingsColors) => void;
}
export declare const createThemeViewModel: import("../../context/context2").Context<Record<"multiChartViewModel", MultiChartViewModel> & Record<"palette", ChartAppPalette> & Record<"layoutViewModel", LayoutViewModel>, Sink<ThemeViewModel>>;
/**
 * Takes palette from chart color variables library.
 * Overrides the palette.css in <head>. Disabled the default one.
 * @param palette
 * @doc-tags styling,chart-react,design-system
 */
export declare function processPaletteCss(palette: ChartAppPalette): void;
