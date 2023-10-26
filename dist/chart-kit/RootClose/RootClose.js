import { __decorate } from "tslib";
import React from 'react';
import { Component, } from 'react';
import { findDOMNode } from 'react-dom';
import { EventListener } from '../EventListener/EventListener.component';
import { PURE } from '../../utils/pure';
let RootClose = class RootClose extends Component {
    constructor() {
        super(...arguments);
        this.preventMouseRootClose = false;
        this.ignoreMouseUp = true;
        this.currentEvent = undefined;
        this.onMouseDown = () => {
            this.ignoreMouseUp = false;
        };
        this.handleClickCapture = e => {
            const domNode = findDOMNode(this);
            if (!domNode) {
                return;
            }
            this.preventMouseRootClose =
                // eslint-disable-next-line no-restricted-syntax
                this.ignoreMouseUp || isModifiedEvent(e) || !isLeftClickEvent(e) || domNode.contains(e.target);
        };
        this.handleClick = e => {
            // skip if this event is the same as the one running when we added the handlers
            if (e === this.currentEvent) {
                this.currentEvent = undefined;
                return;
            }
            if (!this.props.ignoreClick && !this.preventMouseRootClose && this.props.onRootClose) {
                this.props.onRootClose(e);
            }
        };
        this.handleTouchStartCapture = e => {
            const domNode = findDOMNode(this);
            if (!domNode) {
                return;
            }
            // eslint-disable-next-line no-restricted-syntax
            this.preventMouseRootClose = domNode.contains(e.target);
        };
        this.handleTouchStart = e => {
            // skip if this event is the same as the one running when we added the handlers
            if (e === this.currentEvent) {
                this.currentEvent = undefined;
                return;
            }
            if (!this.props.ignoreClick && !this.preventMouseRootClose && this.props.onRootClose) {
                this.props.onRootClose(e);
                e.preventDefault();
            }
        };
        this.handleKeyUp = e => {
            // skip if this event is the same as the one running when we added the handlers
            if (e === this.currentEvent) {
                this.currentEvent = undefined;
                return;
            }
            if (!this.props.ignoreKeyUp && e.code === 'Escape' && this.props.onRootClose) {
                this.props.onRootClose(e);
            }
        };
    }
    componentDidMount() {
        // Store the current event to avoid triggering handlers immediately
        // https://github.com/facebook/react/issues/20074
        const currentEvent = window.event;
        this.currentEvent = currentEvent;
    }
    render() {
        return (React.createElement(EventListener, { target: document, onMouseDown: this.onMouseDown, onClick: this.handleClick, onClickCapture: this.handleClickCapture, onTouchStart: this.handleTouchStart, onTouchStartCapture: this.handleTouchStartCapture, onKeyUp: this.handleKeyUp }, this.props.children));
    }
};
RootClose = __decorate([
    PURE
], RootClose);
export { RootClose };
function isLeftClickEvent(event) {
    return event.button === 0;
}
function isModifiedEvent(event) {
    return Boolean(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
