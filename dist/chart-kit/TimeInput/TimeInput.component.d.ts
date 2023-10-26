import React, { ComponentType } from 'react';
import { TimeInputValue } from './TimeInput.model';
import { ControlProps } from '../Control/Control';
import { CKSteppableInputProps } from '../SteppableInput/SteppableInput.component';
import { CKInputProps } from '../Input/Input.component';
interface TimeInputConfig {
    withSeconds?: boolean;
    withPeriodType?: boolean;
    isHideSeconds?: boolean;
}
export type TimeInputProps = TimeInputConfig & CKSteppableInputProps & ControlProps<TimeInputValue>;
export type TimeInputFullProps = TimeInputProps & {
    SteppableInput: ComponentType<CKSteppableInputProps>;
};
export declare const SITimeInput: React.MemoExoticComponent<React.ForwardRefExoticComponent<Pick<React.PropsWithChildren<CKInputProps>, "id" | "value" | "children" | "error" | "key" | "pattern" | "name" | "min" | "type" | "className" | "placeholder" | "tabIndex" | "role" | "onFocus" | "onBlur" | "onChange" | "onKeyDown" | "onKeyPress" | "onKeyUp" | "onClick" | "onMouseDown" | "onMouseEnter" | "onMouseLeave" | "onMouseUp" | "onTouchCancel" | "onTouchEnd" | "onTouchMove" | "onTouchStart" | "onWheel" | "testId" | "onValueChange" | "max" | "isDisabled" | "ariaLabel" | "isReadOnly" | "autofocus" | "ariaDescribedby"> & React.RefAttributes<HTMLElement>>>;
export declare const TimeInput: React.MemoExoticComponent<(props: TimeInputProps) => JSX.Element>;
export {};
