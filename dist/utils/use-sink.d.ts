import { URIS, URIS2 } from 'fp-ts/HKT';
import { MonadObservable, MonadObservable1, MonadObservable2 } from './typeclasses/monad-observable';
import { Sink, Sink1, Sink2 } from './adt/sink.utils';
export declare function dxUseSink<M extends URIS2>(M: MonadObservable2<M>): <A>(factory: () => Sink2<M, A>, dependencies: unknown[], subscribeEffects?: boolean) => A;
export declare function dxUseSink<M extends URIS>(M: MonadObservable1<M>): <A>(factory: () => Sink1<M, A>, dependencies: unknown[], subscribeEffects?: boolean) => A;
export declare function dxUseSink<M>(M: MonadObservable<M>): <A>(factory: () => Sink<M, A>, dependencies: unknown[], subscribeEffects?: boolean) => A;
export declare const useSink: <A>(factory: () => Sink1<"Observable", A>, dependencies: unknown[], subscribeEffects?: boolean) => A;
