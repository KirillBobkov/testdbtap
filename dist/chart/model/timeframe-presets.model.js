import { aggregationPeriodToString, stringToAggregationPeriodSafe, } from './aggregation.model';
import { option, array, eq, number, string } from 'fp-ts';
import { sequenceT } from 'fp-ts/Apply';
import { pipe } from 'fp-ts/function';
const timeFrameLabelTypes = ['H', 'D', 'W', 'M', 'Y'];
export const hour = 60 * 60;
export const day = 24 * hour;
export const week = 7 * day;
export const month = day * 30;
export const year = 365 * day;
export const MAX_PRESETS_NUMBER = 15;
export const getValueInDays = (preset) => preset.timeframe.value / 60 / 60 / 24;
export const DEFAULT_TIMEFRAME_PRESETS = {
    presets: [
        {
            timeframe: { label: '1D', value: day },
            aggregation: {
                duration: 1,
                durationType: 'm',
            },
        },
        {
            timeframe: { label: '1W', value: week },
            aggregation: {
                duration: 5,
                durationType: 'm',
            },
        },
        {
            timeframe: { label: '1M', value: month },
            aggregation: {
                duration: 30,
                durationType: 'm',
            },
        },
        {
            timeframe: { label: '1Y', value: year },
            aggregation: {
                duration: 1,
                durationType: 'd',
            },
        },
        {
            timeframe: { label: 'All', value: 50 * year },
            aggregation: {
                duration: 1,
                durationType: 'mo',
            },
        },
    ],
};
export const filterAllPreset = (preset) => {
    return isFinite(preset.timeframe.value);
};
export const getReadableTimeframeString = (timeframeLabel) => {
    const numberValue = parseInt(timeframeLabel, 10);
    const stringValue = timeframeLabel.split(numberValue + '')[1];
    const isPlural = numberValue > 1;
    const stringValues = {
        H: isPlural ? 'hours' : 'hour',
        D: isPlural ? 'days' : 'day',
        W: isPlural ? 'weeks' : 'week',
        M: isPlural ? 'months' : 'month',
        Y: isPlural ? 'years' : 'year',
    };
    return numberValue + ' ' + stringValues[stringValue];
};
const timeframePeriodsDict = {
    D: day,
    H: hour,
    W: week,
    M: month,
    Y: year,
};
export const timeframePeriods = [
    { duration: 5, durationType: 's' },
    { duration: 1, durationType: 'm' },
    { duration: 5, durationType: 'm' },
    { duration: 15, durationType: 'm' },
    { duration: 30, durationType: 'm' },
    { duration: 1, durationType: 'h' },
    { duration: 2, durationType: 'h' },
    { duration: 4, durationType: 'h' },
    { duration: 1, durationType: 'd' },
    { duration: 1, durationType: 'w' },
    { duration: 1, durationType: 'mo' },
];
const secondsTimeframes = [
    { label: '1H', value: hour },
    { label: '12H', value: hour * 12 },
    { label: '1D', value: hour * 24 },
];
const minuteTimeframes = [
    { label: '1D', value: day },
    { label: '2D', value: day * 2 },
    { label: '3D', value: day * 3 },
    { label: '4D', value: day * 4 },
    { label: '5D', value: day * 5 },
    { label: '6D', value: day * 6 },
    { label: '7D', value: day * 7 },
    { label: '8D', value: day * 8 },
    { label: '9D', value: day * 9 },
    { label: '10D', value: day * 10 },
];
const minutesTimeframes = [
    ...minuteTimeframes,
    { label: '20D', value: day * 20 },
    { label: '25D', value: day * 25 },
    { label: '30D', value: day * 30 },
    { label: '60D', value: day * 60 },
    { label: '90D', value: day * 90 },
];
const hoursTimeframes = [
    ...minutesTimeframes,
    { label: '180D', value: day * 180 },
    { label: '285D', value: day * 285 },
];
const dayTimeframes = [
    { label: '1M', value: month },
    { label: '3M', value: month * 3 },
    { label: '6M', value: month * 6 },
    { label: '9M', value: month * 9 },
    { label: '1Y', value: year },
    { label: '2Y', value: year * 2 },
    { label: '3Y', value: year * 3 },
    { label: '4Y', value: year * 4 },
    { label: '5Y', value: year * 5 },
    { label: '6Y', value: year * 6 },
    { label: '7Y', value: year * 7 },
    { label: '8Y', value: year * 8 },
    { label: '9Y', value: year * 9 },
    { label: '10Y', value: year * 10 },
    { label: '15Y', value: year * 15 },
    { label: '20Y', value: year * 20 },
    { label: '25Y', value: year * 25 },
];
const weekTimeframes = [...dayTimeframes.slice(1), { label: '30Y', value: year * 30 }];
const monthTimeframes = [...weekTimeframes.slice(3)];
// see second requirement here https://jira.in.devexperts.com/browse/DXCF-3368
export const SpecialPresets = [
    {
        timeframe: { label: '1D', value: 24 * 60 * 60 },
        aggregation: {
            duration: 1,
            durationType: 'm',
        },
    },
    {
        timeframe: { label: '5D', value: 5 * 24 * 60 * 60 },
        aggregation: {
            duration: 5,
            durationType: 'm',
        },
    },
    {
        timeframe: { label: '10D', value: 10 * 24 * 60 * 60 },
        aggregation: {
            duration: 30,
            durationType: 'm',
        },
    },
    {
        timeframe: { label: '20D', value: 20 * 24 * 60 * 60 },
        aggregation: {
            duration: 1,
            durationType: 'h',
        },
    },
    {
        timeframe: { label: '30D', value: 30 * 24 * 60 * 60 },
        aggregation: {
            duration: 2,
            durationType: 'h',
        },
    },
    {
        timeframe: { label: '60D', value: 60 * 24 * 60 * 60 },
        aggregation: {
            duration: 4,
            durationType: 'h',
        },
    },
    {
        timeframe: { label: '1Y', value: 12 * 30 * 24 * 60 * 60 },
        aggregation: {
            duration: 1,
            durationType: 'd',
        },
    },
    {
        timeframe: { label: '5Y', value: 5 * 12 * 30 * 24 * 60 * 60 },
        aggregation: {
            duration: 1,
            durationType: 'w',
        },
    },
    {
        timeframe: { label: '15Y', value: 15 * 12 * 30 * 24 * 60 * 60 },
        aggregation: {
            duration: 1,
            durationType: 'mo',
        },
    },
];
export const getTimeframeBasedOnPeriod = (period) => {
    switch (period.durationType) {
        case 's':
            return secondsTimeframes;
        case 'm':
            return period.duration === 1 ? minuteTimeframes : minutesTimeframes;
        case 'h':
            return hoursTimeframes;
        case 'd':
            return dayTimeframes;
        case 'w':
            return weekTimeframes;
        case 'mo':
            return monthTimeframes;
    }
    return secondsTimeframes;
};
export const serializeTimeframePreset = (timeframePreset) => {
    return `${timeframePreset.timeframe.label}-${aggregationPeriodToString(timeframePreset.aggregation)}`;
};
export const timeframePresetEq = eq.struct({
    timeframe: eq.struct({
        // label is omitted intentionally, since custom presets can have different labels from the default ones
        value: number.Eq,
    }),
    aggregation: eq.struct({
        duration: number.Eq,
        durationType: string.Eq,
    }),
});
export const timeframePresetArrayEq = array.getEq(timeframePresetEq);
const durationTypeToStr = {
    d: 'D',
    mo: 'M',
    w: 'W',
    m: 'm',
    h: 'h',
    t: 't',
    s: 's',
    y: 'y',
    r: 'r',
    v: 'v',
};
const periodToStr = (aggregation) => `${aggregation.duration}${durationTypeToStr[aggregation.durationType]}`;
export const applyLabelFormatting = (timeframe, aggregation) => {
    const predefinedPreset = DEFAULT_TIMEFRAME_PRESETS.presets
        .concat(SpecialPresets)
        .find(p => timeframePresetEq.equals({ timeframe, aggregation }, p));
    if (predefinedPreset) {
        return predefinedPreset;
    }
    else {
        return { aggregation, timeframe: { ...timeframe, label: `${timeframe.label}${periodToStr(aggregation)}` } };
    }
};
/**
 * Parse full tiemframe preset from serialized timeframe
 * Parses the timeframe and aggregation period in parts
 * if parsing any part will return none the function will also return none
 * 10D-1s => Option<{timeframe: {label,value}, aggregation: {duration, durationType}}>
 * @param timeframeSerialized {string}
 * @doc-tags chart-react,fp,timeframe-presets
 */
export const parseTimeframePresetFromString = (serializedTimeframePreset) => {
    const splittedTimeframePreset = serializedTimeframePreset.split('-');
    const timeframe = stringToTimeframeSafe(splittedTimeframePreset[0]);
    const aggregation = stringToAggregationPeriodSafe(splittedTimeframePreset[1]);
    return pipe(sequenceT(option.Applicative)(timeframe, aggregation), option.map(([timeframe, aggregation]) => applyLabelFormatting(timeframe, aggregation)));
};
function isTimeFrameLabelType(letters) {
    return timeFrameLabelTypes.some(p => p === letters);
}
/**
 * Parse tiemframe from serialized timeframe 10D => Option<{label,value}>
 * returned value - none if error occurs while parsing
 * @param timeframeSerialized {string}
 * @doc-tags chart-react,fp,timeframe-presets
 */
function stringToTimeframeSafe(timeframeSerialized) {
    if (timeframeSerialized === 'All') {
        return option.some({
            label: timeframeSerialized,
            value: 50 * year,
        });
    }
    return pipe(sequenceT(option.Applicative)(parseValueFromString(timeframeSerialized), parseLabelFromString(timeframeSerialized)), option.map(([numberOfPeriod, letterOfPeriod]) => {
        return {
            label: `${numberOfPeriod}${letterOfPeriod}`,
            value: numberOfPeriod * timeframePeriodsDict[letterOfPeriod],
        };
    }));
}
/**
 * Get the numbered part of serialized timeframe 10D => Option<10>
 * returned value - none if error occurs while parsing
 * @param timeframeSerialized {string | null}
 * @doc-tags chart-react,fp
 */
const numbersRegExp = new RegExp('[0-9]+', 'g');
function parseValueFromString(timeframeSerialized) {
    return pipe(option.fromNullable(timeframeSerialized), option.chain(p => option.fromNullable(p.match(numbersRegExp))), option.chain(array.head), option.map(parseInt));
}
/**
 * Get the numbered part of serialized timeframe
 * returned value - none if error occurs while parsing
 * 10D => Option<D>, 1M => Option<M>
 * @param timeframeSerialized {string | null}
 * @doc-tags chart-react,fp
 */
const letterRegExp = new RegExp('[a-zA-Z]+', 'g');
function parseLabelFromString(timeframeSerialized) {
    return pipe(option.fromNullable(timeframeSerialized), option.chain(p => option.fromNullable(p.match(letterRegExp))), option.chain(array.head), option.filter(isTimeFrameLabelType));
}
