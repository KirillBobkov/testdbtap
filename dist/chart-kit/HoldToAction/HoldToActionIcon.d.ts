import React from 'react';
import { CKButtonIconProps } from '../Button/ButtonIcon.component';
interface CKHoldToActionIconProps {
    readonly iconSVGComponent: React.ComponentType;
    readonly iconWrapper: React.ComponentType<CKButtonIconProps>;
    readonly ariaLabel?: string;
    readonly tabIndex?: number;
    readonly ariaHidden?: boolean;
}
export interface HoldToActionHandlers {
    readonly onMouseDown: (e: React.MouseEvent) => void;
    readonly onMouseUp: (e: React.MouseEvent) => void;
    readonly onMouseLeave: (e: React.MouseEvent) => void;
    readonly onTouchStart: (e: React.TouchEvent) => void;
    readonly onTouchEnd: (e: React.TouchEvent) => void;
}
export declare const HoldToActionIcon: React.FC<HoldToActionHandlers & CKHoldToActionIconProps>;
export {};
