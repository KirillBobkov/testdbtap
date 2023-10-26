import { getEq, some, map, alt, getOrElse } from 'fp-ts/Option';
import { struct, eqStrict } from 'fp-ts/Eq';
import { pipe } from 'fp-ts/function';
import { number } from 'fp-ts';
export const PeriodTypeMap = {
    AM: 'AM',
    PM: 'PM',
};
export const Section = {
    Hours: 0,
    Minutes: 1,
    Seconds: 2,
    PeriodType: 3,
};
export const MAX_VALID_MINS_AND_SEC = 59;
export const MAX_VALID_HOURS_FOR_24H_FORMAT = 23;
export const MAX_VALID_HOURS_FOR_12H_FORMAT = 12;
export const EMPTY_SECTION = '--';
const eqPeriodType = eqStrict;
const eqOptionNumber = getEq(number.Eq);
const eqOptionPeriodType = getEq(eqPeriodType);
const eqTimeInputValue = struct({
    hours: eqOptionNumber,
    minutes: eqOptionNumber,
    seconds: eqOptionNumber,
    periodType: eqOptionPeriodType,
});
export const isTimesDifferent = (x, y) => {
    return !eqTimeInputValue.equals(x, y);
};
export const formatNumericValue = (value) => {
    if (value < 10) {
        return `0${value}`;
    }
    return `${value}`;
};
export const formatTimePeriod = (periodType) => {
    switch (periodType) {
        case PeriodTypeMap.AM:
            return 'am';
        case PeriodTypeMap.PM:
            return 'pm';
    }
};
/**
 * Values can be zeros (start from 0). Max is included value.
 */
export function add(a, b, max) {
    return pipe(a, map(a => {
        const rawResult = (a + b) % (max + 1);
        return rawResult < 0 ? rawResult + max + 1 : rawResult;
    }), alt(() => some(b < 0 ? max : 0)));
}
export function isDefined(value) {
    return typeof value !== 'undefined';
}
export function findActiveSectionOnKeyLeft(activeState, isSecondsExist) {
    switch (activeState) {
        case Section.PeriodType: {
            return isSecondsExist ? Section.Seconds : Section.Minutes;
        }
        case Section.Seconds: {
            return Section.Minutes;
        }
        case Section.Minutes: {
            return Section.Hours;
        }
        default:
            return Section.Hours;
    }
}
export function findActiveSectionOnKeyRight(activeSection, isSecondsExist, isClockFormatExist) {
    switch (activeSection) {
        case Section.Hours: {
            return Section.Minutes;
        }
        case Section.Minutes: {
            if (isSecondsExist) {
                return Section.Seconds;
            }
            else if (isClockFormatExist) {
                return Section.PeriodType;
            }
            else {
                return Section.Minutes;
            }
        }
        case Section.Seconds: {
            return isClockFormatExist ? Section.PeriodType : Section.Seconds;
        }
        case Section.PeriodType: {
            return Section.PeriodType;
        }
        default:
            return Section.Hours;
    }
}
export function togglePeriodType(periodType) {
    const periodTypeNormalized = getOrElse(() => 'AM')(periodType);
    switch (periodTypeNormalized) {
        case 'AM':
            return some('PM');
        case 'PM':
            return some('AM');
        default:
    }
    return some('AM');
}
export const renderSection = getOrElse(() => EMPTY_SECTION);
