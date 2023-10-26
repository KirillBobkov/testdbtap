import React, { memo } from 'react';
import { DeselectButtonStyled } from './deselect-order-button.styled';
import { GoBackIcon } from '../../icons/go-back.icon';
export const DeselectOrderButton = memo(props => (React.createElement(DeselectButtonStyled, { ...props, icon: React.createElement(GoBackIcon, null) })));
