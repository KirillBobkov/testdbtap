import { Monad2 } from 'fp-ts/Monad';
import { Reader } from 'fp-ts/Reader';
import React from 'react';
import { Sink } from '../utils/sink';
import { ProductLeft, ProductMap } from '../utils/typeclasses/product-left-coproduct-left.utils';
export declare const URI = "@devexperts/dx-utils//Context";
export type URI = typeof URI;
declare module 'fp-ts/HKT' {
    interface URItoKind2<E, A> {
        [URI]: Context<E, A>;
    }
}
/**
 * Main type of context framework.
 * @doc-tags fp
 */
export interface Context<E, A> extends Reader<E, Sink<A>> {
}
export declare const instanceContext: Monad2<URI> & ProductLeft<URI>;
/**
 * Allows to load context lazily if the context returns react component.
 * @param contextPromise - function that returns promise of context (usually dynamic import)
 * @param fallback - fallback component
 * @returns - context, but lazy
 */
export declare const lazy: <T, P>(contextPromise: () => Promise<{
    default: Context<T, React.FC<P>>;
}>, fallback?: React.FC<P>, waitFor?: () => Promise<unknown>) => Context<T, React.FC<P>>;
/**
 * Context reader functions.
 * @doc-tags fp
 */
export declare const context: {
    sequenceT: <E, T extends Context<E, any>[]>(...t: T & {
        readonly 0: Context<E, any>;
    }) => Context<E, { [K in keyof T]: [T[K]] extends [Context<E, infer A>] ? A : never; }>;
    sequenceArray: <E_1, A_1>(ta: Context<E_1, A_1>[]) => Context<E_1, A_1[]>;
    combine: ProductMap<"@devexperts/dx-utils//Context">;
    defer: <E_2 extends object, A_2, K_1 extends keyof E_2>(fa: Context<E_2, A_2>, ...keys: K_1[]) => Context<Omit<E_2, K_1>, Context<Pick<E_2, K_1>, A_2>>;
    key: <A_3>() => <K_2 extends PropertyKey>(key: K_2) => Context<Record<K_2, A_3>, A_3>;
    extract: Context<unknown, any>;
    ifInitialized: <A_4, B>(arg: Context<A_4, B>) => Context<A_4, B>;
    lazy: <T_1, P>(contextPromise: () => Promise<{
        default: Context<T_1, React.FC<P>>;
    }>, fallback?: React.FC<P>, waitFor?: () => Promise<unknown>) => Context<T_1, React.FC<P>>;
    ap: <E_3, A_5, B_1>(fab: Context<E_3, (a: A_5) => B_1>, fa: Context<E_3, A_5>) => Context<E_3, B_1>;
    URI: "@devexperts/dx-utils//Context";
    map: <E_4, A_6, B_2>(fa: Context<E_4, A_6>, f: (a: A_6) => B_2) => Context<E_4, B_2>;
    of: <E_5, A_7>(a: A_7) => Context<E_5, A_7>;
    chain: <E_6, A_8, B_3>(fa: Context<E_6, A_8>, f: (a: A_8) => Context<E_6, B_3>) => Context<E_6, B_3>;
    productLeft: <EA, A_9, EB, B_4>(fa: Context<EA, A_9>, fb: Context<EB, B_4>) => Context<EA & EB, [A_9, B_4]>;
};
