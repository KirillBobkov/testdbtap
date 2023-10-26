import { FC } from 'react';
import { ControlProps } from '../Control/Control';
import { drawingsDictionary } from '../../config/localization/drawings';
import { DateFormatType, DateInputValue } from './DateInput.model';
export interface DateInputProps extends ControlProps<DateInputValue> {
    readonly min: Date;
    readonly max: Date;
    readonly calendarDict: typeof drawingsDictionary.calendar;
    readonly parentEventTarget?: HTMLElement;
    readonly dateFormatType?: DateFormatType;
}
export declare const DateInput: FC<DateInputProps>;
