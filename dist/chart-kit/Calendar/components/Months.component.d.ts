import React from 'react';
import { DateRangeValue } from '../Calendar.model';
export interface MonthsProps {
    readonly date: Date;
    readonly months: string[];
    readonly singleMode: boolean;
    readonly selectedDate: DateRangeValue;
    readonly isDayDisabled: (day: Date, forMonth: number) => boolean;
    readonly onDayChange: (day: Date) => void;
}
export declare const Months: React.NamedExoticComponent<MonthsProps>;
