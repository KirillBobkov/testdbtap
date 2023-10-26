import { CandleAlignment, ChartDataOptions, PriceType } from '../../providers/chart-data-provider';
import { AggregationPeriod, AggregationPeriodDurationType } from '../model/aggregation.model';
type period = `${number}${AggregationPeriodDurationType}` | `${AggregationPeriodDurationType}`;
type SubKeySymbolType = `symbol=${string}`;
type SubKeyPeriodType = `|period=${period}`;
type SubKeyExtendedHoursType = `|extendedHours=${boolean}` | '';
type SubKeyAlignmentType = `|candleAlignment=${CandleAlignment}` | '';
type SubKeyPriceType = `|priceType=${PriceType}` | '';
/**
 * @name ChartDataSubscriptionKey
 * @description
 * Subscription key is used to identify the subscription.
 * @example
 * ```ts
 * const subscriptionKey = 'symbol=AAPL|period=1h|extendedHours=true|candleAlignment=s|priceType=mark';
 * ```
 */
export type ChartDataSubscriptionKey = `${SubKeySymbolType}${SubKeyPeriodType}${SubKeyExtendedHoursType}${SubKeyAlignmentType}${SubKeyPriceType}`;
/**
 * @name toChartDataSubscriptionKey
 * @see
 * undefined values are mapped to an empty strings ```''```
 */
export declare function toChartDataSubscriptionKey(symbol: string, aggregation: AggregationPeriod, options?: ChartDataOptions): ChartDataSubscriptionKey;
export declare const rejectAfterDelay: <T>(ms: number) => Promise<T>;
export {};
