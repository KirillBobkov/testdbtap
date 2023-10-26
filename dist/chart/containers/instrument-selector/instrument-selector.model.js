export const toSuggest = (instrument, index) => ({
    description: instrument.description,
    symbol: instrument.symbol,
    type: instrument.type,
    sortIndex: index,
    priceIncrements: instrument.priceIncrements,
    tradingHours: instrument.tradingHours,
    tradable: instrument.tradable,
});
export const toInstrument = (suggest) => ({
    description: suggest.description,
    symbol: suggest.symbol,
    type: suggest.type,
    priceIncrements: suggest.priceIncrements,
    tradingHours: suggest.tradingHours,
    tradable: suggest.tradable,
});
