import * as React from 'react';
import { CKDropdownAnchorProps } from '../../Dropdown/Dropdown';
export type ColorPickerAnchorProps = CKDropdownAnchorProps<{
    readonly createdColor?: string;
    readonly isPalleteOpened?: boolean;
    readonly ariaLabelledBy?: string;
    readonly ariaLabel?: string;
}>;
export declare const ColorPickerPlusAnchor: React.MemoExoticComponent<React.ForwardRefExoticComponent<Pick<ColorPickerAnchorProps, "children" | "key" | "className" | "onKeyDown" | "onClick" | "additionalProps"> & React.RefAttributes<HTMLButtonElement>>>;
