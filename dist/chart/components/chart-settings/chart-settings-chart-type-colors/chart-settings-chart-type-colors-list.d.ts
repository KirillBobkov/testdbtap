import React from 'react';
import { ColorsData } from '../../../containers/chart-settings/chart-settings-colors/chart-type-colors.config';
export interface ChartSettingsChartTypeColorsListProps {
    readonly colorsData: ColorsData[];
    readonly palette: string[];
    readonly popoverContainer?: HTMLDivElement;
}
export declare const ChartSettingsChartTypeColorsList: React.NamedExoticComponent<ChartSettingsChartTypeColorsListProps>;
