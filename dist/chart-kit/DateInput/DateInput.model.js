import { getEq, some, map, alt, fold, ap } from 'fp-ts/Option';
import { struct } from 'fp-ts/Eq';
import { pipe, constant } from 'fp-ts/function';
import { number } from 'fp-ts';
const eqOptionNumber = getEq(number.Eq);
const eqDateInputValue = struct({
    day: eqOptionNumber,
    month: eqOptionNumber,
    year: eqOptionNumber,
});
export const isDatesDifferent = (x, y) => !eqDateInputValue.equals(x, y);
export const buildDate = (day) => (month) => (year) => new Date(year, month, day);
export const buildDateOption = (day) => (month) => (year) => pipe(day, map(buildDate), ap(month), ap(year));
export const ActiveSection = {
    Day: 0,
    Month: 1,
    Year: 2,
};
export const toObjectDate = (date) => ({
    day: some(date.getDate()),
    month: some(date.getMonth()),
    year: some(date.getFullYear()),
});
export function format(date, section) {
    return pipe(date, fold(() => {
        switch (section) {
            case ActiveSection.Day: {
                return 'dd';
            }
            case ActiveSection.Month: {
                return 'mm';
            }
            case ActiveSection.Year: {
                return 'yyyy';
            }
            default: {
                return 'dd';
            }
        }
    }, value => {
        switch (section) {
            //maybe we should use left-pad here? ;)
            case ActiveSection.Day: //fallthrough
            case ActiveSection.Month: {
                //day and month are 2 digits
                return `${value >= 0 && value < 10 ? 0 : ''}${value}`;
            }
            case ActiveSection.Year: {
                if (value < 10) {
                    return `000${value}`;
                }
                else if (value < 100) {
                    return `00${value}`;
                }
                else if (value < 1000) {
                    return `0${value}`;
                }
                else {
                    return `${value}`;
                }
            }
            default: {
                return `${value}`;
            }
        }
    }));
}
export function decrementMonth(month) {
    if (month >= 0 && month <= 11) {
        return (month - 1 + 12) % 12;
    }
    return 11;
}
export function decrementMonthOption(month) {
    return pipe(month, map(decrementMonth), alt(constant(some(11))));
}
export function incrementMonth(month) {
    if (month >= 0 && month <= 11) {
        return (month + 1) % 12;
    }
    return 0;
}
export function incrementMonthOption(month) {
    return pipe(month, map(incrementMonth), alt(constant(some(0))));
}
export const inc = (value) => value + 1;
export function checkParentsUpTo(node, checkNode, upToNode) {
    if (!node || !checkNode || !upToNode) {
        return false;
    }
    else if (node === upToNode) {
        return false;
    }
    else if (node === checkNode) {
        return true;
    }
    else {
        return checkParentsUpTo(node.parentElement, checkNode, upToNode);
    }
}
