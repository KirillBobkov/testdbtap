export const createLocalInstrumentStore = () => {
    const localInstrumentsMap = new Map();
    return {
        getInstruments() {
            return Array.from(localInstrumentsMap.values());
        },
        getInstrumentBySymbol(symbol) {
            return localInstrumentsMap.get(symbol);
        },
        updateInstruments(instruments) {
            instruments.forEach(instrument => {
                localInstrumentsMap.set(instrument.symbol, instrument);
            });
        },
    };
};
