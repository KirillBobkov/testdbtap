import { useCallback, useContext, useEffect } from 'react';
import { MultiChartComponentContext } from '../../components/multi-chart/multi-chart-context';
/**
 * Enables undo/redo VM.
 * @param btnsKeyCodes
 * @param undo
 * @param redo
 * @doc-tags undo, shortcut
 */
export const useUndoRedo = (btnsKeyCodes, undo, redo) => {
    const { device } = useContext(MultiChartComponentContext);
    const keyDownHandler = useCallback((event) => {
        const isMofidicatorKeyPressed = device === 'apple' ? event.metaKey : event.ctrlKey;
        if (isMofidicatorKeyPressed) {
            if (event.shiftKey && event.code === btnsKeyCodes.redoKeyCode) {
                event.preventDefault();
                redo();
            }
            else if (event.code === btnsKeyCodes.undoKeyCode) {
                event.preventDefault();
                undo();
            }
        }
    }, [btnsKeyCodes.redoKeyCode, btnsKeyCodes.undoKeyCode, device, redo, undo]);
    useEffect(() => {
        document.addEventListener('keydown', keyDownHandler);
        return () => document.removeEventListener('keydown', keyDownHandler);
    }, [keyDownHandler]);
};
