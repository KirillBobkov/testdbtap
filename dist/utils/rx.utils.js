import { Observable } from 'rxjs';
import { shareReplay, take } from 'rxjs/operators';
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
export const subscribeSingle = (subFn) => (observable) => {
    observable.pipe(take(1)).subscribe(subFn);
};
/**
 * Adapter, creates observable for listener function.
 * Used for ChartEvents integration.
 * @param addListenerFn
 */
export const createObservableFromListener = (addListenerFn) => {
    return new Observable(subscriber => {
        addListenerFn(() => subscriber.next());
    });
};
export const createObservableFromListener1 = (addListenerFn) => {
    return new Observable(subscriber => {
        addListenerFn(value => subscriber.next(value));
    });
};
export const hold = shareReplay({ refCount: true, bufferSize: 1 });
