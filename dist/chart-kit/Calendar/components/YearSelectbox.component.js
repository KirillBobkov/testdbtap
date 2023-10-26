import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import * as O from 'fp-ts/Option';
import { getYear } from 'date-fns';
import { generateDates } from '../calendar.utils';
import { YearSelectboxAnchorStyled, YearSelectboxMenuStyled, YearMenuItemStyled } from './YearSelectbox.styled';
import { useDebounceToggle } from '../../hooks/use-debounce-toggle.hook';
import { Scrollable } from '../../Scrollable/Scrollable';
import { YearSelectboxStyled } from './YearSelectbox.styled';
import { pipe } from 'fp-ts/function';
import { RangeSide } from '../Calendar.model';
import { Popover } from '../../Popover/Popover.lazy-component';
export const YearSelectbox = memo(props => {
    const { rangeSide, min, max, date, selectedDate, handleYearValueChange, container } = props;
    const yearValue = pipe(O.fromNullable(date), O.map(getYear));
    const getRange = useCallback(() => {
        const from = O.fromNullable(selectedDate.from);
        const to = O.fromNullable(selectedDate.to);
        switch (rangeSide) {
            case RangeSide.From:
                return {
                    from: min,
                    to: pipe(to, O.getOrElse(() => max)),
                };
            case RangeSide.To:
                return {
                    from: pipe(from, O.getOrElse(() => min)),
                    to: max,
                };
            default: {
                return {
                    from: undefined, to: undefined
                };
            }
        }
    }, [max, min, rangeSide, selectedDate.from, selectedDate.to]);
    const range = getRange();
    const fromYear = pipe(O.fromNullable(range.from), O.map(getYear), O.getOrElse(() => 1970));
    const toYear = pipe(O.fromNullable(range.to), O.map(getYear), O.getOrElse(() => getYear(new Date())));
    const value = pipe(yearValue, O.map(yearValue => (yearValue > toYear ? toYear : yearValue)), O.getOrElse(() => getYear(new Date())));
    const renderMenu = forwardRef((props, ref) => (React.createElement(Scrollable, null,
        React.createElement(YearSelectboxMenuStyled, { ...props }, props.children))));
    const renderPopover = useMemo(() => {
        return (props) => React.createElement(Popover, { ...props, appendTo: container });
    }, []);
    const [isSelectboxOpen, toggleSelectboxOpen] = useDebounceToggle();
    return (React.createElement(YearSelectboxStyled, { Menu: renderMenu, isOpened: isSelectboxOpen, onToggle: toggleSelectboxOpen, Anchor: YearSelectboxAnchorStyled, value: value, hasIconWrapper: false, Popover: renderPopover, onValueChange: handleYearValueChange }, generateDates(fromYear, toYear).map(item => (React.createElement(YearItem, { key: item, item: item, date: date })))));
});
const YearItem = memo(props => {
    const { date, item, onSelect } = props;
    const yearValue = date && getYear(date);
    const isActive = item === yearValue;
    return (React.createElement(YearMenuItemStyled, { key: item, value: item, isActive: isActive, onSelect: onSelect },
        React.createElement("div", null, item)));
});
