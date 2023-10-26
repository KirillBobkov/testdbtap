import { useEffect, useCallback } from 'react';
/**
 * Hook that run callback when click outside of element that attached to containerRef
 */
export const useClickAway = (ref, onClickAwayCallback) => {
    const handleClickAway = useCallback((event) => {
        if (event.target instanceof Node && !ref?.current?.contains(event.target)) {
            onClickAwayCallback();
        }
    }, [onClickAwayCallback, ref]);
    useEffect(() => {
        document.addEventListener('mousedown', handleClickAway);
        return () => document.removeEventListener('mousedown', handleClickAway);
    }, [handleClickAway]);
};
