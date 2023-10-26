import { context } from '../../../context/context2';
import { createElement, memo } from 'react';
import { useDirectProperty, useObservable } from '../../../utils/react.utils';
import { HoveredExecutedOrderComponent } from '../../components/executed-orders/hovered-executed-order.component';
export const ExecutedOrdersContainer = context.combine(context.key()('executedOrdersVM'), context.key()('chartConfiguratorViewModel'), (vm, chartConfiguratorVM) => memo(() => {
    const hoveredExecutedOrder = useObservable(vm.hoveredExecutedOrder, null);
    const ordersDisplayMode = useDirectProperty(chartConfiguratorVM.state, [
        'settings',
        'chartReact',
        'trading',
        'executedOrders',
        'displayMode',
    ]);
    return hoveredExecutedOrder && ordersDisplayMode === 'bubbles'
        ? createElement(HoveredExecutedOrderComponent, {
            hoveredExecutedOrder,
        })
        : null;
}));
