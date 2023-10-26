import { useCallback, useLayoutEffect, useRef } from 'react';
import { isRefObject, isHTMLInput } from './typeGuards';
/**
 * Work with nested input in case it's first child of wrapper
 */
const getInnerInput = (ref) => {
    if (!isRefObject(ref)) {
        return undefined;
    }
    const elem = ref.current;
    function func(element) {
        if (isHTMLInput(element)) {
            return element;
        }
        if (element instanceof HTMLElement && element.firstChild instanceof HTMLElement) {
            return func(element.firstChild);
        }
        return undefined;
    }
    return elem instanceof HTMLElement ? func(elem) : undefined;
};
export const useInputCaretPosition = (ref) => {
    const stateRef = useRef({ start: 0, end: 0 });
    const input = getInnerInput(ref);
    const setCaretPosition = useCallback(() => {
        if (input) {
            stateRef.current = {
                start: input.selectionStart || 0,
                end: input.selectionEnd || 0,
            };
        }
    }, [input]);
    const restoreCaretPosition = useCallback(() => {
        if (!input) {
            return;
        }
        input.selectionStart = stateRef.current.start;
        input.selectionEnd = stateRef.current.end;
    }, [input]);
    useLayoutEffect(() => {
        restoreCaretPosition();
        return () => {
            setCaretPosition();
        };
    }, [restoreCaretPosition, setCaretPosition]);
    return [input, stateRef.current];
};
