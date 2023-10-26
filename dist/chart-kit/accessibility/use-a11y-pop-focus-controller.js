import { useEffect, useCallback } from 'react';
import { ALL_INTERACTIVE_ITEMS_SELECTOR } from './a11y-constants';
// TODO remove me
// this hack introduced because popup/popover implementation is ugly
// I couldn't get the "popRef" correctly, that's why wait a bit
const EMPYRICAL_TIMEOUT_NO_REF_POPUP_POPOVER_REFACTORING = 50;
/**
 * Focuses the focusable element in popup / popover when navigating from anchor.
 * @param props
 * @doc-tags a11y
 */
export const useA11yPopFocusController = (props) => {
    const { anchorRef, popRef, focusSelector } = props;
    /**
     * handles the focus popXXX from anchor
     * @doc-tags shortcut
     */
    const handleKeyPress = useCallback((e) => {
        setTimeout(() => {
            // find the direction of next element
            const key = e.code;
            if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'Enter' || key === 'Space') {
                // focus specific element
                let query;
                if (focusSelector) {
                    query = popRef.current?.querySelectorAll(focusSelector);
                }
                // focus 1st focusable if empty
                if (!query || query.length === 0) {
                    query = popRef.current?.querySelectorAll(ALL_INTERACTIVE_ITEMS_SELECTOR);
                }
                // if found - do the focus
                if (query) {
                    // eslint-disable-next-line no-restricted-syntax
                    const elements = Array.from(query);
                    if (elements && elements.length > 0) {
                        elements[0].focus();
                    }
                }
            }
        }, EMPYRICAL_TIMEOUT_NO_REF_POPUP_POPOVER_REFACTORING);
    }, [focusSelector, popRef]);
    // subscribes to HTML events
    useEffect(() => {
        const anchorEl = anchorRef.current;
        // const popEl = popRef.current;
        if (anchorEl) {
            anchorEl.addEventListener('keydown', handleKeyPress);
        }
        return () => {
            anchorEl?.removeEventListener('keydown', handleKeyPress);
        };
    }, [anchorRef, handleKeyPress]);
};
