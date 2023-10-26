import { array } from 'fp-ts';
import { observable } from 'fp-ts-rxjs';
import { constVoid, pipe } from 'fp-ts/function';
import { combineLatest, from } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { aggregationPeriodToString, periodToMinutes, periodToString } from '../../../chart/model/aggregation.model';
import { createAdapter } from '../../../utils/adapter.utils';
import { generateCandles } from '../../../utils/generator/candle-generator.utils';
import { hashCode } from '../../../utils/string.utils';
export const toCandlesFromPartial = (data) => ({
    high: data.h,
    low: data.l,
    open: data.o,
    close: data.c,
    time: data.t,
    volume: data.v,
    impVolatility: undefined,
    vwap: undefined,
});
const getSymbolsWithAggregation = (symbol, aggregation) => {
    return `${symbol}{=${aggregation}}`;
};
const HEADERS = { 'Content-Type': 'application/json;charset=utf-8' };
const quoteRequest = (symbol) => from(fetch(`https://webdev.prosp.devexperts.com:8095/widget/dxfeed-data/${symbol}Quote.json`, {
    headers: HEADERS,
})
    .then(d => d.json())
    .then(response => response)
    .catch(() => ({ bid: 0, ask: 0 })));
const summaryRequest = (symbol) => from(fetch(`https://webdev.prosp.devexperts.com:8095/widget/dxfeed-data/${symbol}Summary.json`, {
    headers: HEADERS,
})
    .then(d => d.json())
    .then(response => response)
    .catch(() => ({ prevDayClosePrice: 0 })));
const tradeETHRequest = (symbol) => from(fetch(`https://webdev.prosp.devexperts.com:8095/widget/dxfeed-data/${symbol}TradeETH.json`, {
    headers: HEADERS,
})
    .then(d => d.json())
    .then(response => response)
    .catch(() => ({ prePostMarketClose: 0 })));
export const createMockChartRealDataProvider = () => {
    const [updateLastCandle, lastCandle] = createAdapter();
    const [changeSymbol, symbol] = createAdapter();
    const [updateSymbolCandle, symbolCandle] = createAdapter();
    return {
        requestHistoryData: (symbol, aggregation, options) => {
            changeSymbol(symbol);
            const symbolWithAggregation = getSymbolsWithAggregation(symbol, periodToString(aggregation));
            return fetch(`https://webdev.prosp.devexperts.com:8095/widget/dxfeed-data/${symbolWithAggregation}.json`, {
                headers: HEADERS,
            })
                .then(d => d.json())
                .then(response => response.map(toCandlesFromPartial))
                .catch(() => pipe(generateCandles({
                period: periodToMinutes(aggregation) * 60,
                randomSeed: hashCode(symbol) + hashCode(aggregationPeriodToString(aggregation)),
            }), array.map(candle => ({
                time: candle.timestamp,
                open: candle.open,
                high: candle.hi,
                low: candle.lo,
                close: candle.close,
                volume: candle.volume,
                impVolatility: 0,
                vwap: 0,
            }))));
        },
        subscribeCandles: symbol => lastCandle.pipe(tap(candle => {
            updateSymbolCandle({
                symbol,
                candle,
            });
        })),
        unsubscribeCandles: constVoid,
        subscribeServiceData: (symbol, dataCallback) => pipe(combineLatest([quoteRequest(symbol), summaryRequest(symbol), tradeETHRequest(symbol)]), observable.map(([summary, tradeETH, quote]) => ({
            ...summary,
            ...tradeETH,
            ...quote,
        })), tap(dataCallback)).subscribe(),
        observeSymbolChanged() {
            return symbol.pipe(distinctUntilChanged());
        },
        observeSymbolCandleUpdated() {
            return symbolCandle;
        },
        fireLastCandleUpdate(candle) {
            updateLastCandle(candle);
        },
    };
};
