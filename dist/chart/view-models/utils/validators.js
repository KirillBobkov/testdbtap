import { array, boolean, either, string } from 'fp-ts';
import { pipe } from 'fp-ts/function';
import { not } from 'fp-ts/Predicate';
export const validationError = (reason) => ({ reason });
export const validateEmptyString = (errorMessage = 'String cannot be empty') => (s) => pipe(s, either.fromPredicate(not(string.isEmpty), () => validationError(errorMessage)));
export const validateExistenceInArray = (errorMessage) => (items) => (cmp) => pipe(items, array.findFirst(cmp), either.fromOption(() => validationError(errorMessage)));
export const validateNoDuplicatesInArray = (errorMessage) => (items, cmp) => (value) => pipe(value, either.fromPredicate(() => pipe(items, array.some(cmp), boolean.BooleanAlgebra.not), () => validationError(errorMessage)));
