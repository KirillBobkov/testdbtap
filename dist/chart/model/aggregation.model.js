import { array, number, option, string } from 'fp-ts';
import { sequenceT } from 'fp-ts/Apply';
import { struct } from 'fp-ts/Eq';
import { getEq } from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
const periods = ['t', 'r', 's', 'm', 'h', 'd', 'w', 'mo', 'y', 'v'];
const PeriodOrder = {
    t: 0,
    s: 1,
    m: 2,
    h: 3,
    d: 4,
    w: 5,
    mo: 6,
    y: 7,
    r: 8,
    v: 9,
};
export const InitialAggregationPeriods = [
    { duration: 2, durationType: 't' },
    { duration: 144, durationType: 't' },
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
    { duration: 1, durationType: 'y' },
    { duration: 1, durationType: 'r' },
    // { duration: 1, durationType: 'm' },
    // { duration: 30, durationType: 'm' },
    // { duration: 1, durationType: 'h' },
    // { duration: 2, durationType: 'h' },
    // { duration: 12, durationType: 'h' },
    // { duration: 1, durationType: 'd' },
    // { duration: 1, durationType: 'w' },
    // { duration: 2, durationType: 'w' },
    // { duration: 1, durationType: 'mo' },
    // { duration: 3, durationType: 'mo' },
];
export const AGGREGATION_PERIOD_1_HOUR = { duration: 1, durationType: 'h' };
export const AGGREGATION_PERIOD_1_DAY = { duration: 1, durationType: 'd' };
export const AGGREGATION_PERIOD_30_MIN = { duration: 30, durationType: 'm' };
export const AGGREGATION_PERIOD_1_WEEK = { duration: 1, durationType: 'w' };
export const AGGREGATION_PERIOD_1_MONTH = { duration: 1, durationType: 'mo' };
function isAggregationPeriodDurationType(letters) {
    return periods.some(p => p === letters);
}
export const aggregationPeriodEq = struct({
    duration: number.Eq,
    durationType: string.Eq,
});
export const aggregationPeriodArrayEq = getEq(aggregationPeriodEq);
export const aggregationPeriodStringArrayEq = getEq(string.Eq);
export const durationInMinutes = (duration) => {
    switch (duration) {
        case 't':
        case 'r':
            return 1 / 60 / 1000;
        case 's':
            return 1 / 60;
        case 'm':
            return 1;
        case 'h':
            return 60;
        case 'd':
            return 1440;
        case 'w':
            return 10080;
        case 'mo':
            return 40320;
        case 'y':
            return 40320 * 12;
        default:
            return 1 / 60 / 1000;
    }
};
export const periodToMinutes = (period) => durationInMinutes(period.durationType) * period.duration;
export const periodToString = (chartPeriod) => `${chartPeriod.duration}${chartPeriod.durationType}`;
export const isExtendedHoursSupported = (chartPeriod) => {
    switch (chartPeriod.durationType) {
        case 's':
        case 'm':
        case 'h':
            return true;
        case 't':
        case 'r':
        case 'd':
        case 'w':
        case 'mo':
        case 'v':
        case 'y':
            return false;
    }
};
export const periodToStringWithSeparator = (chartPeriod) => `${chartPeriod.duration}-${chartPeriod.durationType}`;
export const stringToPeriod = (periodWithSeparator) => {
    const items = periodWithSeparator.split('-');
    return {
        duration: +items[0],
        // eslint-disable-next-line no-restricted-syntax
        durationType: items[1],
    };
};
export function aggregationPeriodToString(aggregationPeriod) {
    return `${aggregationPeriod.duration}${aggregationPeriod.durationType}`;
}
export function stringToAggregationPeriodSafe(period) {
    return pipe(sequenceT(option.Applicative)(parseDurationFromString(period), parseDurationTypeFromString(period)), option.map(([duration, durationType]) => {
        return {
            duration,
            durationType,
        };
    }));
}
function parseDurationFromString(period) {
    return pipe(option.fromNullable(period), option.chain(p => option.fromNullable(p.match(new RegExp('[0-9]+', 'g')))), option.chain(array.head), option.map(parseInt));
}
function parseDurationTypeFromString(period) {
    return pipe(option.fromNullable(period), option.chain(p => option.fromNullable(p.match(new RegExp('[a-zA-Z]+', 'g')))), option.chain(array.head), option.chain(letters => {
        if (isAggregationPeriodDurationType(letters)) {
            return option.some(letters);
        }
        return option.none;
    }));
}
export const toMultiplierFromPeriod = (chartPeriod) => {
    const minutes = periodToMinutes(chartPeriod);
    if (minutes <= 1) {
        return 7940;
    }
    else if (minutes < 5) {
        return 4550;
    }
    else if (minutes < 15) {
        return 3880;
    }
    else if (minutes < 30) {
        return 3675;
    }
    else if (minutes < 240) {
        return 2080;
    }
    else if (minutes < 1440) {
        //day
        return 540;
    }
    else if (minutes < 10080) {
        // week
        return 260;
    }
    else {
        return 18;
    }
};
export const comparePeriods = (periodA, periodB) => periodA.duration === periodB.duration && periodA.durationType === periodB.durationType;
export const insertPeriodInOrder = (period, periodList) => {
    const list = [...periodList];
    list.push(period);
    list.sort((a, b) => a.duration - b.duration);
    list.sort((a, b) => PeriodOrder[a.durationType] - PeriodOrder[b.durationType]);
    return list;
};
export const removePeriodFromList = (period, periodList) => {
    const index = periodList.findIndex(currentPeriod => comparePeriods(period, currentPeriod));
    periodList.splice(index, 1);
    return [...periodList];
};
export const getReadableString = (period, localization) => {
    const periodToDuration = {
        t: localization.periods.tick,
        r: localization.periods.range,
        s: localization.periods.second,
        m: localization.periods.minute,
        h: localization.periods.hour,
        d: localization.periods.day,
        w: localization.periods.week,
        mo: localization.periods.month,
        y: localization.periods.year,
        v: localization.periods.volume,
    };
    const pluralPostfix = localization.periods.pluralPostfix ? localization.periods.pluralPostfix : () => '';
    return `${period.duration} ${periodToDuration[period.durationType]}${pluralPostfix(period.duration)}`;
};
