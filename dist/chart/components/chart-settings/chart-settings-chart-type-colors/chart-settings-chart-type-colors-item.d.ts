import React from 'react';
import { ColorValue } from '../../../containers/chart-settings/chart-settings-colors/chart-type-colors.config';
interface ChartSettingsChartTypeColorsItemProps {
    readonly id: string;
    readonly values: ColorValue[];
    readonly label: string;
    readonly palette: string[];
    readonly popoverContainer?: HTMLDivElement;
}
export declare const ChartSettingsChartTypeColorsItem: React.NamedExoticComponent<ChartSettingsChartTypeColorsItemProps>;
export {};
