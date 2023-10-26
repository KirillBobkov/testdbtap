import * as O from 'fp-ts/Option';
import { isAfter, isBefore, isSameDay } from 'date-fns';
import { pipe } from 'fp-ts/function';
import { addYears, subYears } from 'date-fns';
export const generateDates = (min, max) => {
    const arr = [];
    for (let i = max; i >= min; i--) {
        arr.push(i);
    }
    return arr;
};
export const checkDates = (left, right, predicate) => {
    if (right && predicate(left, right)) {
        return right;
    }
    return left;
};
export const compareDates = (first, second, predicate) => {
    const firstDate = O.fromNullable(first);
    const secondDate = O.fromNullable(second);
    return O.isSome(firstDate) && O.isSome(secondDate) && predicate(firstDate.value, secondDate.value);
};
export const getIsBetween = (day, left, right) => (compareDates(day, left, isAfter) || compareDates(day, left, isSameDay)) &&
    (compareDates(day, right, isBefore) || compareDates(day, right, isSameDay));
export const _subYears = (date, amount) => subYears(pipe(O.fromNullable(date), O.getOrElse(() => new Date())), amount);
export const _addYears = (date, amount) => addYears(pipe(O.fromNullable(date), O.getOrElse(() => new Date())), amount);
