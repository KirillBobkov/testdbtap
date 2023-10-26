import { useCallback } from 'react';
const defaultOptions = {
    keyCodes: ['Enter', 'Space', 'ArrowDown', 'ArrowUp'],
};
/**
 * Anchor keyDown handler for a11y.
 * @doc-tags a11y, shortcut
 */
export const useA11yAnchorKeyDown = (callback, deps, options = defaultOptions) => {
    return useCallback((e) => {
        if (options.targetCheck && options.targetCheck !== e.target) {
            return;
        }
        // eslint-disable-next-line no-restricted-syntax
        if (options.keyCodes && options.keyCodes.includes(e.code)) {
            e.preventDefault();
            callback(e);
        }
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [callback, options.targetCheck, options.keyCodes, ...deps]);
};
