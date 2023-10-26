import React from 'react';
import { ControlProps } from '../Control/Control';
export interface CKRadioButtonProps extends ControlProps<boolean> {
    readonly id?: string;
    readonly isDisabled?: boolean;
    readonly ariaLabel?: string;
    readonly children?: React.ReactNode;
}
export declare const RadioButton: React.FC<CKRadioButtonProps>;
