import { useCallback } from 'react';
import { ALL_INTERACTIVE_ITEMS_SELECTOR } from './a11y-constants';
/**
 * Hook locks keyboard tabulation inside specific HTML tree.
 * Reference to element is a container. Hook traverses it and finds all interactive elements.
 * When it reaches the last element - it returns focus to first element on next "Tab".
 * @param popupContainerRef - container to loop over
 */
export const useA11yModalTabKeyHandler = (popupContainerRef) => {
    const keyHandler = useCallback((e) => {
        if (e.key !== 'Tab') {
            return;
        }
        if (popupContainerRef?.current) {
            const focusableModalElements = popupContainerRef.current.querySelectorAll(ALL_INTERACTIVE_ITEMS_SELECTOR);
            // eslint-disable-next-line no-restricted-syntax
            const firstElement = focusableModalElements[0];
            const lastElement = 
            // eslint-disable-next-line no-restricted-syntax
            focusableModalElements[focusableModalElements.length - 1];
            if (!e.shiftKey && document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
            if (e.shiftKey && document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        }
    }, [popupContainerRef]);
    return keyHandler;
};
