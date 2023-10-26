import { combine, elem, exists, RemoteData as RDDX, toOption, fromProgressEvent } from './adt/remote-data.adt';
export type { RemoteInitial, RemoteFailure, RemotePending, RemoteSuccess } from './adt/remote-data.adt';
export type RemoteData<E, A> = RDDX<E, A>;
export declare const instanceRemoteData: {
    throwError: <E, A>(e: E) => RDDX<E, A>;
    ap: <E_1, A_1, B>(fab: RDDX<E_1, (a: A_1) => B>, fa: RDDX<E_1, A_1>) => RDDX<E_1, B>;
    URI: "RemoteData";
    map: <E_2, A_2, B_1>(fa: RDDX<E_2, A_2>, f: (a: A_2) => B_1) => RDDX<E_2, B_1>;
    of: <E_3, A_3>(a: A_3) => RDDX<E_3, A_3>;
    chain: <E_4, A_4, B_2>(fa: RDDX<E_4, A_4>, f: (a: A_4) => RDDX<E_4, B_2>) => RDDX<E_4, B_2>;
    foldValue: <E_5, A_5, B_3>(fa: RDDX<E_5, A_5>, onNever: (fn: RDDX<E_5, never>) => B_3, onValue: (a: A_5) => B_3) => B_3;
    reduce: <E_6, A_6, B_4>(fa: RDDX<E_6, A_6>, b: B_4, f: (b: B_4, a: A_6) => B_4) => B_4;
    foldMap: <M>(M: import("fp-ts/lib/Monoid").Monoid<M>) => <E_7, A_7>(fa: RDDX<E_7, A_7>, f: (a: A_7) => M) => M;
    reduceRight: <E_8, A_8, B_5>(fa: RDDX<E_8, A_8>, b: B_5, f: (a: A_8, b: B_5) => B_5) => B_5;
    traverse: import("fp-ts/lib/Traversable").Traverse2<"RemoteData">;
    sequence: import("fp-ts/lib/Traversable").Sequence2<"RemoteData">;
    bimap: <E_9, A_9, G, B_6>(fea: RDDX<E_9, A_9>, f: (e: E_9) => G, g: (a: A_9) => B_6) => RDDX<G, B_6>;
    mapLeft: <E_10, A_10, G_1>(fea: RDDX<E_10, A_10>, f: (e: E_10) => G_1) => RDDX<G_1, A_10>;
    alt: <E_11, A_11>(fa: RDDX<E_11, A_11>, that: import("fp-ts/function").Lazy<RDDX<E_11, A_11>>) => RDDX<E_11, A_11>;
    extend: <E_12, A_12, B_7>(wa: RDDX<E_12, A_12>, f: (wa: RDDX<E_12, A_12>) => B_7) => RDDX<E_12, B_7>;
    zero: <E_13, A_13>() => RDDX<E_13, A_13>;
};
export declare const toVoid: <E, T>(rd: RemoteData<E, T>) => RemoteData<E, void>;
/**
 * Remote data functions.
 * @doc-tags fp
 */
export declare const remoteData: {
    remoteData: {
        throwError: <E, A>(e: E) => RDDX<E, A>;
        ap: <E_1, A_1, B>(fab: RDDX<E_1, (a: A_1) => B>, fa: RDDX<E_1, A_1>) => RDDX<E_1, B>;
        URI: "RemoteData";
        map: <E_2, A_2, B_1>(fa: RDDX<E_2, A_2>, f: (a: A_2) => B_1) => RDDX<E_2, B_1>;
        of: <E_3, A_3>(a: A_3) => RDDX<E_3, A_3>;
        chain: <E_4, A_4, B_2>(fa: RDDX<E_4, A_4>, f: (a: A_4) => RDDX<E_4, B_2>) => RDDX<E_4, B_2>;
        foldValue: <E_5, A_5, B_3>(fa: RDDX<E_5, A_5>, onNever: (fn: RDDX<E_5, never>) => B_3, onValue: (a: A_5) => B_3) => B_3;
        reduce: <E_6, A_6, B_4>(fa: RDDX<E_6, A_6>, b: B_4, f: (b: B_4, a: A_6) => B_4) => B_4;
        foldMap: <M>(M: import("fp-ts/lib/Monoid").Monoid<M>) => <E_7, A_7>(fa: RDDX<E_7, A_7>, f: (a: A_7) => M) => M;
        reduceRight: <E_8, A_8, B_5>(fa: RDDX<E_8, A_8>, b: B_5, f: (a: A_8, b: B_5) => B_5) => B_5;
        traverse: import("fp-ts/lib/Traversable").Traverse2<"RemoteData">;
        sequence: import("fp-ts/lib/Traversable").Sequence2<"RemoteData">;
        bimap: <E_9, A_9, G, B_6>(fea: RDDX<E_9, A_9>, f: (e: E_9) => G, g: (a: A_9) => B_6) => RDDX<G, B_6>;
        mapLeft: <E_10, A_10, G_1>(fea: RDDX<E_10, A_10>, f: (e: E_10) => G_1) => RDDX<G_1, A_10>;
        alt: <E_11, A_11>(fa: RDDX<E_11, A_11>, that: import("fp-ts/function").Lazy<RDDX<E_11, A_11>>) => RDDX<E_11, A_11>;
        extend: <E_12, A_12, B_7>(wa: RDDX<E_12, A_12>, f: (wa: RDDX<E_12, A_12>) => B_7) => RDDX<E_12, B_7>;
        zero: <E_13, A_13>() => RDDX<E_13, A_13>;
    };
    initial: RDDX<never, never>;
    success: <E = never, A = never>(value: A) => RDDX<E, A>;
    failure: <E_1 = never, A_1 = never>(error: E_1) => RDDX<E_1, A_1>;
    pending: RDDX<never, never>;
    isSuccess: <A_2>(data: RDDX<unknown, A_2>) => data is import("./adt/remote-data.adt").RemoteSuccess<A_2>;
    isFailure: <E_2>(data: RDDX<E_2, unknown>) => data is import("./adt/remote-data.adt").RemoteFailure<E_2>;
    isPending: (data: RDDX<unknown, unknown>) => data is import("./adt/remote-data.adt").RemotePending;
    isInitial: (data: RDDX<unknown, unknown>) => data is import("./adt/remote-data.adt").RemoteInitial;
    combine: typeof combine;
    toOption: typeof toOption;
    elem: typeof elem;
    exists: typeof exists;
    getOrElse: <L, A_3>(f: import("fp-ts/function").Lazy<A_3>) => (ma: RDDX<L, A_3>) => A_3;
    getEq: <E_3, A_4>(EE: import("fp-ts/lib/Eq").Eq<E_3>, EA: import("fp-ts/lib/Eq").Eq<A_4>) => import("fp-ts/lib/Eq").Eq<RDDX<E_3, A_4>>;
    getMonoid: <L_1, A_5>(SL: import("fp-ts/lib/Semigroup").Semigroup<L_1>, SA: import("fp-ts/lib/Semigroup").Semigroup<A_5>) => import("fp-ts/lib/Monoid").Monoid<RDDX<L_1, A_5>>;
    getSemigroup: <E_4, A_6>(SE: import("fp-ts/lib/Semigroup").Semigroup<E_4>, SA: import("fp-ts/lib/Semigroup").Semigroup<A_6>) => import("fp-ts/lib/Semigroup").Semigroup<RDDX<E_4, A_6>>;
    fold: <E_5, A_7, B>(onInitial: () => B, onPending: (progress: import("fp-ts/lib/Option").Option<import("./adt/remote-data.adt").RemoteProgress>) => B, onFailure: (error: E_5) => B, onSuccess: (value: A_7) => B) => (ma: RDDX<E_5, A_7>) => B;
    combineS: <E_6, NER extends Record<string, RDDX<E_6, any>>>(r: (keyof NER extends never ? never : NER) & Record<string, RDDX<E_6, any>>) => RDDX<E_6, { [K in keyof NER]: [NER[K]] extends [RDDX<any, infer A_8>] ? A_8 : never; }>;
    toVoid: <E_7, T>(rd: RemoteData<E_7, T>) => RemoteData<E_7, void>;
    progress: (progress: import("./adt/remote-data.adt").RemoteProgress) => RDDX<never, never>;
    fromProgressEvent: typeof fromProgressEvent;
    chain: <E_8, A_9, B_1>(f: (a: A_9) => RDDX<E_8, B_1>) => (ma: RDDX<E_8, A_9>) => RDDX<E_8, B_1>;
    chainFirst: <E_9, A_10, B_2>(f: (a: A_10) => RDDX<E_9, B_2>) => (ma: RDDX<E_9, A_10>) => RDDX<E_9, A_10>;
    flatten: <E_10, A_11>(mma: RDDX<E_10, RDDX<E_10, A_11>>) => RDDX<E_10, A_11>;
    ap: <E_11, A_12>(fa: RDDX<E_11, A_12>) => <B_3>(fab: RDDX<E_11, (a: A_12) => B_3>) => RDDX<E_11, B_3>;
    apFirst: <E_12, B_4>(fb: RDDX<E_12, B_4>) => <A_13>(fa: RDDX<E_12, A_13>) => RDDX<E_12, A_13>;
    apSecond: <E_13, B_5>(fb: RDDX<E_13, B_5>) => <A_14>(fa: RDDX<E_13, A_14>) => RDDX<E_13, B_5>;
    map: <A_15, B_6>(f: (a: A_15) => B_6) => <E_14>(fa: RDDX<E_14, A_15>) => RDDX<E_14, B_6>;
    bimap: <E_15, G, A_16, B_7>(f: (e: E_15) => G, g: (a: A_16) => B_7) => (fa: RDDX<E_15, A_16>) => RDDX<G, B_7>;
    mapLeft: <E_16, G_1>(f: (e: E_16) => G_1) => <A_17>(fa: RDDX<E_16, A_17>) => RDDX<G_1, A_17>;
    extend: <E_17, A_18, B_8>(f: (wa: RDDX<E_17, A_18>) => B_8) => (wa: RDDX<E_17, A_18>) => RDDX<E_17, B_8>;
    duplicate: <E_18, A_19>(wa: RDDX<E_18, A_19>) => RDDX<E_18, RDDX<E_18, A_19>>;
    reduce: <A_20, B_9>(b: B_9, f: (b: B_9, a: A_20) => B_9) => <E_19>(fa: RDDX<E_19, A_20>) => B_9;
    foldMap: <M>(M: import("fp-ts/lib/Monoid").Monoid<M>) => <A_21>(f: (a: A_21) => M) => <E_20>(fa: RDDX<E_20, A_21>) => M;
    reduceRight: <A_22, B_10>(b: B_10, f: (a: A_22, b: B_10) => B_10) => <E_21>(fa: RDDX<E_21, A_22>) => B_10;
    alt: <E_22, A_23>(that: import("fp-ts/function").Lazy<RDDX<E_22, A_23>>) => (fa: RDDX<E_22, A_23>) => RDDX<E_22, A_23>;
    fromOption: <E_23>(onNone: import("fp-ts/function").Lazy<E_23>) => <A_24>(ma: import("fp-ts/lib/Option").Option<A_24>) => RDDX<E_23, A_24>;
    fromEither: <E_24, A_25>(ma: import("fp-ts/lib/Either").Either<E_24, A_25>) => RDDX<E_24, A_25>;
    fromPredicate: {
        <E_25, A_26, B_11 extends A_26>(refinement: import("fp-ts/lib/Refinement").Refinement<A_26, B_11>, onFalse: (a: A_26) => E_25): (a: A_26) => RDDX<E_25, B_11>;
        <E_26, A_27>(predicate: import("fp-ts/lib/Predicate").Predicate<A_27>, onFalse: (a: A_27) => E_26): (a: A_27) => RDDX<E_26, A_27>;
    };
    filterOrElse: {
        <E_27, A_28, B_12 extends A_28>(refinement: import("fp-ts/lib/Refinement").Refinement<A_28, B_12>, onFalse: (a: A_28) => E_27): (ma: RDDX<E_27, A_28>) => RDDX<E_27, B_12>;
        <E_28, A_29>(predicate: import("fp-ts/lib/Predicate").Predicate<A_29>, onFalse: (a: A_29) => E_28): (ma: RDDX<E_28, A_29>) => RDDX<E_28, A_29>;
    };
};
