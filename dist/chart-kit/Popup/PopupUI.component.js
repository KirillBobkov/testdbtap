import { Resizable } from 're-resizable';
import React, { forwardRef, memo, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, } from 'react';
import Draggable from 'react-draggable';
import { CHART_REACT_WRAPPER_ID } from '../../chart/chart-react-app.styled';
import { ChartReactAppContext } from '../../chart/defaults';
import { createEventTargetContext } from '../EventTargetContext/EventTargetContext';
import { Scrollable } from '../Scrollable/Scrollable';
import { useA11yModalTabKeyHandler } from '../accessibility/use-a11y-modal-tab-key-handler';
import { PopupContainerDraggableStyled, PopupContainerStyled, PopupContentStyled, PopupFooterStyled, PopupGridStyled, PopupHeaderStyled, PopupUIStyled, } from './PopupUI.styled';
export const { EventTargetProvider: PopupEventTargetProvider, EventTargetConsumer: PopupEventTargetConsumer } = createEventTargetContext();
const MIN_HEIGHT = 300;
const MIN_WIDTH = 320;
const DEFAULT_START_SHIFT = 50;
const DEFAULT_POPUP_SHIFT = 10;
const DEFAULT_COORDS = {
    x: 0,
    y: 0,
};
export const PopupUI = memo(forwardRef((props, forwardedRef) => {
    const { header, children, footer, isModal, onBackdropClick, className, isOpened, resizable, draggable, scrollable = true, minHeight = MIN_HEIGHT, minWidth = MIN_WIDTH, defaultSize, top, left, popupOrder, showDividerOnScroll = false, testId, scrollableMode, zIndex, } = props;
    const popupContainerElement = useRef(null);
    const [dividerVisible, setDividerVisible] = useState(false);
    const [position, setPosition] = useState(DEFAULT_COORDS);
    const { isMobile } = useContext(ChartReactAppContext);
    const bounds = useMemo(() => ({
        left: 0,
        top: 0,
        right: window.innerWidth - (popupContainerElement.current?.clientWidth || minWidth),
        bottom: window.innerHeight - (popupContainerElement.current?.clientHeight || minHeight),
    }), [popupContainerElement.current?.clientHeight, popupContainerElement.current?.clientWidth, minWidth, minHeight]);
    const calcCenterPosition = useCallback(() => {
        const coords = { ...DEFAULT_COORDS };
        // calculate coords for popup to center
        coords.x = left || (window.innerWidth - (popupContainerElement.current?.clientWidth || minWidth)) * 0.5;
        coords.y = top || (window.innerHeight - (popupContainerElement.current?.clientHeight || minHeight)) * 0.5;
        if (popupOrder) {
            coords.x = coords.x + DEFAULT_START_SHIFT - DEFAULT_POPUP_SHIFT * popupOrder;
            coords.y = coords.y - DEFAULT_START_SHIFT + DEFAULT_POPUP_SHIFT * popupOrder;
        }
        return coords;
    }, [top, left, popupOrder, minWidth, minHeight]);
    // move popup to center while initial render
    useLayoutEffect(() => setPosition(calcCenterPosition()), []);
    useEffect(() => {
        const listener = () => {
            setPosition(calcCenterPosition());
        };
        window.addEventListener('resize', listener);
        return () => {
            window.removeEventListener('resize', listener);
        };
    }, [calcCenterPosition]);
    useEffect(() => {
        popupContainerElement.current?.focus();
    }, [popupContainerElement]);
    const onDragMoveHandler = useCallback((e, data) => {
        setPosition({ x: data.x, y: data.y });
    }, []);
    const isResizable = useMemo(() => resizable
        ? {
            bottom: true,
            bottomRight: true,
            right: true,
            bottomLeft: false,
            left: false,
            top: false,
            topLeft: false,
            topRight: false,
        }
        : {
            bottom: false,
            bottomRight: false,
            right: false,
            bottomLeft: false,
            left: false,
            top: false,
            topLeft: false,
            topRight: false,
        }, [resizable]);
    const tabKeyHandler = useA11yModalTabKeyHandler(popupContainerElement);
    const keyDownHandler = useCallback((e) => {
        tabKeyHandler(e.nativeEvent);
    }, [tabKeyHandler]);
    const onScroll = useCallback((_, scrollTop) => {
        if (showDividerOnScroll) {
            setDividerVisible(scrollTop > 0);
        }
    }, [showDividerOnScroll]);
    return (React.createElement(PopupUIStyled, { className: `${CHART_REACT_WRAPPER_ID} ${className ?? ''}`, isModal: isModal, isOpened: isOpened, ref: forwardedRef, isMobile: isMobile, zIndex: zIndex, onClick: onBackdropClick },
        React.createElement(Draggable, { bounds: bounds, disabled: !draggable, handle: '.draggable-header', onDrag: onDragMoveHandler, position: position },
            React.createElement(PopupContainerDraggableStyled, null,
                React.createElement(PopupContainerStyled, { role: "dialog", "aria-modal": "true", "aria-labelledby": "dialog_header", tabIndex: 0, onKeyDown: keyDownHandler, "data-test-id": testId, ref: popupContainerElement },
                    React.createElement(Resizable, { minHeight: minHeight, minWidth: minWidth, defaultSize: defaultSize, enable: isResizable, bounds: document.documentElement },
                        React.createElement(PopupGridStyled, null,
                            React.createElement(PopupHeaderStyled, { className: "draggable-header", dividerVisible: dividerVisible }, header),
                            popupContainerElement !== null && (
                            // value from context is used for a Popovers inside a Popup component to correctly close on a click outside
                            React.createElement(PopupEventTargetProvider, { value: popupContainerElement.current || undefined }, scrollable ? (React.createElement(Scrollable, { onScroll: onScroll, mode: scrollableMode },
                                React.createElement(PopupContentStyled, null, children))) : (React.createElement(PopupContentStyled, null, children)))),
                            footer && React.createElement(PopupFooterStyled, null, footer))))))));
}));
