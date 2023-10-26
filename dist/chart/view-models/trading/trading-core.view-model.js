import { context } from '../../../context/context2';
import { convertToProperty, createPropertyAdapter } from '../../../utils/property.utils';
import { combineLatest, merge } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { newSink } from '../../../context/sink2';
import { constVoid, pipe } from 'fp-ts/function';
import { option } from 'fp-ts';
import { observable } from 'fp-ts-rxjs';
import { clamp } from '@devexperts/dxcharts-lite/dist/chart/utils/math.utils';
export const createTradingCoreViewModel = context.combine(context.key()('chartConfiguratorViewModel'), context.key()('chart'), (chartConfiguratorVM, chart) => {
    const showTrading = convertToProperty(combineLatest([chartConfiguratorVM.tradingAllowed, chartConfiguratorVM.config$]).pipe(observable.map(([tradingAllowed, config]) => config.chartReact.trading.visible && tradingAllowed)), false);
    const [setMarketPrice, marketPrice] = createPropertyAdapter(0);
    const marketPriceY = convertToProperty(combineLatest([marketPrice, chart.scale.yChanged]).pipe(map(([price]) => priceToY(price))), 0);
    const yToPrice = (y) => chart.chartComponent.chartModel.priceFromY(y);
    const priceToY = (price) => chart.chartComponent.chartModel.toY(price);
    const updateMarketPriceEffect = chart.chartModel.observeCandlesChanged().pipe(map(_ => chart.chartModel.getLastCandle()), tap(candle => pipe(option.fromNullable(candle), option.fold(constVoid, c => setMarketPrice(c.close)))));
    const clampY = (y) => {
        const bounds = chartConfiguratorVM.state.getValue().settings.chartReact.trading.bounds;
        return clampMap({ value: y, mapTo: yToPrice, mapFrom: priceToY, ...bounds });
    };
    const boundTradingPosition = convertToProperty(pipe(chart.canvasInputListener.observeMouseMoveDocument(), map(point => ({ x: point.x, y: clampY(point.y) }))), { x: 0, y: 0 });
    const effects = merge(updateMarketPriceEffect);
    return newSink({
        showTrading,
        marketPriceY,
        marketPrice,
        yToPrice,
        priceToY,
        boundTradingPosition,
        clampY,
    }, effects);
});
export function clampMap({ value, min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY, mapTo, mapFrom, }) {
    return mapFrom(clamp(mapTo(value), min, max));
}
