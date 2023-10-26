import React from 'react';
import { SelectboxValue } from '../../../../chart-kit/Selectbox/Selectbox.component';
import { PriceType } from '../../../../providers/chart-data-provider';
import { ChartReactConfig } from '../../../../config/chart-react-config';
interface PriceTypeSelectboxProps {
    readonly value: PriceType;
    readonly onValueChange: (value: SelectboxValue) => void;
    readonly keyboardModeEnabled: boolean;
    readonly priceTypes: ChartReactConfig['priceTypes'];
}
export declare const PriceTypeSelectbox: React.MemoExoticComponent<(props: PriceTypeSelectboxProps) => JSX.Element>;
export {};
