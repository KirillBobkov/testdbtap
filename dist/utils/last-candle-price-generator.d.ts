export interface PriceDiffGeneratorConfig {
    readonly volatility?: number;
}
/**
 * Creates price diff generator which calculates diff according the following formula:
 * diff = (1 - volatility / 2) + volatility * Math.random()
 * @doc-tags tricky
 * @param config
 */
export declare function createPriceDiffGenerator(config?: PriceDiffGeneratorConfig): Generator<number, void, unknown>;
