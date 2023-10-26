import { observable } from 'fp-ts-rxjs';
import { pipe } from 'fp-ts/function';
import { bindCallback, distinctUntilChanged, merge, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';
import { context } from '../../../context/context2';
import { newSink } from '../../../context/sink2';
import { createPropertyAdapter } from '../../../utils/property.utils';
import { filterOption } from '../../../utils/monad-functions';
import { defaultOrderPriceFormatter } from '../../model/trading/order.model';
export const createExecutedOrdersViewModel = context.combine(context.key()('chartConfiguratorViewModel'), context.key()('chart'), context.key()('orderProvider'), context.key()('chartDataViewModel'), (chartConfiguratorVM, chart, orderProvider, chartDataVM) => {
    const [setExecutedOrders, executedOrders] = createPropertyAdapter([]);
    const hoveredExecutedOrder = chart.executedOrders.executedOrderHoveredSubject;
    const syncExecutedOrdersWithChartEffect = pipe(executedOrders, observable.map(orders => orders.map(o => ({
        ...o,
        price: Number((chart.chartModel.pane.regularFormatter || defaultOrderPriceFormatter)(o.price)),
    }))), tap(execOrders => {
        chart.executedOrders.setExecutedOrders(execOrders);
    }));
    const syncShowExecutedOrdersSettingToChartEffect = pipe(chartConfiguratorVM.state, observable.map(s => s.settings.chartReact.trading.executedOrders.enabled), distinctUntilChanged(), tap(isVisible => chart.executedOrders.setVisible(isVisible)));
    const syncExecutedOrdersTypeToChartEffect = pipe(chartConfiguratorVM.state, observable.map(s => s.settings.chartReact.trading.executedOrders.displayMode), distinctUntilChanged(), tap(type => chart.executedOrders.setLabelsVisible(type === 'labels')));
    const observeExecutedOrdersObservable = bindCallback(orderProvider.observeExecutedOrders);
    const updateExecutedOrdersFromProviderEffect = pipe(chartDataVM.instrument, filterOption(), switchMap(instrument => pipe(observeExecutedOrdersObservable(instrument.symbol), observable.map(setExecutedOrders))));
    const effects = merge(syncExecutedOrdersWithChartEffect, syncShowExecutedOrdersSettingToChartEffect, syncExecutedOrdersTypeToChartEffect, updateExecutedOrdersFromProviderEffect);
    return newSink({
        executedOrders,
        setExecutedOrders,
        hoveredExecutedOrder,
    }, effects);
});
