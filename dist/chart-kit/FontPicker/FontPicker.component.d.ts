import React, { ComponentType } from 'react';
import { FontPickerAnchorProps } from './FontPickerAnchor.component';
export interface Font {
    fontSize: string;
}
export type FontPickerValue = string | number;
export interface CKFontPickerProps {
    readonly fonts?: Font[];
    readonly onValueChange: (value: string | number) => void;
    readonly Anchor?: ComponentType<FontPickerAnchorProps>;
    readonly value: string | number;
    readonly className?: string;
    readonly parentEventTarget?: HTMLDivElement;
}
export declare const FontPicker: React.MemoExoticComponent<(props: CKFontPickerProps) => JSX.Element>;
