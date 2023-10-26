import React, { ReactNode } from 'react';
import { DrawingSettingsGroupStyledProps } from './drawing-settings-group.styled';
export interface DrawingSettingsGroupProps extends DrawingSettingsGroupStyledProps {
    readonly children?: ReactNode;
    readonly className?: string;
    readonly label?: string;
    readonly disableMargin?: boolean;
}
export declare const DrawingSettingsGroup: React.NamedExoticComponent<DrawingSettingsGroupProps>;
