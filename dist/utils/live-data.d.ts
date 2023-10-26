import { CoproductLeft } from './typeclasses/product-left-coproduct-left.utils';
import { Filterable2 } from 'fp-ts/Filterable';
import { MonadThrow2 } from 'fp-ts/MonadThrow';
import { Observable } from 'rxjs';
import { RemoteData } from './remote-data';
declare const URI = "LiveData";
declare module 'fp-ts/HKT' {
    interface URItoKind2<E, A> {
        [URI]: LiveData<E, A>;
    }
}
export type LiveData<E, A> = Observable<RemoteData<E, A>>;
export declare const chainRD: <E, A, B>(f: (a: A) => RemoteData<E, B>) => (fa: LiveData<E, A>) => LiveData<E, B>;
export declare const filterSuccess: <E, A>(fa: LiveData<E, A>) => Observable<A>;
/**
 * Live data functions.
 * @doc-tags fp
 */
export declare const liveData: {
    liveData: MonadThrow2<"LiveData"> & CoproductLeft<"LiveData"> & Filterable2<"LiveData">;
    sequenceT: <E, T extends LiveData<E, any>[]>(...t: T & {
        readonly 0: LiveData<E, any>;
    }) => LiveData<E, { [K in keyof T]: [T[K]] extends [LiveData<E, infer A>] ? A : never; }>;
    sequenceArray: <E_1, A_1>(ta: LiveData<E_1, A_1>[]) => LiveData<E_1, A_1[]>;
    combine: import("./typeclasses/product-left-coproduct-left.utils").CoproductMap<"LiveData">;
    scan: <E_2, A_2, B>(seed: B, f: (acc: B, a: A_2) => B) => (fa: LiveData<E_2, A_2>) => LiveData<E_2, B>;
    startWith: <A_3>(a: A_3) => <E_3>(fa: LiveData<E_3, A_3>) => LiveData<E_3, A_3>;
    withLatestFrom: <As extends unknown[], E_4>(...inputs: { [K_1 in keyof As]: Observable<RemoteData<E_4, As[K_1]>>; }) => <A_4>(source: Observable<RemoteData<E_4, A_4>>) => Observable<RemoteData<E_4, [A_4, ...As]>>;
    tap: <E_5, A_5>(f: (a: A_5) => void) => (fa: LiveData<E_5, A_5>) => LiveData<E_5, A_5>;
    chainRD: <E_6, A_6, B_1>(f: (a: A_6) => RemoteData<E_6, B_1>) => (fa: LiveData<E_6, A_6>) => LiveData<E_6, B_1>;
    combineS: <E_7, NER extends Record<string, LiveData<E_7, any>>>(r: (keyof NER extends never ? never : NER) & Record<string, LiveData<E_7, any>>) => LiveData<E_7, { [K_2 in keyof NER]: [NER[K_2]] extends [LiveData<any, infer A_7>] ? A_7 : never; }>;
    filterSuccess: <E_8, A_8>(fa: LiveData<E_8, A_8>) => Observable<A_8>;
    foldWithError: <E_9, A_9>(onSuccess: (value: A_9) => void, onError: (error: E_9) => void) => (data: LiveData<E_9, A_9>) => Observable<RemoteData<E_9, A_9>>;
    throwError: <E_10, A_10>(e: E_10) => LiveData<E_10, A_10>;
    ap: <E_11, A_11, B_2>(fab: LiveData<E_11, (a: A_11) => B_2>, fa: LiveData<E_11, A_11>) => LiveData<E_11, B_2>;
    URI: "LiveData";
    map: <E_12, A_12, B_3>(fa: LiveData<E_12, A_12>, f: (a: A_12) => B_3) => LiveData<E_12, B_3>;
    of: <E_13, A_13>(a: A_13) => LiveData<E_13, A_13>;
    chain: <E_14, A_14, B_4>(fa: LiveData<E_14, A_14>, f: (a: A_14) => LiveData<E_14, B_4>) => LiveData<E_14, B_4>;
    coproductLeft: <EA, A_15, EB, B_5>(fa: LiveData<EA, A_15>, fb: LiveData<EB, B_5>) => LiveData<EA | EB, [A_15, B_5]>;
    partitionMap: <E_15, A_16, B_6, C>(fa: LiveData<E_15, A_16>, f: (a: A_16) => import("fp-ts/lib/Either").Either<B_6, C>) => import("fp-ts/lib/Separated").Separated<LiveData<E_15, B_6>, LiveData<E_15, C>>;
    partition: import("fp-ts/Filterable").Partition2<"LiveData">;
    filterMap: <E_16, A_17, B_7>(fa: LiveData<E_16, A_17>, f: (a: A_17) => import("fp-ts/lib/Option").Option<B_7>) => LiveData<E_16, B_7>;
    filter: import("fp-ts/Filterable").Filter2<"LiveData">;
    compact: <E_17, A_18>(fa: LiveData<E_17, import("fp-ts/lib/Option").Option<A_18>>) => LiveData<E_17, A_18>;
    separate: <E_18, A_19, B_8>(fa: LiveData<E_18, import("fp-ts/lib/Either").Either<A_19, B_8>>) => import("fp-ts/lib/Separated").Separated<LiveData<E_18, A_19>, LiveData<E_18, B_8>>;
};
export {};
