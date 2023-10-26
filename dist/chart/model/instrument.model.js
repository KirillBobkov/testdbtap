import { uuid } from '@devexperts/dxcharts-lite/dist/chart/utils/uuid.utils';
export const instrumentToChartInstrument = (instrument) => ({
    symbol: instrument.symbol,
    description: instrument.description,
    priceIncrements: instrument.priceIncrements,
});
export const fromChartInstrument = (instrument) => ({
    symbol: instrument.symbol || '',
    description: instrument.description || '',
    type: '',
    priceIncrements: instrument.priceIncrements || [],
});
export const getEmptyInstrument = () => ({
    description: '',
    symbol: '',
    type: '',
    priceIncrements: [],
});
export const isForex = (instrument) => (instrument ? instrument.type === 'FOREX' : false);
export const isStock = (instrument) => (instrument ? instrument.type === 'STOCK' : false);
export const createInstrumentFromSymbol = (symbol) => ({
    type: uuid(),
    symbol,
    priceIncrements: [0.0001, 1, 0.01],
    description: uuid(),
});
