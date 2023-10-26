import React, { memo, useState, useCallback, } from 'react';
import { CloseOrderButton } from './close-order-button.component';
import { Side } from './side.component';
import { OrderAltContainerStyled, OrderAltChildrenContainerStyled } from './order-alt.styled';
import { constVoid } from 'fp-ts/function';
export const OrderAlt = memo((props) => {
    const { children, side, selected = false, className, onClick = constVoid, onClose, onDragStart = constVoid, onSelect = constVoid, } = props;
    const [isMouseDown, setIsMouseDown] = useState(false);
    const onMouseDownHandler = useCallback(() => {
        setIsMouseDown(true);
    }, []);
    const onMouseMoveHandler = useCallback(() => {
        if (isMouseDown) {
            onDragStart();
        }
    }, [onDragStart, isMouseDown]);
    const onClickHandler = useCallback(() => {
        onClick();
        onSelect();
    }, [onClick, onSelect]);
    const onCloseHandler = useCallback((e) => {
        e.stopPropagation();
        if (onClose) {
            onClose();
        }
    }, [onClose]);
    return (React.createElement(OrderAltContainerStyled, { onClick: onClickHandler, onMouseDown: onMouseDownHandler, onMouseMove: onMouseMoveHandler, className: className, selected: selected },
        React.createElement(Side, { side: side }),
        React.createElement(OrderAltChildrenContainerStyled, null, children),
        React.createElement(CloseOrderButton, { onClick: onCloseHandler })));
});
