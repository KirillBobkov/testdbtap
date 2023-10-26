import React, { memo, useCallback, useContext, useMemo, useRef, useState } from 'react';
import * as O from 'fp-ts/Option';
import { startOfDay } from 'date-fns';
import { sequenceT } from 'fp-ts/Apply';
import { Calendar } from '../Calendar/Calendar.component';
import { IconsOverridingContext } from '../../utils/icons-overriding-context';
import { DateInputButtonIcon, DateInputContainerStyled, DateInputStyled } from './DateInput.styled';
import { DateInputKit } from './DateInputKit.component';
import { IconWrapper } from '../IconWrapper/IconWrapper.component';
import { pipe } from 'fp-ts/function';
import { Popover } from '../Popover/Popover.lazy-component';
export const DateInput = memo(({ min, max, onValueChange, value, calendarDict, parentEventTarget, dateFormatType }) => {
    const dateInput = useRef(null);
    const [isCalendarOpenedState, setCalendarOpened] = useState(false);
    const getInputRef = useCallback((input) => {
        dateInput.current = input;
    }, []);
    const switchCalendar = useCallback((isCalendarOpened) => {
        setCalendarOpened(isCalendarOpened);
    }, [setCalendarOpened]);
    const onCalendarValueChange = useCallback((inputValue) => {
        if (inputValue.from) {
            onValueChange({
                day: O.some(inputValue.from.getDate()),
                month: O.some(inputValue.from.getMonth()),
                year: O.some(inputValue.from.getFullYear()),
            });
        }
        else {
            onValueChange({ day: O.none, month: O.none, year: O.none });
        }
    }, [onValueChange]);
    const onRequestClose = useCallback((e) => {
        if (isCalendarOpenedState) {
            e && e.stopPropagation();
            switchCalendar(false);
        }
    }, [switchCalendar, isCalendarOpenedState]);
    const calendarValue = useMemo(() => pipe(sequenceT(O.Apply)(value.day, value.month, value.year), O.map(([day, month, year]) => startOfDay(new Date(`${month + 1}/${day}/${year}`)))), [value]);
    const iconsConfig = useContext(IconsOverridingContext);
    const handleButtonIconClick = useCallback(() => switchCalendar(!isCalendarOpenedState), [isCalendarOpenedState, switchCalendar]);
    return (React.createElement(DateInputContainerStyled, null,
        React.createElement(DateInputStyled, null,
            React.createElement(DateInputKit, { min: min, max: max, value: value, onValueChange: onValueChange, innerRef: getInputRef, dateFormatType: dateFormatType })),
        React.createElement(DateInputButtonIcon, { onClick: handleButtonIconClick, icon: React.createElement(IconWrapper, null, iconsConfig.dateInput.calendar) }),
        React.createElement(Popover, { parentEventTarget: parentEventTarget, anchorRef: dateInput, onRequestClose: onRequestClose, opened: isCalendarOpenedState },
            React.createElement(Calendar, { value: { from: O.toUndefined(calendarValue), to: undefined }, singleMode: true, min: min, max: max, onValueChange: onCalendarValueChange, calendarDict: calendarDict }))));
});
