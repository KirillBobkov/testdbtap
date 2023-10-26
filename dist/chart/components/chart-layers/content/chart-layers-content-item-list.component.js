import React, { memo, useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { isDrawingLayerItem, isGroupLayerItem, plainItems } from '../../../model/chart-layers.model';
import { ChartLayersAccordionStyled, ChartLayersItemListStyled, DroppableContainer, } from './chart-layers-content.styled';
import { ChartLayersContentDraggableGroupItem } from './chart-layers-content-draggable-group-item.component';
import { ChartLayersContentDraggableDrawingItem } from './chart-layers-content-draggable-drawing-item.component';
import { DEFAULT_GROUP_ID } from '../../../model/drawing-groups.model';
export const ChartLayersItemList = memo(props => {
    const { layerItems, toggleVisibility, toggleLocked, renameItem, moveItemDnD, deleteItem, selectedItems, onClickHandle, } = props;
    //#region drag and drop logic
    const [portal, setPortal] = useState(undefined);
    useLayoutEffect(() => {
        const _portal = document.createElement('div');
        _portal.setAttribute('class', 'layerItems');
        document.body.appendChild(_portal);
        setPortal(_portal);
        return () => {
            _portal.remove();
        };
    }, []);
    const [isDragging, setIsDragging] = useState(false);
    const [currentDraggingElement, setCurrentDraggingElement] = useState(null);
    const [currentDestinationElement, setCurrentDestinationElement] = useState(null);
    const onDragStart = useCallback((dragStartInfo) => {
        setCurrentDraggingElement(dragStartInfo.source);
        setCurrentDestinationElement(dragStartInfo.source);
        setIsDragging(true);
    }, []);
    const onDragUpdate = useCallback((dragUpdateInfo) => {
        if (dragUpdateInfo.destination) {
            setCurrentDestinationElement(dragUpdateInfo.destination);
        }
    }, []);
    const onDragEnd = useCallback((dragEndInfo) => {
        setIsDragging(false);
        // if dragging out of droppable => delete the item, also don't delete the default group
        if (!dragEndInfo.destination && dragEndInfo.draggableId !== DEFAULT_GROUP_ID) {
            deleteItem(dragEndInfo.draggableId);
            return;
        }
        if (currentDraggingElement && dragEndInfo.destination) {
            const { destination, source } = dragEndInfo;
            moveItemDnD(source.index, destination.index);
        }
    }, [currentDraggingElement, deleteItem, moveItemDnD]);
    const resolveDragStyles = useCallback((currentDestinationElement) => {
        if (currentDestinationElement && currentDraggingElement && isDragging) {
            const dataElemHover = plainItems(layerItems)[currentDestinationElement.index];
            const dataElemDrag = plainItems(layerItems)[currentDraggingElement.index];
            if (!dataElemHover || !dataElemDrag) {
                return {};
            }
            if (currentDestinationElement.index > currentDraggingElement.index ||
                (dataElemDrag.type === 'drawing' && dataElemHover.type === 'group')) {
                return { borderBottom: '2px solid var(--button-focus-border)' };
            }
            else if (currentDestinationElement.index < currentDraggingElement.index) {
                return { borderTop: '2px solid var(--button-focus-border)' };
            }
        }
        return {};
    }, [currentDraggingElement, layerItems, isDragging]);
    const dragStyles = useMemo(() => currentDestinationElement && resolveDragStyles(currentDestinationElement), [currentDestinationElement, resolveDragStyles]);
    //#endregion
    return portal ? (React.createElement(DragDropContext, { onDragStart: onDragStart, onDragUpdate: onDragUpdate, onDragEnd: onDragEnd },
        React.createElement(DroppableContainer, null,
            React.createElement(Droppable, { droppableId: 'layerItemsDroppable' }, provided => (React.createElement(ChartLayersItemListStyled, { ref: provided.innerRef, ...provided.droppableProps }, layerItems.map(item => {
                return isGroupLayerItem(item) ? (React.createElement(ChartLayersAccordionStyled, { key: item.id, skipAnimation: true, isSelected: selectedItems.includes(item.id), isHidden: !item.visible, wrapper: React.createElement(ChartLayersContentDraggableGroupItem, { key: item.id + '_group', items: layerItems, item: item, toggleVisibility: toggleVisibility, toggleLocked: toggleLocked, onChangeName: renameItem, currentDestinationElement: currentDestinationElement, portal: portal, dragStyles: dragStyles, onClickHandle: onClickHandle, isSelected: selectedItems.includes(item.id) }) }, item.items.map(innerItemI => isDrawingLayerItem(innerItemI) && (React.createElement(ChartLayersContentDraggableDrawingItem, { style: { paddingLeft: 'var(--spacer-8)' }, key: innerItemI.id, items: layerItems, item: innerItemI, toggleVisibility: toggleVisibility, toggleLocked: toggleLocked, onChangeName: renameItem, currentDestinationElement: currentDestinationElement, portal: portal, dragStyles: dragStyles, onClickHandle: onClickHandle, isSelected: selectedItems.includes(innerItemI.id) }))))) : (React.createElement(ChartLayersContentDraggableDrawingItem, { key: item.id, items: layerItems, item: item, toggleVisibility: toggleVisibility, toggleLocked: toggleLocked, onChangeName: renameItem, currentDestinationElement: currentDestinationElement, portal: portal, dragStyles: dragStyles, onClickHandle: onClickHandle, isSelected: selectedItems.includes(item.id) }));
            }))))))) : null;
});
