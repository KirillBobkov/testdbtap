import React, { ReactNode } from 'react';
export interface DrawingSettingsSectionProps {
    readonly children?: ReactNode;
    readonly title: string;
    readonly className?: string;
}
export declare const DrawingSettingsSection: React.NamedExoticComponent<DrawingSettingsSectionProps>;
