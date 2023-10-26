import { ControlProps } from '../Control/Control';
import React from 'react';
import { MouseEvent } from 'react';
import { FunctionN } from 'fp-ts/function';
import { drawingsDictionary } from '../../config/localization/drawings';
import { DateRangeValue, RangeSideType } from './Calendar.model';
export interface CalendarProps extends ControlProps<DateRangeValue> {
    readonly min?: Date;
    readonly max?: Date;
    readonly onMouseDown?: (event: MouseEvent) => void;
    readonly rangeSide?: RangeSideType;
    readonly singleMode?: boolean;
    readonly container?: HTMLElement;
    readonly disabledDates?: Date[];
    readonly onChangeSelectedDate?: FunctionN<DateRangeValue[], void>;
    readonly calendarDict: typeof drawingsDictionary.calendar;
}
export declare const Calendar: React.NamedExoticComponent<CalendarProps>;
