import { useCallback, useContext, useEffect, useState } from 'react';
import { MultiChartComponentContext } from '../../chart/components/multi-chart/multi-chart-context';
// list of all focus listeners, should be outside of react state
let listeners = [];
/**
 * Listens to all 'focusin' events and triggers listeners.
 * We need it to subscribe to focusin only once.
 */
export const useFocusVisibleWithinHelper = () => {
    const focusHandler = useCallback((e) => {
        listeners.forEach(l => l(e));
    }, []);
    useEffect(() => {
        document.addEventListener('focusin', focusHandler);
        listeners = [];
        return () => document.removeEventListener('focusin', focusHandler);
    }, [focusHandler]);
};
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
export const useFocusVisibleWithin = (containerRef, selector) => {
    const [focused, setFocused] = useState(false);
    const { keyboardModeEnabled } = useContext(MultiChartComponentContext);
    useEffect(() => {
        const listener = (e) => {
            const elements = containerRef.current?.querySelectorAll(selector);
            if (elements && elements.length !== 0 && elements[0] === e.target) {
                !focused && setFocused(true);
            }
            else {
                focused && setFocused(false);
            }
        };
        listeners.push(listener);
        return () => {
            const idx = listeners.indexOf(listener);
            if (idx !== -1) {
                listeners.splice(idx, 1);
            }
        };
    }, [containerRef, focused, selector]);
    return focused && keyboardModeEnabled;
};
