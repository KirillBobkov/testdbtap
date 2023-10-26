import React, { ComponentType, ReactElement, ReactNode } from 'react';
import { CKMenuProps } from '../Menu/Menu.component';
import { CKSelectboxAnchorProps } from './SelectboxAnchor.component';
import { CKMenuItemProps } from '../Menu/MenuItem.component';
import { CKPopoverProps } from '../Popover/Popover.lazy-component';
export type SelectboxValue = string | number | (string | number)[];
export type SelectboxChildren = ReactElement<CKMenuItemProps>[] | ReactElement<CKMenuItemProps>;
export interface CKSelectboxProps {
    readonly multipleFormatter?: (value: (string | number)[]) => ReactNode;
    readonly isDisabled?: boolean;
    readonly placeholder?: string;
    readonly value: SelectboxValue;
    readonly onValueChange: (value: SelectboxValue) => void;
    readonly isOpened?: boolean;
    readonly onToggle?: (value: boolean) => void;
    readonly onTabPress?: (e: KeyboardEvent) => void;
    readonly children?: SelectboxChildren;
    readonly className?: string;
    readonly closeOnClickAway?: boolean;
    readonly Anchor?: ComponentType<CKSelectboxAnchorProps>;
    readonly Menu?: ComponentType<CKMenuProps>;
    readonly Popover?: ComponentType<CKPopoverProps>;
    readonly maxPopoverHeight?: number;
    readonly Header?: React.ReactNode;
    readonly Footer?: React.ReactNode;
    readonly caretIcon?: React.ReactNode | string | number;
    readonly isCaretIconChanged?: boolean;
    readonly prefixIcon?: ReactNode;
    readonly hasMenu?: boolean;
    readonly testIdAnchor?: string;
    readonly testIdPopover?: string;
    readonly tabIndex?: number;
    readonly anchorAriaLabel?: string;
    readonly menuAriaLabel?: string;
    readonly ariaDescription?: string;
    readonly keyboardMode?: boolean;
    readonly shouldWrap?: boolean;
    readonly hasIconWrapper?: boolean;
    readonly parentEventTarget?: HTMLElement;
    readonly contentRef?: React.RefObject<HTMLDivElement>;
    readonly focusSelector?: string;
}
/**
 * !!!IMPORTANT!!! You should use this component only with `MenuItem` as children.
 */
export declare const Selectbox: React.NamedExoticComponent<CKSelectboxProps>;
