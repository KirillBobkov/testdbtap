import { VisualOrder } from './order.model';
import { VisualPosition } from './position.model';
export interface TradingItemsGroup {
    items: VisualTradingItem[];
    groupPrice: number;
    visible?: boolean;
}
export type VisualTradingItem = VisualOrder | VisualPosition;
