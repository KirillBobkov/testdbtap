import { OrderWithId, ProtectionOrderType, VisualOrder } from '../../model/trading/order.model';
import { HighLow } from '@devexperts/dxcharts-lite/dist/chart/model/scaling/auto-scale.model';
import { Bounds } from '@devexperts/dxcharts-lite/dist/chart/model/bounds.model';
import { Chart } from '@devexperts/dxcharts-lite/dist';
import { VisualTradingItem } from '../../model/trading/trading-group.model';
import { Position, VisualPosition } from '../../model/trading/position.model';
export declare const getItemById: <T extends {
    model: {
        id: string;
    };
}>(id: string) => (items: Record<string, T>) => import("fp-ts/lib/Option").Option<T>;
export declare const findOrderById: (id: string) => (orders: VisualOrder[]) => import("fp-ts/lib/Option").Option<VisualOrder>;
export type PriceConverter = (price: number) => number;
export type YConverter = (y: number) => number;
export type PriceToYConverter = (price: number) => number;
/**
 * Creates a protection order from original item.
 * Links both together.
 * (Original item could be order or position)
 * @param originalItem
 * @param type
 * @param yConverter
 * @param priceConverter
 *
 * @doc-tags trading
 */
export declare const createProtectionOrderFromOriginalItem: (originalItem: VisualTradingItem, type: ProtectionOrderType, yConverter: YConverter | undefined, priceConverter: PriceConverter | undefined, chart: Chart) => VisualOrder;
/**
 * Removes a protection order's id from original item
 * (Original item could be order or position)
 * @param originalItem
 * @param type
 *
 * @doc-tags trading
 */
export declare const unLinkOrderFromOriginalOrder: (originalItem: VisualTradingItem, type: ProtectionOrderType) => void;
/**
 * Add a protection order's id to original item
 * (Original item could be order or position)
 * @param originalItem
 * @param protectionOrderId
 * @param type
 *
 * @doc-tags trading
 */
export declare const linkProtectionOrderToOriginalItem: (originalItem: VisualTradingItem, protectionOrderId: string, type: ProtectionOrderType) => void;
export declare function tradingItemVisibilityInHighLow(price: number, highLow: HighLow): boolean;
export declare const tradingItemVisibilityInBounds: (chartBounds: Bounds, offset: number, y: number) => boolean;
export declare const mapOrderToVisualOrder: (order: OrderWithId, chart: Chart, marketPrice: number, bounds: HighLow) => VisualOrder;
/**
 * Finds all related items.
 * @param order
 */
export declare const findAllRelatedItems: (tradingItems: Record<string, VisualTradingItem>, sourceItem: VisualTradingItem) => Record<string, VisualTradingItem>;
export declare const compareTradingItemIds: (o1: VisualTradingItem, o2: VisualTradingItem) => boolean;
export declare const mapPositionToVisualPosition: (position: Position, priceToY: PriceToYConverter, chart: Chart, prevVisualPosition?: VisualPosition) => VisualPosition;
export interface LineStyledOptionProps {
    readonly disabled?: boolean;
    readonly selected?: boolean;
    readonly pl?: number;
}
