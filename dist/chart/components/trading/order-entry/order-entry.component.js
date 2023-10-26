import React, { memo, useCallback, useEffect, useState } from 'react';
import { OrderEntryAddButton } from './order-entry-add-button.component';
import { OrderEntryInput } from './order-entry-input.component';
import { OrderEntryBtnContainerStyled, OrderEntryContainerStyled } from './order-entry.styled';
import { RootClose } from '../../../../chart-kit/RootClose/RootClose';
const ANIMATION_TIME = 400;
export const OrderEntry = memo(props => {
    const { opened, disabled, setOpened, resetToDefault, validate, createOrder, type, quantity, quantityPrecision, quantityStep, maxQuantity, onChangeQuantity, className, tradingDict, padding, yAxisAlign, domMutationProps, } = props;
    const [oeBtnVisible, setOeBtnVisible] = useState(true);
    const startEditingHandler = useCallback(() => setOpened(true), [setOpened]);
    const onCloseHandler = useCallback(() => {
        setOpened(false);
        resetToDefault();
    }, [setOpened, resetToDefault]);
    const createOrderHandler = useCallback((type, side) => {
        if (validate && !validate()) {
            return;
        }
        createOrder(type, side);
        onCloseHandler();
    }, [createOrder, validate, onCloseHandler]);
    useEffect(() => {
        // -100 is needed because OE button should appears earlier than input disappears
        opened ? setOeBtnVisible(false) : setTimeout(() => setOeBtnVisible(true), ANIMATION_TIME - 100);
    }, [opened]);
    return (React.createElement(RootClose, { onRootClose: onCloseHandler },
        React.createElement(OrderEntryContainerStyled, { ref: domMutationProps.containerRef, align: yAxisAlign, padding: padding, className: className },
            React.createElement("div", { style: {
                    width: opened ? '100%' : 0,
                    opacity: opened ? 1 : 0,
                    overflow: 'hidden',
                    transition: `${ANIMATION_TIME}ms all ease-in-out`,
                } },
                React.createElement(OrderEntryInput, { disabled: disabled, type: type, quantity: quantity, quantityPrecision: quantityPrecision, quantityStep: quantityStep, maxQuantity: maxQuantity, tradingDict: tradingDict, onQuantityChange: onChangeQuantity, createOrder: createOrderHandler })),
            React.createElement(OrderEntryBtnContainerStyled, { opened: oeBtnVisible },
                React.createElement(OrderEntryAddButton, { onClick: startEditingHandler })))));
});
export default OrderEntry;
