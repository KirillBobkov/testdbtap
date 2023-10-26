import { Option } from 'fp-ts/Option';
import { Observable } from 'rxjs';
import { AggregationPeriod } from '../chart/model/aggregation.model';
export interface ChartCandleData {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    impVolatility?: number;
    vwap?: number;
}
export interface ServiceData {
    prevDayClosePrice?: number;
    prePostMarketClose?: number;
    bid?: number;
    ask?: number;
}
export interface ServiceDataProvider {
    subscribeServiceData(symbol: string, subscribeCallback: (data: ServiceData) => void): void;
}
export interface ChartDataOptions {
    extendedHours?: boolean;
    priceType?: PriceType;
    /**
     * Candles' timestamps alignment
     */
    candleAlignment?: CandleAlignment;
    /**
     * Might be useful when requesting range bars
     */
    priceIncrement?: number;
}
export declare const priceType: readonly ["last", "mark", "bid", "ask"];
export type PriceType = (typeof priceType)[number];
export declare function parsePriceTypeFromStringSafe(str?: string): Option<PriceType>;
export declare const candleAlignment: readonly ["session_start", "midnight"];
export type CandleAlignment = (typeof candleAlignment)[number];
export declare function parseCandleAlignmentFromStringSafe(str?: string): Option<CandleAlignment>;
/**
 * Candles data provider
 */
export interface CandleDataProvider {
    requestHistoryData(symbol: string, aggregation: AggregationPeriod, 
    /**
     * fromTime and toTime options are candles timestamps which should be used when requesting more candles data (lazy loading)
     * fromTime is an oldest candle's timestamp which should be data get from, toTime is the newest (usually toTime candle equals the oldest visible candle)
     */
    options?: {
        fromTime?: number;
        toTime?: number;
    } & ChartDataOptions): Promise<ChartCandleData[]>;
    subscribeCandles(symbol: string, aggregation: AggregationPeriod, subscriptionId: string, subscribeCallback: (data: ChartCandleData[]) => void, options?: ChartDataOptions): void;
    /**
     * Unsubscribe is called when symbol, aggregation or options are changed
     * @param subscriptionId
     */
    unsubscribeCandles(subscriptionId: string): void;
}
/**
 * Main data provider. Provides historical candles, last candle updates, quotes, etc.
 */
export type ChartDataProvider = CandleDataProvider & ServiceDataProvider;
/**
 * Internal provider, for internal usage only (!).
 */
export interface InternalChartDataProvider extends ChartDataProvider {
    observeSymbolChanged(): Observable<string>;
    observeSymbolCandleUpdated(): Observable<SymbolCandleUpdate>;
    fireLastCandleUpdate(candle: ChartCandleData): void;
}
export interface SymbolCandleUpdate {
    symbol: string;
    candle: ChartCandleData;
}
