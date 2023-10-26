import { Either, either as fptseither, URI } from 'fp-ts/Either';
import { CoproductLeft } from '../typeclasses/product-left-coproduct-left.utils';
export declare const either: typeof fptseither & CoproductLeft<URI>;
export declare const combineEither: import("../typeclasses/product-left-coproduct-left.utils").CoproductMap<"Either">;
export declare const sequenceTEither: <E, T extends Either<E, any>[]>(...t: T & {
    readonly 0: Either<E, any>;
}) => Either<E, { [K in keyof T]: [T[K]] extends [Either<E, infer A>] ? A : never; }>;
export declare const sequenceEither: <E, A>(ta: Either<E, A>[]) => Either<E, A[]>;
export type LeftType<F extends Either<any, any>> = F extends Either<infer L, infer A> ? L : never;
export type RightType<F extends Either<any, any>> = F extends Either<infer L, infer A> ? A : never;
