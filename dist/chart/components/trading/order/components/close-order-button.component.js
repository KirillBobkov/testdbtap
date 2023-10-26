import React, { memo } from 'react';
import { CloseOrderButtonStyled } from './close-order-button.styled';
import { CloseOrderIcon } from '../../icons/close-order.icon';
export const CloseOrderButton = memo(props => (React.createElement(CloseOrderButtonStyled, { ...props, icon: React.createElement(CloseOrderIcon, null) })));
