import { useEffect } from 'react';
/**
 * React uses passive event handlers by default with wheel, touchstart and touchmove events.
 * In other words, you can't call stopPropagation or preventDefault within them.
 * If you want to use non-passive event handlers, you need to use refs and add/remove event handler manually
 * @param ref - element
 * @param handler - callback for listener
 * @param event - type of event
 * @doc-tags hooks
 */
export function useActiveEventListener(ref, handler, event) {
    useEffect(() => {
        const element = ref?.current;
        if (element) {
            element.addEventListener(event, handler, { passive: false });
        }
        return () => {
            if (element) {
                element.removeEventListener(event, handler);
            }
        };
    }, [event, handler, ref]);
}
