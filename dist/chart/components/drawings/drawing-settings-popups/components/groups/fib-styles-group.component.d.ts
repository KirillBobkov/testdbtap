import React from 'react';
import { FibonacciPart } from '@dx-private/dxchart5-modules/dist/drawings/figures/model/figure.model';
import { ControlProps } from '../../../../../../chart-kit/Control/Control';
export interface FibonacciStylesGroupsProps extends ControlProps<FibonacciPart[]> {
    readonly palette: string[];
    readonly step?: number;
    readonly precision?: number;
    readonly multiplier?: number;
}
export declare const FibonacciStylesGroup: React.NamedExoticComponent<FibonacciStylesGroupsProps>;
