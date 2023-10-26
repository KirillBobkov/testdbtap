import React from 'react';
export interface SimpleNumericStepperProps {
    readonly ariaLabel?: string;
    readonly value: number;
    readonly onValueChange: (number: number) => void;
    readonly units?: string;
    readonly max?: number;
    readonly min?: number;
    readonly sensitivity?: number;
    readonly orientation?: 'v' | 'h';
    readonly className?: string;
    readonly label?: string;
    readonly isDisabled?: boolean;
    readonly id?: string;
    readonly isChangingCallback?: (value: boolean) => void;
}
export declare const SimpleNumericStepper: React.MemoExoticComponent<(props: SimpleNumericStepperProps) => JSX.Element>;
