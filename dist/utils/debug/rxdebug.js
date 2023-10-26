import { tap } from 'rxjs/operators';
import { dconsole } from './dconsole';
// eslint-disable-next-line no-restricted-syntax
export const log = (message) => tap(() => dconsole.log(message));
// eslint-disable-next-line no-restricted-syntax
export const logWithValue = (message) => tap(v => dconsole.log(message, v));
export const debug = (tag) => tap({
    next(value) {
        console.log(`%c[${tag}: Next]`, 'background: #3294B7; color: #fff; padding: 2px; border-radius: 2px; font-size: 10px;', value);
    },
    error(error) {
        console.log(`%c[${tag}: Error]`, 'background: #8B1D1D; color: #fff; padding: 2px; border-radius: 2px; font-size: 10px;', error);
    },
    complete() {
        console.log(`%c[${tag}]: Complete]`, 'background: #42D86F; color: #fff; padding: 2px; border-radius: 2px; font-size: 10px;');
    },
});
/**
 * Logging tools for {@link rxjs} package that can be useful in the `pipe` chains.
 * @see
 * The `rxdebug` package should only be used for debugging.
 */
export const rxdebug = {
    /**
     * Logs the message to the console and returns the data argument
     * @param message - message to show in console
     *
     * @example
     * import { rxdebug } from 'xxx/debug/rxdebug';
     * import { pipe } from 'fp-ts/function';
     * import { from } from 'rxjs'
     * import { observable } from 'fp-ts-rxjs';
     *
     * const double = (n: number): number => n * 2;
     * const obs = from([2]);
     *
     * const observableWithLog = pipe(
     * 	obs,
     * 	observable.map(double),
     * 	// Logs "my message" without changing the flow
     * 	rxdebug.log('My message'),
     * 	observable.map(double),
     * // Logs "8" to the console
     * ).subscribe(v => console.log(v));
     *
     */
    log,
    /**
     * Like {@link log}, but logs the passed data argument too
     * @param message - message to show in console
     *
     * @example
     * import { rxdebug } from 'xxx/debug/rxdebug';
     * import { pipe } from 'fp-ts/function';
     * import { from } from 'rxjs'
     * import { observable } from 'fp-ts-rxjs';
     *
     * const double = (n: number): number => n * 2;
     * const obs = from([2]);
     *
     * const observableWithLog = pipe(
     * 	obs,
     * 	observable.map(double),
     * 	// Logs "my message { 4 }" without changing the flow
     * 	rxdebug.logWithValue('My message'),
     * 	observable.map(double),
     * // Logs "8" to the console
     * ).subscribe(v => console.log(v));
     *
     */
    logWithValue,
    /**
     * Logs the detailed lifecycle of an observable.
     * @param tag used to identify the observable in logs.
     *
     * @example
     * import { rxdebug } from 'xxx/debug/rxdebug';
     * import { pipe } from 'fp-ts/function';
     * import { from } from 'rxjs'
     * import { observable } from 'fp-ts-rxjs';
     *
     * const double = (n: number): number => n * 2;
     * const obs = from([2]);
     *
     * const observableWithLog = pipe(
     * 	obs,
     * 	observable.map(double),
     * 	// Logs
     * 	// [Doubling observable] Next: 1
     * 	// [Doubling observable] Complete
     * 	// without changing the flow
     * 	rxdebug.debug('Doubling observable'),
     * 	observable.map(double),
     * // Logs "8" to the console
     * ).subscribe(v => console.log(v));
     *
     */
    debug,
};
