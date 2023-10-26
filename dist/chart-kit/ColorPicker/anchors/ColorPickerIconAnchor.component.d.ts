import * as React from 'react';
import { CKDropdownAnchorProps } from '../../Dropdown/Dropdown';
export type ColorPickerAnchorProps = CKDropdownAnchorProps<{
    readonly color: string;
    readonly opacity: number;
    readonly disabled?: boolean;
    readonly ariaLabelledBy?: string;
    readonly ariaLabel?: string;
}>;
export declare const ColorPickerIconAnchor: React.MemoExoticComponent<React.ForwardRefExoticComponent<Pick<ColorPickerAnchorProps, "children" | "key" | "className" | "onKeyDown" | "onClick" | "additionalProps"> & React.RefAttributes<HTMLButtonElement>>>;
