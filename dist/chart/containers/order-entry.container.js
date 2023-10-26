import { constVoid } from 'fp-ts/function';
import { createElement, memo, useLayoutEffect } from 'react';
import { context } from '../../context/context2';
import { namedMemo } from '../../utils/named-memo';
import { useObservable } from '../../utils/use-observable';
import { useProperty } from '../../utils/use-property';
import { useSink } from '../../utils/use-sink';
import { createOrderEntryDomMutationModel } from '../dom-mutation-models/order-entry.dom-mutation-model';
import { OrderEntry } from '../components/trading/order-entry/order-entry.component';
// This division between container and component in context for this file exists because
// we don't want to active hooks below if toolbar isn't rendered - they cause unnecessary React rerenders
const OrderEntryComponent = context.combine(createOrderEntryDomMutationModel, context.key()('tradingVM'), context.key()('orderEntryVM'), context.key()('localization'), context.key()('yAxisConfiguratorViewModel'), (createTradingEntryDMM, tradingVM, orderEntryVM, localization, yAxisConfiguratorVM) => memo(() => {
    const tradingEntryDMM = useSink(() => createTradingEntryDMM, []);
    const orderEntryRightOffset = useObservable(orderEntryVM.orderEntryRightOffset, 0);
    const orderEntry = useProperty(orderEntryVM.orderEntry);
    const yAxisAlign = useProperty(yAxisConfiguratorVM.yAxisAlign);
    const domMutationProps = {
        containerRef: tradingEntryDMM.containerRef,
    };
    // This effect is needed to update y position on initial render
    // useLayoutEffect is triggered before the browser paints, so it's a good place to update Y position
    useLayoutEffect(() => {
        tradingEntryDMM.updateYPosition(orderEntryVM.orderEntryYPosition.getValue());
    });
    return orderEntry.visible
        ? createElement(OrderEntry, {
            padding: orderEntryRightOffset,
            yAxisAlign,
            createOrder: tradingVM.createOrderFromOrderEntry,
            opened: orderEntry.opened,
            disabled: orderEntry.disabled,
            setOpened: orderEntryVM.setOrderEntryOpened,
            resetToDefault: orderEntryVM.resetOrderEntryToDefault,
            type: orderEntry.type,
            quantity: orderEntry.quantity,
            quantityPrecision: orderEntry.quantityPrecision,
            quantityStep: orderEntry.quantityStep,
            maxQuantity: orderEntry.maxQuantity,
            onChangeQuantity: orderEntryVM.setOrderQuantity,
            onCompleteOrderEntry: constVoid,
            tradingDict: localization.trading,
            domMutationProps,
        })
        : null;
}));
export const OrderEntryContainer = context.combine(OrderEntryComponent, context.key()('orderEntryVM'), (OrderEntryComponent, orderEntryVM) => namedMemo('TradingEntryContainer', () => {
    const orderEntryEnabled = useProperty(orderEntryVM.orderEntryEnabled);
    return orderEntryEnabled ? createElement(OrderEntryComponent) : null;
}));
