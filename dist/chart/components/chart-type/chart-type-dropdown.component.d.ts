import { FC } from 'react';
import { ChartType } from '../../model/chart.model';
export interface ToolbarChartTypeProps {
    readonly chartTypes: ChartType[];
    readonly selectedType: ChartType;
    readonly onTypeSelect: (type: ChartType) => void;
    readonly className?: string;
}
export declare const ChartTypeDropdown: FC<ToolbarChartTypeProps>;
