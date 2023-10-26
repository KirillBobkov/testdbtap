import { ChartSettings, ChartType } from '../../../model/chart.model';
export interface ColorValue {
    readonly onValueChange: (value: string) => void;
    readonly value: string;
}
export interface ColorsData {
    readonly values: ColorValue[];
    readonly id: string;
    readonly label: string;
}
export declare const getChartTypeColorsDefaultConfig: (type: ChartType, settings: ChartSettings, defaultConfig: ChartSettings) => any;
