import { filter } from 'rxjs/operators';
import { context } from '../../../context/context2';
import { newSink } from '../../../context/sink2';
import { createPropertyAdapter } from '../../../utils/property.utils';
import { distinctUntilChanged, merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CHART_UUID, CanvasElement, isInBounds, } from '@devexperts/dxcharts-lite/dist/chart/canvas/canvas-bounds-container';
import { pipe } from 'fp-ts/function';
export const createBackgroundMenuViewModel = context.combine(context.key()('chart'), context.key()('tradingVM'), context.key()('tradingCoreVM'), context.key()('orderEntryVM'), (chart, tradingVM, tradingCoreVM, orderEntryVM) => {
    const [setIsOpened, isOpened] = createPropertyAdapter(false);
    const [setMenuPosition, menuPosition] = createPropertyAdapter({ x: 0, y: 0 });
    const [setMainSeriesData, mainSeriesData] = createPropertyAdapter({
        candlePrice: '',
        marketPrice: '',
        quantity: 0,
    });
    const closeMenu = () => setIsOpened(false);
    const createOrder = (orderData) => {
        const { side, orderType, quantity } = orderData;
        const price = Number(mainSeriesData.getValue().candlePrice);
        tradingVM.createOriginalOrder(orderType, side, price, quantity);
        closeMenu();
    };
    const openMenuOnRightClickEffect = chart.hitTestCanvasModel.observeRightClickOnElement().pipe(filter(ev => ev.model === undefined), filter(() => isInBounds(chart.canvasInputListener.currentPointDocument, chart.bounds.getBounds(CanvasElement.PANE_UUID(CHART_UUID)))), tap(() => {
        setMenuPosition({ ...chart.canvasInputListener.currentPointDocument });
        setIsOpened(true);
        const priceFormatter = chart.mainPane.mainExtent.formatters.regular;
        const realY = tradingCoreVM.boundTradingPosition.getValue().y;
        const candlePrice = tradingCoreVM.yToPrice(realY);
        const formatedCandlePrice = priceFormatter(candlePrice);
        setMainSeriesData({
            candlePrice: formatedCandlePrice,
            marketPrice: priceFormatter(tradingCoreVM.marketPrice.getValue()),
            quantity: orderEntryVM.orderEntry.getValue().quantity,
        });
    }));
    const syncMarketPriceUpdateEffect = pipe(tradingCoreVM.marketPrice, distinctUntilChanged(), tap((marketPrice) => {
        const formatedPrice = chart.mainPane.mainExtent.formatters.regular(marketPrice);
        setMainSeriesData({ ...mainSeriesData.getValue(), marketPrice: formatedPrice });
    }));
    const effects = merge(openMenuOnRightClickEffect, syncMarketPriceUpdateEffect);
    return newSink({
        isOpened,
        closeMenu,
        menuPosition,
        mainSeriesData,
        createOrder,
    }, effects);
});
