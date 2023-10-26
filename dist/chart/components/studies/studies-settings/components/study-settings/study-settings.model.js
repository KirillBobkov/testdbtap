export const studyParamAggregationTypeOptions = ['DEFAULT', 'DAY', 'WEEK', 'MONTH'];
export const studyParamAverageTypeOptions = ['SIMPLE', 'WILDERS', 'WEIGHTED', 'EXPONENTIAL'];
export const studyParamPriceTypeOptions = [
    'OPEN',
    'HIGH',
    'LOW',
    'CLOSE',
    'MEDIAN',
    'TYPICAL',
    'OHLC_AVERAGE',
    'VOLUME',
];
export const mapStudyParamTypeToOptions = (type) => {
    switch (type) {
        case 'AGGREGATION':
            return studyParamAggregationTypeOptions.map((value) => ({
                value,
                caption: value,
            }));
        case 'AVERAGE':
            return studyParamAverageTypeOptions.map((value) => ({
                value,
                caption: value,
            }));
        case 'PRICE_FIELD':
            return studyParamPriceTypeOptions.map((value) => ({
                value,
                caption: value,
            }));
        default:
            return [];
    }
};
export const selectableOptions = ['AGGREGATION', 'AVERAGE', 'PRICE_FIELD'].reduce((opts, type) => {
    opts[type] = mapStudyParamTypeToOptions(type);
    return opts;
}, {});
