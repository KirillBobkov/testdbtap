import React from 'react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { pipe } from 'fp-ts/function';
import { none } from 'fp-ts/Option';
import * as O from 'fp-ts/Option';
import { isAfter, isBefore, isDate, setYear, startOfDay } from 'date-fns';
import is_same_day from 'date-fns/isSameDay';
import { sequenceT } from 'fp-ts/Apply';
import { compareDates, getIsBetween } from './calendar.utils';
import { CalendarContainerStyled, CalendarContentStyled, CalendarHeaderStyled, CalendarStyled, MonthScrollableContent, } from './Calendar.styled';
import { RowStyled } from './components/Week.styled';
import { CalendarDayStyled } from './components/Day.styled';
import { CalendarBodyStyled } from './Calendar.styled';
import { SelectorContentStyled, SelectorMonthListStyled, SelectorMonthsStyled, SelectorSeparatorStyled, SelectorStyled, SelectorYearsStyled, } from './components/Selector.styled';
import add_years from 'date-fns/addYears';
import sub_years from 'date-fns/subYears';
import { Arrows } from './components/Arrows.component';
import set_month from 'date-fns/setMonth';
import { MonthButton } from './components/MonthButton.component';
import { YearSelectbox } from './components/YearSelectbox.component';
import { Months } from './components/Months.component';
import { Scrollable } from '../Scrollable/Scrollable';
import { RangeSide } from './Calendar.model';
import { option } from 'fp-ts';
export const Calendar = memo(props => {
    const { min = startOfDay(new Date(1970)), max = startOfDay(new Date()), calendarDict, onValueChange, rangeSide = RangeSide.From, singleMode = false, disabledDates = [], } = props;
    const [scrollableWrapper, setScrollableWrapper] = useState(none);
    const [scrollableContent, setScrollableContent] = useState(none);
    const [isFadeVisible, setIsFadeVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState({
        from: pipe(O.fromNullable(props.value.from), O.map(startOfDay), O.getOrElse(() => startOfDay(new Date()))),
        to: pipe(O.fromNullable(props.value.to), O.map(startOfDay), O.getOrElse(() => startOfDay(new Date()))),
    });
    useEffect(() => setSelectedDate({
        from: isDate(props.value.from) ? props.value.from : new Date(),
        to: isDate(props.value.to) ? props.value.to : new Date(),
    }), [props.value.from, props.value.to]);
    const getSelectedDate = useCallback(() => {
        switch (rangeSide) {
            case RangeSide.From:
                return selectedDate.from;
            case RangeSide.To:
                return selectedDate.to;
            default:
                return undefined;
        }
    }, [rangeSide, selectedDate.from, selectedDate.to]);
    const updateValue = useCallback((date) => {
        if (singleMode) {
            return {
                from: date,
                to: undefined,
            };
        }
        switch (rangeSide) {
            case RangeSide.From:
                return {
                    ...selectedDate,
                    from: date,
                };
            case RangeSide.To:
                return {
                    ...selectedDate,
                    to: date,
                };
            default: {
                return {
                    from: undefined,
                    to: undefined,
                };
            }
        }
    }, [rangeSide, selectedDate, singleMode]);
    const updateRange = useCallback((fn) => {
        const { from, to } = selectedDate;
        const updateValue = () => {
            switch (rangeSide) {
                case RangeSide.From:
                    return fn(from ?? new Date());
                case RangeSide.To:
                    return fn(to ?? new Date());
                default:
                    return new Date();
            }
        };
        const value = updateValue();
        if (compareDates(value, min, isBefore)) {
            return new Date(min);
        }
        if (compareDates(value, max, isAfter)) {
            return new Date(max);
        }
        return value;
    }, [max, min, rangeSide, selectedDate]);
    const handleYearValueChange = useCallback((year) => {
        if (typeof year === 'number') {
            const { min } = props;
            const newValue = updateRange(range => setYear(range, year));
            const updatedValue = pipe(O.fromNullable(min), O.chain(min => (isBefore(newValue, min) ? O.some(min) : O.none)), O.getOrElse(() => newValue));
            const value = updateValue(updatedValue);
            onValueChange(value);
        }
    }, [onValueChange, props, updateRange, updateValue]);
    const onWheel = useCallback((ev) => ev.stopPropagation(), []);
    const isDayDisabled = useCallback((day, forMonth) => {
        const dayMonthIndex = day.getMonth();
        const isHidden = dayMonthIndex !== forMonth;
        const isDayOff = disabledDates.find(disabledDay => is_same_day(disabledDay, day)) !== undefined;
        const from = pipe(O.fromNullable(selectedDate.from), O.getOrElse(() => min));
        const to = pipe(O.fromNullable(selectedDate.to), O.getOrElse(() => max));
        return (isHidden ||
            isDayOff ||
            !getIsBetween(day, min, max) ||
            (!singleMode && rangeSide === RangeSide.From && compareDates(day, to, isAfter)) ||
            (!singleMode && rangeSide === RangeSide.To && compareDates(day, from, isBefore)));
    }, [disabledDates, max, min, rangeSide, selectedDate.from, selectedDate.to, singleMode]);
    const handleChangeValue = useCallback((date) => {
        const value = updateValue(date);
        onValueChange && onValueChange(value);
    }, [onValueChange, updateValue]);
    const handleScroll = useCallback((_, scrollTop) => {
        const position = pipe(scrollableWrapper, O.map(el => el.clientHeight + scrollTop));
        const height = pipe(scrollableContent, O.map(el => el.clientHeight));
        const getProperties = (position) => (height) => ({
            position,
            height,
        });
        const properties = pipe(sequenceT(option.Applicative)(position, height), O.map(([position, height]) => getProperties(position)(height)));
        const isFadeVisible = pipe(properties, O.map(({ position, height }) => height > position), O.getOrElse(() => false));
        setIsFadeVisible(isFadeVisible);
    }, [scrollableContent, scrollableWrapper]);
    const months = useMemo(() => [
        calendarDict.months.january,
        calendarDict.months.february,
        calendarDict.months.march,
        calendarDict.months.april,
        calendarDict.months.may,
        calendarDict.months.june,
        calendarDict.months.july,
        calendarDict.months.august,
        calendarDict.months.september,
        calendarDict.months.october,
        calendarDict.months.november,
        calendarDict.months.december,
    ], [
        calendarDict.months.april,
        calendarDict.months.august,
        calendarDict.months.december,
        calendarDict.months.february,
        calendarDict.months.january,
        calendarDict.months.july,
        calendarDict.months.june,
        calendarDict.months.march,
        calendarDict.months.may,
        calendarDict.months.november,
        calendarDict.months.october,
        calendarDict.months.september,
    ]);
    const onNextYearClick = useCallback(() => {
        let newDate = updateRange(date => add_years(date, 1));
        if (newDate.getFullYear() >= 9999) {
            newDate = new Date();
        }
        const value = updateValue(newDate);
        onValueChange(value);
    }, [onValueChange, updateRange, updateValue]);
    const onPrevYearClick = useCallback(() => {
        let newDate = updateRange(date => sub_years(date, 1));
        if (newDate.getFullYear() <= 0) {
            newDate = new Date();
        }
        const value = updateValue(newDate);
        onValueChange(value);
    }, [onValueChange, updateRange, updateValue]);
    const getDate = useCallback(() => {
        const { from, to } = selectedDate;
        switch (rangeSide) {
            case RangeSide.From:
                return from ?? new Date();
            case RangeSide.To:
                return to ?? new Date();
            default:
                return new Date();
        }
    }, [rangeSide, selectedDate]);
    const onMonthSelect = useCallback((index) => {
        const newDate = updateRange(date => set_month(date, index));
        const value = updateValue(newDate);
        onValueChange(value);
    }, [onValueChange, updateRange, updateValue]);
    const handleSetScrollableWrapper = useCallback((el) => setScrollableWrapper(O.fromNullable(el)), []);
    const handleSetScrollableContent = useCallback((el) => setScrollableContent(O.fromNullable(el)), []);
    return (React.createElement(CalendarContainerStyled, { onMouseDown: props.onMouseDown },
        React.createElement(CalendarContentStyled, null,
            React.createElement(CalendarStyled, null,
                React.createElement(CalendarHeaderStyled, null,
                    React.createElement(RowStyled, null,
                        React.createElement(CalendarDayStyled, null, calendarDict.dayAbb.monday),
                        React.createElement(CalendarDayStyled, null, calendarDict.dayAbb.tuesday),
                        React.createElement(CalendarDayStyled, null, calendarDict.dayAbb.wednesday),
                        React.createElement(CalendarDayStyled, null, calendarDict.dayAbb.thursday),
                        React.createElement(CalendarDayStyled, null, calendarDict.dayAbb.friday),
                        React.createElement(CalendarDayStyled, null, calendarDict.dayAbb.saturday),
                        React.createElement(CalendarDayStyled, null, calendarDict.dayAbb.sunday))),
                React.createElement(CalendarBodyStyled, { isFadeVisible: isFadeVisible, onWheel: onWheel, ref: handleSetScrollableWrapper },
                    React.createElement(Scrollable, { onScroll: handleScroll },
                        React.createElement(MonthScrollableContent, { ref: handleSetScrollableContent },
                            React.createElement(Months, { selectedDate: selectedDate, months: months, date: getDate(), onDayChange: handleChangeValue, isDayDisabled: isDayDisabled, singleMode: singleMode, ...props }))))),
            React.createElement(SelectorStyled, null,
                React.createElement(SelectorYearsStyled, null,
                    React.createElement(SelectorContentStyled, null,
                        React.createElement(YearSelectbox, { selectedDate: selectedDate, date: getSelectedDate(), handleYearValueChange: handleYearValueChange, min: min, max: max, rangeSide: rangeSide, singleMode: singleMode, ...props }),
                        React.createElement(Arrows, { currentDate: getSelectedDate() ?? new Date(), selectedDate: selectedDate, onNextYearClick: onNextYearClick, onPrevYearClick: onPrevYearClick, min: min, max: max, rangeSide: rangeSide, singleMode: singleMode, ...props }))),
                React.createElement(SelectorMonthsStyled, null,
                    React.createElement(SelectorSeparatorStyled, null),
                    React.createElement(SelectorMonthListStyled, null, months.map((month, i) => (React.createElement(MonthButton, { selectedDate: selectedDate, key: month, i: i, date: getDate(), onMonthSelect: onMonthSelect, month: month, min: min, max: max, rangeSide: rangeSide, singleMode: singleMode, ...props })))))))));
});
