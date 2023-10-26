import { ALL_INTERACTIVE_ITEMS_SELECTOR } from './a11y-constants';
/**
 * Finds the next focusable element and calls .focus() on it.
 * @doc-tags a11y
 */
export const focusNextActiveElement = () => {
    const allFocusableElements = Array.from(document.querySelectorAll(ALL_INTERACTIVE_ITEMS_SELECTOR));
    const activeElement = document.activeElement;
    if (activeElement !== null && allFocusableElements.length !== 0) {
        const idx = allFocusableElements.indexOf(activeElement);
        const nextElementIdx = idx === allFocusableElements.length - 1 ? 0 : idx + 1;
        // eslint-disable-next-line no-restricted-syntax
        const nextElement = allFocusableElements[nextElementIdx];
        nextElement.focus();
    }
};
/**
 * Focuses previous focusable element.
 */
export const focusPreviousActiveElement = () => {
    const allFocusableElements = Array.from(document.querySelectorAll(ALL_INTERACTIVE_ITEMS_SELECTOR));
    const activeElement = document.activeElement;
    if (activeElement !== null && allFocusableElements.length !== 0) {
        const idx = allFocusableElements.indexOf(activeElement);
        const nextElementIdx = idx === 0 ? allFocusableElements.length - 1 : idx - 1;
        // eslint-disable-next-line no-restricted-syntax
        const nextElement = allFocusableElements[nextElementIdx];
        nextElement.focus();
    }
};
