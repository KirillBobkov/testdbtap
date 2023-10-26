import { memo, useCallback } from 'react';
import add_days from 'date-fns/addDays';
import is_same_day from 'date-fns/isSameDay';
import { compareDates, getIsBetween } from '../calendar.utils';
import { isSameDay } from 'date-fns';
import * as React from 'react';
import { DayWrapperStyled, CalendarDayButtonStyled } from './Day.styled';
import { Button } from '../../Button/Button.component';
export const Day = memo(props => {
    const { singleMode, selectedDate, from, forMonth, i, currentDate, isDayDisabled, onDayChange } = props;
    const day = add_days(from, i);
    const dayMonthIndex = day.getMonth();
    const isDisabled = isDayDisabled(day, forMonth);
    const isHidden = dayMonthIndex !== forMonth;
    const isCurrent = !isHidden && is_same_day(day, currentDate);
    const isSelected = !isHidden &&
        ((!singleMode && getIsBetween(day, selectedDate.from, selectedDate.to)) ||
            compareDates(day, selectedDate.from, isSameDay) ||
            (!singleMode && compareDates(day, selectedDate.to, isSameDay)));
    const disabled = isDisabled && !isHidden;
    const onDayClick = useCallback(() => onDayChange(day), [day, onDayChange]);
    return (React.createElement(DayWrapperStyled, { disabled: disabled, key: i },
        React.createElement(CalendarDayButtonStyled, { isHidden: isHidden, isCurrent: isCurrent, isSelected: isSelected },
            React.createElement(Button, { disabled: isDisabled, isFlat: true, onClick: onDayClick }, day.getDate()))));
});
