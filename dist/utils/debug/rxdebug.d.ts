export declare const log: <T>(message: string) => import("rxjs").MonoTypeOperatorFunction<T>;
export declare const logWithValue: <T>(message: string) => import("rxjs").MonoTypeOperatorFunction<T>;
export declare const debug: <T>(tag: string) => import("rxjs").MonoTypeOperatorFunction<T>;
/**
 * Logging tools for {@link rxjs} package that can be useful in the `pipe` chains.
 * @see
 * The `rxdebug` package should only be used for debugging.
 */
export declare const rxdebug: {
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
    log: <T>(message: string) => import("rxjs").MonoTypeOperatorFunction<T>;
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
    logWithValue: <T_1>(message: string) => import("rxjs").MonoTypeOperatorFunction<T_1>;
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
    debug: <T_2>(tag: string) => import("rxjs").MonoTypeOperatorFunction<T_2>;
};
