import { ChartCandleData, InternalChartDataProvider } from '../../chart-data-provider';
export declare const toCandlesFromPartial: (data: PartialCandle) => ChartCandleData;
export declare const createMockChartRealDataProvider: () => InternalChartDataProvider;
interface PartialCandle {
    c: number;
    h: number;
    l: number;
    o: number;
    v: number;
    t: number;
}
export {};
