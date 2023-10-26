import { RefObject } from 'react';
/**
 * React uses passive event handlers by default with wheel, touchstart and touchmove events.
 * In other words, you can't call stopPropagation or preventDefault within them.
 * If you want to use non-passive event handlers, you need to use refs and add/remove event handler manually
 * @param ref - element
 * @param handler - callback for listener
 * @param event - type of event
 * @doc-tags hooks
 */
export declare function useActiveEventListener(ref: RefObject<HTMLElement>, handler: (...args: any) => void, event: 'wheel' | 'touchstart' | 'touchmove'): void;
