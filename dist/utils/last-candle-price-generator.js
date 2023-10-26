const DEFAULT_VOLATILITY = 0.05;
/**
 * Creates price diff generator which calculates diff according the following formula:
 * diff = (1 - volatility / 2) + volatility * Math.random()
 * @doc-tags tricky
 * @param config
 */
export function* createPriceDiffGenerator(config = {}) {
    const volatility = config.volatility ?? DEFAULT_VOLATILITY;
    const minDiff = 1 - volatility / 2;
    for (;;) {
        yield minDiff + volatility * Math.random();
    }
}
