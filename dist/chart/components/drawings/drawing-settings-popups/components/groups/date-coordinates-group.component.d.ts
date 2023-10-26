import React from 'react';
import { DateValuePoint } from '@dx-private/dxchart5-modules/dist/drawings/figures/model/figure.model';
import { Instrument } from '../../../../../model/instrument.model';
import { DrawingsDictionary } from '../../../../../../config/localization/drawings';
import { ControlProps } from '../../../../../../chart-kit/Control/Control';
interface DateCoordinatesGroupProps extends ControlProps<DateValuePoint[]> {
    instrument?: Instrument;
    currentTimezone: string;
    withPrice?: boolean;
    drawingsDict: DrawingsDictionary;
    updateAllPointsPrice?: boolean;
}
export declare const DRAWINGS_DATE_COORDINATES_SECTION: unique symbol;
export declare const DateCoordinatesGroup: React.MemoExoticComponent<(props: DateCoordinatesGroupProps) => JSX.Element>;
export {};
