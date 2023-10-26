import { CanvasBoundsContainer, CanvasElement, } from '@devexperts/dxcharts-lite/dist/chart/canvas/canvas-bounds-container';
import { observable } from 'fp-ts-rxjs';
import { pipe } from 'fp-ts/function';
import { combineLatest, merge } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, tap } from 'rxjs/operators';
import { context } from '../../../context/context2';
import { newSink } from '../../../context/sink2';
import { convertToProperty, createPropertyAdapter } from '../../../utils/property.utils';
import { tradingItemVisibilityInBounds } from './trading-functions';
import { getDecimalRest } from '../../components/trading/order-entry/order-entry-input.component';
const DEFAULT_RIGHT_OFFSET = 100;
export const ORDER_ENTRY_HEIGHT = 24;
export const createOrderEntryViewModel = context.combine(context.key()('chartConfiguratorViewModel'), context.key()('chart'), context.key()('chartReactConfig'), context.key()('tradingCoreViewModel'), context.key()('chartDataViewModel'), context.key()('dataLoaderVM'), context.key()('themeViewModel'), (chartConfiguratorVM, chart, chartReactConfig, tradingCoreVM, chartDataVM, dataLoaderVM, themeViewModel) => {
    const DEFAULT_ORDER_ENTRY = {
        visible: true,
        opened: false,
        disabled: chartReactConfig.trading.defaultOrderQuantity === 0,
        quantity: chartReactConfig.trading.defaultOrderQuantity,
        quantityPrecision: 0,
        quantityStep: 1,
        maxQuantity: chartReactConfig.trading.maxOrderQuantity,
        type: 'BuyLimitSellStop',
    };
    const [setOrderEntry, orderEntry] = createPropertyAdapter({
        ...DEFAULT_ORDER_ENTRY,
        visible: false,
    });
    const [setOrderEntryRightOffset, orderEntryRightOffset] = createPropertyAdapter(DEFAULT_RIGHT_OFFSET);
    const [setOrderEntryPrice, orderEntryPrice] = createPropertyAdapter(0);
    const [setOeYPosition, oeYPosition] = createPropertyAdapter(0);
    const orderEntryEnabled = convertToProperty(pipe(tradingCoreVM.showTrading, observable.map(showTrading => showTrading && chartReactConfig.trading.addNewOrderEnabled)), false);
    const setOrderEntryOpened = (opened) => {
        // OE position is relative to canvas
        setOrderEntryPrice(tradingCoreVM.yToPrice(oeYPosition.getValue()));
        setOrderEntry({
            ...orderEntry.getValue(),
            opened,
        });
    };
    const updateOrderEntryTypeEffect = pipe(combineLatest([chartDataVM.lastCandleUpdated, orderEntryPrice]), tap(([currentPrice, oePrice]) => {
        currentPrice && setOrderType(oePrice < currentPrice.close ? 'BuyLimitSellStop' : 'SellLimitBuyStop');
    }));
    const resetOrderEntryToDefault = () => setOrderEntry({
        ...DEFAULT_ORDER_ENTRY,
        disabled: orderEntry.getValue().quantity === 0,
        quantity: orderEntry.getValue().quantity,
        quantityPrecision: orderEntry.getValue().quantityPrecision,
        quantityStep: orderEntry.getValue().quantityStep,
    });
    const setOrderQuantity = (quantity) => {
        if (!quantity) {
            setOrderEntry({
                ...orderEntry.getValue(),
                disabled: true,
                quantity,
            });
            return;
        }
        const quantityStep = orderEntry.getValue().quantityStep;
        const quantityPrecision = orderEntry.getValue().quantityPrecision;
        const valuePrecision = getDecimalRest(quantity).length;
        // this allows to properly handle float step and quantity values, example: step is 0.3 and quantity is 2.7 will pass the check
        const quantityDividableByStep = Number.isInteger(parseFloat((quantity / quantityStep).toFixed(quantityPrecision)));
        const isQuantityCorrect = quantity > 0 &&
            quantityDividableByStep &&
            valuePrecision <= quantityPrecision &&
            quantity <= orderEntry.getValue().maxQuantity;
        if (isQuantityCorrect) {
            setOrderEntry({
                ...orderEntry.getValue(),
                disabled: false,
                quantity,
            });
        }
    };
    const setOrderType = (type) => setOrderEntry({
        ...orderEntry.getValue(),
        type,
    });
    const setTradingQuantityPrecision = (precision) => setOrderEntry({
        ...orderEntry.getValue(),
        quantityPrecision: precision,
    });
    const setTradingQuantityStep = (step) => setOrderEntry({
        ...orderEntry.getValue(),
        quantityStep: step,
    });
    //#region effects
    // multiple conditions to update Y position of OE
    // mouse movement, quote, scale changed
    const updateOeYPositionEffect = combineLatest([
        tradingCoreVM.boundTradingPosition,
        orderEntry,
        chart.scale.yChanged,
    ]).pipe(filter(([p]) => {
        // it's very expensive to update pos on every move if this thing is disabled
        if (!orderEntryEnabled.getValue()) {
            return false;
        }
        // do not update OE position if mouse not in the area
        const bounds = chart.bounds.getBounds(CanvasElement.CHART_WITH_Y_AXIS);
        const ht = CanvasBoundsContainer.hitTestOf(bounds);
        return ht(p.x, p.y);
    }), map(([p, orderEntry]) => {
        // the position is where user opened the entry
        if (orderEntry.opened) {
            return tradingCoreVM.priceToY(orderEntryPrice.getValue());
        }
        // follow mouse mode
        return p.y;
    }), tap(setOeYPosition), 
    // refCount false because we want to keep the last value even if there are no subscribers
    shareReplay({ bufferSize: 1, refCount: false }));
    const oeVisibleStateEffect = combineLatest([
        chart.canvasInputListener.observeMouseMoveDocument(),
        oeYPosition,
        orderEntry,
        orderEntryEnabled,
        dataLoaderVM.isLoading,
        chartDataVM.historicalCandlesUpdated,
    ]).pipe(map(([p, oeYPosition, _, orderEntryEnabled, isLoading, historicalCandles]) => {
        const bounds = chart.bounds.getBounds(CanvasElement.CHART_WITH_Y_AXIS);
        const ht = CanvasBoundsContainer.hitTestOf(bounds);
        const cursorInsideCanvas = ht(p.x, p.y);
        const orderEntryInsideCanvas = tradingItemVisibilityInBounds(bounds, ORDER_ENTRY_HEIGHT / 2, oeYPosition);
        return (cursorInsideCanvas &&
            orderEntryInsideCanvas &&
            orderEntryEnabled &&
            historicalCandles.length !== 0 &&
            !isLoading);
    }), distinctUntilChanged(), tap(visible => {
        const currentOrderEntry = orderEntry.getValue();
        setOrderEntry({
            ...currentOrderEntry,
            visible,
            // if orderEntry becomes not visible, close it
            opened: visible ? currentOrderEntry.opened : false,
        });
    }));
    const updateOrderEntryChartCoreLabel = pipe(combineLatest([orderEntry, oeYPosition, dataLoaderVM.isLoading]), tap(([, y, isLoading]) => {
        const configuratorState = chartConfiguratorVM.state.getValue();
        if (!isLoading && orderEntry.getValue().visible) {
            const activeTheme = themeViewModel.activeTheme.getValue();
            const crossToolColors = configuratorState.settings.chartCore.themes[activeTheme].crossTool;
            chart.yAxis.addSimpleYAxisLabel('order_entry', {
                bgColor: crossToolColors.labelBoxColor,
                textColor: crossToolColors.labelTextColor,
                labelText: `${chart.chartModel.pane.valueFormatter(tradingCoreVM.yToPrice(y))}`,
                y,
            });
        }
        else {
            chart.yAxis.deleteSimpleYAxisLabel('order_entry');
        }
    }));
    const updateOrderEntryRightOffsetEffect = pipe(combineLatest([
        chart.bounds.observeBoundsChanged(CanvasElement.ALL_PANES),
        pipe(chartConfiguratorVM.state, observable.map(s => s.settings.chartCore.components.yAxis.align), distinctUntilChanged()),
    ]), tap(([, align]) => {
        // TODO decide where should be '+' if there are multiple scales and rework it
        const width = align === 'right'
            ? chart.bounds.yAxisWidths.right.reduce((a, b) => a + b, 0)
            : chart.bounds.yAxisWidths.left.reduce((a, b) => a + b, 0) + 24; // button width
        setOrderEntryRightOffset(width);
    }));
    const updateOrderEntryOpenedEffect = chartDataVM.historicalCandlesUpdated.pipe(tap(() => setOrderEntryOpened(false)));
    const effects = merge(updateOeYPositionEffect, oeVisibleStateEffect, updateOrderEntryRightOffsetEffect, updateOrderEntryChartCoreLabel, updateOrderEntryOpenedEffect, updateOrderEntryTypeEffect);
    //#endregion
    return newSink({
        orderEntryEnabled,
        orderEntry,
        orderEntryPrice,
        orderEntryYPosition: oeYPosition,
        orderEntryRightOffset,
        setOrderEntryOpened,
        setOrderType,
        setOrderQuantity,
        setTradingQuantityPrecision,
        setTradingQuantityStep,
        resetOrderEntryToDefault,
    }, effects);
});
