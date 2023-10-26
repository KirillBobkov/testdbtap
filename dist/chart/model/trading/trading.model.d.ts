import { Order, OrderType, OriginalOrder, ProtectionOrder, VisualOrder } from './order.model';
import { Position, VisualPosition } from './position.model';
export declare const isProtection: (item: OriginalOrder | ProtectionOrder | Position) => item is ProtectionOrder;
export declare const isPosition: (item: VisualOrder | VisualPosition) => item is VisualPosition;
export declare const sortTradingItems: <A extends VisualPosition | VisualOrder>(as: A[]) => A[];
/**
 * Checks that order is created only on UI and was not send to server yet.
 * @param order
 */
export declare const checkOrderIsOnUIOnly: (id: string) => boolean;
/**
 * Filters invisible trading items out of array
 * @param tradingItems
 */
export declare function filterVisibleTradingItems<T extends {
    visible?: boolean;
}>(tradingItems: Record<string, T>): T[];
/**
 * Get price functions.
 */
export declare const getOrderPrice: (order: Order, marketPrice?: number) => number;
export declare const getOrderPriceByType: (orderType: OrderType, limitPrice?: number, stopPrice?: number, marketPrice?: number) => number;
export declare const getTradingItemPrice: (item: VisualOrder | VisualPosition, marketPrice?: number) => number;
export declare const priceFormatter: (n: number) => string;
