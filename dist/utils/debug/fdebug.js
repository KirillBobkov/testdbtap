import { dconsole } from './dconsole';
export const log = (message) => (v) => {
    // eslint-disable-next-line no-restricted-syntax
    dconsole.log(message);
    return v;
};
export const logWithValue = (message) => (v) => {
    // eslint-disable-next-line no-restricted-syntax
    dconsole.log(message, v);
    return v;
};
/**
 * Logging tools that can be useful in the `pipe` chains.
 * @see
 * The `fdebug` package should only be used for debugging.
 */
export const fdebug = {
    /**
     * Logs the message to the console and returns the data argument
     *
     * @example
     * import { fdebug } from 'xxx/debug/fdebug';
     * import { pipe } from 'fp-ts/function';
     *
     * const double = (n: number): number => n * 2;
     *
     * // Logs "my message"
     * const doubledWithLog = (n: number) =>
     *     pipe(n, fdebug.log('my message'));
     *
     * // pipe behaviour is it was:
     * assert.strictEqual(doubledWithLog(2), 4);
     */
    log,
    /**
     * Like {@link log}, but logs the passed data argument too.
     *
     * @example
     * import { fdebug } from 'xxx/debug/fdebug';
     * import { pipe } from 'fp-ts/function';
     *
     * const double = (n: number): number => n * 2;
     *
     * // Logs "my message {value}"
     * const doubledWithLog = (n: number) =>
     *     pipe(n, fdebug.log('my message'));
     *
     * // pipe behaviour is it was:
     * assert.strictEqual(doubledWithLog(2), 4);
     */
    logWithValue,
};
