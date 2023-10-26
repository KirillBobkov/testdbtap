import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
export const Holdable = memo(props => {
    const { delay = 300, interval = 50, onHold, isDisabled, disableMouseLeave = false, children } = props;
    const { onMouseDown, onMouseUp, onMouseLeave } = children.props;
    const [timeoutId, _setTimeoutId] = useState();
    const [intervalId, _setInterval] = useState();
    const latestHold = useRef(onHold);
    const clearTimers = useCallback(() => {
        timeoutId && clearTimeout(timeoutId);
        intervalId && clearInterval(intervalId);
    }, [intervalId, timeoutId]);
    useEffect(() => {
        latestHold.current = onHold;
        if (isDisabled) {
            clearTimers();
        }
    }, [onHold, isDisabled, clearTimers, interval]);
    const onStartHold = useCallback(() => {
        clearTimers();
        const _timeoutId = setTimeout(() => {
            const _intervalId = setInterval(() => {
                latestHold.current();
            }, interval);
            _setInterval(_intervalId);
        }, delay);
        _setTimeoutId(_timeoutId);
    }, [clearTimers, delay, interval]);
    const onEndHold = clearTimers;
    return React.cloneElement(React.Children.only(children), {
        onMouseDown: (e) => {
            onStartHold();
            onMouseDown && onMouseDown(e);
        },
        onMouseUp: (e) => {
            onEndHold();
            onMouseUp && onMouseUp(e);
        },
        onMouseLeave: (e) => {
            !disableMouseLeave && onEndHold();
            onMouseLeave && onMouseLeave(e);
        },
    });
});
