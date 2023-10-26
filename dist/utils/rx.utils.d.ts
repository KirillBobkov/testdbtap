import { Observable } from 'rxjs';
import { Unsubscriber } from '@devexperts/dxcharts-lite/dist/chart/utils/function.utils';
/**
 * Subscribes to observable without any logic.
 *
 * ### WARNING ###
 * USE THIS ONLY IF YOU ARE SURE THAT THIS IS "SINGLE"
 * ###############
 *
 * Single means that it will emit result only once and then will destroy itself (complete).
 * Otherwise (if you're not sure) - it may (and WILL) cause memory leaks
 * @param subFn - function to subscribe
 */
export declare const subscribeSingle: <T>(subFn: (value: T) => void) => (observable: Observable<T>) => void;
/**
 * Adapter, creates observable for listener function.
 * Used for ChartEvents integration.
 * @param addListenerFn
 */
export declare const createObservableFromListener: (addListenerFn: (callback: () => void) => Unsubscriber) => Observable<never>;
export declare const createObservableFromListener1: <T>(addListenerFn: (callback: (value: T) => void) => Unsubscriber) => Observable<T>;
export declare const hold: <A>(source: Observable<A>) => Observable<A>;
