import { context } from '../../../context/context2';
import { createOrderEntryViewModel } from './order-entry.view-model';
import { createTradingCoreViewModel } from './trading-core.view-model';
import { createTradingViewModel } from './trading.view-model';
import { createExecutedOrdersViewModel } from './executed-orders.view-model';
export const createTradingCombinedViewModel = context.combine(createTradingCoreViewModel, context.defer(createOrderEntryViewModel, 'tradingCoreViewModel'), context.defer(createTradingViewModel, 'orderEntryViewModel', 'tradingCoreViewModel'), createExecutedOrdersViewModel, (createTradingCoreVM, createOrderEntryVM, createTradingVM, createExecutedOrdersViewModel) => {
    const tradingCoreVMSink = createTradingCoreVM;
    const executedOrdersVMSink = createExecutedOrdersViewModel;
    const tradingCoreViewModel = tradingCoreVMSink.value;
    const orderEntryVMSink = createOrderEntryVM({
        tradingCoreViewModel,
    }).value;
    const orderEntryViewModel = orderEntryVMSink.value;
    const tradingVMSink = createTradingVM({
        tradingCoreViewModel,
        orderEntryViewModel,
    }).value;
    return {
        tradingCoreVMSink,
        orderEntryVMSink,
        tradingVMSink,
        executedOrdersVMSink,
    };
});
