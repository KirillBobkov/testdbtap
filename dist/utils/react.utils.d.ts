import { URIS, URIS2 } from 'fp-ts/HKT';
import React, { FC } from 'react';
import { Observable } from 'rxjs';
import { Sink, Sink1, Sink2 } from './adt/sink.utils';
import { Property } from './property.utils';
import { MonadObservable, MonadObservable1, MonadObservable2 } from './typeclasses/monad-observable';
export declare const namedMemo: <A extends Record<string, any>>(name: string, Component: React.FC<A>, propsAreEqual?: ((prevProps: Readonly<React.PropsWithChildren<A>>, nextProps: Readonly<React.PropsWithChildren<A>>) => boolean) | undefined) => React.FC<A>;
export declare const namedMemoRef: <A extends Record<string, any>, Ref>(name: string, Component: React.ForwardRefRenderFunction<Ref, A>) => React.FC<A & React.RefAttributes<Ref>>;
export declare function dxUseSink<M extends URIS2>(M: MonadObservable2<M>): <A>(factory: () => Sink2<M, A>, dependencies: unknown[]) => A;
export declare function dxUseSink<M extends URIS>(M: MonadObservable1<M>): <A>(factory: () => Sink1<M, A>, dependencies: unknown[]) => A;
export declare function dxUseSink<M>(M: MonadObservable<M>): <A>(factory: () => Sink<M, A>, dependencies: unknown[]) => A;
export declare const useObservable: <A>(fa: Observable<A>, initial: A) => A;
export declare const useProperty: <A>(fa: Property<A>) => A;
/**
 * An optimization, useObservable is very expensive hook - it causes react rerenders.
 * Sometimes we store multiple structures inside one observable, but we will have to rerender container every time
 * when any structure inside observable is changed even if we need updates from only one structure!
 * So this hook let you rerender container only when one structure is changed.
 * @param fa
 * @param initial
 * @param path
 */
export declare function useDirectObservable<FA, K1 extends keyof FA, K2 extends keyof FA[K1], K3 extends keyof FA[K1][K2], K4 extends keyof FA[K1][K2][K3], K5 extends keyof FA[K1][K2][K3][K4]>(fa: Observable<FA>, initial: FA[K1][K2][K3][K4][K5], path: [K1, K2, K3, K4, K5]): FA[K1][K2][K3][K4][K5];
export declare function useDirectObservable<FA, K1 extends keyof FA, K2 extends keyof FA[K1], K3 extends keyof FA[K1][K2], K4 extends keyof FA[K1][K2][K3]>(fa: Observable<FA>, initial: FA[K1][K2][K3][K4], path: [K1, K2, K3, K4]): FA[K1][K2][K3][K4];
export declare function useDirectObservable<FA, K1 extends keyof FA, K2 extends keyof FA[K1], K3 extends keyof FA[K1][K2]>(fa: Observable<FA>, initial: FA[K1][K2][K3], path: [K1, K2, K3]): FA[K1][K2][K3];
export declare function useDirectObservable<FA, K1 extends keyof FA, K2 extends keyof FA[K1]>(fa: Observable<FA>, initial: FA[K1][K2], path: [K1, K2]): FA[K1][K2];
export declare function useDirectObservable<FA, K1 extends keyof FA>(fa: Observable<FA>, initial: FA[K1], path: [K1]): FA[K1];
export declare function useDirectProperty<FA, K1 extends keyof FA, K2 extends keyof FA[K1], K3 extends keyof FA[K1][K2], K4 extends keyof FA[K1][K2][K3], K5 extends keyof FA[K1][K2][K3][K4]>(fa: Property<FA>, path: [K1, K2, K3, K4, K5]): FA[K1][K2][K3][K4][K5];
export declare function useDirectProperty<FA, K1 extends keyof FA, K2 extends keyof FA[K1], K3 extends keyof FA[K1][K2], K4 extends keyof FA[K1][K2][K3]>(fa: Property<FA>, path: [K1, K2, K3, K4]): FA[K1][K2][K3][K4];
export declare function useDirectProperty<FA, K1 extends keyof FA, K2 extends keyof FA[K1], K3 extends keyof FA[K1][K2]>(fa: Property<FA>, path: [K1, K2, K3]): FA[K1][K2][K3];
export declare function useDirectProperty<FA, K1 extends keyof FA, K2 extends keyof FA[K1]>(fa: Property<FA>, path: [K1, K2]): FA[K1][K2];
export declare function useDirectProperty<FA, K1 extends keyof FA>(fa: Property<FA>, path: [K1]): FA[K1];
export declare const setDirectHTMLValue: (node: Node, value: string) => string;
/**
 * A wrapper for idle react component imports.
 * The import & render will be performed only when chart has finished initialization (wait until idle).
 * @argument componentPromise - a lazy import - `() => import('component')`
 */
export declare const importIdle: <T extends object>(componentPromise: () => Promise<{
    default: React.FunctionComponent<T>;
}>, waitFor?: () => Promise<unknown>) => React.FC<T>;
/**
 * React functions library.
 * @doc-tags fp,react
 */
export declare const react: {
    namedMemo: <A extends Record<string, any>>(name: string, Component: React.FC<A>, propsAreEqual?: ((prevProps: Readonly<React.PropsWithChildren<A>>, nextProps: Readonly<React.PropsWithChildren<A>>) => boolean) | undefined) => React.FC<A>;
    namedMemoRef: <A_1 extends Record<string, any>, Ref>(name: string, Component: React.ForwardRefRenderFunction<Ref, A_1>) => React.FC<A_1 & React.RefAttributes<Ref>>;
    useSink: <A_2>(factory: () => Sink1<"Observable", A_2>, dependencies: unknown[]) => A_2;
    useObservable: <A_3>(fa: Observable<A_3>, initial: A_3) => A_3;
    useProperty: <A_4>(fa: Property<A_4>) => A_4;
    useDirectObservable: typeof useDirectObservable;
    useDirectProperty: typeof useDirectProperty;
    typedMemo: <T>(c: T) => T;
};
