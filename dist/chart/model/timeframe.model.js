import { number } from 'fp-ts';
import { tuple } from 'fp-ts/Eq';
export const timestampRangeEq = tuple(number.Eq, number.Eq);
