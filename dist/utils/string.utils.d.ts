export declare function getCapitalLetters(title: string): string;
export declare function hashCode(str: string): number;
export declare function escapeRegExp(text: string): string;
/**
 * Splits sources string by given substring
 */
export declare function split(string: string, substring: string, caseSensitive?: boolean): string[];
/**
 * Replaces underscores and camelCase with dashes.
 */
export declare function dasherize(string: string, lower?: boolean): string;
/**
 * Camelizes given string
 */
export declare function camelize(string: string, lower?: boolean): string;
/**
 * Generate a unique id
 */
export declare function randomId(prefix?: string | number, postfix?: string | number): string;
/**
 * Capitalizes given string
 */
export declare function capitalize(string: string): string;
/**
 * Decapitalizes given string
 */
export declare function decapitalize(string: string): string;
/**
 * Chooses correct value for passed number (1, 2-4, 0 or many) for three base declensions (RUS)
 */
export declare function pluralize3(number: number, declensions: string[]): string;
/**
 * Chooses correct value for passed number (1, 0 or many) for two base declensions (EN, etc.)
 * @param {Number} number
 * @param {Array.<String>} declensions
 * @returns {String}
 */
export declare function pluralize2(number: number, declensions: string[]): string;
export declare const compareLowerCasedStrings: (s1: string, s2: string) => boolean;
