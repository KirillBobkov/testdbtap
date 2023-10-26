import { string, number, boolean } from 'fp-ts';
import { getEq } from 'fp-ts/Option';
export const eqOptionBoolean = getEq(boolean.Eq);
export const eqOptionString = getEq(string.Eq);
export const eqOptionNumber = getEq(number.Eq);
