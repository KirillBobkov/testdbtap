import { ord } from 'fp-ts';
import { sort } from 'fp-ts/Array';
export const isProtection = (item) => {
    // eslint-disable-next-line no-restricted-syntax
    return Boolean(item.originalItemId);
};
export const isPosition = (item) => {
    // eslint-disable-next-line no-restricted-syntax
    return Boolean(item.type === 'position');
};
/**
 * Sort the orders/positions by their price.
 */
const tradingItemsByPriceOrd = ord.fromCompare((a, b) => getTradingItemPrice(a) === getTradingItemPrice(b) ? 0 : getTradingItemPrice(a) > getTradingItemPrice(b) ? -1 : 1);
export const sortTradingItems = sort(tradingItemsByPriceOrd);
/**
 * Checks that order is created only on UI and was not send to server yet.
 * @param order
 */
export const checkOrderIsOnUIOnly = (id) => {
    return id.includes('uuid:');
};
/**
 * Filters invisible trading items out of array
 * @param tradingItems
 */
export function filterVisibleTradingItems(tradingItems) {
    return Object.values(tradingItems).filter(item => item.visible === true || item.visible === undefined);
}
/**
 * Get price functions.
 */
export const getOrderPrice = (order, marketPrice = 0) => {
    return getOrderPriceByType(order.orderType, order.limitPrice, order.stopPrice, marketPrice);
};
export const getOrderPriceByType = (orderType, limitPrice = 0, stopPrice = 0, marketPrice = 0) => {
    switch (orderType) {
        case 'limit':
            return limitPrice;
        case 'stop':
            return stopPrice;
        case 'market':
            return marketPrice;
    }
};
export const getTradingItemPrice = (item, marketPrice = 0) => {
    switch (item.type) {
        case 'order':
            return getOrderPrice(item.model, marketPrice);
        case 'position':
            return item.model.price || 0;
    }
};
const replaceZeroWithEmptyString = (n) => (n === 0 ? '' : n);
export const priceFormatter = (n) => {
    const thousandsNumber = Math.floor(n / 1000);
    const restNumber = n - thousandsNumber * 1000;
    let restString = `${restNumber.toFixed(2)}`;
    if (restNumber < 1 && thousandsNumber > 0) {
        restString = `00${restString}`;
    }
    return [replaceZeroWithEmptyString(thousandsNumber), restString].filter(s => s !== '').join(',');
};
