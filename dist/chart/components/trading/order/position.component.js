import React, { memo, useMemo, useCallback, useEffect, useState, useRef } from 'react';
import { OrderDelimiterStyled, OrderSectionStyled } from './components/order.styled';
import { PositionStyled, PositionSectionDelimiter, PositionSectionAltStyled, PositionContainerStyled, } from './position.styled';
import { OrderAlt } from './components/order-alt.component';
import { OrderSectionAltStyled } from './components/order-alt.styled';
import { PositionLineStyled } from './components/side.styled';
import { checkOrderIsOnUIOnly } from '../../../model/trading/trading.model';
import { defaultPositionPLFormatter } from '../../../model/trading/position.model';
import { animated, useTransition } from '@react-spring/web';
import { AddSLOrderBtnStyled, AddTPOrderBtnStyled, OrderSLTPShortcutSectionStyled } from './regular-order.styled';
import { renderSLTPShortcutSection } from './order.functions';
export const Position = memo((props) => {
    const { currency, position, horizontalLineWidth, onClose, onDeselect, onSelect, createProtectionOrder, halfOrderHeight, isLineVisible = true, takeProfitStopLossEnabled = false, y, } = props;
    const { disabled, model, selected } = position;
    const { side, pl, id, quantity } = model;
    // Manipulations with ref and state with width are needed because orders have "position: absolute".
    // To keep correct resize offset area, we set width for parent container
    const positionRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(130);
    const positive = useMemo(() => pl > 0, [pl]);
    const yCoord = useMemo(() => (y ? y - halfOrderHeight : 0), [halfOrderHeight, y]);
    const [isSLLinked, isTPLinked] = position.model.protectionOrderIds
        ? position.model.protectionOrderIds.map(id => !!id && !checkOrderIsOnUIOnly(id))
        : [false, false];
    const [showSLBtn, showTPBtn] = position.model.protectionOrderIds
        ? position.model.protectionOrderIds.map(id => Boolean(id))
        : [false, false];
    useEffect(() => {
        if (positionRef.current) {
            setContainerWidth(positionRef.current.clientWidth);
        }
    });
    const addTPOrderHandler = useCallback((e) => {
        e.stopPropagation();
        createProtectionOrder && createProtectionOrder('tp', id);
    }, [createProtectionOrder, id]);
    const addSLOrderHandler = useCallback((e) => {
        e.stopPropagation();
        createProtectionOrder && createProtectionOrder('sl', id);
    }, [createProtectionOrder, id]);
    const onDeselectHandler = useCallback(() => {
        if (onDeselect) {
            onDeselect(id);
        }
    }, [onDeselect, id]);
    const onSelectHandler = useCallback(() => {
        if (onSelect) {
            onSelect(id);
        }
    }, [onSelect, id]);
    const tpTransition = useTransition(selected && !showTPBtn, {
        config: {
            duration: 150,
        },
        from: { position: 'absolute', y: 0, top: 0, left: '50%', zIndex: -1, x: '-50%', opacity: 0 },
        enter: {
            y: side === 'buy' ? -20 : 20,
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
            y: side === 'buy' ? 20 : -20,
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
    const formatter = position.formatter || defaultPositionPLFormatter;
    const onCloseHandler = useCallback(() => onClose && onClose(id), [id, onClose]);
    return (React.createElement("div", { style: { width: `${containerWidth}px` } },
        React.createElement(PositionContainerStyled, { disabled: disabled, ref: positionRef, yCoord: yCoord },
            React.createElement(PositionStyled, { disabled: disabled, side: side, onSelect: onSelectHandler, onDeselect: onDeselectHandler, onClose: onCloseHandler, positive: positive, absoluteChildren: takeProfitStopLossEnabled && renderSLTPButtons, selected: selected, withDeselectBtn: true },
                React.createElement(OrderSectionStyled, null, quantity),
                React.createElement(PositionSectionDelimiter, { margin: "both", positive: positive }),
                React.createElement(OrderSectionStyled, null, formatter(pl, currency || '')),
                (isSLLinked || isTPLinked) && (React.createElement(React.Fragment, null,
                    React.createElement(OrderDelimiterStyled, { margin: "both" }),
                    React.createElement(OrderSLTPShortcutSectionStyled, null, renderSLTPShortcutSection(isSLLinked, isTPLinked)),
                    React.createElement(OrderDelimiterStyled, { margin: "left" }))),
                takeProfitStopLossEnabled ? renderSLTPButtons : null),
            isLineVisible && (React.createElement(PositionLineStyled, { x: '101%', y: halfOrderHeight, width: horizontalLineWidth, pl: pl, disabled: disabled })))));
});
export const PositionAlt = memo((props) => {
    const { position, currency, onClose, onSelect, onDeselect } = props;
    const { model } = position;
    const { side, pl, id, quantity } = model;
    const formatter = position.formatter || defaultPositionPLFormatter;
    const onCloseHandler = useCallback(() => onClose?.(id), [id, onClose]);
    const onSelectHandler = useCallback(() => onSelect?.(id), [id, onSelect]);
    const onDeselectHandler = useCallback(() => onDeselect && onDeselect(id), [id, onDeselect]);
    const positive = useMemo(() => pl > 0, [pl]);
    const [isSLLinked, isTPLinked] = position.model.protectionOrderIds
        ? position.model.protectionOrderIds.map(id => !!id && !checkOrderIsOnUIOnly(id))
        : [false, false];
    return (React.createElement(OrderAlt, { side: side, onSelect: onSelectHandler, onDeselect: onDeselectHandler, onClose: onCloseHandler },
        React.createElement(OrderSectionAltStyled, null, quantity),
        React.createElement(PositionSectionAltStyled, { positive: positive }, formatter(pl, currency)),
        (isSLLinked || isTPLinked) && (React.createElement(React.Fragment, null,
            React.createElement(OrderDelimiterStyled, { margin: "both" }),
            React.createElement(OrderSLTPShortcutSectionStyled, null, renderSLTPShortcutSection(isSLLinked, isTPLinked)),
            React.createElement(OrderDelimiterStyled, { margin: "left" })))));
});
