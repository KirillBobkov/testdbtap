import React, { forwardRef, memo, useCallback } from 'react';
import Draggable from 'react-draggable';
import { CHART_REACT_WRAPPER_ID } from '../../chart/chart-react-app.styled';
import { PopoverContentStyled, PopoverStyled } from './Popover.styled';
/**
 * UI of a `Popover` component.
 * It is very dumb, and just renders the UI on the position passed via `props`.
 */
export const PopoverUI = memo(forwardRef((props, ref) => {
    const { position, className, style, testId, children, draggableHandlerClass, draggableBounds, draggable = false, onDragStop, } = props;
    const onDragStopHandler = useCallback((e, data) => {
        const { x, y } = data;
        onDragStop && onDragStop({ x, y });
    }, [onDragStop]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Draggable, { bounds: draggableBounds, handle: draggableHandlerClass && `.${draggableHandlerClass}`, disabled: !draggable, onMouseDown: stopPropagation, onStop: onDragStopHandler, position: { ...position } },
            React.createElement(PopoverStyled, { className: `${CHART_REACT_WRAPPER_ID} ${className ?? ''}`, style: style, transformLeft: position.x, transformTop: position.y, "data-test-id": testId, ref: ref },
                React.createElement(PopoverContentStyled, null, children)))));
}));
function stopPropagation(e) {
    e.stopPropagation();
}
