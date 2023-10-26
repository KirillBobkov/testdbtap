import React, { CSSProperties, ForwardedRef, ReactNode, ReactText } from 'react';
export interface CKMenuProps {
    readonly className?: string;
    readonly style?: CSSProperties;
    readonly onItemSelect?: (value: ReactText) => void;
    readonly onTouchStart?: (value: ReactText) => void;
    readonly onToggle?: (value: boolean) => void;
    readonly ref?: ForwardedRef<HTMLUListElement>;
    readonly testId?: string;
    readonly ariaLabel?: string;
    readonly navigateWithArrows?: boolean;
    readonly children?: ReactNode;
}
export interface CKMenuChildProps {
    readonly onSelect?: (value: ReactText) => void;
    readonly onTouchStart?: (value: ReactText) => void;
    readonly onKeyDown?: (value: ReactText) => void;
    readonly ref?: ForwardedRef<HTMLLIElement>;
}
export declare const MENU_ID = "menu_id";
export declare const Menu: React.FC<CKMenuProps>;
