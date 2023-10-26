import React, { useState } from 'react';
/**
 * Fixes the async useEffect problem.
 * https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
 * @param callbackFn
 * @param timeout
 */
export const useEffectTimeout = (callbackFn, timeout) => {
    const [timeoutState, setTimeoutState] = useState();
    React.useEffect(() => {
        let mounted = true;
        if (timeoutState) {
            setTimeoutState(setTimeout(() => {
                if (mounted) {
                    callbackFn();
                }
            }, timeout));
        }
        return () => {
            timeoutState && clearTimeout(timeoutState);
            mounted = false;
        };
    }, [callbackFn, timeout, timeoutState]);
};
