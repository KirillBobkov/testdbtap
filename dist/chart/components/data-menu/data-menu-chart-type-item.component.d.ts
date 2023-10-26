import React from 'react';
import { ChartType } from '../../model/chart.model';
export interface DataMenuChartTypeItemProps {
    readonly value: ChartType;
    readonly chartTypes: Readonly<Array<ChartType>>;
    readonly onChangeType: (type: ChartType) => void;
    readonly onPopoverClose: () => void;
}
export declare const DataMenuChartTypeItem: React.NamedExoticComponent<DataMenuChartTypeItemProps>;
