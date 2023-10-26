import React, { ReactNode } from 'react';
import { DrawingSettingsGroupProps } from '../../drawing-settings-section/drawing-settings-group';
import { LineProperties } from '@dx-private/dxchart5-modules/dist/drawings/drawings.config';
import { ControlProps } from '../../../../../chart-kit/Control/Control';
export interface LineStyleControlProps extends ControlProps<LineProperties>, DrawingSettingsGroupProps {
    readonly palette: string[];
    readonly leadingLabel?: string;
    readonly className?: string;
    readonly children?: ReactNode;
    readonly parentEventTarget?: HTMLElement;
}
export declare const LineStyleControl: React.NamedExoticComponent<LineStyleControlProps>;
