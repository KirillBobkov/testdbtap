import { asks, reader as fptsreader } from 'fp-ts/Reader';
import { sequenceT } from 'fp-ts/Apply';
import { tuple } from 'fp-ts/function';
import { productMapLeft } from '../typeclasses/product-left-coproduct-left.utils';
import { defer } from '../typeclasses/monad-reader';
const productLeft = (fa, fb) => asks(e => tuple(fa(e), fb(e)));
const runReader = (fa, e) => fa(e);
// TODO: find actual type instead of deprecated
export const reader = {
    ...fptsreader,
    asks,
    runReader,
    productLeft,
};
export const sequenceTReader = sequenceT(reader);
export const combineReader = productMapLeft(reader);
export const deferReader = defer(reader);
