import { RefObject } from 'react';
/**
 * Listens to all 'focusin' events and triggers listeners.
 * We need it to subscribe to focusin only once.
 */
export declare const useFocusVisibleWithinHelper: () => void;
/**
 * Replacement for un-implemented CSS selector :focus-visible-within
 * https://github.com/WICG/focus-visible/issues/151
 *
 * Checks that internal element is focused.
 *
 * @param containerRef
 * @param selector - selector for internal element
 * @doc-tags a11y
 */
export declare const useFocusVisibleWithin: (containerRef: RefObject<HTMLDivElement>, selector: string) => boolean;
