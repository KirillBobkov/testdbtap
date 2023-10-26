import * as React from 'react';
import Draggable from 'react-draggable';
import { memo, useCallback } from 'react';
const DragWrapper = memo((props) => {
    const { position, drag, children, bounds } = props;
    const handleStop = useCallback((event, dragElement) => {
        const { x, y } = dragElement;
        drag({ top: y, left: x });
    }, []);
    return (React.createElement(Draggable, { handle: props.handle, onStop: handleStop, position: { x: position.left, y: position.top }, bounds: bounds }, children));
});
export default DragWrapper;
