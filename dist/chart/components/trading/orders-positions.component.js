import { array, option } from 'fp-ts';
import { head } from 'fp-ts/Array';
import { constNull, pipe } from 'fp-ts/function';
import React, { memo, useCallback, useLayoutEffect, useRef, useState, useMemo } from 'react';
import { RightOffsetResizerComponent } from '../right-offset-resizer/right-offset-resizer.component';
import { DraggableOrder } from './draggable-order.component';
import { GroupOrder } from './order/group-order.component';
import { Position } from './order/position.component';
import { RegularOrder } from './order/regular-order.component';
import { useClickAway } from '../../../chart-kit/utils/useClickAway';
import { ProtectionOrder } from './order/protection-order.component';
import { isProtection } from '../../model/trading/trading.model';
export const OrderAndPositions = memo(props => {
    const { removeOrder, selectTradingItem, onOrderClick, onOrderDblClick, deselectTradingItem, removePosition, onOrderDragStart, onOrderDrag, updateOrderPosition, createProtectionOrder, onDragStartFromGroup, onGroupItemSelect, orderHeight, currency, takeProfitStopLossEnabled, showPriceAsLabels, ordersBounds, isDragging, tradingSettings, editableItemsPresented, priceToY, visibleOrders, visiblePositions, visibleGroups, resizer, chartWidth, } = props;
    const halfOrderHeight = orderHeight / 2;
    // We need to get container width, because it is responsive, and depends on largest order/position inside it
    const ordersAndPositionsContainerRef = useRef(null);
    const [orderAndPositionsWidth, setOrderAndPositionsWidth] = useState(130);
    useLayoutEffect(() => {
        if (ordersAndPositionsContainerRef.current) {
            setOrderAndPositionsWidth(ordersAndPositionsContainerRef.current.clientWidth);
        }
    });
    const orderAndPositionsOffset = useMemo(() => 
    // if order and positions container goes outside after chart resize => adjust offset
    resizer.rightOffset - orderAndPositionsWidth <= 0 ? orderAndPositionsWidth : resizer.rightOffset, [resizer.rightOffset, chartWidth]);
    const horizontalLineWidth = useMemo(() => chartWidth - orderAndPositionsOffset, [chartWidth, orderAndPositionsOffset]);
    const renderOrder = useCallback((o) => (React.createElement(DraggableOrder, { key: o.model.id, id: o.model.id, onDragStart: onOrderDragStart, onDrag: onOrderDrag, onDragStop: updateOrderPosition, halfOrderHeight: halfOrderHeight, y: o.y ?? 0, disabled: o.model.orderType === 'market', bounds: ordersBounds }, !isProtection(o.model) ? (React.createElement(RegularOrder, { order: o, takeProfitStopLossEnabled: takeProfitStopLossEnabled, onClose: removeOrder, onSelect: selectTradingItem, onClick: onOrderClick, onDblClick: onOrderDblClick, onDeselect: deselectTradingItem, createProtectionOrder: createProtectionOrder, showPriceAsLabels: showPriceAsLabels, horizontalLineWidth: horizontalLineWidth })) : (React.createElement(ProtectionOrder, { order: o, onClose: removeOrder, onSelect: selectTradingItem, onClick: onOrderClick, onDblClick: onOrderDblClick, onDeselect: deselectTradingItem, showPriceAsLabels: showPriceAsLabels, horizontalLineWidth: horizontalLineWidth })))), [
        horizontalLineWidth,
        showPriceAsLabels,
        takeProfitStopLossEnabled,
        ordersBounds,
        halfOrderHeight,
        onOrderDrag,
        onOrderDragStart,
        removeOrder,
        createProtectionOrder,
        selectTradingItem,
        deselectTradingItem,
        updateOrderPosition,
    ]);
    const renderPosition = useCallback((p) => (React.createElement(Position, { takeProfitStopLossEnabled: takeProfitStopLossEnabled, onSelect: selectTradingItem, createProtectionOrder: createProtectionOrder, y: p.y || 0, key: p.model.id, position: p, currency: currency, onClose: removePosition, onDeselect: deselectTradingItem, horizontalLineWidth: horizontalLineWidth, halfOrderHeight: halfOrderHeight })), [horizontalLineWidth, currency, deselectTradingItem, halfOrderHeight, removePosition]);
    const orderNodes = visibleOrders.map(vo => tradingSettings.showOrders && renderOrder(vo));
    const positionNodes = visiblePositions.map(vp => tradingSettings.showPositions && renderPosition(vp));
    const groupedNodes = visibleGroups.map(group => {
        const visibleGroupItems = pipe(group.items, array.filter(item => (item.type === 'order' ? tradingSettings.showOrders : tradingSettings.showPositions)));
        // render group as a single item if only one item is visible
        return visibleGroupItems.length === 1 ? (pipe(visibleGroupItems, head, option.fold(constNull, vo => {
            switch (vo.type) {
                case 'order':
                    return renderOrder(vo);
                case 'position':
                    return renderPosition(vo);
            }
        }))) : (React.createElement(GroupOrder, { removeOrder: removeOrder, removePosition: removePosition, key: group.groupPrice, y: priceToY(group.groupPrice) - halfOrderHeight, currency: currency, tradingItems: visibleGroupItems, onSelect: onGroupItemSelect, horizontalLineWidth: horizontalLineWidth, halfOrderHeight: halfOrderHeight, onDragStart: onDragStartFromGroup, isDragging: isDragging, tradingSettings: tradingSettings, editableItemsPresented: editableItemsPresented }));
    });
    const orderCreated = visibleOrders.length > 0 || visiblePositions.length > 0 || visibleGroups.length > 0;
    useClickAway(ordersAndPositionsContainerRef, deselectTradingItem);
    return (React.createElement(React.Fragment, null, orderCreated ? (React.createElement(RightOffsetResizerComponent, { rightOffset: orderAndPositionsOffset, canvasHeight: resizer.canvasHeight, onResizerHover: props.onResizerHover, onResizerDrag: props.onResizerDrag, onResizerDragEnd: props.onResizerDragEnd, chartWidth: chartWidth, ref: ordersAndPositionsContainerRef, ordersAndPositionsWidth: orderAndPositionsWidth },
        React.createElement(React.Fragment, null,
            orderNodes,
            positionNodes,
            groupedNodes))) : null));
});
export default OrderAndPositions;
