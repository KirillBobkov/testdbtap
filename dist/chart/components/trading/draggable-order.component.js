import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { DraggableInner } from './order/group-order.styled';
import { skipSelectOrder } from './order/order.functions';
export const DraggableOrder = memo(props => {
    const { id, children, onDragStart, onDrag, onDragStop, halfOrderHeight, disabled, bounds, y, } = props;
    /**
     * 	react-draggable doesn't distinguish Drag and Click events:
     *	- ref with last position helps us to compare new one after dragging
     *	- ref with isDragging helps us to manage callbacks
     */
    const isDragging = useRef(false);
    const lastPositionY = useRef(y - halfOrderHeight);
    /**
     * 	Manipulations with ref and state with width are needed because orders have "position: absolute".
     *	To keep correct resize offset area, we set width for parent container
     */
    const draggableRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(130);
    useEffect(() => {
        if (draggableRef.current) {
            setContainerWidth(draggableRef.current.clientWidth);
        }
    });
    const onDragStopHandler = useCallback((_, data) => {
        isDragging.current = false;
        if (data.y !== lastPositionY.current) {
            onDragStop(id, data.y + halfOrderHeight);
        }
    }, [onDragStop, halfOrderHeight, id, lastPositionY]);
    const onDragHandler = useCallback((e, data) => {
        if (!isDragging.current) {
            isDragging.current = true;
            onDragStart();
        }
        onDrag(id, data.y + halfOrderHeight);
        skipSelectOrder(e, true);
    }, [halfOrderHeight, id, onDrag]);
    const onDragStartHandler = useCallback((_, data) => {
        lastPositionY.current = data.y;
    }, [onDragStart]);
    const dragBounds = useMemo(() => ({
        ...bounds,
        left: 0,
        right: 0,
    }), [bounds]);
    return (React.createElement("div", { style: { width: `${containerWidth}px` } },
        React.createElement(Draggable, { axis: 'y', position: { x: 0, y: y - halfOrderHeight }, bounds: dragBounds, onDrag: onDragHandler, onStart: onDragStartHandler, onStop: onDragStopHandler, disabled: disabled },
            React.createElement(DraggableInner, { disabled: disabled, ref: draggableRef },
                React.createElement(React.Fragment, null, children)))));
});
