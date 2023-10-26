import { ChartInstrument } from '@devexperts/dxcharts-lite/dist/chart/components/chart/chart.component';
/**
 * Main instrument model.
 * @doc-tags model
 */
export interface Instrument {
    description?: string;
    symbol: string;
    type: string;
    /**
     * defines possible price step values on price axis
     */
    priceIncrements: number[];
    tradingHours?: string;
    tradable?: boolean;
}
export declare const instrumentToChartInstrument: (instrument: Instrument) => ChartInstrument;
export declare const fromChartInstrument: (instrument: ChartInstrument) => Instrument;
export declare const getEmptyInstrument: () => {
    description: string;
    symbol: string;
    type: string;
    priceIncrements: never[];
};
export declare const isForex: (instrument?: Instrument) => boolean;
export declare const isStock: (instrument?: Instrument) => boolean;
export declare const createInstrumentFromSymbol: (symbol: string) => Instrument;
