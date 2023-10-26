import React, { forwardRef, memo } from 'react';
import { DropdownMenuItemStyled, DropdownMenuItemContainerStyled, DropdownMenuItemIconStyled, DropdownMenuItemLabelStyled, } from './DropdownMenuItem.styled';
export const DropdownMenuItem = memo(forwardRef(({ className, value, isActive, icon, label, testId, onSelect, onMouseEnter, onKeyDown, disabled }, ref) => (React.createElement(DropdownMenuItemStyled, { className: className, value: value, disabled: disabled, isActive: isActive, onSelect: onSelect, onMouseEnter: onMouseEnter, onKeyDown: onKeyDown, testId: testId, ref: ref },
    React.createElement(DropdownMenuItemContainerStyled, null,
        icon && React.createElement(DropdownMenuItemIconStyled, null, icon),
        React.createElement(DropdownMenuItemLabelStyled, null, label))))));
