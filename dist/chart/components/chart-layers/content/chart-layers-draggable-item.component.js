import React, { memo, useCallback } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ReactDOM from 'react-dom';
import { ChartLayersContentDraggableItemWrapper, DraggableItemStyled } from './chart-layers-content.styled';
export const ChartLayersDraggableItem = memo(props => {
    const { item, index, portal, children, dragStyles } = props;
    const renderDraggableItem = useCallback((provided, snapshot) => {
        const draggableItem = (React.createElement(DraggableItemStyled, { ref: provided.innerRef, ...provided.draggableProps, ...provided.dragHandleProps }, children));
        if (snapshot.isDragging && portal) {
            return ReactDOM.createPortal(draggableItem, portal);
        }
        return draggableItem;
    }, [children, portal]);
    return (React.createElement(Draggable, { draggableId: item.id, index: index }, (provided, snapshot) => {
        return (React.createElement(ChartLayersContentDraggableItemWrapper, { style: { ...dragStyles } },
            renderDraggableItem(provided, snapshot),
            snapshot.isDragging && children));
    }));
});
