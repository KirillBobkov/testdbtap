import React, { memo, useEffect, useRef, useState, useCallback } from 'react';
import { StyledScrollableContainer } from './Scrollable.styled';
import { constVoid } from 'fp-ts/function';
const SCROLL_TIME_APPEARANCE = 200;
export const Scrollable = memo(props => {
    const { children, scrollTop, onScroll, mode = 'visible', containerRef, style } = props;
    const [visible, setVisible] = useState(scrollbarVisibilityModeToBoolean(mode));
    const timeoutId = useRef(null);
    let scrollContainerRef = useRef(null);
    if (containerRef) {
        scrollContainerRef = containerRef;
    }
    useEffect(() => {
        const scrollEl = scrollContainerRef.current;
        if (scrollTop !== undefined && scrollEl) {
            scrollEl.scroll(0, scrollTop);
        }
    }, [scrollTop]);
    const handleScrollAppearance = useCallback(() => {
        if (mode === 'none') {
            return;
        }
        if (mode === 'wheeling') {
            timeoutId?.current && clearTimeout(timeoutId.current);
            if (!visible) {
                setVisible(true);
            }
            timeoutId.current = setTimeout(() => {
                // this check is needed to prevent update on unmounted component
                timeoutId.current && setVisible(false);
            }, SCROLL_TIME_APPEARANCE);
        }
    }, [timeoutId, visible, mode]);
    const onScrollHandler = useCallback((e) => {
        handleScrollAppearance();
        // eslint-disable-next-line
        const element = e.target;
        return onScroll ? onScroll(element.scrollLeft, element.scrollTop) : constVoid;
    }, [onScroll, handleScrollAppearance]);
    // used to prevent timeout memory leaks on unmount
    useEffect(() => {
        return () => {
            timeoutId?.current && clearTimeout(timeoutId.current);
        };
    }, []);
    useEffect(() => {
        const scrollEl = scrollContainerRef.current;
        scrollEl?.addEventListener('scroll', onScrollHandler);
        return () => {
            scrollEl?.removeEventListener('scroll', onScrollHandler);
        };
    }, [onScroll, onScrollHandler]);
    return (React.createElement(StyledScrollableContainer, { id: "scrollable-id", visible: visible, mode: mode, ref: scrollContainerRef, style: style, tabIndex: -1 }, children));
});
function scrollbarVisibilityModeToBoolean(state) {
    return state === 'visible';
}
