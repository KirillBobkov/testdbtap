import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { array, option } from 'fp-ts';
import { head } from 'fp-ts/Array';
import { constVoid, pipe } from 'fp-ts/function';
import { Position, PositionAlt } from './position.component';
import { ProtectionOrder, ProtectionOrderAlt } from './protection-order.component';
import { RegularOrder, RegularOrderAlt } from './regular-order.component';
import { GroupOrderContainer, GroupOrderFakeOrder, GroupOrderFakeOrder2nd, GroupOrderGroupContainer, } from './group-order.styled';
import { animated, useSpring, useTransition } from '@react-spring/web';
import { OrderLineStyled } from './components/side.styled';
import { TRADING_ITEM_HEIGHT } from '../../../view-models/trading/trading.view-model';
import { isProtection } from '../../../model/trading/trading.model';
export const GroupOrder = memo(props => {
    const { tradingItems, onGroupOpen, onSelect = constVoid, onDblClick = constVoid, onClick = constVoid, removeOrder = constVoid, removePosition = constVoid, onDragStart = constVoid, y, showPriceAsLabels, halfOrderHeight, horizontalLineWidth, isDragging, tradingSettings, editableItemsPresented, currency, } = props;
    // Manipulations with ref and state with width are needed because group has "position: absolute".
    // To keep correct resize offset area, we set width for parent container
    const groupRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(130);
    useEffect(() => {
        if (groupRef.current) {
            setContainerWidth(groupRef.current.clientWidth);
        }
    });
    const [opened, setOpened] = useState(false);
    const [topOrderStyles, topOrderAnimation] = useSpring(() => ({
        config: {
            duration: 50,
        },
        from: {
            opacity: 1,
        },
    }));
    const openGroupHandler = useCallback(() => {
        if (!isDragging && !editableItemsPresented) {
            setOpened(true);
            onGroupOpen && onGroupOpen();
            topOrderAnimation({ opacity: 0 });
        }
    }, [setOpened, onGroupOpen, topOrderAnimation, isDragging, editableItemsPresented]);
    const closeGroupHandler = useCallback(() => {
        setOpened(false);
        topOrderAnimation({ opacity: 1 });
    }, [setOpened, topOrderAnimation]);
    useEffect(() => {
        if (isDragging || editableItemsPresented) {
            closeGroupHandler();
        }
    }, [isDragging, closeGroupHandler, editableItemsPresented]);
    const isTradingItemVisible = useCallback((i) => i.type === 'order' ? tradingSettings.showOrders : tradingSettings.showPositions, [tradingSettings.showOrders, tradingSettings.showPositions]);
    const orderOnTop = useMemo(() => pipe(tradingItems, array.filter(isTradingItemVisible), head, option.fold(() => null, order => order)), [tradingItems, isTradingItemVisible]);
    const groupTransition = useTransition(opened, {
        config: {
            duration: 150,
        },
        from: {
            position: 'absolute',
            height: TRADING_ITEM_HEIGHT,
            overflow: 'hidden',
            top: -1,
            right: 0,
        },
        update: { height: tradingItems.length * TRADING_ITEM_HEIGHT + 2, zIndex: 12 },
        enter: { height: tradingItems.length * TRADING_ITEM_HEIGHT + 2, zIndex: 12 },
        leave: { height: TRADING_ITEM_HEIGHT - 5 },
    });
    return orderOnTop ? (React.createElement("div", { style: { width: `${containerWidth}px` } },
        React.createElement(GroupOrderContainer, { ref: groupRef, y: y || 0, onMouseEnter: openGroupHandler, onMouseLeave: closeGroupHandler, opened: opened, disabled: orderOnTop.disabled },
            groupTransition((styles, show) => {
                return (show && (React.createElement(animated.div, { style: styles },
                    React.createElement(GroupOrderGroupContainer, null, tradingItems.map(o => isTradingItemVisible(o) &&
                        renderAltOrder(o, onSelect, onClick, onDblClick, {
                            onCloseOrder: removeOrder,
                            onClosePosition: removePosition,
                        }, Boolean(showPriceAsLabels), halfOrderHeight, false, onDragStart, currency))))));
            }),
            React.createElement(animated.div, { style: topOrderStyles },
                renderOrder(orderOnTop, Boolean(showPriceAsLabels), horizontalLineWidth, halfOrderHeight, currency),
                renderFakeOrders(tradingItems.length, Boolean(orderOnTop.disabled))),
            React.createElement(OrderLineStyled, { x: '100%', y: halfOrderHeight, width: horizontalLineWidth })))) : null;
});
function renderOrder(visualItem, showPriceAsLabels, horizontalLineWidth, halfOrderHeight, currency) {
    switch (visualItem.type) {
        case 'position':
            return (React.createElement(Position, { position: visualItem, y: 0, currency: currency, key: visualItem.model.id, horizontalLineWidth: horizontalLineWidth, halfOrderHeight: halfOrderHeight, isLineVisible: false }));
        case 'order': {
            if (isProtection(visualItem.model)) {
                return (React.createElement(ProtectionOrder, { order: visualItem, key: visualItem.model.id, showPriceAsLabels: showPriceAsLabels, horizontalLineWidth: horizontalLineWidth, isLineVisible: false }));
            }
            return (React.createElement(RegularOrder, { order: visualItem, key: visualItem.model.id, showPriceAsLabels: showPriceAsLabels, horizontalLineWidth: horizontalLineWidth, isLineVisible: false }));
        }
    }
}
function renderAltOrder(visualItem, onSelect, onDblClick, onClick, { onCloseOrder, onClosePosition }, showPriceAsLabels, halfOrderHeight, isLineVisible, onDragStart, currency) {
    switch (visualItem.type) {
        case 'position':
            return (React.createElement(PositionAlt, { position: visualItem, key: visualItem.model.id, onSelect: onSelect, onClose: onClosePosition, halfOrderHeight: halfOrderHeight, isLineVisible: isLineVisible, currency: currency }));
        case 'order': {
            if (isProtection(visualItem.model)) {
                return (React.createElement(ProtectionOrderAlt, { order: visualItem, key: visualItem.model.id, onClose: onCloseOrder, onSelect: onSelect, onClick: onClick, onDblClick: onDblClick, onDragStart: onDragStart, showPriceAsLabels: showPriceAsLabels, isLineVisible: isLineVisible }));
            }
            return (React.createElement(RegularOrderAlt, { order: visualItem, key: visualItem.model.id, onClose: onCloseOrder, onSelect: onSelect, onClick: onClick, onDblClick: onDblClick, onDragStart: onDragStart, showPriceAsLabels: showPriceAsLabels }));
        }
    }
}
function renderFakeOrders(ordersLength, disabled) {
    if (ordersLength === 2) {
        return React.createElement(GroupOrderFakeOrder, { disabled: disabled, selected: false });
    }
    if (ordersLength >= 3) {
        return (React.createElement(React.Fragment, null,
            React.createElement(GroupOrderFakeOrder2nd, { disabled: disabled, selected: false }),
            React.createElement(GroupOrderFakeOrder, { disabled: disabled, selected: false })));
    }
    return null;
}
