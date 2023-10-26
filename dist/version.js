// VERSION_REPLACE_PLACEHOLDER_ is used to update version during release.
/**
 * @doc-tags ci
 */
export const CHART_VERSION = `VERSION_REPLACE_PLACEHOLDER_5.6.9`.substring(28);
typeof window !== 'undefined' && (window['__CHART_VERSION'] = CHART_VERSION);
