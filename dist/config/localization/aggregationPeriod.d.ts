interface PeriodsDictionary {
    tick: string;
    range: string;
    second: string;
    minute: string;
    hour: string;
    day: string;
    week: string;
    month: string;
    year: string;
    volume: string;
    pluralPostfix?: (count: number) => string;
}
export declare const aggregationPeriodDictionary: {
    periods: PeriodsDictionary;
    custom: string;
    customInputPlaceHolder: string;
    a11y_aggregationPeriodDescription: string;
    a11y_deleteAggregationPeriod: string;
    validation_nonexistentCustomPeriod: string;
};
export type AggregationPeriodDictionary = typeof aggregationPeriodDictionary;
export {};
