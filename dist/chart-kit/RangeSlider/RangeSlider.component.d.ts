import React from 'react';
export interface RangeSliderElement {
    readonly key: string | number;
    readonly desc: string;
    readonly value: number;
}
interface RangeSliderProps {
    readonly elements: RangeSliderElement[];
    readonly selectedIdx?: number;
    readonly minIdx?: number;
    readonly maxIdx?: number;
    readonly showLabels?: boolean;
    readonly onValueChange?: (value: number) => void;
}
export declare const RangeSlider: React.MemoExoticComponent<(props: RangeSliderProps) => JSX.Element>;
export {};
