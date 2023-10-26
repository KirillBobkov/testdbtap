import React from 'react';
import { ThemeType } from '../../../model/theme.model';
export interface BackgroundMenuThemeItemProps {
    readonly activeTheme: ThemeType;
    readonly onChangeTheme: (type: ThemeType) => void;
    readonly onPopoverClose: () => void;
}
export declare const BackgroundMenuThemeItem: React.NamedExoticComponent<BackgroundMenuThemeItemProps>;
