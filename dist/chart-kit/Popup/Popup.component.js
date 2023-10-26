import { uuid } from '@devexperts/dxcharts-lite/dist/chart/utils/uuid.utils';
import React, { memo, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, } from 'react';
import { createPortal } from 'react-dom';
import { focusOnRefElement } from '../accessibility/focus-on-ref-element';
import { useAppendTo } from '../hooks/use-append-to.hook';
import { PopupStackContext } from '../PopupStack/PopupStack';
import { RootClose } from '../RootClose/RootClose';
import { PopupHeader } from './PopupHeader.component';
import { PopupUI as DefaultPopupUI } from './PopupUI.component';
export const Popup = memo(props => {
    const { container, PopupUI = DefaultPopupUI, isModal = true, header, headerWrapped = true, footer, children, onRequestClose, shouldCloseOnClickAway, isOpened, className, isClosableWithKeyboard = true, isClosable = true, resizable = false, draggable = true, top, left, popupOrder, minHeight, minWidth, defaultSize, scrollable, scrollableMode, testId, anchorRef, keyboardMode = false, closeBtnAriaLabel, showDividerOnScroll, } = props;
    const mounted = useRef(false);
    const backdrop = useRef(null);
    const rootElement = useRef(document.createElement('div'));
    const popupStack = useContext(PopupStackContext);
    const id = useMemo(() => uuid(), []);
    const [popupIndex, setPopupIndex] = useState(undefined);
    //#region misc state, refs are crucial to prevent hooks updates
    /**
     * Using useRef on keyboardMode and changing it with separate useEffect allows to avoid putting it as a dependency inside focusOnRefElement related useEffect.
     * It prevents a tricky bug with the anchor focus
     * */
    const kbmRef = useRef(keyboardMode);
    useEffect(() => {
        kbmRef.current = keyboardMode;
    }, [keyboardMode]);
    //#endregion
    const popupContainer = useAppendTo(container);
    useLayoutEffect(() => {
        const rootFromRef = rootElement.current;
        popupContainer.appendChild(rootFromRef);
        return () => {
            const parent = rootFromRef.parentElement;
            parent?.removeChild(rootFromRef);
        };
    }, [container, rootElement]);
    const onRequestCloseHandler = useCallback(() => {
        isClosable && onRequestClose?.();
    }, [onRequestClose, isClosable]);
    const onKeyboardModeCloseHandler = useCallback(() => {
        if (isClosableWithKeyboard) {
            onRequestCloseHandler();
        }
    }, [isClosableWithKeyboard, onRequestCloseHandler]);
    /**
     * !IMPORTANT
     * !IMPORTANT
     * !IMPORTANT
     * Changes in that hook should be done very careful
     */
    useEffect(() => {
        if (isOpened) {
            popupStack.addPopupToStack(id, (e) => {
                switch (e.code) {
                    case 'Escape': {
                        onKeyboardModeCloseHandler();
                        break;
                    }
                }
            });
            setPopupIndex(popupStack.stack.current.length);
        }
        else {
            // if check for a mounted.current helps escape focusing on initial render, when popup is closed
            if (mounted.current && kbmRef.current) {
                // auto-focus on anchor when popup is last in stack and in keyboard mode
                focusOnRefElement(anchorRef);
            }
        }
        if (!mounted.current) {
            mounted.current = true;
        }
        return () => {
            popupStack.removePopupFromStack(id);
            setPopupIndex(undefined);
        };
        // deps should be exactly that
        // it means that hook should be triggered only when OPENED state changed
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, isOpened, popupStack, anchorRef]);
    const handleBackdropClick = useCallback((e) => {
        if (shouldCloseOnClickAway && onRequestCloseHandler) {
            if (isModal) {
                //popup is modal - backdrop handles clicks
                //don't process click inside popup container (bubbled events)
                if (e.target === backdrop.current) {
                    onRequestCloseHandler();
                }
            }
            //if popup isn't modal then it's closed by RootClose
        }
    }, [shouldCloseOnClickAway, onRequestCloseHandler, backdrop, isModal]);
    const headerProps = useMemo(() => ({
        onRequestClose,
        isClosable,
        closeBtnAriaLabel,
    }), [onRequestClose, isClosable, closeBtnAriaLabel]);
    const popupHeader = useMemo(() => React.createElement(PopupHeader, { ...headerProps }, header), [header, headerProps]);
    const popupUIProps = {
        className,
        footer,
        header: headerWrapped ? popupHeader : header,
        isModal,
        resizable,
        draggable,
        isOpened,
        onBackdropClick: handleBackdropClick,
        top,
        left,
        popupOrder,
        minHeight,
        minWidth,
        defaultSize,
        scrollable,
        scrollableMode,
        testId,
        showDividerOnScroll,
        zIndex: popupIndex,
    };
    const layout = (React.createElement(RootClose, { onRootClose: onRequestCloseHandler, ignoreKeyUp: !shouldCloseOnClickAway, ignoreClick: !shouldCloseOnClickAway || isModal },
        React.createElement(PopupUI, { ...popupUIProps, ref: backdrop }, children)));
    return !isOpened ? null : createPortal(layout, rootElement.current);
});
export default Popup;
