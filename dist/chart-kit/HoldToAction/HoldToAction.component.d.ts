import React, { ButtonHTMLAttributes } from 'react';
import { CKButtonIconProps } from '../Button/ButtonIcon.component';
import { HoldToActionHandlers } from './HoldToActionIcon';
export interface HoldToActionHookProps extends HoldToActionHandlers {
    readonly longPressStarted: boolean;
}
export interface HoldToActionProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
    readonly onLongPress: () => void;
    readonly children: React.ReactNode;
    readonly delay: number;
    readonly iconSVGComponent: React.ComponentType;
    readonly iconWrapper: React.ComponentType<CKButtonIconProps>;
    readonly className?: string;
    readonly overlayText: string;
    readonly showOnHover?: boolean;
    readonly keyboardModeEnabled?: boolean;
    readonly ariaLabel?: string;
}
export declare const HoldToAction: React.NamedExoticComponent<HoldToActionProps>;
export declare function isTouchEvent(e: Event): e is TouchEvent;
interface PressHandlers {
    onLongPress: (e: React.MouseEvent | React.TouchEvent) => void;
}
interface Options {
    delay?: number;
    shouldPreventDefault?: boolean;
}
export declare function useLongPress({ onLongPress }: PressHandlers, { delay, shouldPreventDefault }?: Options): {
    longPressStarted: boolean;
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
};
export {};
