import React, { ReactNode } from 'react';
export interface DrawingSettingsItemProps {
    readonly children?: ReactNode;
    readonly label?: string;
    readonly className?: string;
}
export declare const DrawingSettingsItem: React.NamedExoticComponent<DrawingSettingsItemProps>;
