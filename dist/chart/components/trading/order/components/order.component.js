import React, { memo, useCallback, useRef } from 'react';
import { OrderContainerStyled, OrderContainerInnerStyled } from './order.styled';
import { CloseOrderButton } from './close-order-button.component';
import { Side } from './side.component';
import { DeselectOrderButton } from './deselect-order-button.component';
import { useTransition, animated } from '@react-spring/web';
import { isSelectSkippable, skipSelectOrder } from '../order.functions';
export const Order = memo((props) => {
    const { children, absoluteChildren, side, selected = false, disabled = false, className, onClick, onSelect, onDblClick, onClose, onDeselect, withDeselectBtn = false, } = props;
    const timeoutId = useRef(null);
    const deselectBtnTransition = useTransition(selected && withDeselectBtn, {
        config: {
            duration: 150,
        },
        from: { position: 'absolute', y: 0, x: 0, zIndex: -1, opacity: 0 },
        enter: { x: -20, opacity: 1 },
        leave: { x: 0, opacity: 0 },
        delay: 150,
    });
    const onDeselectHandler = useCallback((e) => {
        e.stopPropagation();
        if (onDeselect) {
            onDeselect();
        }
    }, [onDeselect]);
    const onCloseHandler = useCallback((e) => {
        e.stopPropagation();
        if (onClose) {
            onClose();
        }
    }, [onClose]);
    const onClickHandler = useCallback((e) => {
        e.stopPropagation();
        timeoutId?.current && clearTimeout(timeoutId.current);
        if (onClick && e.detail === 1) {
            timeoutId.current = setTimeout(onClick, 200);
        }
        else if (onDblClick && e.detail === 2) {
            onDblClick();
        }
        if (onSelect && !isSelectSkippable(e)) {
            onSelect();
        }
        else {
            skipSelectOrder(e, false);
        }
    }, [onSelect, onClick, onDblClick]);
    return (React.createElement(OrderContainerStyled, { className: className, disabled: disabled },
        withDeselectBtn &&
            deselectBtnTransition((styles, selected) => selected && (React.createElement(animated.div, { style: styles },
                React.createElement(DeselectOrderButton, { onClick: onDeselectHandler })))),
        absoluteChildren,
        React.createElement(OrderContainerInnerStyled, { onClick: onClickHandler, disabled: disabled, selected: selected },
            React.createElement(Side, { side: side }),
            children,
            React.createElement(CloseOrderButton, { onClick: onCloseHandler }))));
});
