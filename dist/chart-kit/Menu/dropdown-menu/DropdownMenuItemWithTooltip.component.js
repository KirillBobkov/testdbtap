import React, { memo } from 'react';
import { DropdownMenuItemContainerStyled, DropdownMenuItemIconStyled, DropdownMenuItemLabelStyled, } from './DropdownMenuItem.styled';
import { DropdownMenuItemWithTooltipStyled } from './DropdownMenuItemWithTooltip.styled';
export const DropdownMenuItemWithTooltip = memo(({ className, value, isActive, icon, label, onSelect, onMouseEnter, onMouseLeave, align, position, disableTooltip, children, }) => (React.createElement(DropdownMenuItemWithTooltipStyled, { className: className, value: value, isActive: isActive, onSelect: onSelect, label: label, align: align, position: position, disableTooltip: disableTooltip, onMouseLeave: onMouseLeave, onMouseEnter: onMouseEnter },
    React.createElement(DropdownMenuItemContainerStyled, null,
        icon && React.createElement(DropdownMenuItemIconStyled, null, icon),
        React.createElement(DropdownMenuItemLabelStyled, null, label),
        children))));
