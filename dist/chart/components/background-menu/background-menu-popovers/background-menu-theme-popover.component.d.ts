import React from 'react';
import { ThemeType } from '../../../model/theme.model';
export interface BackgroundMenuThemePopoverProps {
    readonly isOpened: boolean;
    readonly onClose: () => void;
    readonly anchorRef: ReactRef;
    readonly activeTheme: ThemeType;
    readonly onChangeTheme: (theme: ThemeType) => void;
}
export declare const BackgroundMenuThemePopover: React.NamedExoticComponent<BackgroundMenuThemePopoverProps>;
