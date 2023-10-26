import { observable as rxjs } from 'fp-ts-rxjs/Observable';
import { pipe } from 'fp-ts/function';
import { catchError, delay, distinctUntilChanged, mergeMap, reduce, repeat, retry, scan, share, startWith, switchMap, take, tap, withLatestFrom, } from 'rxjs/operators';
import { combineLatest, defer, EMPTY, from, fromEvent, merge, Observable, Subject, throwError, timer } from 'rxjs';
import { task } from 'fp-ts';
import { ajax } from 'rxjs/ajax';
import * as rx from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';
/**
 * Instance of fp-compatible rxjs observable.
 * @doc-tags fp
 */
// @ts-ignore
export const instanceObservable = {
    ...rxjs,
    chain: (fa, f) => pipe(fa, switchMap(f)),
    // @ts-ignore
    createPropertyAdapter: () => {
        const s = new Subject();
        const next = (a) => s.next(a);
        return [next, s.asObservable()];
    },
    fromEvent: (target, event) => pipe(new Observable(subscriber => {
        const handler = (e) => subscriber.next(e);
        target.addEventListener(event, handler);
        return () => target.removeEventListener(event, handler);
    }), share()),
    // @ts-ignore
    fromObservable: observable => 
    // @ts-ignore
    new Observable(subscriber => observable.subscribe({
        end() {
            subscriber.complete();
        },
        // @ts-ignore
        next(e) {
            subscriber.next(e);
        },
    })),
    fromTask: fa => from(fa()),
    fromIO: fa => from(task.fromIO(fa)()),
    subscribe: (fa, observer) => fa.subscribe({
        next(e) {
            observer.next(e);
        },
        complete() {
            observer.end();
        },
    }),
};
export const observable = {
    ...instanceObservable,
    observable: instanceObservable,
    EMPTY,
    ajax,
    rx,
    catchError,
    combineLatest,
    defer,
    delay,
    distinctUntilChanged,
    fromEvent,
    merge,
    repeat,
    retry,
    scan,
    startWith,
    take,
    tap,
    timer,
    webSocket,
    withLatestFrom,
    from,
    reduce,
    mergeMap,
    throwError,
};
