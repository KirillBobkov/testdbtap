import React, { ComponentType } from 'react';
import { CKSteppableInputProps } from '../SteppableInput/SteppableInput.component';
import { ControlProps } from '../Control/Control';
export interface CKNumericStepperProps extends CKSteppableInputProps, ControlProps<number> {
    readonly step?: number;
    readonly min?: number;
    readonly max?: number;
    readonly formatter?: (v: number) => string;
    readonly placeholder?: string;
    readonly SteppableInput?: ComponentType<CKSteppableInputProps>;
    readonly className?: string;
    readonly ariaLabel?: string;
    readonly onValidate?: (value: string) => boolean;
}
export declare const NumericStepper: React.MemoExoticComponent<React.ForwardRefExoticComponent<Pick<React.PropsWithChildren<CKNumericStepperProps>, "value" | "children" | "error" | "key" | "min" | "className" | "placeholder" | "tabIndex" | "onFocus" | "onBlur" | "onKeyDown" | "onClick" | "onMouseEnter" | "onMouseLeave" | "step" | "onValueChange" | "max" | "isDisabled" | "ariaLabel" | "onClear" | "isIncrementButtonDisabled" | "isDecrementButtonDisabled" | "onIncrement" | "onDecrement" | "incrementIcon" | "decrementIcon" | "clearIcon" | "Input" | "ButtonIcon" | "ClearButtonIcon" | "formatter" | "SteppableInput" | "onValidate"> & React.RefAttributes<HTMLDivElement>>>;
