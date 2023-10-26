import React from 'react';
import { IconsPool } from '../../../../config/icons-pool';
export interface DrawingsSidebarDrawingIconProps {
    readonly icons: IconsPool;
    readonly active?: boolean;
    readonly disabled?: boolean;
    readonly expanded: boolean;
    readonly onSelectIcon: (icon: string) => void;
}
export declare const DrawingsSidebarDrawingIcon: React.NamedExoticComponent<DrawingsSidebarDrawingIconProps>;
