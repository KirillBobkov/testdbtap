import React, { RefObject } from 'react';
import { DropdownMenuItemProps } from './DropdownMenuItem.component';
export interface DropdownMenuItemPopoverProps {
    parentRef: RefObject<HTMLLIElement>;
    className?: string;
    isOpened: boolean;
    onClose: () => void;
}
export interface DropdownMenuItemWithPopoverProps extends DropdownMenuItemProps {
    readonly popover: (anchorRef: RefObject<HTMLLIElement>) => JSX.Element | null;
    readonly opened?: boolean;
    readonly onKeyDown?: (event: React.KeyboardEvent) => void;
}
export declare const DropdownMenuItemWithPopover: React.MemoExoticComponent<React.ForwardRefExoticComponent<DropdownMenuItemWithPopoverProps & React.RefAttributes<HTMLLIElement>>>;
