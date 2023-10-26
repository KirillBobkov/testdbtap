import React from 'react';
import { ChartType } from '../../model/chart.model';
import { CompareDataMenuSelectedSeries } from '../../view-models/data/data-menu.vm';
import { ReorderType } from '../right-click-menu/right-click-menu-reorder-btns.component';
export interface DataMenuCompareProps {
    readonly selectedSeries: CompareDataMenuSelectedSeries;
    readonly onChartTypeClose: () => void;
    readonly palette: string[];
    readonly onChangeSeriesColor: (color: string) => void;
    readonly seriesChartTypes: Readonly<Array<ChartType>>;
    readonly onChangeSeriesChartType: (type: ChartType) => void;
    readonly onSeriesReorder: (reorderType: ReorderType) => void;
}
export declare const DataMenuCompareComponent: React.NamedExoticComponent<DataMenuCompareProps>;
