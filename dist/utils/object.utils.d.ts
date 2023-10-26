import { eq, option } from 'fp-ts';
export declare const hasOwnProperty: (v: PropertyKey) => boolean;
/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 * @param {*} objA
 * @param {*} objB
 * @returns {boolean}
 */
export declare function shallowEqual(objA: unknown, objB: unknown): boolean;
/**
 * Generates new object with keys mapped with template
 */
export declare function mapKeys<T extends {}>(object: T, template: (key: string) => string): T;
export type PartialKeys<T extends {}, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export declare const isNotNullable: <T>(value: T | null | undefined) => value is T;
export declare const getMapValueByKey: <K>(eq: eq.Eq<K>) => (key: K) => <V>(mapToLookup: Map<K, V>) => option.Option<V>;
export type ValuesOfObject<T extends Record<string, any>> = {
    [K in keyof T]: T[K];
}[keyof T];
