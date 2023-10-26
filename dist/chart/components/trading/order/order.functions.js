import { isProtection } from '../../../model/trading/trading.model';
export const getRegularOrderName = (type) => {
    switch (type) {
        case 'limit':
            return 'LMT';
        case 'market':
            return 'MKT';
        case 'stop':
            return 'STP';
    }
};
export const getProtectionOrderName = (type) => (type === 'sl' ? 'Stop Loss' : 'Take Profit');
export const getOrderName = (order) => isProtection(order) ? getProtectionOrderName(order.type) : getRegularOrderName(order.orderType);
// yes, it is hack
export const skipSelectOrder = (e, value) => {
    if (e.target) {
        // @ts-ignore
        e.target['skipSelect'] = value;
    }
};
export const isSelectSkippable = (e) => {
    if (e.target) {
        // @ts-ignore
        return e.target['skipSelect'];
    }
    return false;
};
export const renderSLTPShortcutSection = (isSLLinked, isTPLinked) => {
    const orders = [];
    isTPLinked && orders.push('TP');
    isSLLinked && orders.push('SL');
    return `+ ${orders.join(', ')}`;
};
