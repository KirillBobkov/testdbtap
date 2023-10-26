import { Option } from 'fp-ts/Option';
import { AggregationPeriodDictionary } from '../../config/localization/aggregationPeriod';
declare const periods: readonly ["t", "r", "s", "m", "h", "d", "w", "mo", "y", "v"];
export type AggregationPeriodDurationType = (typeof periods)[number];
/**
 * Aggregation period main model.
 * @doc-tags model
 */
export interface AggregationPeriod {
    duration: number;
    durationType: AggregationPeriodDurationType;
}
export declare const InitialAggregationPeriods: AggregationPeriod[];
export declare const AGGREGATION_PERIOD_1_HOUR: AggregationPeriod;
export declare const AGGREGATION_PERIOD_1_DAY: AggregationPeriod;
export declare const AGGREGATION_PERIOD_30_MIN: AggregationPeriod;
export declare const AGGREGATION_PERIOD_1_WEEK: AggregationPeriod;
export declare const AGGREGATION_PERIOD_1_MONTH: AggregationPeriod;
export declare const aggregationPeriodEq: import("fp-ts/Eq").Eq<{
    readonly duration: number;
    readonly durationType: AggregationPeriodDurationType;
}>;
export declare const aggregationPeriodArrayEq: import("fp-ts/Eq").Eq<AggregationPeriod[]>;
export declare const aggregationPeriodStringArrayEq: import("fp-ts/Eq").Eq<string[]>;
export declare const durationInMinutes: (duration: AggregationPeriodDurationType) => number;
export declare const periodToMinutes: (period: AggregationPeriod) => number;
export declare const periodToString: (chartPeriod: AggregationPeriod) => `${number}${AggregationPeriodDurationType}` | `${AggregationPeriodDurationType}`;
export declare const isExtendedHoursSupported: (chartPeriod: AggregationPeriod) => boolean;
export declare const periodToStringWithSeparator: (chartPeriod: AggregationPeriod) => string;
export declare const stringToPeriod: (periodWithSeparator: string) => AggregationPeriod;
export declare function aggregationPeriodToString(aggregationPeriod: AggregationPeriod): string;
export declare function stringToAggregationPeriodSafe(period: string): Option<AggregationPeriod>;
export declare const toMultiplierFromPeriod: (chartPeriod: AggregationPeriod) => number;
export declare const comparePeriods: (periodA: AggregationPeriod, periodB: AggregationPeriod) => boolean;
export declare const insertPeriodInOrder: (period: AggregationPeriod, periodList: AggregationPeriod[]) => AggregationPeriod[];
export declare const removePeriodFromList: (period: AggregationPeriod, periodList: AggregationPeriod[]) => AggregationPeriod[];
export declare const getReadableString: (period: AggregationPeriod, localization: AggregationPeriodDictionary) => string;
export {};
