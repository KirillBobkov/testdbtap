import React, { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
// use this component to create additional drag areas and improve chart layers DnD
export const EmptyDraggableArea = memo(props => {
    const { index, id } = props;
    return (React.createElement(Draggable, { isDragDisabled: true, draggableId: id, index: index }, (provided, snapshot) => {
        return (React.createElement("div", { tabIndex: -1, ref: provided.innerRef, ...provided.draggableProps, ...provided.dragHandleProps, style: { height: '5px', maxHeight: '5px' } },
            React.createElement(React.Fragment, null),
            snapshot.isDragging && (React.createElement("div", { tabIndex: -1, style: {
                    height: '5px',
                    maxHeight: '5px',
                } }))));
    }));
});
