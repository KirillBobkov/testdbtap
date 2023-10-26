import React from 'react';
// because we've disabled default browser scrolling in this case
// we have to progrmatically control the scroll, but this solution has a drawback - poor performance
// especially duraing scroll using touchpad (trackpad).
// We use this special throttle function which accumulates scroll delta to get better perfomance.
const wheelEventThrottle = (handler, delay) => {
    let timer = null;
    let yDelta = 0;
    return (e) => {
        e.preventDefault();
        yDelta += e.deltaY;
        if (!timer) {
            timer = setTimeout(() => {
                handler(yDelta);
                yDelta = 0;
                timer = null;
            }, delay);
        }
    };
};
const _scrollProgramatically = (ref) => (yDelta) => ref?.current?.scrollBy({ behavior: 'smooth', top: yDelta });
const WHEEL_EVENT = 'wheel';
// use wheel and mousewheel event as fallback
// using of scroll event doesn't take effect
// @doc-tags tricky
export const usePreventOutsideScrolling = (ref) => {
    React.useEffect(() => {
        const scrollProgramatically = wheelEventThrottle(_scrollProgramatically(ref), 50);
        const currentRef = ref?.current;
        currentRef?.addEventListener(WHEEL_EVENT, scrollProgramatically, true);
        return () => currentRef?.removeEventListener(WHEEL_EVENT, scrollProgramatically, true);
    }, [ref]);
};
