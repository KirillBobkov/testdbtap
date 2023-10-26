import React from 'react';
export interface AriaLabels {
    readonly input: string;
    readonly inactiveText: string;
}
export interface TestIds {
    readonly input: string;
    readonly inactiveText: string;
}
export interface InputError {
    reason: string;
}
export interface CustomInputMenuItemProps {
    readonly placeholder?: string;
    readonly inactiveText?: string;
    readonly isDisabled?: boolean;
    readonly testIds?: TestIds;
    readonly ariaLabels?: AriaLabels;
    readonly defaultValue?: string;
    readonly isActive?: boolean;
    readonly className?: string;
    readonly keyboardModeEnabled: boolean;
    readonly error?: InputError;
    readonly onClearError?: () => void;
    readonly onEnter: (value: string) => void;
    readonly onFocusOut?: () => void;
    readonly onActiveChange?: (active: boolean) => void;
    /** intercepts the input event in the component and validates
     * if the incoming value are valid and could be set as a value to the input
     * component itself
     */
    readonly inputValidator?: (value: string) => boolean;
}
export declare const CustomInputMenuItem: React.FC<CustomInputMenuItemProps & React.RefAttributes<HTMLLIElement>>;
