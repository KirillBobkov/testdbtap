import { useCallback, useEffect, useRef } from 'react';
/**
 * @param el
 * @param callback
 * @param useAnimationFrame Animation frame prevents error, but in rare cases we need to execute the function within the same animation frame
 */
export function useResizeObserver(el, callback, useAnimationFrame = true) {
    const observer = useRef(null);
    let rafId = null;
    // Saving the callback as a ref. With this, I don't need to put onResize in the
    // effect dep array, and just passing in an anonymous function without memoising
    // will not reinstantiate the hook's ResizeObserver.
    const callbackRef = useRef(null);
    callbackRef.current = callback;
    const observe = useCallback(() => {
        if (el.current && observer.current) {
            observer.current.observe(el.current);
        }
    }, [el.current]);
    useEffect(() => {
        // unobserve prev element
        if (observer.current && el.current) {
            observer.current.unobserve(el.current);
        }
        observer.current = new ResizeObserver((entries, observer) => {
            if (!Array.isArray(entries) || !entries.length) {
                return;
            }
            if (useAnimationFrame) {
                rafId = requestAnimationFrame(() => callbackRef.current?.(entries, observer));
            }
            else {
                callbackRef.current?.(entries, observer);
            }
        });
        observe();
        return () => {
            if (observer.current && el.current) {
                observer.current.unobserve(el.current);
            }
            rafId && cancelAnimationFrame(rafId);
        };
    }, [el.current, observe]);
}
