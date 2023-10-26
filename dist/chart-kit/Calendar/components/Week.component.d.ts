import React from 'react';
import { DateRangeValue } from '../Calendar.model';
export interface WeekProps {
    readonly from: Date;
    readonly forMonth: number;
    readonly currentDate: Date;
    readonly _key?: number | string;
    readonly singleMode: boolean;
    readonly selectedDate: DateRangeValue;
    readonly isDayDisabled: (day: Date, forMonth: number) => boolean;
    readonly onDayChange: (day: Date) => void;
}
export declare const Week: React.NamedExoticComponent<WeekProps>;
