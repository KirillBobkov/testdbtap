import React from 'react';
import ReactDOM from 'react-dom';
import { ColorPickerDraggableItemWrapper } from './ColorPickerPalette.styled';
export const ColorPickerDraggableItem = props => {
    const { portal, snapshot, provided, children } = props;
    const draggableItem = (React.createElement(ColorPickerDraggableItemWrapper, { ref: provided.innerRef, ...provided.draggableProps, ...{
            ...provided.dragHandleProps,
            tabIndex: -1,
        } }, children));
    if (snapshot.isDragging) {
        return ReactDOM.createPortal(draggableItem, portal);
    }
    return draggableItem;
};
