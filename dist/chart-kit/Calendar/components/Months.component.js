import React, { memo, useRef, useEffect } from 'react';
import { getDay, getYear } from 'date-fns';
import start_of_month from 'date-fns/startOfMonth';
import add_months from 'date-fns/addMonths';
import start_of_week from 'date-fns/startOfWeek';
import add_weeks from 'date-fns/addWeeks';
import difference_in_calendar_weeks from 'date-fns/differenceInCalendarWeeks';
import scrollIntoView from 'scroll-into-view-if-needed';
import { MonthsStyled } from './Months.styled';
import { Week } from './Week.component';
export const Months = memo(props => {
    const { date, months, singleMode, selectedDate, onDayChange, isDayDisabled } = props;
    const selectedYear = getYear(date);
    const activeRef = useRef(null);
    const result = [];
    useEffect(() => {
        const node = activeRef.current;
        if (node) {
            scrollIntoView(node, {
                block: 'center',
                // it prevents the browser window from scrolling and scrolls elements inside boundary, without scrolling top level elements
                boundary: node.closest('#scrollable-id'),
            });
        }
    });
    for (let i = 0; i < 12; i++) {
        const currentDate = new Date(selectedYear, i);
        const startOfCurrentMonth = start_of_month(currentDate);
        const startOfNextMonth = start_of_month(add_months(currentDate, 1));
        const startOfCurrentMonthWeek = start_of_week(startOfCurrentMonth, {
            weekStartsOn: 1,
        });
        const currentMonthIndex = currentDate.getMonth();
        const startOfNextMonthWeek = start_of_week(startOfNextMonth, {
            weekStartsOn: 1,
        });
        let startOfNextFullMonthWeek = startOfNextMonthWeek;
        if (startOfNextMonthWeek.getMonth() === currentMonthIndex) {
            startOfNextFullMonthWeek = add_weeks(startOfNextMonthWeek, 1);
        }
        const differenceInCalendarWeeks = difference_in_calendar_weeks(startOfNextFullMonthWeek, startOfCurrentMonthWeek, {
            weekStartsOn: 1,
        });
        const dayOfWeek = getDay(currentDate);
        const isFirst = i === 0;
        const isSingleLine = dayOfWeek >= 4 || dayOfWeek === 0;
        const isActive = date.getMonth() === currentMonthIndex;
        const month = (React.createElement("div", { ref: isActive ? activeRef : null, key: `month${i}` },
            React.createElement(MonthsStyled, { isFirst: isFirst, isSingleLine: isSingleLine }, months[currentMonthIndex]),
            Array.from(new Array(differenceInCalendarWeeks).keys()).map(index => (React.createElement(Week, { key: `current_${index}_${i}`, _key: `current_${index}_${i}`, from: add_weeks(startOfCurrentMonthWeek, index), forMonth: currentMonthIndex, currentDate: new Date(), singleMode: singleMode, selectedDate: selectedDate, isDayDisabled: isDayDisabled, onDayChange: onDayChange })))));
        result.push(month);
    }
    return React.createElement(React.Fragment, null, result);
});
