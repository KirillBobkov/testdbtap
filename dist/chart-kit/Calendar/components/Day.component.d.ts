import * as React from 'react';
import { DateRangeValue } from '../Calendar.model';
interface DayProps {
    readonly from: Date;
    readonly forMonth: number;
    readonly currentDate: Date;
    readonly singleMode: boolean;
    readonly selectedDate: DateRangeValue;
    readonly isDayDisabled: (day: Date, forMonth: number) => boolean;
    readonly onDayChange: (day: Date) => void;
    readonly i: number;
}
export declare const Day: React.NamedExoticComponent<DayProps>;
export {};
