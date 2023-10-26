import React from 'react';
import { ChartType } from '../../../model/chart.model';
export interface DataMenuChartTypePopoverProps {
    readonly isOpened: boolean;
    readonly onClose: () => void;
    readonly value: ChartType;
    readonly seriesChartTypes: Readonly<Array<ChartType>>;
    readonly onChangeSeriesChartType: (value: ChartType) => void;
    readonly anchorRef: ReactRef;
}
export declare const DataMenuChartTypePopover: React.NamedExoticComponent<DataMenuChartTypePopoverProps>;
