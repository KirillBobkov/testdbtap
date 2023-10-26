import { string } from 'fp-ts';
export function getCapitalLetters(title) {
    let capitalLetters = '';
    for (const char of title) {
        if (char >= 'A' && char <= 'Z') {
            capitalLetters += char;
        }
    }
    return capitalLetters;
}
export function hashCode(str) {
    let hash = 0;
    if (str.length === 0) {
        return hash;
    }
    for (let i = 0; i < str.length; i++) {
        const chr = str.charCodeAt(i);
        // eslint-disable-next-line no-bitwise
        hash = (hash << 5) - hash + chr;
        // eslint-disable-next-line no-bitwise
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
// took from here https://stackoverflow.com/questions/3115150/how-to-escape-regular-expression-special-characters-using-javascript
export function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
/**
 * Splits sources string by given substring
 */
export function split(string, substring, caseSensitive = true) {
    if (!substring && substring !== '0') {
        return [string];
    }
    const flags = `${caseSensitive ? '' : 'i'}gm`;
    const pattern = substring.replace(/([[()*+?.\\^$|])/g, '\\$1');
    const regexp = new RegExp(`(${pattern})`, flags);
    return string.split(regexp);
}
/**
 * Replaces underscores and camelCase with dashes.
 */
export function dasherize(string, lower = true) {
    const dasherized = string.replace(/([a-z])(?=[A-Z])/g, '$1-');
    if (lower) {
        return dasherized.toLowerCase();
    }
    else {
        return dasherized;
    }
}
/**
 * Camelizes given string
 */
export function camelize(string, lower = true) {
    //camelize
    const camelized = string.replace(/[-_\s]+(.)?/g, (match, c) => {
        return c ? c.toUpperCase() : '';
    });
    if (lower) {
        //decapitalize
        return decapitalize(camelized);
    }
    else {
        return capitalize(camelized);
    }
}
let uniqueIdCounter = 0;
/**
 * Generate a unique id
 */
export function randomId(prefix = '', postfix = '') {
    const id = ++uniqueIdCounter;
    return `${prefix}${id}${postfix}`;
}
/**
 * Capitalizes given string
 */
export function capitalize(string) {
    return string.slice(0, 1).toUpperCase() + string.slice(1);
}
/**
 * Decapitalizes given string
 */
export function decapitalize(string) {
    return string.slice(0, 1).toLowerCase() + string.slice(1);
}
/**
 * Chooses correct value for passed number (1, 2-4, 0 or many) for three base declensions (RUS)
 */
export function pluralize3(number, declensions) {
    const cases = [2, 0, 1, 1, 1, 2];
    const floored = Math.floor(Math.abs(number));
    if (floored % 100 > 4 && floored % 100 < 20) {
        return declensions[2];
    }
    else if (floored % 10 < 5) {
        return declensions[cases[floored % 10]];
    }
    else {
        return declensions[cases[5]];
    }
}
/**
 * Chooses correct value for passed number (1, 0 or many) for two base declensions (EN, etc.)
 * @param {Number} number
 * @param {Array.<String>} declensions
 * @returns {String}
 */
export function pluralize2(number, declensions) {
    const floored = Math.floor(Math.abs(number));
    if (floored % 10 === 1 && floored !== 11) {
        return declensions[0];
    }
    else {
        return declensions[1];
    }
}
export const compareLowerCasedStrings = (s1, s2) => string.Eq.equals(string.toLowerCase(s1), string.toLowerCase(s2));
