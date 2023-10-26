import { FC } from 'react';
import { ControlProps } from '../Control/Control';
import { ColorPickerColorItemTestIds } from './ColorPickerColorItem.component';
export interface ColorPickerPaletteProps extends ControlProps<string> {
    readonly palette: string[];
    readonly className?: string;
    readonly isDefaultColor: (color: string) => boolean;
    readonly onTogglePallete: (isPalleteOpened: boolean | undefined) => void;
    readonly applyCreatedColor: (color: string) => void;
    readonly isPalleteOpened: boolean;
    readonly portal: HTMLElement;
    readonly createdColor: string;
    readonly testIds?: ColorPickerColorItemTestIds;
}
export declare const ColorPickerPalette: FC<ColorPickerPaletteProps>;
