import React from 'react';
import { useEffectTimeout } from '../../utils/use-effect-timeout';
/**
 * TODO describe
 * @param state
 * @param timeout
 * @doc-tags utility,hooks
 */
export const useThrottle = (state, timeout) => {
    const [isIndicatorThrottled, setIsIndicatorThrottled] = React.useState(state);
    useEffectTimeout(() => {
        setIsIndicatorThrottled(false);
    }, timeout);
    return isIndicatorThrottled || state;
};
