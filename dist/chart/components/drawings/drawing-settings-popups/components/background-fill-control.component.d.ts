import React from 'react';
import { PropertiesForFill } from '@dx-private/dxchart5-modules/dist/drawings/components/extended_context/ExtendedContext';
import { ControlProps } from '../../../../../chart-kit/Control/Control';
import { DrawingsDictionary } from '../../../../../config/localization/drawings';
export interface BackgroundFillControlProps extends ControlProps<PropertiesForFill> {
    readonly palette: string[];
    readonly drawingsDict: DrawingsDictionary;
    readonly showBackgroundCheckbox?: boolean;
    readonly renderWithWrap?: boolean;
    readonly parentEventTarget?: HTMLElement;
    readonly className?: string;
    readonly disableBottomMargin?: boolean;
}
export declare const BackgroundFillControl: React.NamedExoticComponent<BackgroundFillControlProps>;
export interface BackgroundFillShortControlProps extends Omit<BackgroundFillControlProps, 'palette' | 'showBackgroundCheckbox'> {
}
export declare const BackgroundFillShortControl: React.NamedExoticComponent<BackgroundFillShortControlProps>;
export declare const ColorPickerWrapper: import("styled-components").StyledComponent<"div", any, {}, never>;
