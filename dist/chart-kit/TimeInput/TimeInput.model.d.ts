import { Option } from 'fp-ts/Option';
export declare const PeriodTypeMap: {
    readonly AM: "AM";
    readonly PM: "PM";
};
export type PeriodType = (typeof PeriodTypeMap)[keyof typeof PeriodTypeMap];
export declare const Section: {
    readonly Hours: 0;
    readonly Minutes: 1;
    readonly Seconds: 2;
    readonly PeriodType: 3;
};
export type SectionType = (typeof Section)[keyof typeof Section];
export interface TimeInputValue {
    hours: Option<number>;
    minutes: Option<number>;
    seconds: Option<number>;
    periodType: Option<PeriodType>;
}
export declare const MAX_VALID_MINS_AND_SEC = 59;
export declare const MAX_VALID_HOURS_FOR_24H_FORMAT = 23;
export declare const MAX_VALID_HOURS_FOR_12H_FORMAT = 12;
export declare const EMPTY_SECTION = "--";
export declare const isTimesDifferent: (x: TimeInputValue, y: TimeInputValue) => boolean;
export declare const formatNumericValue: (value: number) => string;
export declare const formatTimePeriod: (periodType: PeriodType) => string;
/**
 * Values can be zeros (start from 0). Max is included value.
 */
export declare function add(a: Option<number>, b: number, max: number): Option<number>;
export declare function isDefined<A>(value?: A): value is A;
export declare function findActiveSectionOnKeyLeft(activeState?: number, isSecondsExist?: boolean): SectionType;
export declare function findActiveSectionOnKeyRight(activeSection?: number, isSecondsExist?: boolean, isClockFormatExist?: boolean): SectionType;
export declare function togglePeriodType(periodType: Option<PeriodType>): Option<PeriodType>;
export declare const renderSection: (time: Option<string>) => string;
