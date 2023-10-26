import accounting from 'accounting';
import * as O from 'fp-ts/Option';
export function fromDateToDateInputValue(date) {
    return {
        day: O.some(date.getDate()),
        month: O.some(date.getMonth()),
        year: O.some(date.getFullYear()),
    };
}
export function fromDateToTimeInputValue(date) {
    return {
        hours: O.some(date.getHours()),
        minutes: O.some(date.getMinutes()),
        seconds: O.some(date.getSeconds()),
        periodType: O.none,
    };
}
export function fromTimeInputValueToDate(sourceDate, time) {
    const date = new Date(sourceDate);
    O.isSome(time.hours) && date.setHours(time.hours.value);
    O.isSome(time.minutes) && date.setMinutes(time.minutes.value);
    O.isSome(time.seconds) && date.setSeconds(time.seconds.value);
    return date;
}
export function fromDateInputValueToDate(sourceDate, inputDate) {
    const date = new Date(sourceDate);
    O.isSome(inputDate.day) && date.setDate(inputDate.day.value);
    O.isSome(inputDate.month) && date.setMonth(inputDate.month.value);
    O.isSome(inputDate.year) && date.setFullYear(inputDate.year.value);
    return date;
}
export function getPricePrecisionFormatter(precision) {
    return (value) => accounting.formatNumber(value, precision, '');
}
