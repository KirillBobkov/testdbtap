import React, { memo } from 'react';
import { OrderEntryCloseBtnStyled } from './order-entry-button.styled';
import { CloseIcon } from '../icons/close.icon';
export const OrderEntryCloseButton = memo(props => {
    const { onClick, className } = props;
    return (React.createElement(OrderEntryCloseBtnStyled, { className: className, onClick: onClick },
        React.createElement(CloseIcon, null)));
});
