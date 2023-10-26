const periodsDictionary = {
    tick: 'tick',
    range: 'range',
    second: 'second',
    minute: 'minute',
    hour: 'hour',
    day: 'day',
    week: 'week',
    month: 'month',
    year: 'year',
    volume: 'volume',
    pluralPostfix: (count) => (count > 1 ? 's' : ''),
};
export const aggregationPeriodDictionary = {
    periods: periodsDictionary,
    custom: 'Custom...',
    customInputPlaceHolder: 'e.g. 7 min',
    a11y_aggregationPeriodDescription: 'Press Del to delete',
    a11y_deleteAggregationPeriod: 'Delete',
    validation_nonexistentCustomPeriod: 'Wrong timeframe',
};
