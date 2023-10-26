import { Ref, RefObject } from 'react';
/**
 * TODO describe
 * @param elem
 * @doc-tags utility
 */
export declare const isHTMLInput: (elem: Element | Text | EventTarget | null) => elem is HTMLInputElement;
/**
 * TODO describe
 * @param ref
 * @doc-tags utility
 */
export declare const isRefObject: <T extends HTMLElement>(ref: Ref<T>) => ref is RefObject<T>;
