import { useCallback } from 'react';
// Hook for creating multiple touches, like double touch or more
export const useMultipleTouch = (callback, deps = [], 
// timeout beetwen waiting for touches
timeout = 300, 
// Minimum count of touch, default 2 - for double touch
minTouch = 2) => {
    let touchCount = 1;
    let timer = null;
    return useCallback((event) => {
        if (timer) {
            clearTimeout(timer);
        }
        if (touchCount < minTouch) {
            timer = setTimeout(() => {
                touchCount = 1;
            }, timeout);
            touchCount++;
        }
        else {
            callback(event);
            touchCount = 1;
        }
    }, [...deps]);
};
