import { useState, useCallback, useEffect, useContext } from 'react';
import { findDOMNode } from 'react-dom';
import scrollIntoView from 'scroll-into-view-if-needed';
import { MultiChartComponentContext } from '../../chart/components/multi-chart/multi-chart-context';
/**
 * Adds arrows-controls for some "listbox"-like element.
 * Searches for children and controls their focus, tabindex programmatically.
 * Hook supports listbox content changes. Use "deps" property to react and recalculate focusable children.
 * @param props
 * @doc-tags a11y
 */
export const useA11yListboxArrowsFocusController = (props) => {
    const { wrapperRef, anchorRef, childrenSelector, autoFocus = false, direction = 'horizontal', deps = [], role = 'listbox', childRole = 'option', initialFocus = 'active', } = props;
    const [innerElements, setInnerElements] = useState([]);
    const { keyboardModeEnabled } = useContext(MultiChartComponentContext);
    useEffect(() => {
        if (wrapperRef && wrapperRef.current) {
            const element = findDOMNode(wrapperRef.current);
            if (element instanceof Element) {
                // get 1st-level children
                let childNodes = element.childNodes;
                if (childrenSelector) {
                    childNodes = element.querySelectorAll(childrenSelector);
                }
                // eslint-disable-next-line no-restricted-syntax
                const childElements = Array.from(childNodes);
                role !== 'skip' && element.setAttribute('role', role);
                childRole !== 'skip' && childElements.forEach(el => el.setAttribute('role', childRole));
                if (!autoFocus && childElements.length > 0) {
                    // update only tabindex, not focus
                    childElements.forEach(el => el.setAttribute('tabindex', '-1'));
                    const activeElement = childElements.find(el => el.getAttributeNode('data-active')?.value === 'true');
                    // if no active element found, then update tabIndex on first element
                    (initialFocus === 'active' && activeElement ? activeElement : childElements[0]).setAttribute('tabindex', '0');
                }
                else if (autoFocus && childElements.length > 0 && keyboardModeEnabled) {
                    // auto focus to active element or first element in list
                    const activeElement = childElements.find(el => el.getAttributeNode('data-active')?.value === 'true');
                    // if no active element found, then focus on first element
                    (initialFocus === 'active' && activeElement ? activeElement : childElements[0]).focus();
                }
                else if (childElements.length < 1 && keyboardModeEnabled) {
                    // focus to anchor if list empty
                    anchorRef?.current?.focus();
                }
                setInnerElements(childElements);
            }
        }
    }, [wrapperRef, anchorRef, childrenSelector, ...deps]);
    /**
     * handles the arrows focus switch logic
     * @doc-tags shortcut
     */
    const onKeyDown = useCallback((e) => {
        const key = e.code;
        const horizontal = { ['ArrowLeft']: -1, ['ArrowRight']: 1 };
        const vertical = { ['ArrowUp']: -1, ['ArrowDown']: 1 };
        const keys = { ...horizontal, ...vertical };
        // eslint-disable-next-line no-restricted-syntax
        const target = e.target;
        if (key in keys) {
            e.preventDefault();
        }
        let nextElementDirection = 0;
        if (direction === 'horizontal' && key in horizontal) {
            nextElementDirection = horizontal[key];
        }
        else if (direction === 'vertical' && key in vertical) {
            nextElementDirection = vertical[key];
        }
        if (!nextElementDirection) {
            return;
        }
        // find next focusable element and focus it
        const findNextEl = (el) => {
            const idx = innerElements.indexOf(el);
            if (idx !== -1) {
                let nextIdx;
                if (nextElementDirection === 1) {
                    nextIdx = idx === innerElements.length - 1 ? 0 : idx + 1;
                }
                else {
                    nextIdx = idx === 0 ? innerElements.length - 1 : idx - 1;
                }
                const nextEl = innerElements[nextIdx];
                if (el.getAttribute('disabled')) {
                    return findNextEl(nextEl);
                }
                return nextEl;
            }
            return el;
        };
        findNextEl(target).focus();
    }, [direction, innerElements]);
    // Listen browser focusin event and set focus element
    const focusIn = useCallback((e) => {
        // eslint-disable-next-line no-restricted-syntax
        const target = e.target;
        innerElements.forEach(el => el.setAttribute('tabindex', '-1'));
        target.setAttribute('tabindex', '0');
        // set new state and focus
        target.focus({
            preventScroll: true,
        });
        scrollIntoView(target, {
            block: 'nearest',
        });
    }, [innerElements]);
    useEffect(() => {
        const wrapperEl = wrapperRef?.current;
        if (wrapperEl) {
            wrapperEl.addEventListener('keydown', onKeyDown);
            wrapperEl.addEventListener('focusin', focusIn);
        }
        return () => {
            wrapperEl?.removeEventListener('keydown', onKeyDown);
            wrapperEl?.removeEventListener('focusin', focusIn);
        };
    }, [wrapperRef, onKeyDown, focusIn]);
};
