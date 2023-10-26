import { CanvasElement, CHART_UUID } from '@devexperts/dxcharts-lite/dist/chart/canvas/canvas-bounds-container';
import { pixelsToUnits } from '@devexperts/dxcharts-lite/dist/chart/model/scaling/viewport.model';
import { array, option, record } from 'fp-ts';
import { observable } from 'fp-ts-rxjs';
import { constVoid, pipe } from 'fp-ts/function';
import { combineLatest, merge, Observable, pairwise } from 'rxjs';
import cloneDeep from 'lodash.clonedeep';
import { distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { context } from '../../../context/context2';
import { newSink } from '../../../context/sink2';
import { callTracerProxy } from '../../../utils/debug/call-tracer';
import { filterOption } from '../../../utils/monad-functions';
import { convertToProperty, createPropertyAdapter } from '../../../utils/property.utils';
import { chartSettingsLens } from '../chart-configurator.view-model';
import { groupTradingItems } from '../utils/trading-items-grouping-algorithm';
import { createOrdersAndPositionsHighLowProvider } from './orders-and-positions-high-low-provider';
import { createProtectionOrderFromOriginalItem, findAllRelatedItems, getItemById, linkProtectionOrderToOriginalItem, mapOrderToVisualOrder, mapPositionToVisualPosition, tradingItemVisibilityInHighLow, unLinkOrderFromOriginalOrder, } from './trading-functions';
import { checkOrderIsOnUIOnly, getTradingItemPrice, isPosition, isProtection } from '../../model/trading/trading.model';
// TODO calculate this dynamically, but with huge debounce
export const TRADING_ITEM_HEIGHT = 19;
export const DEFAULT_RIGHT_OFFSET = 100;
const ORDER_VERTICAL_OFFSET = 20;
export const createTradingViewModel = context.combine(context.key()('chart'), context.key()('orderProvider'), context.key()('positionProvider'), context.key()('chartDataViewModel'), context.key()('chartReactConfig'), context.key()('multiChartViewModel'), context.key()('orderEntryViewModel'), context.key()('tradingCoreViewModel'), context.key()('yAxisConfiguratorViewModel'), context.key()('chartConfiguratorViewModel'), context.key()('chartId'), (chart, orderProvider, positionProvider, chartDataViewModel, chartReactConfig, multiChartViewModel, orderEntryVM, tradingCoreVM, yAxisConfiguratorVM, configVM, chartId) => {
    const [setEditableOrders, editableOrders] = createPropertyAdapter({});
    const [setEditablePositions, editablePositions] = createPropertyAdapter({});
    const [setOrders, orders] = createPropertyAdapter({});
    const [setPositions, positions] = createPropertyAdapter({});
    const [setGroupedVisualTradingItems, groupedVisualTradingItems] = createPropertyAdapter({});
    const [setResizer, resizer] = createPropertyAdapter({
        visible: orderEntryVM.orderEntryEnabled.getValue(),
        rightOffset: 0,
        canvasHeight: chart.canvasBoundsContainer.getBounds(CanvasElement.PANE_UUID(CHART_UUID)).height,
    });
    // TODO do we really need this height?
    const [setOrderHeight, orderHeight] = createPropertyAdapter(TRADING_ITEM_HEIGHT);
    const [setOrdersBounds, ordersBounds] = createPropertyAdapter({ top: 0, bottom: 1080 });
    const [setIsDragging, isDragging] = createPropertyAdapter(false);
    const [, showPriceAsLabels] = createPropertyAdapter(chartReactConfig.trading.showPriceAsLabels);
    const orderClickedEventSubscribers = new Set();
    const orderDblClickedEventSubscribers = new Set();
    const createOrderFromOrderEntry = (orderType, side) => {
        const order = orderEntryVM.orderEntry.getValue();
        const price = orderEntryVM.orderEntryPrice.getValue();
        createOriginalOrder(orderType, side, price, order.quantity);
    };
    const createOriginalOrder = (orderType, side, price, quantity) => pipe(chartDataViewModel.instrument.getValue(), option.fold(() => console.warn('Instrument is not presented'), instrument => {
        if (quantity) {
            orderProvider.createOrder(instrument.symbol, {
                orderType,
                type: 'original',
                side,
                limitPrice: price,
                stopPrice: price,
                quantity,
            });
        }
    }));
    const onOrderClickEventRegister = (cb) => {
        orderClickedEventSubscribers.add(cb);
        return () => orderClickedEventSubscribers.delete(cb);
    };
    const onOrderDblClickEventRegister = (cb) => {
        orderDblClickedEventSubscribers.add(cb);
        return () => orderDblClickedEventSubscribers.delete(cb);
    };
    const onOrderClick = (id) => {
        const allOrders = getAllOrders();
        pipe(allOrders, getItemById(id), option.fold(() => console.warn(`Order with id=${id} was clicked but not found in list of orders`), (order) => {
            orderClickedEventSubscribers.forEach(cb => cb(chartId, order));
        }));
    };
    const onOrderDblClick = (id) => {
        const allOrders = getAllOrders();
        pipe(allOrders, getItemById(id), option.fold(() => console.warn(`Order with id=${id} was dblclicked but not found in list of orders`), order => {
            orderDblClickedEventSubscribers.forEach(cb => cb(chartId, order));
        }));
    };
    const getAllOrders = () => {
        return { ...orders.getValue(), ...editableOrders.getValue() };
    };
    const getAllPositions = () => {
        return { ...positions.getValue(), ...editablePositions.getValue() };
    };
    const priceToAxisValue = (price) => chart.chartModel.mainCandleSeries.view.toAxisUnits(price);
    const checkTradingItemInBoundsPredicate = (item, highLow, marketPriceValue) => tradingItemVisibilityInHighLow(priceToAxisValue(getTradingItemPrice(item, marketPriceValue)), highLow);
    const updatePositionPredicate = (item, highLow) => tradingItemVisibilityInHighLow(priceToAxisValue(item.model.price), highLow);
    const selectTradingItem = (id) => {
        const allOrders = getAllOrders();
        const allPositions = getAllPositions();
        const source = { ...allOrders, ...allPositions };
        pipe(source, getItemById(id), option.map(selectedItem => ({
            ...findAllRelatedItems(source, selectedItem),
            [selectedItem.model.id]: selectedItem,
        })), option.fold(() => console.warn(`Order with id=${id} was selected but not found in list of orders`), (itemsToSelect) => {
            const selectedItemsTuple = [
                {},
                {},
            ];
            const newOrders = pipe(allOrders, record.map(o => updateVisualOrder(o, { selected: false, disabled: true })));
            const newPositions = pipe(allPositions, record.map(p => updateVisualPosition(p, { selected: false, disabled: true })));
            const [selectedOrders, selectedPositions] = pipe(Object.values(itemsToSelect), array.reduce(selectedItemsTuple, ([editOrders, editPositions], item) => {
                if (isPosition(item)) {
                    editPositions[item.model.id] = updateVisualPosition(item, {
                        selected: true,
                        disabled: false,
                    });
                    newPositions[item.model.id] && delete newPositions[item.model.id];
                }
                else {
                    editOrders[item.model.id] = updateVisualOrder(item, {
                        selected: true,
                        disabled: false,
                    });
                    newOrders[item.model.id] && delete newOrders[item.model.id];
                }
                return [editOrders, editPositions];
            }));
            setOrders(newOrders);
            setPositions(newPositions);
            setEditableOrders(selectedOrders);
            setEditablePositions(selectedPositions);
        }));
        setGroupedVisualTradingItems(groupTradingItems({ ...orders.getValue(), ...positions.getValue() }, orderHeight.getValue(), tradingCoreVM.marketPrice.getValue()));
    };
    const deselectTradingItems = () => {
        const currentEditableOrders = editableOrders.getValue();
        const currentEditablePositions = editablePositions.getValue();
        if (Object.keys(currentEditableOrders).length === 0 && Object.keys(currentEditablePositions).length === 0) {
            return;
        }
        const newOrders = pipe({ ...orders.getValue(), ...currentEditableOrders }, record.map(o => updateVisualOrder(o, { selected: false, disabled: false })));
        const newPositions = pipe({ ...positions.getValue(), ...currentEditablePositions }, record.map(p => updateVisualPosition(p, { selected: false, disabled: false })));
        setEditableOrders({});
        setEditablePositions({});
        setOrders(newOrders);
        setPositions(newPositions);
    };
    const onDragStartFromGroup = (id) => {
        const allOrders = getAllOrders();
        pipe(allOrders, getItemById(id), option.fold(() => {
            console.warn(`Order with id=${id} was selected but not found in list of orders`);
        }, orderToSelect => {
            setIsDragging(true);
            delete allOrders[orderToSelect.model.id];
            setOrders(allOrders);
            setEditableOrders({ [`${orderToSelect.model.id}`]: orderToSelect });
            setGroupedVisualTradingItems(groupTradingItems({ ...allOrders, ...positions.getValue() }, orderHeight.getValue(), tradingCoreVM.marketPrice.getValue()));
            const mouseUpCallback = () => {
                // order of these functions is important
                setIsDragging(false);
                setEditableOrders({});
                // drag from group is finished, let's send updated order to provider
                pipe(chartDataViewModel.instrument.getValue(), option.map(instrument => orderProvider.updateOrder(instrument.symbol, orderToSelect.model)), option.getOrElse(() => Promise.reject(new Error('instrument is not presented'))));
            };
            addManualMouseControlOfYPosition(orderToSelect, mouseUpCallback);
        }));
    };
    const updateOrderPriceUI = (id, y) => {
        pipe(getAllOrders(), getItemById(id), option.map(updateOrderPriceByPosition(y)), option.fold(() => {
            console.warn(`Cannot find order to update price: ${id}`);
        }, updatedOrder => {
            setEditableOrders({ ...editableOrders.getValue(), [id]: updatedOrder });
        }));
    };
    const updateOrderPriceUIFast = (order, y) => pipe(order, updateOrderPriceByPosition(y), vo => {
        setEditableOrders({ ...editableOrders.getValue(), [vo.model.id]: vo });
    });
    const updateOrderPosition = (id, y) => {
        pipe(getAllOrders(), getItemById(id), option.map(updateOrderPriceByPosition(y)), option.fold(() => {
            console.warn(`Cannot find order to update price: ${id}`);
        }, order => {
            setIsDragging(false);
            pipe(chartDataViewModel.instrument.getValue(), option.map(async (instrument) => {
                try {
                    // call updateOrder from provider only if order has real provider id
                    !checkOrderIsOnUIOnly(order.model.id) &&
                        (await orderProvider.updateOrder(instrument.symbol, order.model));
                }
                finally {
                    disableAndDeselectAllTradingItems();
                }
            }), option.getOrElse(() => Promise.reject(new Error('Instrument is not presented'))));
        }));
    };
    const updateOrderPriceByPosition = (y) => (order) => {
        const vo = Object.assign({}, order);
        const clampedY = tradingCoreVM.clampY(y);
        switch (vo.model.orderType) {
            case 'stop':
                vo.model.stopPrice = tradingCoreVM.yToPrice(clampedY);
                vo.y = clampedY;
                return vo;
            case 'limit':
                vo.model.limitPrice = tradingCoreVM.yToPrice(clampedY);
                vo.y = clampedY;
                return vo;
            case 'market':
            default:
                return vo;
        }
    };
    const removeOrder = (id) => {
        pipe(getAllOrders(), getItemById(id), option.fold(() => {
            console.warn(`No order found to delete with id ${id}`);
        }, order => {
            pipe(chartDataViewModel.instrument.getValue(), option.map(async (instrument) => {
                try {
                    await orderProvider.deleteOrder(instrument.symbol, order.model);
                }
                finally {
                    disableAndDeselectAllTradingItems();
                }
            }), option.getOrElse(() => Promise.reject(new Error('Instrument is not presented'))));
        }));
    };
    const getPriceWithOffset = (price, offset) => tradingCoreVM.yToPrice(tradingCoreVM.priceToY(price) + offset);
    const createProtectionOrder = (type, originalId) => {
        pipe({ ...editableOrders.getValue(), ...editablePositions.getValue() }, getItemById(originalId), option.map((originalItem) => {
            // create protection order with temporary id (temporary id is used ro render order on UI)
            const protectionOrder = createProtectionOrderFromOriginalItem(originalItem, type, y => (type === 'tp' ? y - ORDER_VERTICAL_OFFSET : y + ORDER_VERTICAL_OFFSET), price => type === 'tp'
                ? getPriceWithOffset(price, -ORDER_VERTICAL_OFFSET)
                : getPriceWithOffset(price, ORDER_VERTICAL_OFFSET), chart);
            // link protection order to original with temporary id (used to render on UI before provider call)
            isProtection(protectionOrder.model) &&
                linkProtectionOrderToOriginalItem(originalItem, protectionOrder.model.id, protectionOrder.model.type);
            return [originalItem, protectionOrder];
        }), option.fold(() => {
            console.warn(`Cannot find order in editable orders by id: ${originalId}`);
        }, ([originalItem, protectionOrder]) => {
            setEditableOrders({
                ...editableOrders.getValue(),
                [protectionOrder.model.id]: protectionOrder,
            });
            const mouseUpCallback = () => {
                pipe(chartDataViewModel.instrument.getValue(), option.map(async (instrument) => {
                    // remove temporary id from original order
                    isProtection(protectionOrder.model) &&
                        unLinkOrderFromOriginalOrder(originalItem, protectionOrder.model.type);
                    // temporary id should be omitted for provider
                    const { id, ...protectionOrderModel } = protectionOrder.model;
                    try {
                        await orderProvider.createOrder(instrument.symbol, protectionOrderModel);
                    }
                    finally {
                        setEditableOrders({});
                        setEditablePositions({});
                        disableAndDeselectAllTradingItems();
                    }
                }), option.getOrElse(() => Promise.reject(new Error('Instrument is not presented'))));
            };
            addManualMouseControlOfYPosition(protectionOrder, mouseUpCallback);
        }));
    };
    // event listener to manually control order Y position regardless Draggable component on React side
    const addManualMouseControlOfYPosition = (order, mouseUpCallback = constVoid) => {
        chart.crosshair.setVisible(false);
        const unsubscribeMouseMove = tradingCoreVM.boundTradingPosition.subscribe(point => {
            updateOrderPriceUIFast(order, point.y);
        });
        const unsubscribeMouseDown = chart.canvasInputListener.observeMouseUpDocument().subscribe(() => {
            unsubscribeMouseMove.unsubscribe();
            unsubscribeMouseDown.unsubscribe();
            mouseUpCallback();
            chart.crosshair.setVisible(true);
        });
    };
    const removePosition = (id) => pipe(chartDataViewModel.instrument.getValue(), option.fold(constVoid, instrument => positionProvider.closePosition(instrument.symbol, id)));
    const disableAndDeselectAllTradingItems = () => {
        const newOrders = pipe(orders.getValue(), record.map(o => updateVisualOrder(o, { selected: false, disabled: false })));
        const newPositions = pipe(positions.getValue(), record.map(p => updateVisualPosition(p, { selected: false, disabled: false })));
        setOrders(newOrders);
        setPositions(newPositions);
    };
    const onGroupItemSelect = selectTradingItem;
    const onOrderDragStart = () => setIsDragging(true);
    const onResizerDrag = (rightOffset) => {
        setResizer({
            ...resizer.getValue(),
            rightOffset,
        });
    };
    const saveResizerRightOffsetInLayout = (rightOffset) => {
        configVM.setSettingsByPath(chartSettingsLens(['chartReact', 'trading', 'rightOffset']), chart.canvasBoundsContainer.getBounds(CanvasElement.PANE_UUID(CHART_UUID)).width - rightOffset);
    };
    const onResizerHover = () => {
        setResizer({
            ...resizer.getValue(),
            canvasHeight: chart.canvasBoundsContainer.getBounds(CanvasElement.PANE_UUID(CHART_UUID)).height,
        });
    };
    const updateTradingItems = () => {
        // offset is needed to prevent order be outside pane
        const ordersOffset = pixelsToUnits(orderHeight.getValue() / 2, chart.scale.zoomY);
        const marketPriceValue = tradingCoreVM.marketPrice.getValue();
        const highLow = {
            high: chart.scale.yEnd - ordersOffset,
            low: chart.scale.yStart + ordersOffset,
        };
        // updating Y coords and visibility for orders
        const updatedOrders = pipe(orders.getValue(), record.map(o => ({
            ...o,
            y: chart.chartModel.toY(getTradingItemPrice(o, marketPriceValue)),
        })));
        const [updatedOrdersWithVisibility] = updateTradingItemsVisibility(updatedOrders, i => checkTradingItemInBoundsPredicate(i, highLow, marketPriceValue));
        setOrders(updatedOrdersWithVisibility);
        // updating Y coords for editableOrders
        const updatedEditableOrders = pipe(editableOrders.getValue(), record.map(eo => ({
            ...eo,
            y: chart.chartModel.toY(getTradingItemPrice(eo, marketPriceValue)),
        })));
        const [updatedEditableOrdersWithVisibility] = updateTradingItemsVisibility(updatedEditableOrders, i => checkTradingItemInBoundsPredicate(i, highLow, marketPriceValue));
        setEditableOrders(updatedEditableOrdersWithVisibility);
        // updating Y coords and visibility for editable positions
        const updatedEditablePositions = pipe(editablePositions.getValue(), record.map(ep => ({
            ...ep,
            y: chart.chartModel.toY(getTradingItemPrice(ep, marketPriceValue)),
        })));
        const [updatedEditablePositionsVisibility] = updateTradingItemsVisibility(updatedEditablePositions, i => updatePositionPredicate(i, highLow));
        setEditablePositions(updatedEditablePositionsVisibility);
        // updating Y coords and visibility for positions
        const updatedPositions = pipe(positions.getValue(), record.map(p => ({
            ...p,
            y: chart.chartModel.toY(getTradingItemPrice(p, marketPriceValue)),
        })));
        const [updatedPositionsVisibility] = updateTradingItemsVisibility(updatedPositions, i => updatePositionPredicate(i, highLow));
        setPositions(updatedPositionsVisibility);
    };
    //#region effects
    const updateTradingItemsVisibilityOnScaleChangedEffect = pipe(chart.scale.yChanged, tap(() => updateTradingItems()));
    const updateTradingItemsOnPanesChanged = pipe(merge(chart.canvasBoundsContainer.panesOrderChangedSubject, 
    // update items on pane resize
    chart.canvasBoundsContainer.barResizerChangedSubject, chart.canvasBoundsContainer.observeBoundsChanged(CanvasElement.PANE_UUID(CHART_UUID))), tap(() => updateTradingItems()));
    const updateResizerVisibleEffect = pipe(orderEntryVM.orderEntryEnabled, distinctUntilChanged(), tap(orderEntryEnabled => {
        setResizer({
            ...resizer.getValue(),
            visible: orderEntryEnabled,
        });
    }));
    const updateRightOffsetOnYAxisWidthEffect = pipe(yAxisConfiguratorVM.yAxisWidth, distinctUntilChanged(), pairwise(), tap(([prevYAxisWidth, nextYAxisWidth]) => {
        const deltaYAxisWidth = nextYAxisWidth - prevYAxisWidth;
        setResizer({
            ...resizer.getValue(),
            rightOffset: resizer.getValue().rightOffset - deltaYAxisWidth,
            canvasHeight: chart.canvasBoundsContainer.getBounds(CanvasElement.PANE_UUID(CHART_UUID)).height,
        });
    }));
    const updateRightOffsetAfterChartMountEffect = pipe(chart.canvasBoundsContainer.observeBoundsChanged(CanvasElement.PANE_UUID(CHART_UUID))).pipe(map((canvasBounds) => {
        setResizer({
            ...resizer.getValue(),
            rightOffset: canvasBounds.width - configVM.state.getValue().settings.chartReact.trading.rightOffset,
        });
    }));
    const updateOrdersOnInstrumentChangeEffect = chartDataViewModel.instrument.pipe(filterOption(), switchMap(instrument => pipe(new Observable(subscriber => orderProvider.observeOrders(instrument.symbol, data => subscriber.next(data))), observable.map(orders => {
        // offset is needed to prevent order be outside pane
        const ordersOffset = pixelsToUnits(orderHeight.getValue() / 2, chart.scale.zoomY);
        const highLow = {
            high: chart.scale.yEnd - ordersOffset,
            low: chart.scale.yStart + ordersOffset,
        };
        const newVisualOrders = orders.reduce((acc, order) => {
            acc[order.id] = mapOrderToVisualOrder(order, chart, tradingCoreVM.marketPrice.getValue(), highLow);
            return acc;
        }, {});
        // replace orders
        setEditableOrders({});
        setOrders(newVisualOrders);
        return orders;
    }))));
    const updatePositionsOnInstrumentChangeEffect = chartDataViewModel.instrument.pipe(filterOption(), switchMap(instrument => pipe(new Observable(subscriber => positionProvider.observePositions(instrument.symbol, data => subscriber.next(data))), 
    // trying to solve https://jira.in.devexperts.com/browse/DXCF-2927
    // seems dxFina push positions very often and this is the only
    // place where we process that
    observable.map(providerPositions => {
        const currentEditablePositions = editablePositions.getValue();
        const currentPositions = positions.getValue();
        const regularPositionsMap = {};
        const editablePositionsMap = {};
        providerPositions.forEach(p => {
            const prevEditablePosition = currentEditablePositions[p.id];
            if (prevEditablePosition) {
                editablePositionsMap[p.id] = mapPositionToVisualPosition(
                // make sure that mutations on provider side won't affect local object
                cloneDeep(p), price => chart.chartModel.toY(price), chart, prevEditablePosition);
            }
            else {
                const prevPosition = currentPositions[p.id];
                regularPositionsMap[p.id] = mapPositionToVisualPosition(
                // make sure that mutations on provider side won't affect local object
                cloneDeep(p), price => chart.chartModel.toY(price), chart, prevPosition);
            }
        });
        return [regularPositionsMap, editablePositionsMap];
    }), observable.map(([regularPositionsMap, editablePositionsMap]) => {
        // offset is needed to prevent position be outside pane
        const positionsOffset = pixelsToUnits(orderHeight.getValue() / 2, chart.scale.zoomY);
        const highLow = {
            high: chart.scale.yEnd - positionsOffset,
            low: chart.scale.yStart + positionsOffset,
        };
        return [regularPositionsMap, editablePositionsMap].map(dataMap => updateTradingItemsVisibility(dataMap, i => updatePositionPredicate(i, highLow))[0]);
    }), tap(([visibleRegularPositions, visibleEditablePositions]) => {
        setPositions(visibleRegularPositions);
        setEditablePositions(visibleEditablePositions);
    }))));
    const updateMarketOrdersOnLastPriceChangeEffect = tradingCoreVM.marketPriceY.pipe(distinctUntilChanged(), tap(y => {
        setOrders(pipe(orders.getValue(), record.map(o => (o.model.orderType === 'market' ? { ...o, y } : o))));
    }));
    const updateGroupsOnDragEndEffect = combineLatest([
        orders,
        positions,
        orderHeight,
        editablePositions,
        editableOrders,
    ]).pipe(filter(() => !isDragging.getValue()), tap(([orders, positions, orderHeight]) => {
        setGroupedVisualTradingItems(groupTradingItems({ ...orders, ...positions }, orderHeight, tradingCoreVM.marketPrice.getValue()));
    }));
    const updateDraggingBoundsEffect = combineLatest([
        chart.canvasBoundsContainer.observeBoundsChanged(CanvasElement.PANE_UUID(CHART_UUID)),
        chart.scale.yChanged,
    ]).pipe(map(([canvasBounds]) => {
        const customPriceBounds = configVM.state.getValue().settings.chartReact.trading.bounds;
        const customYBounds = {
            max: tradingCoreVM.priceToY(customPriceBounds.min),
            min: tradingCoreVM.priceToY(customPriceBounds.max),
        };
        const canvasBottom = canvasBounds.y + canvasBounds.height - orderHeight.getValue();
        const bottom = Math.min(canvasBottom, customYBounds.max);
        const top = Math.max(customYBounds.min - orderHeight.getValue(), canvasBounds.y);
        setOrdersBounds({ bottom, top });
        setResizer({
            ...resizer.getValue(),
            canvasHeight: chart.canvasBoundsContainer.getBounds(CanvasElement.PANE_UUID(CHART_UUID)).height,
        });
    }));
    const syncPriceAxisOrdersFitTochartEffect = pipe(configVM.state, observable.map(s => s.settings.chartReact.scale.fit.orders), distinctUntilChanged(), tap(() => chart.scale.autoScale()));
    const syncPriceAxisPositionsFitTochartEffect = pipe(configVM.state, observable.map(s => s.settings.chartReact.scale.fit.positions), distinctUntilChanged(), tap(() => chart.scale.autoScale()));
    const effects$ = merge(updateOrdersOnInstrumentChangeEffect, updateGroupsOnDragEndEffect, updatePositionsOnInstrumentChangeEffect, updateMarketOrdersOnLastPriceChangeEffect, updateDraggingBoundsEffect, updateTradingItemsVisibilityOnScaleChangedEffect, updateTradingItemsOnPanesChanged, updateResizerVisibleEffect, updateRightOffsetOnYAxisWidthEffect, updateRightOffsetAfterChartMountEffect, syncPriceAxisOrdersFitTochartEffect, syncPriceAxisPositionsFitTochartEffect);
    //#endregion
    const vm = callTracerProxy('tradingViewModel', {
        orders: subtractGroupedItems(orders, groupedVisualTradingItems),
        editableOrders,
        positions: subtractGroupedItems(positions, groupedVisualTradingItems),
        editablePositions,
        createOrderFromOrderEntry,
        createOriginalOrder,
        createProtectionOrder,
        removePosition,
        removeOrder,
        selectTradingItem,
        deselectTradingItems,
        updateOrderPosition,
        updateOrderPriceUI,
        onOrderDragStart,
        onOrderClick,
        onOrderDblClick,
        onOrderClickEventRegister,
        onOrderDblClickEventRegister,
        onGroupItemSelect,
        orderHeight,
        groupedVisualTradingItems,
        setOrderHeight,
        resizer,
        setResizer,
        onResizerDrag,
        onResizerDragEnd: saveResizerRightOffsetInLayout,
        onResizerHover,
        showPriceAsLabels,
        ordersBounds,
        onDragStartFromGroup,
        isDragging,
    });
    const ordersPositionsHighLowProvider = createOrdersAndPositionsHighLowProvider(() => multiChartViewModel.getSelectedChartInfo().chartSettings, chart.chartModel, vm);
    chart.scale.autoScaleModel.setHighLowProvider('orders_positions', ordersPositionsHighLowProvider);
    return newSink(vm, effects$);
});
const updateVisualOrder = (order, update) => ({
    ...order,
    ...update,
});
const updateVisualPosition = (position, update) => ({
    ...position,
    ...update,
});
/**
 * Subtracts the grouped items from trading items list.
 * Creates a new observable from groupedItems observable.
 * @param tradingItems$
 * @param groupedVisualTradingItems$
 */
function subtractGroupedItems(tradingItems$, groupedVisualTradingItems$) {
    return convertToProperty(combineLatest([groupedVisualTradingItems$, tradingItems$]).pipe(map(([groupedVisualTradingItems, tradingItems]) => {
        const newTradingItems = cloneDeep(tradingItems);
        const tradingItemsInGroupsFlat = Object.values(groupedVisualTradingItems).reduce((acc, group) => {
            const itemsMap = Object.fromEntries(group.items.map(item => [item.model.id, item]));
            return { ...acc, ...itemsMap };
        }, {});
        for (const key in tradingItemsInGroupsFlat) {
            if (Object.hasOwn(tradingItemsInGroupsFlat, key)) {
                tradingItemsInGroupsFlat[key] && delete newTradingItems[key];
            }
        }
        return newTradingItems;
    })), {});
}
/**
 * Updates visibility state of an trading item in a array of trading items
 * Return [array of updated trading items, number of updated items (may be used for performance optimization)]
 * @param tradingItems
 * @param predicate
 */
function updateTradingItemsVisibility(tradingItems, predicate) {
    let updatedCount = 0;
    const updatedTItems = pipe(tradingItems, record.map(ti => pipe(ti, option.fromPredicate(predicate), option.fold(() => {
        if (ti.visible === false) {
            return ti;
        }
        updatedCount++;
        ti.visible = false;
        return ti;
    }, () => {
        if (ti.visible) {
            return ti;
        }
        updatedCount++;
        ti.visible = true;
        return ti;
    }))));
    return [updatedTItems, updatedCount];
}
