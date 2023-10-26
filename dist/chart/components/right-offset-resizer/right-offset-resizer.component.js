import React, { useCallback, useLayoutEffect, useContext, useRef, useState, useMemo, memo, forwardRef, } from 'react';
import { DraggableAxis, ResizerChildrenContainerStyled, ResizerContainerStyled, ResizerStyled, } from './right-offset-resizer.styled';
import Draggable from 'react-draggable';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { IconWrapper } from '../../../chart-kit/IconWrapper/IconWrapper.component';
export const OE_BTN_OFFSET = 24;
export const RightOffsetResizerComponent = memo(forwardRef((props, forwardedRef) => {
    const { rightOffset, onResizerHover, onResizerDrag, onResizerDragEnd, chartWidth, canvasHeight, children, ordersAndPositionsWidth, } = props;
    const buttonRef = useRef(null);
    const [showHighlight, setShowHighlight] = useState(false);
    const [buttonWidth, setButtonWidth] = useState(0);
    useLayoutEffect(() => {
        if (buttonRef.current) {
            buttonRef.current.clientWidth !== buttonWidth && setButtonWidth(buttonRef.current.clientWidth);
        }
    });
    const onDragStart = useCallback(() => {
        onResizerHover();
        setShowHighlight(true);
    }, [setShowHighlight, onResizerHover]);
    const onDragStopHandler = useCallback((_, data) => {
        onResizerHover();
        setShowHighlight(false);
        onResizerDragEnd(data.x);
    }, [onResizerHover, setShowHighlight]);
    const onDragHandler = useCallback((_, data) => {
        onResizerDrag(data.x);
    }, [onResizerDrag]);
    const [leftBorder, rightBorder] = useMemo(() => [ordersAndPositionsWidth, chartWidth - OE_BTN_OFFSET], 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [buttonWidth, chartWidth, rightOffset]);
    const bounds = useMemo(() => ({
        left: leftBorder,
        right: rightBorder,
        top: 0,
        bottom: 0,
    }), [leftBorder, rightBorder]);
    const iconsConfig = useContext(IconsOverridingContext);
    return (React.createElement(Draggable, { axis: 'x', onStart: onDragStart, onDrag: onDragHandler, onStop: onDragStopHandler, handle: ".resize-btn-handle", position: { y: 0, x: rightOffset }, bounds: bounds },
        React.createElement(DraggableAxis, { canvasHeight: canvasHeight },
            React.createElement("div", { style: { position: 'relative' } },
                React.createElement(ResizerContainerStyled, { className: 'resize-btn-handle', right: ordersAndPositionsWidth / 2 - buttonWidth / 2 },
                    React.createElement(ResizerStyled, { icon: React.createElement(IconWrapper, null, iconsConfig.trading.resizer), ref: buttonRef })),
                React.createElement(ResizerChildrenContainerStyled, { ref: forwardedRef, canvasHeight: canvasHeight, showHighlight: showHighlight }, children)))));
}));
