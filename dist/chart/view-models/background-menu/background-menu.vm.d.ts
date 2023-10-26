import { Property } from '../../../utils/property.utils';
import { ChartWithModules } from '../../components/canvas-chart-renderer/chart-with-modules';
import { OrderData } from '../../model/trading/order.model';
import { TradingViewModel } from '../trading/trading.view-model';
import { TradingCoreViewModel } from '../trading/trading-core.view-model';
import { OrderEntryViewModel } from '../trading/order-entry.view-model';
import { PopoverCoordinates } from '../../../chart-kit/Popover/Popover.model';
import { MainSeriesTradingData } from '../../components/right-click-menu/right-click-menu-trading-btns';
export interface BackgroundMenuViewModel {
    readonly isOpened: Property<boolean>;
    readonly menuPosition: Property<PopoverCoordinates>;
    readonly closeMenu: () => void;
    readonly mainSeriesData: Property<MainSeriesTradingData>;
    readonly createOrder: (orderData: OrderData) => void;
}
export declare const createBackgroundMenuViewModel: import("../../../context/context2").Context<Record<"chart", ChartWithModules> & Record<"tradingVM", TradingViewModel> & Record<"tradingCoreVM", TradingCoreViewModel> & Record<"orderEntryVM", OrderEntryViewModel>, import("../../../utils/adt/sink.utils").Sink1<"Observable", BackgroundMenuViewModel>>;
