import React from 'react';
import { Localization } from '../../../../config/localization/localization';
import { ChartCoreSettings, ChartSettings } from '../../../model/chart.model';
import { ChartSettingsChartTypeColorsListProps } from './chart-settings-chart-type-colors-list';
import { Lens } from 'monocle-ts';
import { ThemeType } from '../../../model/theme.model';
interface ChartSettingsChartTypeColorsCommonProps extends Omit<ChartSettingsChartTypeColorsListProps, 'colorsData'> {
    readonly settings: ChartCoreSettings;
    readonly localization: Localization;
    readonly onColorChange: (lens: Lens<ChartSettings, any>, value: any) => void;
    readonly activeTheme: ThemeType;
}
export declare const ChartSettingsChartTypeColorsCommon: React.NamedExoticComponent<ChartSettingsChartTypeColorsCommonProps>;
export {};
