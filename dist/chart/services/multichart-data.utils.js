import { periodToString } from '../model/aggregation.model';
/**
 * @name toChartDataSubscriptionKey
 * @see
 * undefined values are mapped to an empty strings ```''```
 */
export function toChartDataSubscriptionKey(symbol, aggregation, options) {
    const period = periodToString(aggregation);
    const extendedHours = options?.extendedHours !== undefined ? `|extendedHours=${options.extendedHours}` : '';
    const priceType = options?.priceType ? `|priceType=${options.priceType}` : '';
    const candlesAlignment = options?.candleAlignment ? `|candleAlignment=${options.candleAlignment}` : '';
    return `symbol=${symbol}|period=${period}${extendedHours}${candlesAlignment}${priceType}`;
}
export const rejectAfterDelay = (ms) => new Promise((_, reject) => setTimeout(reject, ms, new Error('timeout')));
