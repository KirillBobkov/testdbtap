import React, { memo, useMemo } from 'react';
import { plainItems } from '../../../model/chart-layers.model';
import { ChartLayersGroupItem } from '../chart-layers-group-item.component';
import { ChartLayersDraggableItem } from './chart-layers-draggable-item.component';
export const ChartLayersContentDraggableGroupItem = memo(props => {
    const { items, item, currentDestinationElement, portal, dragStyles, toggleVisibility, toggleLocked, onChangeName, onClickHandle, isSelected } = props;
    // TODO: Refactor, make ChartLayersItemList use plainItems by default with some tricks
    const itemIdx = useMemo(() => plainItems(items).findIndex(i => i.id === item.id), [item.id, items]);
    return (React.createElement(ChartLayersDraggableItem, { items: items, key: item.id + '_group', item: item, index: itemIdx, portal: portal, 
        // TODO: Refactor, get rid of currentDestinationElement at this component and that if at all, move it one level up
        dragStyles: currentDestinationElement?.index === itemIdx ? dragStyles : null },
        React.createElement(ChartLayersGroupItem, { group: item, toggleVisibility: toggleVisibility, toggleLocked: toggleLocked, onChangeName: onChangeName, onClickHandle: onClickHandle, isSelected: isSelected }, item.name)));
});
