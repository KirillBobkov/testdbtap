import { createElement, memo } from 'react';
import { context } from '../../../context/context2';
import { namedMemo } from '../../../utils/named-memo';
import { useDirectProperty, useProperty } from '../../../utils/use-property';
import OrderAndPositions from '../../components/trading/orders-positions.component';
import { filterVisibleTradingItems } from '../../model/trading/trading.model';
// This division between container and component in context for this file exists because
// we don't want to active hooks below if toolbar isn't rendered - they cause unnecessary React rerenders
const OrderAndPositionsComponent = context.combine(context.key()('yAxisConfiguratorViewModel'), context.key()('tradingVM'), context.key()('tradingCoreVM'), context.key()('chartReactConfig'), context.key()('chartConfiguratorViewModel'), (yAxisConfiguratorVM, tradingVM, tradingCoreVM, chartReactConfig, chartConfiguratorViewModel) => memo(() => {
    const resizer = useProperty(tradingVM.resizer);
    const orderHeight = useProperty(tradingVM.orderHeight);
    const showPriceAsLabels = useProperty(tradingVM.showPriceAsLabels);
    const ordersBounds = useProperty(tradingVM.ordersBounds);
    const chartWidth = useProperty(yAxisConfiguratorVM.chartWidth);
    const isDragging = useProperty(tradingVM.isDragging);
    const editableOrders = useProperty(tradingVM.editableOrders);
    const editablePositions = useProperty(tradingVM.editablePositions);
    const orders = useProperty(tradingVM.orders);
    const positions = useProperty(tradingVM.positions);
    const groups = useProperty(tradingVM.groupedVisualTradingItems);
    const tradingSettings = useDirectProperty(chartConfiguratorViewModel.state, [
        'settings',
        'chartReact',
        'trading',
    ]);
    const visibleOrders = filterVisibleTradingItems({ ...orders, ...editableOrders });
    const visiblePositions = filterVisibleTradingItems({ ...positions, ...editablePositions });
    const visibleGroups = filterVisibleTradingItems(groups);
    const editableItemsPresented = Object.keys(editableOrders).length > 0 || Object.keys(editablePositions).length > 0;
    return createElement(OrderAndPositions, {
        visibleOrders,
        visiblePositions,
        visibleGroups,
        yToPrice: tradingCoreVM.yToPrice,
        priceToY: tradingCoreVM.priceToY,
        removeOrder: tradingVM.removeOrder,
        selectTradingItem: tradingVM.selectTradingItem,
        onOrderClick: tradingVM.onOrderClick,
        onOrderDblClick: tradingVM.onOrderDblClick,
        onDragStartFromGroup: tradingVM.onDragStartFromGroup,
        deselectTradingItem: tradingVM.deselectTradingItems,
        removePosition: tradingVM.removePosition,
        onOrderDragStart: tradingVM.onOrderDragStart,
        updateOrderPosition: tradingVM.updateOrderPosition,
        createProtectionOrder: tradingVM.createProtectionOrder,
        onGroupItemSelect: tradingVM.onGroupItemSelect,
        resizer,
        onResizerDrag: tradingVM.onResizerDrag,
        onResizerDragEnd: tradingVM.onResizerDragEnd,
        onResizerHover: tradingVM.onResizerHover,
        orderHeight,
        currency: chartReactConfig.trading.currency,
        takeProfitStopLossEnabled: chartReactConfig.trading.takeProfitStopLossEnabled,
        showPriceAsLabels,
        ordersBounds,
        chartWidth,
        onOrderDrag: tradingVM.updateOrderPriceUI,
        isDragging,
        tradingSettings,
        editableItemsPresented,
    });
}));
export const OrderAndPositionsContainer = context.combine(OrderAndPositionsComponent, context.key()('chartConfiguratorViewModel'), (OrderAndPositionsComponent, chartConfiguratorViewModel) => namedMemo('OrderAndPositionsContainer', () => {
    const ordersAndPositionsVisible = useDirectProperty(chartConfiguratorViewModel.state, [
        'settings',
        'chartReact',
        'trading',
        'visible',
    ]);
    return ordersAndPositionsVisible ? createElement(OrderAndPositionsComponent) : null;
}));
