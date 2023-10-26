import * as React from 'react';
import { CKDropdownAnchorProps } from '../Dropdown/Dropdown';
export type FontPickerAnchorProps = CKDropdownAnchorProps<{
    value: string | number;
}>;
export declare const FontPickerAnchor: React.MemoExoticComponent<React.ForwardRefExoticComponent<Pick<FontPickerAnchorProps, "children" | "key" | "className" | "onKeyDown" | "onClick" | "additionalProps"> & React.RefAttributes<HTMLButtonElement>>>;
