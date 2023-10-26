import { map, option, tuple } from 'fp-ts';
import { pipe } from 'fp-ts/function';
export const hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 * @param {*} objA
 * @param {*} objB
 * @returns {boolean}
 */
export function shallowEqual(objA, objB) {
    if (Object.is(objA, objB)) {
        return true;
    }
    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
        return false;
    }
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) {
        return false;
    }
    // Test for A's keys different from B.
    // tslint:disable prefer-for-of
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < keysA.length; i++) {
        if (!hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) {
            return false;
        }
    }
    // tslint:enable prefer-for-of
    return true;
}
/**
 * Generates new object with keys mapped with template
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function mapKeys(object, template) {
    return Object.keys(object).reduce((acc, key) => {
        acc[template(key)] = object[key];
        return acc;
        // eslint-disable-next-line no-restricted-syntax
    }, {});
}
export const isNotNullable = (value) => value !== null && value !== undefined;
export const getMapValueByKey = (eq) => (key) => (mapToLookup) => pipe(mapToLookup, map.lookupWithKey(eq)(key), option.map(tuple.snd));
