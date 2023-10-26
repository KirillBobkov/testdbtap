import * as React from 'react';
import { DateRangeValue, RangeSideType } from '../Calendar.model';
export interface MonthButtonProps {
    readonly min: Date;
    readonly max: Date;
    readonly rangeSide: RangeSideType;
    readonly singleMode: boolean;
    readonly selectedDate: DateRangeValue;
    readonly i: number;
    readonly month: string;
    readonly date: Date;
    readonly onMonthSelect: (index: number) => void;
}
export declare const MonthButton: React.NamedExoticComponent<MonthButtonProps>;
export declare const buildDateRange: (from: Date) => (to: Date) => {
    from: Date;
    to: Date;
};
