import React, { memo } from 'react';
import { OrderEntryAddBtnStyled } from './order-entry-button.styled';
import { AddIcon } from '../icons/add.icon';
export const OrderEntryAddButton = memo(props => {
    const { onClick, className } = props;
    return (React.createElement(OrderEntryAddBtnStyled, { className: className, onClick: onClick },
        React.createElement(AddIcon, null)));
});
