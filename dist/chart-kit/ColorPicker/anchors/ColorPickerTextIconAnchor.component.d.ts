import * as React from 'react';
import { CKDropdownAnchorProps } from '../../Dropdown/Dropdown';
export type ColorPickerAnchorProps = CKDropdownAnchorProps<{
    color: string;
    opacity: number;
    disabled?: boolean;
}>;
export declare const ColorPickerTextIconAnchor: React.MemoExoticComponent<React.ForwardRefExoticComponent<Pick<ColorPickerAnchorProps, "children" | "key" | "className" | "onKeyDown" | "onClick" | "additionalProps"> & React.RefAttributes<HTMLButtonElement>>>;
