import React, { KeyboardEventHandler, PropsWithChildren, RefAttributes } from 'react';
import { ComponentType, MouseEventHandler, ReactNode } from 'react';
import { CKPopoverProps } from '../Popover/Popover.lazy-component';
import { ControlProps } from '../Control/Control';
export interface CKDropdownAnchorProps<T = object> extends RefAttributes<HTMLButtonElement> {
    readonly onClick: MouseEventHandler<HTMLElement>;
    readonly onKeyDown: KeyboardEventHandler<HTMLElement>;
    readonly children?: ReactNode;
    readonly className?: string;
    readonly additionalProps?: T;
}
export interface CKDropdownProps<T = object> extends ControlProps<boolean | undefined, 'isOpened', 'onToggle'> {
    Anchor: ComponentType<CKDropdownAnchorProps<T>>;
    Popover?: ComponentType<PropsWithChildren<CKPopoverProps>>;
    hasArrow?: boolean;
    className?: string;
    anchorAdditionalProps?: T;
    parentEventTarget?: HTMLElement;
    style?: React.CSSProperties;
}
export declare const Dropdown: <T extends object>({ Anchor, Popover, children, isOpened, onToggle, anchorAdditionalProps, className, parentEventTarget, style, }: React.PropsWithChildren<CKDropdownProps<T>>) => JSX.Element;
