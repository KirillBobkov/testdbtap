import React from 'react';
import { Localization } from '../../../config/localization/localization';
import { ThemeType } from '../../model/theme.model';
export interface ThemeSwitcherProps {
    readonly localization: Localization;
    readonly changeTheme: (theme: ThemeType) => void;
    readonly activeTheme: ThemeType;
    readonly className?: string;
}
export declare const ThemeSwitcher: React.MemoExoticComponent<(props: ThemeSwitcherProps) => JSX.Element>;
export interface ThemeSwitcherItemProps {
    readonly type: ThemeType;
    readonly isActive: boolean;
    readonly localization: Localization;
    readonly onClick: (type: ThemeType) => void;
}
