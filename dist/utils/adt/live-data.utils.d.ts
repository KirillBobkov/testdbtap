import { HKT, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT';
import { ApplicativeComposition, ApplicativeComposition11, ApplicativeComposition12 } from 'fp-ts/Applicative';
import { MonadThrow, MonadThrow1, MonadThrow2 } from 'fp-ts/MonadThrow';
import { Filterable, Filterable1, FilterableComposition, FilterableComposition11, FilterableComposition12 } from 'fp-ts/Filterable';
import { MonadObservable, MonadObservable1 } from '../typeclasses/monad-observable';
import { FoldableValue, FoldableValue1, FoldableValue2 } from '../typeclasses/foldable-value';
export interface LiveData<O, F, A> extends HKT<O, HKT<F, A>> {
}
export type LiveData11<O extends URIS, F extends URIS, A> = Kind<O, Kind<F, A>>;
export type LiveData12<O extends URIS, F extends URIS2, E, A> = Kind<O, Kind2<F, E, A>>;
export interface LiveDataM<O, F> extends FilterableComposition<O, F>, ApplicativeComposition<O, F> {
    readonly chain: <A, B>(fa: LiveData<O, F, A>, f: (a: A) => LiveData<O, F, B>) => LiveData<O, F, B>;
    readonly throwError: <E>(e: E) => LiveData<O, F, never>;
    readonly coproductLeft: <EA, A, EB, B>(fa: LiveData<O, F, A>, fb: LiveData<O, F, B>) => LiveData<O, F, [A, B]>;
}
export interface LiveDataM11<O extends URIS, F extends URIS> extends FilterableComposition11<O, F>, ApplicativeComposition11<O, F> {
    readonly chain: <A, B>(fa: LiveData11<O, F, A>, f: (a: A) => LiveData11<O, F, B>) => LiveData11<O, F, B>;
    readonly throwError: <E>(e: E) => LiveData11<O, F, never>;
    readonly coproductLeft: <EA, A, EB, B>(fa: LiveData11<O, F, A>, fb: LiveData11<O, F, B>) => LiveData11<O, F, [A, B]>;
}
export interface LiveDataM12<O extends URIS, F extends URIS2> extends FilterableComposition12<O, F>, ApplicativeComposition12<O, F> {
    readonly chain: <E, A, B>(fa: LiveData12<O, F, E, A>, f: (a: A) => LiveData12<O, F, E, B>) => LiveData12<O, F, E, B>;
    readonly throwError: <E>(e: E) => LiveData12<O, F, E, never>;
    readonly coproductLeft: <EA, A, EB, B>(fa: LiveData12<O, F, EA, A>, fb: LiveData12<O, F, EB, B>) => LiveData12<O, F, EA | EB, [A, B]>;
}
export declare function getLiveDataM<O extends URIS, F extends URIS2>(O: MonadObservable1<O> & Filterable1<O>, F: FoldableValue2<F> & MonadThrow2<F>): LiveDataM12<O, F>;
export declare function getLiveDataM<O extends URIS, F extends URIS>(O: MonadObservable1<O> & Filterable1<O>, F: FoldableValue1<F> & MonadThrow1<F>): LiveDataM11<O, F>;
export declare function getLiveDataM<O, F>(O: MonadObservable<O> & Filterable<O>, F: FoldableValue<F> & MonadThrow<F>): LiveDataM<O, F>;
