/**
 * Returns true if arg was string 'true' or boolean true
 * otherwise returns boolean false
 * @param arg
 */
export const parseBoolean = (arg) => typeof arg === 'boolean' ? arg : arg === 'true';
