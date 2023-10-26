import { memo, useCallback, useMemo } from 'react';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { sequenceT } from 'fp-ts/Apply';
import setMonth from 'date-fns/setMonth';
import * as React from 'react';
import { getIsBetween } from '../calendar.utils';
import { MonthButtonStyled } from './MonthButton.styled';
import { RangeSide } from '../Calendar.model';
export const MonthButton = memo(props => {
    const { singleMode, rangeSide, min, max, selectedDate, i, month, date, onMonthSelect } = props;
    const isDisabled = useMemo(() => {
        const from = O.fromNullable(selectedDate.from);
        const to = O.fromNullable(selectedDate.to);
        const range = pipe(sequenceT(O.Apply)(from, to), O.map(([from, to]) => buildDateRange(from)(to)));
        if (O.isNone(range) && O.isSome(from) && singleMode) {
            return !getIsBetween(setMonth(from.value, i), min, max);
        }
        return pipe(range, O.fold(() => false, range => {
            switch (rangeSide) {
                case RangeSide.From:
                    return !getIsBetween(setMonth(range.from, i), min, selectedDate.to);
                case RangeSide.To:
                    return !getIsBetween(setMonth(range.to, i), selectedDate.from, max);
                default: {
                    return false;
                }
            }
        }));
    }, [i, max, min, rangeSide, selectedDate.from, selectedDate.to, singleMode]);
    const isFlat = i === date.getMonth() && !isDisabled;
    const handleClick = useCallback(() => onMonthSelect(i), [i, onMonthSelect]);
    return (React.createElement(MonthButtonStyled, { key: month, onClick: handleClick, disabled: isDisabled, isFlat: isFlat }, month));
});
export const buildDateRange = (from) => (to) => ({ from, to });
