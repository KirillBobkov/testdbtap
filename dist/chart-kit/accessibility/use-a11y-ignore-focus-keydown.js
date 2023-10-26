import { constVoid } from 'fp-ts/function';
import { useCallback, useEffect } from 'react';
/**
 * Ignore focus navigation keys
 * @param ref
 * @doc-tags a11y,hotkeys
 */
export const useA11yIgnoreFocusKeydown = (ref) => {
    const keyDownHandler = useCallback((event) => {
        const ignoreKeyCodes = ['ShiftLeft', 'ShiftRight'];
        if (ignoreKeyCodes.find(k => k === event.code)) {
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
        }
    }, []);
    useEffect(() => {
        if (ref) {
            ref.addEventListener('keydown', keyDownHandler);
            return () => {
                ref.removeEventListener('keydown', keyDownHandler);
            };
        }
        return constVoid;
    }, [ref, keyDownHandler]);
};
