import { constVoid } from 'fp-ts/function';
import { useCallback, useState, useRef } from 'react';
export const useChangeStatusWithDelay = (duration = 300, initIsOpened = false, handler = constVoid) => {
    const closingHandler = useRef(null);
    const [isOpened, setOpened] = useState(initIsOpened);
    const [isOpening, setOpening] = useState(initIsOpened);
    const handleSetOpened = useCallback((isOpened) => {
        setOpened(isOpened);
        handler(isOpened);
    }, [handler, setOpened]);
    const opening = useCallback(() => {
        handleSetOpened(true);
        setOpening(true);
    }, [setOpening, handleSetOpened]);
    const closing = useCallback(() => {
        setOpening(false);
        closingHandler.current = setTimeout(() => {
            if (handleSetOpened) {
                handleSetOpened(false);
                closingHandler.current = null;
            }
        }, duration);
    }, [setOpening, handleSetOpened, duration]);
    const openToggle = useCallback(() => {
        if (isOpened && !isOpening) {
            closingHandler.current = null;
            opening();
            return;
        }
        isOpened ? closing() : opening();
    }, [isOpened, isOpening, closing, opening]);
    return { isOpening, isOpened, openToggle };
};
