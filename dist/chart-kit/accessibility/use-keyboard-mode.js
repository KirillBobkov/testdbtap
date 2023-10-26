import { useEffect, useCallback, useState } from 'react';
/**
 * Keyboard mode is a UI state when all hover elements become visible when navigating with mouse.
 * Turns ON when user press "Tab" and turns OFF on any mouse click.
 * @doc-tags a11y
 */
export const useKeyboardMode = () => {
    const [keyboardMode, setKeyboardMode] = useState(false);
    const keyDownHandler = useCallback((event) => {
        if (event.key === 'Tab') {
            setKeyboardMode(true);
        }
    }, []);
    const mouseDownHandler = useCallback(() => {
        setKeyboardMode(false);
    }, []);
    useEffect(() => {
        document.addEventListener('keydown', keyDownHandler);
        return () => document.removeEventListener('keydown', keyDownHandler);
    }, [keyDownHandler]);
    useEffect(() => {
        document.addEventListener('mousedown', mouseDownHandler);
        return () => document.removeEventListener('mousedown', mouseDownHandler);
    }, [mouseDownHandler]);
    return keyboardMode;
};
