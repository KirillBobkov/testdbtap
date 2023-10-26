import React from 'react';
import { CrosshairType } from './crosshair-type.model';
export interface ToolbarCrosshairTypeProps {
    readonly className?: string;
    readonly selectedType: CrosshairType;
    readonly onTypeSelect: (type: CrosshairType) => void;
}
export declare const CrosshairTypeDropdown: React.FC<ToolbarCrosshairTypeProps>;
