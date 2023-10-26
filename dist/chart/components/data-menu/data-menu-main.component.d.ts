import React from 'react';
import { ChartSettings, ChartType } from '../../model/chart.model';
import { MainDataMenuSelectedSeries } from '../../view-models/data/data-menu.vm';
import { PriceType } from '../../../providers/chart-data-provider';
import { OrderData } from '../../model/trading/order.model';
import { ReorderType } from '../right-click-menu/right-click-menu-reorder-btns.component';
export interface DataMenuMainProps {
    readonly settings: ChartSettings;
    readonly selectedSeries: MainDataMenuSelectedSeries;
    readonly onChangeSeriesChartType: (type: ChartType) => void;
    readonly priceTypes: PriceType[];
    readonly onChangePriceType: (type: PriceType) => void;
    readonly onSeriesReorder: (value: ReorderType) => void;
    readonly onCreateOrder: (orderData: OrderData) => void;
    readonly chartTypes: Readonly<Array<ChartType>>;
    readonly onChartTypeClose: () => void;
    readonly onPriceTypeClose: () => void;
}
export declare const DataMenuMainComponent: React.NamedExoticComponent<DataMenuMainProps>;
