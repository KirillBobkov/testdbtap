import React from 'react';
export interface ChartSettingsCheckboxProps {
    readonly label: string;
    readonly value: boolean;
    readonly onValueChange: (value: boolean) => void;
    readonly disabled?: boolean;
    readonly fieldTestId?: string;
}
export declare const ChartSettingsCheckbox: React.NamedExoticComponent<ChartSettingsCheckboxProps>;
