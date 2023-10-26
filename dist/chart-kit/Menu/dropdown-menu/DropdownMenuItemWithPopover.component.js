import React, { forwardRef, memo, useContext, useRef } from 'react';
import { DropdownMenuItemPopoverIconStyled } from './DropdownMenuItem.styled';
import { DropdownMenuItemContainerStyled, DropdownMenuItemIconStyled, DropdownMenuItemLabelStyled, } from './DropdownMenuItem.styled';
import { IconWrapper } from '../../IconWrapper/IconWrapper.component';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { DropdownMenuItemWithPopoverStyled } from './DropdownMenuItemWithPopover.styled';
export const DropdownMenuItemWithPopover = memo(forwardRef((props, ref) => {
    const { className, value, isActive, icon, label, onMouseEnter, popover, opened, disabled } = props;
    const popoverAnchor = useRef(null);
    const iconsConfig = useContext(IconsOverridingContext);
    return (React.createElement(React.Fragment, null,
        React.createElement(DropdownMenuItemWithPopoverStyled, { className: className, ref: popoverAnchor, value: value, opened: opened, disabled: disabled, isActive: isActive, onMouseEnter: onMouseEnter },
            React.createElement(DropdownMenuItemContainerStyled, { role: 'menuitem' },
                React.createElement(DropdownMenuItemIconStyled, null, icon),
                React.createElement(DropdownMenuItemLabelStyled, null, label),
                React.createElement(DropdownMenuItemPopoverIconStyled, null,
                    React.createElement(IconWrapper, null, iconsConfig.dropdownMenuItemWithPopover.arrow)))),
        popover(popoverAnchor)));
}));
