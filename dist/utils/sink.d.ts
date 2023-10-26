import { Sink1 } from './adt/sink.utils';
import { Monad1 } from 'fp-ts/Monad';
import { Monoid } from 'fp-ts/Monoid';
import { Semigroup } from 'fp-ts/Semigroup';
import { instanceObservable } from './observable';
export type Sink<A> = Sink1<typeof instanceObservable.URI, A>;
declare const URI = "Sink";
type URIType = typeof URI;
declare module 'fp-ts/HKT' {
    interface URItoKind<A> {
        [URI]: Sink<A>;
    }
}
export declare const instanceSink: Monad1<URIType>;
/**
 * Sink functions.
 * @doc-tags fp
 */
export declare const sink: {
    sink: Monad1<"Sink">;
    sequenceT: <T extends Sink<any>[]>(...t: T & {
        readonly 0: Sink<any>;
    }) => Sink<{ [K in keyof T]: [T[K]] extends [Sink<infer A>] ? A : never; }>;
    sequenceS: <NER extends Record<string, Sink<any>>>(r: keyof NER extends never ? never : NER) => Sink<{ [K_1 in keyof NER]: [NER[K_1]] extends [Sink<infer A_1>] ? A_1 : never; }>;
    sequenceArray: <A_2>(ta: Sink<A_2>[]) => Sink<A_2[]>;
    getSemigroup: <A_3>(S: Semigroup<A_3>) => Semigroup<Sink<A_3>>;
    getMonoid: <A_4>(M: Monoid<A_4>) => Monoid<Sink<A_4>>;
    newSink: <A_5>(value: A_5, effects: import("rxjs").Observable<unknown>) => Sink1<"Observable", A_5>;
    chain: <A_6, B>(f: (a: A_6) => Sink<B>) => (ma: Sink<A_6>) => Sink<B>;
    chainFirst: <A_7, B_1>(f: (a: A_7) => Sink<B_1>) => (ma: Sink<A_7>) => Sink<A_7>;
    flatten: <A_8>(mma: Sink<Sink<A_8>>) => Sink<A_8>;
    ap: <A_9>(fa: Sink<A_9>) => <B_2>(fab: Sink<(a: A_9) => B_2>) => Sink<B_2>;
    apFirst: <B_3>(fb: Sink<B_3>) => <A_10>(fa: Sink<A_10>) => Sink<A_10>;
    apSecond: <B_4>(fb: Sink<B_4>) => <A_11>(fa: Sink<A_11>) => Sink<B_4>;
    map: <A_12, B_5>(f: (a: A_12) => B_5) => (fa: Sink<A_12>) => Sink<B_5>;
    URI: "Sink";
    of: <A_13>(a: A_13) => Sink<A_13>;
};
export {};
