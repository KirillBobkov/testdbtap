import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { array, option } from 'fp-ts';
import { none, some } from 'fp-ts/Option';
import { constVoid, pipe } from 'fp-ts/function';
export const PopupStackContext = React.createContext({
    getLastPopup: () => none,
    popLastPopup: () => none,
    addPopupToStack: constVoid,
    removePopupFromStack: constVoid,
    stack: { current: [] },
});
export const PopupStackProvider = ({ children }) => {
    // ref is used because we don't need to track the state of a stack outside
    // moreover, useRef prevents Popups and Popovers from the circular rerendering
    // due to the design of a Popup and Popover components
    const stack = useRef([]);
    const updateStack = useCallback((newStack) => {
        stack.current = newStack;
    }, []);
    const getLastPopup = useCallback(() => pipe(stack.current, array.last), []);
    const popLastPopup = useCallback(() => pipe(stack.current, array.foldRight(() => none, (init, last) => {
        updateStack(init);
        return some(last);
    })), [updateStack]);
    const addPopupToStack = useCallback((id, cb) => pipe(stack.current, array.findFirst(el => el.id === id), option.fold(() => pipe(array.append({ cb, id })(stack.current), updateStack), constVoid)), [updateStack]);
    const removePopupFromStack = useCallback((id) => pipe(stack.current, array.filter(el => el.id !== id), updateStack), [updateStack]);
    const onKeyDownHandler = useCallback((e) => pipe(getLastPopup(), option.fold(constVoid, it => it.cb(e))), [getLastPopup]);
    useEffect(() => {
        document.addEventListener('keydown', onKeyDownHandler);
        return () => {
            document.removeEventListener('keydown', onKeyDownHandler);
        };
    }, [onKeyDownHandler]);
    const value = useMemo(() => ({ getLastPopup, popLastPopup, addPopupToStack, removePopupFromStack, stack }), [getLastPopup, popLastPopup, addPopupToStack, removePopupFromStack]);
    return React.createElement(PopupStackContext.Provider, { value: value }, children);
};
