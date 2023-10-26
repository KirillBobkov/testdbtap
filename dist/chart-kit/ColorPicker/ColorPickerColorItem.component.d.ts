import React from 'react';
export interface ColorPickerColorItemTestIds {
    readonly colorButtonPalette?: string;
}
export interface ColorPickerColorItemProps {
    readonly isActive: boolean;
    readonly isCustomOpacity: boolean;
    readonly isCurrentColorDefault: boolean;
    readonly color: string;
    readonly idx: number;
    readonly portal: HTMLElement;
    readonly testIds?: ColorPickerColorItemTestIds;
}
export declare const ColorPickerColorItem: React.MemoExoticComponent<(props: ColorPickerColorItemProps) => JSX.Element>;
