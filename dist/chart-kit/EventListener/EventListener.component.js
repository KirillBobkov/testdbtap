import { __decorate } from "tslib";
import React from 'react';
import { PURE } from '../../utils/pure';
import { shallowEqual } from '../../utils/object.utils';
const ON_MARKER = 'on';
const CAPTURE_MARKER = 'Capture';
let EventListener = class EventListener extends React.Component {
    componentDidMount() {
        this.addListeners();
    }
    componentWillUpdate(nextProps) {
        if (shouldResetListeners(this.props, nextProps)) {
            this.removeListeners();
        }
    }
    componentDidUpdate(prevProps) {
        if (shouldResetListeners(prevProps, this.props)) {
            this.addListeners();
        }
    }
    componentWillUnmount() {
        this.removeListeners();
    }
    render() {
        return this.props.children;
    }
    addListeners() {
        const target = this.getTarget();
        const handlers = this.getHandlers();
        Object.keys(handlers).forEach(key => {
            const capture = key.endsWith(CAPTURE_MARKER);
            const handler = handlers[key];
            const eventName = getEventName(key, capture);
            const isTouchEvent = ['touchcancel', 'touchend', 'touchmove', 'touchstart'].includes(eventName);
            const options = isTouchEvent ? { capture, passive: false } : { capture };
            // eslint-disable-next-line no-restricted-syntax
            target.addEventListener(eventName, handler, options);
        });
    }
    removeListeners() {
        const target = this.getTarget();
        const handlers = this.getHandlers();
        Object.keys(handlers).forEach(key => {
            const capture = key.endsWith(CAPTURE_MARKER);
            const handler = handlers[key];
            const eventName = getEventName(key, capture);
            // eslint-disable-next-line no-restricted-syntax
            target.removeEventListener(eventName, handler, capture);
        });
    }
    getTarget() {
        const { target } = this.props;
        if (typeof target === 'string') {
            return window[target];
        }
        return target;
    }
    getHandlers() {
        // noinspection JSUnusedLocalSymbols
        const { target, children, ...props } = this.props;
        const propKeys = Object.keys(props);
        const eventKeys = propKeys.filter(key => key.startsWith('on'));
        const handlers = eventKeys.reduce((acc, key) => {
            acc[key] = props[key];
            return acc;
        }, {});
        return handlers;
    }
};
EventListener = __decorate([
    PURE
], EventListener);
export { EventListener };
function getEventName(rawEventName, capture) {
    const trimmedLeft = rawEventName.startsWith(ON_MARKER) ? rawEventName.substring(ON_MARKER.length) : rawEventName;
    const trimmed = capture ? trimmedLeft.substring(0, trimmedLeft.length - CAPTURE_MARKER.length) : trimmedLeft;
    return trimmed.toLowerCase();
}
function shouldResetListeners(prevProps, nextProps) {
    const { children: prevChildren, ...oldProps } = prevProps;
    const { children: nextChildren, ...newProps } = nextProps;
    return !shallowEqual(oldProps, newProps);
}
