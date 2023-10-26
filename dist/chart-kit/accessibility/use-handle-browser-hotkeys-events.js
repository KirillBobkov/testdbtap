import { constVoid } from 'fp-ts/function';
import { useCallback, useContext, useEffect } from 'react';
import { MultiChartComponentContext } from '../../chart/components/multi-chart/multi-chart-context';
/**
 * Blocks the top-level browser hotkeys
 * @param ref
 * @doc-tags a11y,hotkeys,shortcut
 */
export const useHandleBrowserHotkeysEvents = (ref) => {
    const { device } = useContext(MultiChartComponentContext);
    const handleBrowserHotkeysEvents = useCallback((e) => {
        const keysToCheck = ['KeyE', 'KeyO'];
        const deviceKeyToCheck = device === 'apple' ? e.metaKey : e.ctrlKey;
        if (deviceKeyToCheck && keysToCheck.find(k => k === e.code)) {
            e.preventDefault();
        }
    }, [device]);
    useEffect(() => {
        if (ref) {
            ref.addEventListener('keydown', handleBrowserHotkeysEvents);
            return () => {
                ref.removeEventListener('keydown', handleBrowserHotkeysEvents);
            };
        }
        return constVoid;
    }, [ref, handleBrowserHotkeysEvents]);
};
