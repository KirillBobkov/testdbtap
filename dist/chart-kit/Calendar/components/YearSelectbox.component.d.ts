import React from 'react';
import { DateRangeValue, RangeSideType } from '../Calendar.model';
import { SelectboxValue } from '../../Selectbox/Selectbox.component';
export interface YearSelectboxProps {
    readonly min: Date;
    readonly max: Date;
    readonly rangeSide: RangeSideType;
    readonly singleMode: boolean;
    readonly selectedDate: DateRangeValue;
    readonly handleYearValueChange: (year: SelectboxValue) => void;
    readonly container?: Element;
    readonly date?: Date;
}
export declare const YearSelectbox: React.NamedExoticComponent<YearSelectboxProps>;
