import { uuid } from '@devexperts/dxcharts-lite/dist/chart/utils/uuid.utils';
import React, { memo, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState, } from 'react';
import ReactDOM from 'react-dom';
import { useResizeObserver } from '../../utils/use-resize-observer';
import { focusNextActiveElement, focusPreviousActiveElement } from '../accessibility/a11y-functions';
import { focusOnRefElement } from '../accessibility/focus-on-ref-element';
import { useAppendTo } from '../hooks/use-append-to.hook';
import { PopupStackContext } from '../PopupStack/PopupStack';
import { calculatePopoverPlacement, compareCoordinates, limitCoordinatesToBounds, } from './Popover.model';
import { PopoverUI } from './PopoverUI.component';
/**
 * @description
 * Popover is a modal window that renders relative to Anchor (anchor is any HTML element).
 * Render will always use React.createPortal, by default - body. But you can specify your own container.
 */
export const Popover = memo(props => {
    const { position = 'bottom', align = 'start', appendTo, opened, closeOnClickAway = true, anchorRef, selectorRef, parentEventTarget, keyboardMode = false, className, testId, children, draggable, draggableHandlerClass, customPosition, onRequestClose, onTabPress, updatePopoverCustomPosition, updatePopoverSize, style, customBounds, ...rest } = props;
    const appendToElement = useAppendTo(appendTo);
    //#region popupStack stuff
    /**
     * `PopupStack` controls the order of a `Popovers`
     */
    const popupStack = useContext(PopupStackContext);
    /**
     * `id` is needed to identify popover in a `PopupStack`
     */
    const id = useRef(uuid());
    //#endregion
    //#region misc state, refs are crucial to prevent hooks updates
    /**
     * Using `useRef` on `keyboardMode` and changing it with separate `useEffect`
     * allows to avoid putting it as a dependency inside `focusOnRefElement` related `useEffect`.
     * It prevents a tricky bug with the anchor `focus`
     * */
    const kbmRef = useRef(keyboardMode);
    useEffect(() => {
        kbmRef.current = keyboardMode;
    }, [keyboardMode]);
    /**
     * controls, whether component is `mounted`, or `updated`
     * such a `componentWillMount`, `componentDidMount` hooks in class based components
     */
    const mounted = useRef(false);
    //#endregion
    //#region elements refs
    const popoverRef = useRef(null);
    //#endregion
    /**
     * controls the position of a popover by `{ x, y } coordinates`
     */
    const [popoverState, setPopoverState] = useState({ x: 0, y: 0 });
    /**
     * updates `popoverState`
     */
    const updatePosition = useCallback(() => {
        const popoverSize = getPopoverSize(popoverRef);
        const parentContainer = customBounds ?? getContainerProperties(appendToElement);
        if (customPosition) {
            const limitedPosition = limitCoordinatesToBounds(customPosition, parentContainer, popoverSize);
            setPopoverState({
                y: Math.round(limitedPosition.y),
                x: Math.round(limitedPosition.x),
            });
            return;
        }
        if (!anchorRef?.current || !popoverRef.current) {
            return;
        }
        // props.appendTo is crucial, because it affects the anchor rect
        const anchorPosition = getAnchorProperties(anchorRef.current, appendToElement);
        const coordinates = calculatePopoverPlacement({
            position,
            align,
            anchorPosition,
            popoverSize,
            parentContainer,
        });
        setPopoverState({
            y: Math.round(coordinates.y),
            x: Math.round(coordinates.x),
        });
    }, [anchorRef, customPosition, customBounds, appendToElement, position, align]);
    // helps to prevent popover position recalculation when it's closed or moving to closed state
    const updatePositionSafe = useCallback(() => {
        if (!opened) {
            return;
        }
        // prevent action on unmounted component to avoid memory leak
        mounted.current && updatePosition();
    }, [opened, updatePosition]);
    const requestCloseHandler = useCallback((e) => onRequestClose?.(e), [onRequestClose]);
    const onDragStop = useCallback((position) => updatePopoverCustomPosition?.(position), []);
    //#region event handlers
    /**
     * When pressing tab in popover - close it and move focus to next element.
     * @doc-tags a11y
     */
    const onTabPressHandler = useCallback((e) => {
        const defaultPress = (e) => {
            if (kbmRef.current) {
                e.preventDefault();
                requestCloseHandler(e);
                focusOnRefElement(selectorRef ?? anchorRef);
                // set timeout is needed to overcome focusOnRefElement from useEffect down below
                setTimeout(() => (e.shiftKey ? focusPreviousActiveElement() : focusNextActiveElement()));
            }
        };
        onTabPress ? onTabPress?.(e) : defaultPress(e);
    }, [onTabPress, requestCloseHandler]);
    /**
     * Handle click away event.
     * if `event` target is not contains popover element and anchor element down the real `DOM` tree => request close
     */
    const clickAwayHandler = useCallback((e) => {
        if (closeOnClickAway &&
            // eslint-disable-next-line no-restricted-syntax
            !anchorRef?.current?.contains(e.target) &&
            // eslint-disable-next-line no-restricted-syntax
            !popoverRef.current?.contains(e.target)) {
            requestCloseHandler(e);
        }
    }, [requestCloseHandler, closeOnClickAway, anchorRef]);
    /**
     * Updates `Popover` position, when element passed in `appendTo` prop is resized.
     */
    const windowResizeHandler = useCallback(() => {
        if (popoverRef.current) {
            updatePositionSafe();
        }
    }, [updatePositionSafe]);
    //#endregion
    // if customPosition coordinates are not the same as was provided before -> recalculate the popoverState
    const [prevCustomPosition, setPrevCustomPosition] = useState(customPosition ?? null);
    if (customPosition && prevCustomPosition && !compareCoordinates(customPosition, prevCustomPosition)) {
        setPrevCustomPosition(customPosition);
        updatePositionSafe();
    }
    /**
     * !IMPORTANT
     * !IMPORTANT
     * !IMPORTANT
     * Changes in that hook should be done very careful
     */
    useLayoutEffect(() => {
        if (anchorRef?.current) {
            // if popup is opened => add it to a stack
            if (opened) {
                // callback is triggered on keydown
                popupStack.addPopupToStack(id.current, (e) => {
                    switch (e.code) {
                        case 'Tab': {
                            onTabPressHandler(e);
                            break;
                        }
                        case 'Escape': {
                            requestCloseHandler(e);
                            focusOnRefElement(selectorRef ?? anchorRef);
                            break;
                        }
                    }
                });
                // if popup is closed => focus on anchor ref
            }
            else {
                if (kbmRef.current) {
                    // auto-focus on anchor when popup is last in stack and in keyboard mode
                    focusOnRefElement(selectorRef ?? anchorRef);
                }
            }
        }
        if (!mounted.current) {
            mounted.current = true;
        }
        return () => {
            mounted.current = false;
            popupStack.removePopupFromStack(id.current);
        };
        // keyboardMode should not be in deps array to make it work correctly
        // deps should be exactly that
        // it means that hook should be triggered only when OPENED state changed
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [opened, popupStack, anchorRef]);
    // updates position of a popover every time it was opened
    useLayoutEffect(() => {
        if (opened) {
            updatePositionSafe();
        }
    }, [opened, updatePositionSafe]);
    useEffect(() => {
        if (opened) {
            const popoverSize = getPopoverSize(popoverRef);
            updatePopoverSize?.(popoverSize);
        }
    }, [opened, updatePopoverSize]);
    // used to update position every time a popover content size changes
    useResizeObserver(popoverRef, updatePositionSafe);
    useEffect(() => {
        const target = parentEventTarget || document;
        const appendToEl = appendToElement;
        if (opened) {
            // eslint-disable-next-line no-restricted-syntax
            target.addEventListener('touchstart', clickAwayHandler, { passive: false });
            // eslint-disable-next-line no-restricted-syntax
            target.addEventListener('mousedown', clickAwayHandler);
            // eslint-disable-next-line no-restricted-syntax
            target.addEventListener('contextmenu', clickAwayHandler, { capture: true });
            // resize event should be observed on an element, which popover is appended to
            appendToEl?.addEventListener('resize', windowResizeHandler);
        }
        return () => {
            // eslint-disable-next-line no-restricted-syntax
            target.removeEventListener('touchstart', clickAwayHandler);
            // eslint-disable-next-line no-restricted-syntax
            target.removeEventListener('mousedown', clickAwayHandler);
            // eslint-disable-next-line no-restricted-syntax
            target.removeEventListener('contextmenu', clickAwayHandler);
            appendToEl?.removeEventListener('resize', windowResizeHandler);
        };
    }, [clickAwayHandler, windowResizeHandler, opened, parentEventTarget, appendToElement]);
    const positionProvided = anchorRef?.current || customPosition;
    // if popover is closed, or there's no anchor element provided, or popover state was not calculated - nothing will be rendered
    if (!opened || !positionProvided) {
        return null;
    }
    const popoverUIProps = {
        position: { ...popoverState },
        anchorRef,
        className,
        style,
        testId,
        children,
        draggable,
        draggableHandlerClass,
        onDragStop,
        ...rest,
    };
    const popover = React.createElement(PopoverUI, { ...popoverUIProps, ref: popoverRef });
    return ReactDOM.createPortal(popover, appendToElement);
});
function getPopoverSize(popoverRef) {
    const popover = ReactDOM.findDOMNode(popoverRef.current);
    if (popover instanceof HTMLElement) {
        return popover.getBoundingClientRect();
    }
    return {
        height: 0,
        width: 0,
    };
}
function getAnchorProperties(anchor, container) {
    const anchorRect = anchor.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    return {
        left: anchorRect.left - containerRect.left,
        top: anchorRect.top - containerRect.top,
        height: anchorRect.height,
        width: anchorRect.width,
    };
}
function getContainerProperties(appendToElement) {
    return {
        top: appendToElement.clientTop,
        left: appendToElement.clientLeft,
        width: appendToElement.clientWidth,
        height: appendToElement.clientHeight,
    };
}
export default Popover;
