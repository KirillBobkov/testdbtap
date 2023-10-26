import React, { memo } from 'react';
import { MenuItemActionButtonStyled } from './MenuItemActionButton.styled';
export const MenuItemActionButton = memo(props => {
    const { visible = true } = props;
    return React.createElement(MenuItemActionButtonStyled, { ...props, visible: visible, isFlat: true });
});
