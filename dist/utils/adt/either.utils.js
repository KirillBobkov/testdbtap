import { either as fptseither, isRight, right } from 'fp-ts/Either';
import { tuple } from 'fp-ts/function';
import { sequenceT } from 'fp-ts/Apply';
import { array } from 'fp-ts';
import { coproductMapLeft } from '../typeclasses/product-left-coproduct-left.utils';
const coproductLeft = (fa, fb) => {
    if (isRight(fa)) {
        if (isRight(fb)) {
            return right(tuple(fa.right, fb.right));
        }
        // eslint-disable-next-line no-restricted-syntax
        return fb;
    }
    // eslint-disable-next-line no-restricted-syntax
    return fa;
};
export const either = {
    ...fptseither,
    coproductLeft,
};
export const combineEither = coproductMapLeft(either);
export const sequenceTEither = sequenceT(either);
export const sequenceEither = array.sequence(either);
