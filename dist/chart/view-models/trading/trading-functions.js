import { generateRandomId } from '../../../utils/id-generator.utils';
import { identity, pipe } from 'fp-ts/function';
import { array, record } from 'fp-ts';
import { checkOrderIsOnUIOnly, getOrderPrice, getTradingItemPrice, isProtection, } from '../../model/trading/trading.model';
import { sumDecimalNumbers } from '../../components/trading/order-entry/order-entry-input.component';
export const getItemById = (id) => (items) => pipe(items, record.lookup(id));
export const findOrderById = (id) => (orders) => pipe(orders, array.findFirst(o => o.model.id === id));
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
export const createProtectionOrderFromOriginalItem = (originalItem, type, yConverter = identity, priceConverter = identity, chart) => {
    const price = getTradingItemPrice(originalItem);
    const newProtectionOrderModel = {
        id: generateRandomId(),
        orderType: 'limit',
        quantity: originalItem.model.quantity,
        side: type === 'sl' ? 'sell' : 'buy',
        limitPrice: priceConverter(price),
        originalItemId: originalItem.model.id,
        type,
    };
    return {
        disabled: false,
        selected: true,
        type: 'order',
        model: newProtectionOrderModel,
        y: yConverter(originalItem.y || 0),
        formatter: chart.chartModel.pane.regularFormatter,
    };
};
/**
 * Removes a protection order's id from original item
 * (Original item could be order or position)
 * @param originalItem
 * @param type
 *
 * @doc-tags trading
 */
export const unLinkOrderFromOriginalOrder = (originalItem, type) => {
    if (!isProtection(originalItem.model)) {
        if (originalItem.model.protectionOrderIds) {
            originalItem.model.protectionOrderIds[type === 'sl' ? 0 : 1] = undefined;
            if (originalItem.model.protectionOrderIds.every(id => id === undefined)) {
                delete originalItem.model.protectionOrderIds;
            }
            return;
        }
        delete originalItem.model.protectionOrderIds;
    }
};
/**
 * Add a protection order's id to original item
 * (Original item could be order or position)
 * @param originalItem
 * @param protectionOrderId
 * @param type
 *
 * @doc-tags trading
 */
export const linkProtectionOrderToOriginalItem = (originalItem, protectionOrderId, type) => {
    if (!isProtection(originalItem.model)) {
        if (originalItem.model.protectionOrderIds) {
            originalItem.model.protectionOrderIds[type === 'sl' ? 0 : 1] = protectionOrderId;
            return;
        }
        const ids = type === 'sl' ? [protectionOrderId, undefined] : [undefined, protectionOrderId];
        originalItem.model.protectionOrderIds = ids;
    }
};
export function tradingItemVisibilityInHighLow(price, highLow) {
    return price <= highLow.high && price >= highLow.low;
}
export const tradingItemVisibilityInBounds = (chartBounds, offset, y) => y >= chartBounds.y + offset && y <= chartBounds.y + chartBounds.height - offset;
export const mapOrderToVisualOrder = (order, chart, marketPrice, bounds) => {
    const orderPrice = getOrderPrice(order, marketPrice);
    const y = chart.chartModel.toY(orderPrice);
    const price = chart.chartModel.mainCandleSeries.view.toAxisUnits(orderPrice);
    return {
        type: 'order',
        model: {
            ...order,
        },
        y,
        selected: false,
        disabled: false,
        marketPrice,
        visible: tradingItemVisibilityInHighLow(price, bounds),
        formatter: chart.chartModel.pane.regularFormatter,
    };
};
/**
 * Finds all related items.
 * @param order
 */
export const findAllRelatedItems = (tradingItems, sourceItem) => {
    // if source item is protection (sl or tp), find original item, and find second linked protection if it is exist
    if (isProtection(sourceItem.model)) {
        const relatedItems = {};
        const originalItem = tradingItems[sourceItem.model.originalItemId];
        if (originalItem && !isProtection(originalItem.model)) {
            relatedItems[originalItem.model.id] = originalItem;
            const protectionOrderId = originalItem.model.protectionOrderIds?.find(id => Boolean(id) && id !== sourceItem.model.id);
            if (protectionOrderId && tradingItems[protectionOrderId]) {
                relatedItems[tradingItems[protectionOrderId].model.id] = tradingItems[protectionOrderId];
            }
        }
        return relatedItems;
    }
    // if source item is original, find two protection orders if they are exist
    if (sourceItem.model.protectionOrderIds) {
        return sourceItem.model.protectionOrderIds.reduce((relatedItems, id) => {
            const protectionOrder = tradingItems[id || ''];
            if (protectionOrder) {
                relatedItems[protectionOrder.model.id] = protectionOrder;
            }
            return relatedItems;
        }, {});
    }
    return {};
};
export const compareTradingItemIds = (o1, o2) => {
    return o1.model.id === o2.model.id;
};
export const mapPositionToVisualPosition = (position, priceToY, chart, prevVisualPosition) => {
    const price = position.price;
    const restVisualPosition = prevVisualPosition || {
        selected: false,
        disabled: false,
    };
    const positionFormatter = (n, currency) => {
        const positive = n > 0;
        const pl = Math.abs(n);
        // we need format pl as price to show correct precisions
        const formattedPl = sumDecimalNumbers(Number(chart.chartModel.pane.regularFormatter(pl + price)), -Number(chart.chartModel.pane.regularFormatter(price)));
        return `${positive ? '+' : '−'}${formattedPl} ${currency}`;
    };
    // we need to adjust ids array, while creating protection order, because it could be overritten by next candle tick
    // @ts-ignore
    const ids = prevVisualPosition &&
        prevVisualPosition.model.protectionOrderIds?.map((id, i) => {
            if (id && checkOrderIsOnUIOnly(id)) {
                return id;
            }
            return position.protectionOrderIds?.[i];
        });
    const model = ids ? { protectionOrderIds: ids } : {};
    return {
        ...restVisualPosition,
        formatter: positionFormatter,
        y: priceToY(price),
        type: 'position',
        model: {
            ...position,
            ...model,
        },
    };
};
