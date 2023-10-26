import { TradingItemsGroup, VisualTradingItem } from '../../model/trading/trading-group.model';
/**
 * Creates groups from trading items.
 * Current algorithm requires the distance between items - for grouping predicate.
 * @param ordersAndPositions
 * @param orderHeight
 * @param marketPrice
 */
export declare function groupTradingItems(ordersAndPositions: Record<string, VisualTradingItem>, orderHeight: number, marketPrice: number): Record<string, TradingItemsGroup>;
