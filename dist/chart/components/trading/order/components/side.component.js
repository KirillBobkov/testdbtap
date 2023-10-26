import React, { memo } from 'react';
import { BuyOrderLabelStyled, SellOrderLabelStyled, SideStyled } from './side.styled';
export const Side = memo(props => {
    const { side, className } = props;
    return React.createElement(SideStyled, { className: className }, renderSide(side));
});
const BuyOrderLabel = () => React.createElement(BuyOrderLabelStyled, null, "B");
const SellOrderLabel = () => React.createElement(SellOrderLabelStyled, null, "S");
export const renderSide = (side) => (side === 'buy' ? React.createElement(BuyOrderLabel, null) : React.createElement(SellOrderLabel, null));
