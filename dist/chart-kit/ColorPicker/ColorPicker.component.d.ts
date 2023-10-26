import * as React from 'react';
import { ComponentType, FC } from 'react';
import { ColorPickerAnchorProps } from './anchors/ColorPickerAnchor.component';
import { CKPopoverProps } from '../Popover/Popover.lazy-component';
import { ColorPickerPaletteProps } from './ColorPickerPalette.component';
import { OpacitySelectorProps } from '../OpacitySelector/OpacitySelector.component';
import { ControlProps } from '../Control/Control';
export type PaletteComponentType = ComponentType<ColorPickerPaletteProps>;
export type OpacitySelectorType = ComponentType<OpacitySelectorProps>;
export interface CKColorPickerTestIds {
    readonly colorButton?: string;
    readonly colorButtonPalette?: string;
}
export interface CKColorPickerProps extends ControlProps<string> {
    readonly disabled?: boolean;
    readonly palette: string[];
    readonly PaletteComponent?: PaletteComponentType;
    readonly OpacitySelectorComponent?: OpacitySelectorType;
    readonly Anchor?: ComponentType<ColorPickerAnchorProps>;
    readonly className?: string;
    readonly showOpacitySelector?: boolean;
    readonly parentEventTarget?: HTMLElement;
    readonly addNewColor?: (color: string) => void;
    readonly deleteColor?: (color: string) => void;
    readonly isDefaultColor?: (color: string) => boolean;
    readonly updateColor?: (color: string, updateAtIndex: number) => void;
    readonly customColors?: string[];
    readonly ariaLabelledBy?: string;
    readonly testIds?: CKColorPickerTestIds;
    readonly ariaLabel?: string;
    readonly style?: React.CSSProperties;
}
export declare const ColorPickerPopover: (props: CKPopoverProps) => JSX.Element;
export declare const ColorPicker: FC<CKColorPickerProps>;
export default ColorPicker;
