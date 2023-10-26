/**
 * TODO describe
 * @param elem
 * @doc-tags utility
 */
export const isHTMLInput = (elem) => elem && elem instanceof HTMLElement ? elem.nodeName === 'INPUT' : false;
/**
 * TODO describe
 * @param ref
 * @doc-tags utility
 */
export const isRefObject = (ref) => ref !== null && ref.hasOwnProperty('current');
