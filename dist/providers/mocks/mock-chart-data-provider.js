import { array } from 'fp-ts';
import { constVoid, pipe } from 'fp-ts/function';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { aggregationPeriodToString, periodToMinutes } from '../../chart/model/aggregation.model';
import { createAdapter } from '../../utils/adapter.utils';
import { generateCandles } from '../../utils/generator/candle-generator.utils';
import { hashCode } from '../../utils/string.utils';
export const createMockChartDataProvider = () => {
    const [updateLastCandle, lastCandle] = createAdapter();
    const [changeSymbol, symbol] = createAdapter();
    const [updateSymbolCandle, symbolCandle] = createAdapter();
    return {
        requestHistoryData: (symbol, aggregation, options) => {
            changeSymbol(symbol);
            return Promise.resolve(options?.toTime
                ? []
                : pipe(generateCandles({
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
        subscribeCandles: symbol => {
            return lastCandle.pipe(tap(candle => {
                updateSymbolCandle({
                    symbol,
                    candle,
                });
            }));
        },
        unsubscribeCandles: constVoid,
        subscribeServiceData: constVoid,
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
