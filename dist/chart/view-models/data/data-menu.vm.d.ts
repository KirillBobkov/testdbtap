import { Property } from '../../../utils/property.utils';
import { ChartWithModules } from '../../components/canvas-chart-renderer/chart-with-modules';
import { Option } from 'fp-ts/Option';
import { ChartType } from '../../model/chart.model';
import { ChartTypeViewModel } from '../chart-type.view-model';
import { CompareChartViewModel } from './compare-chart.view-model';
import { TradingViewModel } from '../trading/trading.view-model';
import { TradingCoreViewModel } from '../trading/trading-core.view-model';
import { ChartConfiguratorViewModel } from '../chart-configurator.view-model';
import { DynamicObjectsViewModel } from '../dynamic-objects.view-model';
import { OrderEntryViewModel } from '../trading/order-entry.view-model';
import { PopoverCoordinates } from '../../../chart-kit/Popover/Popover.model';
import { OrderData } from '../../model/trading/order.model';
import { PriceType } from '../../../providers/chart-data-provider';
import { ReorderType } from '../../components/right-click-menu/right-click-menu-reorder-btns.component';
import { MainSeriesTradingData } from '../../components/right-click-menu/right-click-menu-trading-btns';
export declare const COMPARE_SERIES_CHART_TYPES: ChartType[];
export interface DataMenuViewModel {
    readonly menuPosition: Property<PopoverCoordinates>;
    readonly isOpened: Property<boolean>;
    readonly closeMenu: () => void;
    readonly selectedSeries: Property<Option<DataMenuSelectedSeriesType>>;
    readonly changeSelectedSeries: (id: string, seriesType: SelectedSeriesType) => void;
    readonly changeSelectedSeriesChartType: (type: ChartType) => void;
    readonly changeSelectedSeriesPriceType: (type: PriceType) => void;
    readonly changeSelectedSeriesColor: (color: string) => void;
    readonly reorderSeries: (reorderType: ReorderType) => void;
    readonly createOrder: (data: OrderData) => void;
}
type SelectedSeriesType = 'main' | 'compare';
export type DataMenuSelectedSeriesType = MainDataMenuSelectedSeries | CompareDataMenuSelectedSeries;
export interface DataMenuSelectedSeries {
    readonly id: string;
    readonly type: SelectedSeriesType;
    readonly symbol: string;
    readonly chartType: ChartType;
}
export interface MainDataMenuSelectedSeries extends DataMenuSelectedSeries {
    readonly type: 'main';
    readonly trading: MainSeriesTradingData;
    readonly priceType: PriceType;
}
export interface CompareDataMenuSelectedSeries extends DataMenuSelectedSeries {
    readonly type: 'compare';
    readonly color: string;
}
export declare const createDataMenuViewModel: import("../../../context/context2").Context<Record<"chart", ChartWithModules> & Record<"chartTypeViewModel", ChartTypeViewModel> & Record<"compareChartViewModel", CompareChartViewModel> & Record<"tradingVM", TradingViewModel> & Record<"tradingCoreVM", TradingCoreViewModel> & Record<"chartConfiguratorViewModel", ChartConfiguratorViewModel> & Record<"dynamicObjectsVM", DynamicObjectsViewModel> & Record<"orderEntryVM", OrderEntryViewModel>, import("../../../utils/adt/sink.utils").Sink1<"Observable", DataMenuViewModel>>;
export {};
