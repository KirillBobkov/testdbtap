import React, { memo, useCallback, useMemo } from 'react';
import { defaultOrderPriceFormatter, } from '../../../model/trading/order.model';
import { Order as OrderComponent } from './components/order.component';
import { OrderDelimiterStyled, OrderSectionStyled } from './components/order.styled';
import { AddSLOrderBtnStyled, AddTPOrderBtnStyled, OrderSLTPShortcutSectionStyled } from './regular-order.styled';
import { OrderAlt } from './components/order-alt.component';
import { animated, useTransition } from '@react-spring/web';
import { getRegularOrderName, renderSLTPShortcutSection } from './order.functions';
import { OrderLineStyled } from './components/side.styled';
import { checkOrderIsOnUIOnly, getOrderPriceByType, isProtection } from '../../../model/trading/trading.model';
export const RegularOrder = memo((props) => {
    const { order, createProtectionOrder, takeProfitStopLossEnabled, showPriceAsLabels, onClose, onDeselect, onSelect, onClick, onDblClick, isLineVisible = true, horizontalLineWidth, } = props;
    const { disabled, selected, model, marketPrice } = order;
    const { id, side, quantity, orderType, limitPrice, stopPrice } = model;
    const [isSLLinked, isTPLinked] = !isProtection(order.model) && order.model.protectionOrderIds
        ? order.model.protectionOrderIds.map(id => !!id && !checkOrderIsOnUIOnly(id))
        : [false, false];
    const [showSLBtn, showTPBtn] = !isProtection(order.model) && order.model.protectionOrderIds
        ? order.model.protectionOrderIds.map(id => Boolean(id))
        : [false, false];
    const onSelectHandler = useCallback(() => onSelect && !selected && onSelect(id), [id, onSelect, selected]);
    const onClickHandler = useCallback(() => onClick && onClick(id), [id, onClick]);
    const onDblClickHandler = useCallback(() => onDblClick && onDblClick(id), [id, onDblClick]);
    const onDeselectHandler = useCallback(() => onDeselect && onDeselect(id), [id, onDeselect]);
    const onCloseHandler = useCallback(() => onClose && onClose(id), [id, onClose]);
    const addTPOrderHandler = useCallback((e) => {
        e.stopPropagation();
        createProtectionOrder && createProtectionOrder('tp', id);
    }, [createProtectionOrder, id]);
    const addSLOrderHandler = useCallback((e) => {
        e.stopPropagation();
        createProtectionOrder && createProtectionOrder('sl', id);
    }, [createProtectionOrder, id]);
    const tpTransition = useTransition(selected && !showTPBtn, {
        config: {
            duration: 150,
        },
        from: { position: 'absolute', y: 0, top: 0, left: '50%', zIndex: -1, x: '-50%', opacity: 0 },
        enter: {
            y: -20,
            opacity: 1,
        },
        leave: showTPBtn ? { opacity: 0 } : { y: 0, opacity: 0 },
    });
    const slTransition = useTransition(selected && !showSLBtn, {
        config: {
            duration: 150,
        },
        from: { position: 'absolute', y: 0, top: 0, left: '50%', zIndex: -1, x: '-50%', opacity: 0 },
        enter: {
            y: 20,
            opacity: 1,
        },
        leave: showSLBtn ? { opacity: 0 } : { y: 0, opacity: 0 },
    });
    const renderSLTPButtons = useMemo(() => {
        return (React.createElement(React.Fragment, null,
            tpTransition((styles, show) => show && (React.createElement(animated.div, { style: styles },
                React.createElement(AddTPOrderBtnStyled, { onClick: addTPOrderHandler }, "Add Take Profit")))),
            slTransition((styles, show) => show && (React.createElement(animated.div, { style: styles },
                React.createElement(AddSLOrderBtnStyled, { onClick: addSLOrderHandler }, "Add Stop Loss"))))));
    }, [tpTransition, slTransition, addTPOrderHandler, addSLOrderHandler]);
    const price = getOrderPriceByType(orderType, limitPrice, stopPrice, marketPrice);
    return (React.createElement(React.Fragment, null,
        React.createElement(OrderComponent, { side: side, disabled: disabled, selected: selected, onSelect: onSelectHandler, onClick: onClickHandler, onDblClick: onDblClickHandler, onClose: onCloseHandler, onDeselect: onDeselectHandler, absoluteChildren: takeProfitStopLossEnabled && renderSLTPButtons, withDeselectBtn: true },
            React.createElement(OrderSectionStyled, null, quantity),
            React.createElement(OrderDelimiterStyled, { margin: "both" }),
            React.createElement(OrderSectionStyled, null, `${getRegularOrderName(orderType)} ${!showPriceAsLabels ? (order.formatter || defaultOrderPriceFormatter)(price) : ''}`),
            (isSLLinked || isTPLinked) && (React.createElement(React.Fragment, null,
                React.createElement(OrderDelimiterStyled, { margin: "both" }),
                React.createElement(OrderSLTPShortcutSectionStyled, null, renderSLTPShortcutSection(isSLLinked, isTPLinked)),
                React.createElement(OrderDelimiterStyled, { margin: "left" })))),
        isLineVisible && (React.createElement(OrderLineStyled, { x: '101%', y: 9.5, width: horizontalLineWidth, disabled: disabled, selected: selected }))));
});
export const RegularOrderAlt = memo((props) => {
    const { showPriceAsLabels, order, onClose, onDeselect, onSelect, onClick, onDblClick, onDragStart } = props;
    const { selected, model, marketPrice } = order;
    const { id, side, quantity, orderType, limitPrice, stopPrice } = model;
    const price = getOrderPriceByType(orderType, limitPrice, stopPrice, marketPrice);
    const [isSLLinked, isTPLinked] = !isProtection(order.model) && order.model.protectionOrderIds
        ? order.model.protectionOrderIds.map(id => !!id && !checkOrderIsOnUIOnly(id))
        : [false, false];
    const onSelectHandler = useCallback(() => onSelect && !selected && onSelect(id), [id, onSelect, selected]);
    const onClickHandler = useCallback(() => onClick && onClick(id), [id, onClick]);
    const onDblClickHandler = useCallback(() => onDblClick && onDblClick(id), [id, onDblClick]);
    const onDeselectHandler = useCallback(() => onDeselect && onDeselect(id), [id, onDeselect]);
    const onCloseHandler = useCallback(() => onClose && onClose(id), [id, onClose]);
    const onDragStartHandler = useCallback(() => onDragStart && onDragStart(id), [id, onDragStart]);
    return (React.createElement(OrderAlt, { side: side, onSelect: onSelectHandler, onClick: onClickHandler, onDblClick: onDblClickHandler, onClose: onCloseHandler, onDeselect: onDeselectHandler, onDragStart: onDragStartHandler },
        React.createElement(OrderSectionStyled, null, quantity),
        React.createElement(OrderDelimiterStyled, { margin: "both" }),
        React.createElement(OrderSectionStyled, null, `${getRegularOrderName(order.model.orderType)} ${!showPriceAsLabels ? (order.formatter || defaultOrderPriceFormatter)(price) : ''}`),
        (isSLLinked || isTPLinked) && (React.createElement(React.Fragment, null,
            React.createElement(OrderDelimiterStyled, { margin: "both" }),
            React.createElement(OrderSLTPShortcutSectionStyled, null, renderSLTPShortcutSection(isSLLinked, isTPLinked)),
            React.createElement(OrderDelimiterStyled, { margin: "left" })))));
});
