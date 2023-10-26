import React, { useCallback } from 'react';
import { memo } from 'react';
import ReactDOM from 'react-dom';
import { IndicatorItemDraggableContentStyled } from './indicator-item-draggable.styled';
export const IndicatorItemDraggable = memo(props => {
    const { snapshot, provided, portal, children, transform, draggable, focusIn, focusOut, onKeyDown, ariaDescribedBy, testId, } = props;
    const focusInHandler = useCallback(() => focusIn?.(), [focusIn]);
    const focusOutHandler = useCallback(() => focusOut?.(), [focusOut]);
    const mouseEnterHandler = useCallback(() => focusIn?.(), [focusIn]);
    const mouseLeaveHandler = useCallback(() => focusOut?.(), [focusOut]);
    // overrides default beautiful-dnd aria-description on li if present
    const overrideAriaDescribedBy = useCallback((element) => {
        ariaDescribedBy && element.setAttribute('aria-describedby', ariaDescribedBy);
        testId && element.setAttribute('data-test-id', testId);
    }, [ariaDescribedBy, testId]);
    // function is crucial to make beautiful-dnd working
    const setRef = useCallback((element) => {
        provided.innerRef(element);
        element && overrideAriaDescribedBy(element);
    }, [provided, overrideAriaDescribedBy]);
    const child = draggable === false ? (React.createElement(IndicatorItemDraggableContentStyled, { onKeyDown: onKeyDown }, children)) : (React.createElement(IndicatorItemDraggableContentStyled, { onFocus: focusInHandler, onBlur: focusOutHandler, onMouseEnter: mouseEnterHandler, onMouseLeave: mouseLeaveHandler, isDragging: snapshot.isDragging, allowTransform: transform, ref: setRef, onKeyDown: onKeyDown, ...provided.draggableProps, ...{
            ...provided.dragHandleProps,
            tabIndex: 0,
        } }, children));
    if (snapshot.isDragging) {
        return ReactDOM.createPortal(child, portal);
    }
    return child;
});
