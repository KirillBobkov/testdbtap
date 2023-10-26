import { Lazy } from 'fp-ts/function';
import React from 'react';
import { DateRangeValue, RangeSideType } from '../Calendar.model';
export interface ArrowsProps {
    readonly min: Date;
    readonly max: Date;
    readonly rangeSide: RangeSideType;
    readonly singleMode: boolean;
    readonly currentDate: Date;
    readonly selectedDate: DateRangeValue;
    readonly onNextYearClick: Lazy<void>;
    readonly onPrevYearClick: Lazy<void>;
}
export declare const Arrows: React.NamedExoticComponent<ArrowsProps>;
