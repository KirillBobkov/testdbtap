import { findDOMNode } from 'react-dom';
/**
 * Puts focus on ref element if exists.
 * @doc-tags a11y
 */
export function focusOnRefElement(ref) {
    if (ref && ref.current) {
        const anchor = findDOMNode(ref.current);
        if (anchor instanceof HTMLElement) {
            // HACK.
            // if focusing <button> when onKeyDown any other element - onClick will trigger on button ><
            // seems like focus is the least important action, it's for user only - so we can move it to next queue stack
            setTimeout(() => anchor.focus(), 0);
        }
    }
}
