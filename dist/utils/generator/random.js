/**
 * A random number generator with ability to set a seed
 * Controlled random is crucial for performance tests' consitency.
 * @param seed
 * @doc-tags math
 */
export function mulberry32(seed) {
    return () => {
        let t = (seed += 0x6d2b79f5);
        // eslint-disable-next-line no-mixed-operators,no-bitwise
        t = Math.imul(t ^ (t >>> 15), t | 1);
        // eslint-disable-next-line no-mixed-operators,no-bitwise
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        // eslint-disable-next-line no-mixed-operators,no-bitwise
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
