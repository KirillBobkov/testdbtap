import React, { memo, useState, useCallback, forwardRef } from 'react';
import { Scrollable } from '../../../../chart-kit/Scrollable/Scrollable';
import { isGroupLayerItem } from '../../../model/chart-layers.model';
import { ChartLayersFooter } from '../footer/chart-layers-footer.component';
import { ChartLayersHeader } from '../header/chart-layers-header.component';
import { ChartLayersItemList } from './chart-layers-content-item-list.component';
import { DEFAULT_GROUP_ID } from '../../../model/drawing-groups.model';
import { ChartLayerContentWrapper, ChartLayersBodyStyled } from './chart-layers-content.styled';
export const ChartLayersContent = memo(forwardRef((props, ref) => {
    const { onClose, headerClassName, layerItems, createGroup, setItemVisible, setItemLocked, renameItem, moveItemDnD, deleteItem, } = props;
    const [selectedItems, setItemSelected] = useState([]);
    const deleteSelectedItems = useCallback(() => {
        selectedItems.filter(item => item !== DEFAULT_GROUP_ID).map(item => deleteItem(item));
        setItemSelected([]);
    }, [selectedItems]);
    const groupSelectedItems = useCallback(() => {
        createGroup(selectedItems);
    }, [selectedItems]);
    const onKeyDown = useCallback((e) => {
        switch (e.code) {
            case 'Backspace':
            case 'Delete':
                e.stopPropagation();
                deleteSelectedItems();
                break;
        }
    }, [deleteSelectedItems]);
    const showFooterBorder = useCallback(() => {
        const showBorderFromNumberOfItems = 13;
        return layerItems.flatMap((layerItem) => {
            if (isGroupLayerItem(layerItem)) {
                return [...layerItem.items, layerItem.id];
            }
            return layerItem;
        }).length > showBorderFromNumberOfItems;
    }, [layerItems]);
    return (React.createElement(ChartLayerContentWrapper, { ref: ref },
        React.createElement(ChartLayersHeader, { className: headerClassName, onClose: onClose }),
        React.createElement(ChartLayersBodyStyled, { onKeyDown: onKeyDown, isFooterVisible: selectedItems.length > 0 },
            React.createElement(Scrollable, null,
                React.createElement(ChartLayersItemList, { layerItems: layerItems, toggleLocked: setItemLocked, toggleVisibility: setItemVisible, renameItem: renameItem, moveItemDnD: moveItemDnD, deleteItem: deleteItem, selectedItems: selectedItems, onClickHandle: setItemSelected })),
            selectedItems.length > 0 &&
                React.createElement(ChartLayersFooter, { onCreateGroup: groupSelectedItems, onDelete: deleteSelectedItems, showBorder: showFooterBorder() }))));
}));
