import React, { memo, useCallback, useRef, useState } from 'react';
import { AnimationWrapper, HoldToActionText, HoldToActionContainer, HoldToActionTextContainer, HoldToActionHideWrapper, } from './HoldToAction.styled';
import { HoldToActionIcon } from './HoldToActionIcon';
export const HoldToAction = memo(props => {
    const { children, iconSVGComponent, iconWrapper, onLongPress, delay, overlayText, showOnHover = false } = props;
    const { longPressStarted, onMouseDown, onMouseUp, onMouseLeave, onTouchStart, onTouchEnd } = useLongPress({
        onLongPress,
    }, { delay });
    return (React.createElement(HoldToActionContainer, { className: props.className },
        React.createElement(AnimationWrapper, { delay: delay, longPressStarted: longPressStarted }),
        longPressStarted && (React.createElement(HoldToActionTextContainer, null,
            React.createElement(HoldToActionText, null, overlayText))),
        React.createElement(HoldToActionHideWrapper, { longPressStarted: longPressStarted }, children),
        showOnHover && (React.createElement(HoldToActionIcon, { iconWrapper: iconWrapper, iconSVGComponent: iconSVGComponent, onMouseDown: onMouseDown, onMouseUp: onMouseUp, onMouseLeave: onMouseLeave, onTouchStart: onTouchStart, onTouchEnd: onTouchEnd }))));
});
function preventDefault(e) {
    if (!isTouchEvent(e)) {
        return;
    }
    if (e.touches.length < 2 && e.preventDefault) {
        e.preventDefault();
    }
}
export function isTouchEvent(e) {
    return e && 'touches' in e;
}
export function useLongPress({ onLongPress }, { delay = 2000, shouldPreventDefault = true } = {}) {
    const [longPressStarted, setLongPressStarted] = useState(false);
    const timeout = useRef();
    const target = useRef();
    const start = useCallback((e) => {
        e.persist();
        const clonedEvent = { ...e };
        if (shouldPreventDefault && e.target) {
            e.target.addEventListener('touchend', preventDefault, { passive: false });
            target.current = e.target;
        }
        setLongPressStarted(true);
        timeout.current = window.setTimeout(() => {
            onLongPress(clonedEvent);
        }, delay);
    }, [onLongPress, delay, shouldPreventDefault, setLongPressStarted]);
    const clear = useCallback(() => {
        timeout.current && clearTimeout(timeout.current);
        setLongPressStarted(false);
        if (shouldPreventDefault && target.current) {
            target.current.removeEventListener('touchend', preventDefault);
        }
    }, [shouldPreventDefault]);
    return {
        longPressStarted,
        onMouseDown: (e) => {
            start(e);
        },
        onMouseUp: () => {
            clear();
        },
        onMouseLeave: () => {
            clear();
        },
        onTouchStart: (e) => {
            start(e);
        },
        onTouchEnd: () => {
            clear();
        },
    };
}
