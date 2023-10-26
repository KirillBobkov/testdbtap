import { Instrument } from '../chart/model/instrument.model';
/**
 * Searches instruments by text. Without this provider symbol suggest won't work.
 */
export interface SymbolSuggestProvider {
    /**
     * By given instrument symbol returns exactly one instrument (or throws error)
     * @param symbol
     */
    findInstrument(symbol: Instrument['symbol']): Promise<Instrument>;
    /**
     * By given search string returns Promise of suggest result.
     * @param search
     */
    searchInstruments(search: string): Promise<Instrument[]>;
    /**
     * Callback when instrument changed in specific chartId (multichart 0,1,2,3 supported).
     * @param symbol - new instrument symbol
     * @param chartId - chart on which instrument was changed; if all 4 charts changed - callback will be called 4 times.
     */
    onInstrumentChanged(symbol: string | undefined, chartId: string): void;
}
