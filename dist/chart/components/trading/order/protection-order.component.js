import React, { memo, useCallback } from 'react';
import { OrderSectionStyled } from './components/order.styled';
import { Order as OrderComponent } from './components/order.component';
import { defaultOrderPriceFormatter } from '../../../model/trading/order.model';
import { OrderAlt } from './components/order-alt.component';
import { OrderSectionAltStyled } from './components/order-alt.styled';
import { getOrderName } from './order.functions';
import { OrderLineStyled } from './components/side.styled';
import { ProtectionOrderStyled } from './protection-order.styled';
import { getOrderPriceByType } from '../../../model/trading/trading.model';
export const ProtectionOrder = memo((props) => {
    const { order, showPriceAsLabels, horizontalLineWidth, onClose, onDeselect, onSelect, onClick, onDblClick, isLineVisible = true, } = props;
    const { selected, model, disabled } = order;
    const { id, orderType, limitPrice, stopPrice, side } = model;
    const price = getOrderPriceByType(orderType, limitPrice, stopPrice);
    const onSelectHandler = useCallback(() => onSelect && !selected && onSelect(id), [id, onSelect, selected]);
    const onClickHandler = useCallback(() => onClick && onClick(id), [id, onClick]);
    const onDblClickHandler = useCallback(() => onDblClick && onDblClick(id), [id, onDblClick]);
    const onDeselectHandler = useCallback(() => onDeselect && onDeselect(id), [id, onDeselect]);
    const onCloseHandler = useCallback(() => onClose && onClose(id), [id, onClose]);
    return (React.createElement(ProtectionOrderStyled, null,
        React.createElement(OrderComponent, { disabled: disabled, selected: selected, side: side, onSelect: onSelectHandler, onClick: onClickHandler, onDblClick: onDblClickHandler, onClose: onCloseHandler, onDeselect: onDeselectHandler },
            React.createElement(OrderSectionStyled, null, `${getOrderName(order.model)} ${!showPriceAsLabels ? (order.formatter || defaultOrderPriceFormatter)(price) : ''}`)),
        isLineVisible && (React.createElement(OrderLineStyled, { x: '101%', y: 9.5, width: horizontalLineWidth, disabled: disabled, selected: selected }))));
});
export const ProtectionOrderAlt = memo((props) => {
    const { order, showPriceAsLabels, onClose, onDeselect, onSelect, onClick, onDblClick, onDragStart } = props;
    const { selected, model } = order;
    const { id, orderType, limitPrice, stopPrice, side } = model;
    const price = getOrderPriceByType(orderType, limitPrice, stopPrice);
    const onSelectHandler = useCallback(() => onSelect && !selected && onSelect(id), [id, onSelect, selected]);
    const onClickHandler = useCallback(() => onClick && onClick(id), [id, onClick]);
    const onDblClickHandler = useCallback(() => onDblClick && onDblClick(id), [id, onDblClick]);
    const onDeselectHandler = useCallback(() => onDeselect && onDeselect(id), [id, onDeselect]);
    const onCloseHandler = useCallback(() => onClose && onClose(id), [id, onClose]);
    const onDragStartHandler = useCallback(() => onDragStart && onDragStart(id), [id, onDragStart]);
    return (React.createElement(OrderAlt, { side: side, onDragStart: onDragStartHandler, onSelect: onSelectHandler, onClick: onClickHandler, onDblClick: onDblClickHandler, onClose: onCloseHandler, onDeselect: onDeselectHandler },
        React.createElement(OrderSectionAltStyled, null, getOrderName(order.model)),
        !showPriceAsLabels && (React.createElement(OrderSectionAltStyled, null, (order.formatter || defaultOrderPriceFormatter)(price)))));
});
