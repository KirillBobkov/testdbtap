import { CHART_INSTRUMENTS_MOCK } from '../../chart/components/symbol-suggest/symbol-suggest.fixture';
const doesInstrumentContainString = (search) => (instrument) => {
    const { symbol, description } = instrument;
    const nameLoweCase = symbol.toLowerCase();
    const descriptionLoweCase = description?.toLowerCase();
    const searchLowerCase = search.toLowerCase();
    return nameLoweCase.includes(searchLowerCase) || descriptionLoweCase?.includes(searchLowerCase);
};
const filterMockData = (search) => CHART_INSTRUMENTS_MOCK.filter(doesInstrumentContainString(search));
export const createMockSymbolSuggestProvider = {
    findInstrument(symbol) {
        const instrument = filterMockData(symbol)[0] ?? { symbol, type: 'MOCK', priceIncrements: [0.01] };
        return Promise.resolve(instrument);
    },
    searchInstruments(search) {
        return Promise.resolve(filterMockData(search));
    },
    onInstrumentChanged(symbol, chartId) { },
};
