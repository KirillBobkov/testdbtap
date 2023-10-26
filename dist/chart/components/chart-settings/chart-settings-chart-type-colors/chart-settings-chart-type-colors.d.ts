import { Lens } from 'monocle-ts';
import React from 'react';
import { Localization } from '../../../../config/localization/localization';
import { ChartCoreSettings, ChartSettings } from '../../../model/chart.model';
import { Lazy } from 'fp-ts/function';
import { ThemeType } from '../../../model/theme.model';
interface ColorSettingsComponentProps {
    readonly popoverContainer?: HTMLDivElement;
}
interface ChartSettingsChartTypeColorsProps {
    readonly localization: Localization;
    readonly changeTheme: (theme: ThemeType) => void;
    readonly activeTheme: ThemeType;
    readonly onColorChange: (lens: Lens<ChartSettings, any>, value: any) => void;
    readonly palette: string[];
    readonly ColorSettingsComponent: React.ComponentType<ColorSettingsComponentProps>;
    readonly settings: ChartCoreSettings;
    readonly popoverContainer?: HTMLDivElement;
    readonly showRestoreToDefault?: boolean;
    readonly onRestoreDefaultRequest: Lazy<void>;
    readonly showThemeSwitcher: boolean;
}
export declare const ChartSettingsChartTypeColors: React.NamedExoticComponent<ChartSettingsChartTypeColorsProps>;
export {};
