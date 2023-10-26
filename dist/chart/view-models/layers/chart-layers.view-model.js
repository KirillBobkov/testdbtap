import { array, boolean, eq, option } from 'fp-ts';
import { observable } from 'fp-ts-rxjs';
import { constVoid, pipe } from 'fp-ts/function';
import { finalize, merge } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { context } from '../../../context/context2';
import { newSink } from '../../../context/sink2';
import { createAdapter } from '../../../utils/adapter.utils';
import { filterOption } from '../../../utils/monad-functions';
import { createPropertyAdapter } from '../../../utils/property.utils';
import { generateUniqFn, isDrawingLayerItem, isGroupLayerItem, moveLayerItem, plainItems as plainItemsCommon, updateItemInLayerItems, } from '../../model/chart-layers.model';
export const createChartLayersViewModel = context.combine(context.key()('chartId'), context.key()('drawingViewModel'), context.key()('chart'), context.key()('chartDataViewModel'), context.key()('initialLayerItems'), context.key()('multiChartViewModel'), context.key()('localization'), (chartId, drawingViewModel, chart, chartDataViewModel, initialLayerItems, multiChartViewModel, localization) => {
    const layerItemsChangedSubscribers = new Set();
    // A map of layer items for each instrument
    const [_setAllLayerItems, allLayerItems] = createPropertyAdapter(initialLayerItems);
    const setAllLayerItems = (allItems) => {
        const instrument = chartDataViewModel.instrument.getValue();
        if (option.isSome(instrument)) {
            const symbol = instrument.value.symbol;
            _setAllLayerItems(allItems);
            _setLayerItems(allItems[symbol] || []);
        }
    };
    // changeLayerItemsOnInstrumentChangedEffect should set the correct initial value
    const [_setLayerItems, layerItems] = createPropertyAdapter([]);
    const [handleAddLayerItem, addedLayerItem] = createAdapter();
    const plainItems = () => plainItemsCommon(layerItems.getValue());
    const getCurrentInstrumentSymbol = () => pipe(chartDataViewModel.instrument.getValue(), option.fold(() => '', i => i.symbol));
    const checkForUniqName = (name) => pipe(plainItems(), array.every(i => i.name !== name));
    const checkForUniqId = (id) => pipe(plainItems(), array.every(i => i.id !== id));
    const generateUniqName = generateUniqFn(checkForUniqName);
    const generateUniqId = generateUniqFn(checkForUniqId);
    //#region methods
    const onLayerItemsChanged = (cb) => {
        layerItemsChangedSubscribers.add(cb);
        return () => layerItemsChangedSubscribers.delete(cb);
    };
    const setLayerItems = (items) => pipe(chartDataViewModel.instrument.getValue(), option.fold(constVoid, i => {
        allLayerItems.getValue()[i.symbol] = items;
        _setLayerItems(items);
    }));
    const createGroup = (def) => {
        const layerItemsCount = pipe(layerItems.getValue(), array.filter(isGroupLayerItem), array.size);
        const name = generateUniqName(def?.name ?? `${localization.chartLayers.newGroupName} ${layerItemsCount}`, layerItemsCount);
        const id = generateUniqId(def?.id ?? `group_${getCurrentInstrumentSymbol()}_${layerItemsCount}`, layerItemsCount);
        const group = {
            name,
            id,
            type: 'group',
            locked: def?.locked ?? false,
            visible: def?.visible ?? true,
            items: def?.items ?? [],
            itemsVisibility: def?.items ? def.items.map(item => ({ id: item.id, visible: item.visible })) : [],
        };
        setLayerItems([...layerItems.getValue(), group]);
        handleAddLayerItem(group);
        return id;
    };
    const deleteItem = (item) => {
        const items = layerItems.getValue();
        if (item.groupId !== undefined) {
            pipe(items.filter(isGroupLayerItem).find(i => i.id === item.groupId && i.type === 'group'), option.fromNullable, option.fold(() => console.error(`groupId wasn't found: ${item.groupId ?? ''}`), group => {
                group.items = group.items.filter(i => i.id !== item.id);
                group.itemsVisibility = group.itemsVisibility.filter(i => i.id !== item.id);
            }));
        }
        const newItems = items.filter(i => i.id !== item.id);
        setLayerItems(newItems);
        switch (item.type) {
            case 'group':
                item.items.forEach(d => {
                    isDrawingLayerItem(d) && chart.drawings.removeDrawing(getDrawingChartCoreId(d.id));
                });
                break;
            case 'drawing':
                chart.drawings.removeDrawing(getDrawingChartCoreId(item.id));
                break;
        }
    };
    const deleteItemId = (id) => pipe(plainItems(), array.findFirst(i => i.id === id), option.fold(constVoid, deleteItem));
    const renameItem = (id, name) => {
        const layerItem = plainItems().find(i => i.id === id);
        if (!layerItem) {
            return;
        }
        pipe(layerItems.getValue(), (li) => {
            if (isGroupLayerItem(layerItem)) {
                return li.map(l => (l.id === layerItem.id ? { ...l, name } : l));
            }
            else {
                return li.map(l => {
                    if (isGroupLayerItem(l) && l.id === layerItem.groupId) {
                        return { ...l, items: l.items.map(i => (i.id === layerItem.id ? { ...i, name } : i)) };
                    }
                    return { ...l };
                });
            }
        }, setLayerItems);
    };
    const moveItem = (item, position, toGroupId) => setLayerItems(moveLayerItem(layerItems.getValue(), item, position, toGroupId));
    const createGroupOnSelectedItems = (items) => {
        const selectedLayerItems = plainItems()
            .filter(layerItem => items.find(selectedItem => layerItem.id === selectedItem))
            // unpack groups if any
            .reduce((total, item) => {
            if (item.type === 'group') {
                return [...total, ...item.items];
            }
            return [...total, item];
        }, [])
            // remove duplicates
            .reduce((total, item) => {
            if (total.find(totalEl => totalEl.name === item.name)) {
                return [...total];
            }
            return [...total, item];
        }, []);
        const makeGroupWithItems = (items) => {
            const newGroupId = createGroup();
            items.forEach((selectedItem, idx) => moveItem(selectedItem, idx, newGroupId));
            return newGroupId;
        };
        return pipe(selectedLayerItems, 
        // TODO make notification for user?
        i => (array.isEmpty(i) ? console.warn('No elements for group') : makeGroupWithItems(i)));
    };
    // TODO: Refactor, only one moveItem method should exist
    const reorderItemsDnD = (toIdx, draggingLayerItem, destinationLayerItem) => {
        switch (draggingLayerItem.type) {
            // dragging item is a drawing
            case 'drawing':
                switch (destinationLayerItem.type) {
                    // destination item is a drawing
                    case 'drawing':
                        // destination drawing is inside a group, insert inside a group at the position of the destination drawing
                        if (destinationLayerItem.groupId) {
                            // the group which contains destination child item
                            const targetGroup = layerItems
                                .getValue()
                                .find(g => g.id === destinationLayerItem.groupId);
                            let groupChildIdx = 0;
                            // child idx inside a group
                            if (targetGroup && isGroupLayerItem(targetGroup)) {
                                groupChildIdx = targetGroup.items.findIndex(item => item.id === destinationLayerItem.id);
                            }
                            return moveLayerItem(plainItems(), draggingLayerItem, groupChildIdx, destinationLayerItem.groupId);
                            // destination drawing is outside of group, reorder
                        }
                        else {
                            return moveLayerItem(plainItems(), draggingLayerItem, toIdx);
                        }
                    // destination item is a group, insert drawing at the top of a group list
                    case 'group':
                        return moveLayerItem(plainItems(), draggingLayerItem, 0, destinationLayerItem.id);
                }
                break;
            // dragging item is a group
            case 'group':
                // if the destination item is a child of some group then do nothing
                if (destinationLayerItem.groupId) {
                    return layerItems.getValue();
                }
                // otherwise reorder
                return moveLayerItem(plainItems(), draggingLayerItem, toIdx);
        }
    };
    const moveItemDnD = (fromIdx, toIdx) => {
        const draggingLayerItem = plainItems()[fromIdx];
        const destinationLayerItem = plainItems()[toIdx];
        if (draggingLayerItem && destinationLayerItem) {
            // same item, do nothing
            if (draggingLayerItem.id === destinationLayerItem.id) {
                return;
            }
            const reorderedItems = reorderItemsDnD(toIdx, draggingLayerItem, destinationLayerItem);
            // since plainItems are used instead of layerItems we need to filter out all groups child items which are duplicated outside of their groups
            setLayerItems(reorderedItems.filter(i => !i.groupId));
        }
    };
    const updateItemLock = (item, locked) => {
        switch (item.type) {
            case 'group':
                item.items.forEach(i => {
                    switch (i.type) {
                        case 'drawing':
                            chart.drawings.setDrawingLocked(i.drawing, locked);
                            break;
                    }
                });
                break;
            case 'drawing':
                chart.drawings.setDrawingLocked(item.drawing, locked);
                break;
        }
        pipe(layerItems.getValue(), updateItemInLayerItems(i => ({ ...i, locked }), item.id), setLayerItems);
    };
    const setItemLock = (lock = true) => (id) => {
        pipe(plainItems(), array.findFirst(i => i.id === id), option.fold(() => console.warn(`${id} id doesn't exists`), item => updateItemLock(item, lock)));
    };
    const updateItemVisibility = (item, visible) => {
        switch (item.type) {
            case 'group':
                item.items.forEach(i => {
                    if (isDrawingLayerItem(i)) {
                        // if we turn on visibility of a group we have to restore previous visibility state of its children
                        // and if previous state not found fallback to group visibility
                        if (visible) {
                            pipe(item.itemsVisibility.find(v => v.id === i.id), prevState => (prevState ? prevState.visible ?? visible : visible), v => chart.drawings.setDrawingVisible(i.drawing, v));
                        }
                        else {
                            // if we turn off visibility of a group we have to hide all children of it
                            chart.drawings.setDrawingVisible(i.drawing, visible);
                        }
                    }
                });
                break;
            case 'drawing':
                chart.drawings.setDrawingVisible(item.drawing, visible);
                // Update drawings visibility status in group and make group visible if needed
                pipe(plainItems()
                    .filter(isGroupLayerItem)
                    .find(i => i.id === item.groupId), option.fromNullable, option.fold(() => console.warn(`${item.id} doesn't have a group`), group => {
                    group.itemsVisibility = group.items.map(item => ({
                        id: item.id,
                        visible: item.visible,
                    }));
                    if (visible && !group.visible) {
                        updateItemVisibility(group, true);
                    }
                }));
                break;
        }
        pipe(layerItems.getValue(), 
        // same logic as above: drawing visibility status depends on group(on|off)
        updateItemInLayerItems(i => i.type === 'drawing' && i.groupId && visible
            ? pipe(plainItems()
                .filter(isGroupLayerItem)
                .find(g => g.id === i.groupId), group => {
                if (group) {
                    const lastKnownVisibility = group.itemsVisibility.find(v => v.id === i.id);
                    return lastKnownVisibility
                        ? lastKnownVisibility.visible ?? visible
                        : visible;
                }
                else {
                    return visible;
                }
            }, v => ({ ...i, visible: v }))
            : { ...i, visible }, item.id), setLayerItems);
    };
    const setItemVisible = (visible = true) => (id) => pipe(plainItems(), array.findFirst(i => i.id === id), option.fold(() => console.warn(`${id} id doesn't exists`), item => updateItemVisibility(item, visible)));
    const addDrawingLayerItem = (drawing) => {
        const orderNumber = plainItems().filter(d => isDrawingLayerItem(d) && d.drawing.type === drawing.type).length + 1;
        const name = generateUniqName(formatDrawingName(localization.drawings.types[drawing.type], orderNumber), orderNumber);
        const newItem = {
            id: getDrawingLayerItemId(drawing),
            type: 'drawing',
            name,
            drawing,
            visible: drawing.visible,
            locked: drawing.locked,
        };
        setLayerItems([newItem, ...layerItems.getValue()]);
        handleAddLayerItem(newItem);
    };
    const syncExistingItems = (drawings, items) => drawings.forEach(d => {
        const found = items.find(i => getDrawingLayerItemId(d._internalDrawing) === i.id);
        if (found) {
            // can't use setItemVisible/setItemLock here because it will cause update in chart-core
            pipe(layerItems.getValue(), updateItemInLayerItems(i => ({ ...i, locked: d.locked, visible: d.visible }), found.id), setLayerItems);
        }
    });
    const syncRemovedItems = (drawings, items) => items
        .filter(i => !drawings.find(d => getDrawingLayerItemId(d._internalDrawing) === i.id))
        .forEach(deleteItem);
    const syncAddedItems = (drawings, items) => drawings
        .filter(d => !items.find(i => getDrawingLayerItemId(d._internalDrawing) === i.id))
        .forEach(d => addDrawingLayerItem(d._internalDrawing));
    const syncAllItems = (drawings, items) => {
        syncExistingItems(drawings, items);
        syncRemovedItems(drawings, items);
        syncAddedItems(drawings, items);
    };
    //#endregion
    //#region effects
    const changeLayerItemsOnInstrumentChangedEffect = pipe(chartDataViewModel.instrument, filterOption(), tap(instrument => {
        // TODO: Research why layerItems are not initially updated after page reload
        const layerItems = allLayerItems.getValue()[instrument.symbol] ?? [];
        setLayerItems(layerItems);
        layerItems.forEach(li => {
            setItemVisible(li.visible)(li.id);
            setItemLock(li.locked ?? false)(li.id);
        });
    }));
    const syncDrawingsLayerItemsEffect = pipe(drawingViewModel.drawings, observable.map(drawings => drawings[option.toUndefined(chartDataViewModel.instrument.getValue())?.symbol ?? ''] ?? []), tap(drawings => {
        const items = plainItems().filter(isDrawingLayerItem);
        syncAllItems(drawings, items);
    }));
    const syncLayerItemsOrderChangedTochartEffect = pipe(layerItems, observable.map(() => pipe(plainItems(), array.filter(isDrawingLayerItem))), distinctUntilChanged(drawingsEq.equals), tap(drawings => pipe(drawings, array.map(d => d.id), chart.drawings.setDrawingsOrder)));
    const updateLayoutWithLayerItemsEffect = pipe(layerItems, tap(() => {
        multiChartViewModel.updateLocalChartInfo(chartId, {
            layers: {
                ...multiChartViewModel.getSelectedChartInfo().layers,
                layerItems: allLayerItems.getValue(),
            },
        });
    }));
    const syncLayerItemsWhenSidebarHideDrawingsButtonChangedEffect = pipe(drawingViewModel.isVisible, distinctUntilChanged(), tap(isVisible => {
        plainItems()
            .filter(isGroupLayerItem)
            .forEach(g => setItemVisible(isVisible)(g.id));
    }));
    const notifyLayerItemsChangedEffect = pipe(layerItems, tap(() => layerItemsChangedSubscribers.forEach(cb => cb(chartId, allLayerItems.getValue()))), finalize(() => layerItemsChangedSubscribers.clear()));
    //#endregion
    const effects = merge(changeLayerItemsOnInstrumentChangedEffect, syncDrawingsLayerItemsEffect, syncLayerItemsOrderChangedTochartEffect, updateLayoutWithLayerItemsEffect, notifyLayerItemsChangedEffect, syncLayerItemsWhenSidebarHideDrawingsButtonChangedEffect);
    return newSink({
        layerItems,
        addedLayerItem,
        setAllLayerItems,
        createGroup,
        renameItem,
        deleteItem: deleteItemId,
        moveItem,
        createGroupOnSelectedItems,
        // TODO: Refactor, only one moveItem method should exist
        moveItemDnD,
        setItemLock: (id, lock) => setItemLock(lock)(id),
        setItemVisible: (id, visible) => setItemVisible(visible)(id),
        onLayerItemsChanged,
    }, effects);
});
export const drawingsEq = array.getEq(eq.struct({
    id: eq.eqStrict,
    visible: boolean.Eq,
    locked: boolean.Eq,
}));
const formatDrawingName = (name, id) => {
    return `${name} ${id}`;
};
// removes "drawing_" prefix to match drawingsModel id
export const getDrawingChartCoreId = (layerDrawingId) => {
    return layerDrawingId.replace('drawing_', '');
};
export const getDrawingLayerItemId = (drawing) => `drawing_${drawing.id}`;
