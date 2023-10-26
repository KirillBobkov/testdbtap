import React, { memo, useMemo } from 'react';
import { plainItems } from '../../../model/chart-layers.model';
import { ChartLayersDrawingItem } from '../chart-layers-drawing-item.component';
import { ChartLayersDraggableItem } from './chart-layers-draggable-item.component';
export const ChartLayersContentDraggableDrawingItem = memo(props => {
    const { items, item, style, currentDestinationElement, portal, dragStyles, toggleVisibility, toggleLocked, className, onClickHandle, isSelected, onChangeName, } = props;
    // TODO: Refactor, make ChartLayersItemList use plainItems by default with some tricks
    const itemIdx = useMemo(() => plainItems(items).findIndex(i => i.id === item.id), [item.id, items]);
    return (React.createElement(ChartLayersDraggableItem, { items: items, item: item, index: itemIdx, portal: portal, 
        // TODO: Refactor, get rid of currentDestinationElement at this component and that if at all, move it one level up
        dragStyles: currentDestinationElement?.index === itemIdx ? dragStyles : null },
        React.createElement(ChartLayersDrawingItem, { style: style, className: className, drawing: item, toggleVisibility: toggleVisibility, toggleLocked: toggleLocked, onClickHandle: onClickHandle, onChangeName: onChangeName, isSelected: isSelected }, item.name)));
});
