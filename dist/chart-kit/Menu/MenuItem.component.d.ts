import React, { ReactNode, ReactText } from 'react';
export interface CKMenuItemProps {
    readonly className?: string;
    readonly children?: ReactNode;
    readonly value: ReactText;
    readonly isActive?: boolean;
    readonly isMobile?: boolean;
    readonly disabled?: boolean;
    readonly onSelect?: (value: ReactText) => void;
    readonly onMouseEnter?: (e: React.MouseEvent) => void;
    readonly onMouseLeave?: (e: React.MouseEvent) => void;
    readonly onMouseOver?: (e: React.MouseEvent) => void;
    readonly onMouseOut?: (e: React.MouseEvent) => void;
    readonly onKeyDown?: (event: React.KeyboardEvent<HTMLLIElement>) => void;
    readonly onClick?: (event: React.MouseEvent) => void;
    readonly onFocus?: (e: React.FocusEvent) => void;
    readonly onBlur?: (e: React.FocusEvent) => void;
    readonly ariaLabel?: string;
    readonly testId?: string;
    readonly ariaDescribedBy?: string;
}
export declare const MenuItem: React.MemoExoticComponent<React.ForwardRefExoticComponent<CKMenuItemProps & React.RefAttributes<HTMLLIElement>>>;
