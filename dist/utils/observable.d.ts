import { observable as rxjs, URI } from 'fp-ts-rxjs/Observable';
import { MonadObservable1 } from './typeclasses/monad-observable';
import { catchError, delay, distinctUntilChanged, mergeMap, reduce, repeat, retry, scan, startWith, take, tap, withLatestFrom } from 'rxjs/operators';
import { combineLatest, defer, from, fromEvent, merge, Observable, throwError, timer } from 'rxjs';
import { task } from 'fp-ts';
import * as rx from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';
/**
 * Instance of fp-compatible rxjs observable.
 * @doc-tags fp
 */
export declare const instanceObservable: typeof rxjs & MonadObservable1<URI>;
export declare const observable: {
    observable: import("fp-ts/lib/Monad").Monad1<"Observable"> & import("fp-ts/lib/Alternative").Alternative1<"Observable"> & import("fp-ts/lib/Filterable").Filterable1<"Observable"> & import("fp-ts-rxjs/lib/MonadObservable").MonadObservable1<"Observable"> & MonadObservable1<"Observable">;
    EMPTY: Observable<never>;
    ajax: import("rxjs/internal/ajax/ajax").AjaxCreationMethod;
    rx: typeof rx;
    catchError: typeof catchError;
    combineLatest: typeof combineLatest;
    defer: typeof defer;
    delay: typeof delay;
    distinctUntilChanged: typeof distinctUntilChanged;
    fromEvent: typeof fromEvent;
    merge: typeof merge;
    repeat: typeof repeat;
    retry: typeof retry;
    scan: typeof scan;
    startWith: typeof startWith;
    take: typeof take;
    tap: typeof tap;
    timer: typeof timer;
    webSocket: typeof webSocket;
    withLatestFrom: typeof withLatestFrom;
    from: typeof from;
    reduce: typeof reduce;
    mergeMap: typeof mergeMap;
    throwError: typeof throwError;
    ap: <A, B>(fab: Observable<(a: A) => B>, fa: Observable<A>) => Observable<B>;
    URI: "Observable";
    map: <A_1, B_1>(fa: Observable<A_1>, f: (a: A_1) => B_1) => Observable<B_1>;
    of: <A_2>(a: A_2) => Observable<A_2>;
    chain: <A_3, B_2>(fa: Observable<A_3>, f: (a: A_3) => Observable<B_2>) => Observable<B_2>;
    alt: <A_4>(fa: Observable<A_4>, that: import("fp-ts/function").Lazy<Observable<A_4>>) => Observable<A_4>;
    zero: <A_5>() => Observable<A_5>;
    partitionMap: <A_6, B_3, C>(fa: Observable<A_6>, f: (a: A_6) => import("fp-ts/lib/Either").Either<B_3, C>) => import("fp-ts/lib/Separated").Separated<Observable<B_3>, Observable<C>>;
    partition: import("fp-ts/lib/Filterable").Partition1<"Observable">;
    filterMap: <A_7, B_4>(fa: Observable<A_7>, f: (a: A_7) => import("fp-ts/lib/Option").Option<B_4>) => Observable<B_4>;
    filter: import("fp-ts/lib/Filterable").Filter1<"Observable">;
    compact: <A_8>(fa: Observable<import("fp-ts/lib/Option").Option<A_8>>) => Observable<A_8>;
    separate: <A_9, B_5>(fa: Observable<import("fp-ts/lib/Either").Either<A_9, B_5>>) => import("fp-ts/lib/Separated").Separated<Observable<A_9>, Observable<B_5>>;
    fromObservable: (<A_10>(fa: Observable<A_10>) => Observable<A_10>) & (<A_11>(observable: import("./typeclasses/monad-observable").Observable<A_11>) => Observable<A_11>);
    fromIO: <A_12>(fa: import("fp-ts/lib/IO").IO<A_12>) => Observable<A_12>;
    fromTask: <A_13>(fa: task.Task<A_13>) => Observable<A_13>;
    createAdapter: <A_14>() => import("./typeclasses/monad-observable").Adapter1<"Observable", A_14>;
    subscribe: <A_15>(fa: Observable<A_15>, observer: import("./typeclasses/monad-observable").Observer<A_15>) => import("./typeclasses/monad-observable").Subscription;
};
