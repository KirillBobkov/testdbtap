/**
 * A random number generator with ability to set a seed
 * Controlled random is crucial for performance tests' consitency.
 * @param seed
 * @doc-tags math
 */
export declare function mulberry32(seed: number): () => number;
