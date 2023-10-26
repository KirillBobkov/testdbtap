import { ChartReactConfig } from '../../../config/chart-react-config';
import { Sink } from '../../../context/sink2';
import { OrderProvider } from '../../../providers/trading/order.provider';
import { PositionProvider } from '../../../providers/trading/position.provider';
import { Property } from '../../../utils/property.utils';
import { ChartWithModules } from '../../components/canvas-chart-renderer/chart-with-modules';
import { ProtectionOrderType, OrderSide, VisualOrder, OrderType } from '../../model/trading/order.model';
import { UnsubscribeCallback } from '../api/chart-react-api.view-model';
import { ChartConfiguratorViewModel } from '../chart-configurator.view-model';
import { ChartDataViewModel } from '../data/chart-data.view-model';
import { MultiChartViewModel } from '../multi-chart.view-model';
import { YAxisConfiguratorViewModel } from '../y-axis/y-axis-configurator.view-model';
import { OrderEntryViewModel } from './order-entry.view-model';
import { TradingCoreViewModel } from './trading-core.view-model';
import { VisualPosition } from '../../model/trading/position.model';
import { TradingItemsGroup } from '../../model/trading/trading-group.model';
export interface TradingViewModel {
    orders: Property<Record<string, VisualOrder>>;
    editablePositions: Property<Record<string, VisualPosition>>;
    editableOrders: Property<Record<string, VisualOrder>>;
    positions: Property<Record<string, VisualPosition>>;
    createOrderFromOrderEntry: (type: OrderType, side: OrderSide) => void;
    createOriginalOrder: (type: OrderType, side: OrderSide, price: number, quantity: number) => void;
    createProtectionOrder: (type: ProtectionOrderType, originalId: string) => void;
    removePosition: (id: string) => void;
    removeOrder: (id: string) => void;
    selectTradingItem: (id: string) => void;
    deselectTradingItems: () => void;
    updateOrderPosition: (id: string, y: number) => void;
    updateOrderPriceUI: (id: string, y: number) => void;
    onOrderDragStart: () => void;
    onOrderDblClick: (id: string) => void;
    onOrderClick: (id: string) => void;
    onOrderDblClickEventRegister: (callback: (chartId: string, order: VisualOrder) => void) => UnsubscribeCallback;
    onOrderClickEventRegister: (callback: (chartId: string, order: VisualOrder) => void) => UnsubscribeCallback;
    orderHeight: Property<number>;
    setOrderHeight: (value: number) => void;
    groupedVisualTradingItems: Property<Record<string, TradingItemsGroup>>;
    onGroupItemSelect: (id: string) => void;
    resizer: Property<ResizerProps>;
    setResizer: (resizer: ResizerProps) => void;
    onResizerDrag: (posX: number) => void;
    onResizerDragEnd: (posX: number) => void;
    onResizerHover: () => void;
    onDragStartFromGroup: (id: string) => void;
    showPriceAsLabels: Property<boolean>;
    ordersBounds: Property<OnPBounds>;
    isDragging: Property<boolean>;
}
export interface ResizerProps {
    visible: boolean;
    canvasHeight: number;
    rightOffset: number;
}
export interface OnPBounds {
    top: number;
    bottom: number;
}
export declare const TRADING_ITEM_HEIGHT = 19;
export declare const DEFAULT_RIGHT_OFFSET = 100;
export declare const createTradingViewModel: import("../../../context/context2").Context<Record<"chart", ChartWithModules> & Record<"orderProvider", OrderProvider> & Record<"positionProvider", PositionProvider> & Record<"chartDataViewModel", ChartDataViewModel> & Record<"chartReactConfig", ChartReactConfig> & Record<"multiChartViewModel", MultiChartViewModel> & Record<"orderEntryViewModel", OrderEntryViewModel> & Record<"tradingCoreViewModel", TradingCoreViewModel> & Record<"yAxisConfiguratorViewModel", YAxisConfiguratorViewModel> & Record<"chartConfiguratorViewModel", ChartConfiguratorViewModel> & Record<"chartId", string>, Sink<TradingViewModel>>;
