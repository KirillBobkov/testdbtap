import React, { memo, useCallback, useMemo, useRef } from 'react';
import { SelectboxAnchor } from './SelectboxAnchor.component';
import { SelectboxItemContainerStyled, SelectboxItemTextStyled, SelectboxMenuStyled, SelectboxPopoverContent, } from './Selectbox.styled';
import { isEventWithComposedPath } from '../../utils/typeGuards';
import { useA11yPopFocusController } from '../accessibility/use-a11y-pop-focus-controller';
import { useA11yAnchorKeyDown } from '../accessibility/use-a11y-anchor-keydown';
import { IconWrapper } from '../IconWrapper/IconWrapper.component';
import { Popover as PopoverChartKit } from '../Popover/Popover.lazy-component';
import { useSyncedRef } from '../utils/react/use-synced-ref';
import { Scrollable } from '../Scrollable/Scrollable';
import { useAdaptiveHeight } from '../Popover/useAdaptiveHeight';
/**
 * !!!IMPORTANT!!! You should use this component only with `MenuItem` as children.
 */
export const Selectbox = memo(props => {
    const { Anchor = SelectboxAnchor, Popover = PopoverChartKit, maxPopoverHeight = 400, Menu = SelectboxMenuStyled, closeOnClickAway = true, focusSelector = '[data-active="true"]', Footer, Header, hasMenu = true, children, caretIcon, value, isDisabled, isOpened = false, onToggle, onTabPress, onValueChange, className, isCaretIconChanged, prefixIcon, testIdAnchor, testIdPopover, anchorAriaLabel, menuAriaLabel, ariaDescription, hasIconWrapper = true, keyboardMode, parentEventTarget, contentRef, tabIndex, } = props;
    const anchorRef = useRef(null);
    const menuRef = useRef(null);
    const popRef = useSyncedRef(contentRef);
    const onAnchorClick = useCallback(() => onToggle?.(!isOpened), [onToggle, isOpened]);
    // ToDo in feature create one component for popovers and deep learn helpful or not stopPropagation
    const onRequestClose = useCallback((e) => {
        if (closeOnClickAway &&
            anchorRef.current &&
            isEventWithComposedPath(e) &&
            e.composedPath().includes(anchorRef.current)) {
            e.stopPropagation();
        }
        onToggle?.(false);
    }, [onToggle, closeOnClickAway]);
    const onItemSelect = useCallback((nextValue) => {
        if (nextValue === undefined) {
            return;
        }
        const prevValue = value;
        if (!Array.isArray(prevValue)) {
            onValueChange(nextValue);
        }
        else {
            const values = getValues(prevValue);
            if (typeof nextValue !== 'undefined') {
                const index = values.indexOf(nextValue);
                if (index !== -1) {
                    const newValue = [...values.slice(0, index), ...values.slice(index + 1)];
                    onValueChange(newValue);
                }
                else {
                    const newValue = [...values, nextValue];
                    onValueChange(newValue);
                }
            }
        }
        if (onToggle && !Array.isArray(prevValue)) {
            onToggle(false);
        }
    }, [onToggle, onValueChange, value]);
    const values = getValues(value);
    const valueText = useMemo(() => getValueText(props), [props]);
    useA11yPopFocusController({
        anchorRef,
        popRef,
        focusSelector, // Focus element selector when popover is opened
    });
    const onKeyDown = useA11yAnchorKeyDown(() => onAnchorClick(), [onAnchorClick], { targetCheck: anchorRef.current });
    const adaptiveStyles = useAdaptiveHeight(anchorRef, { maxHeight: maxPopoverHeight });
    return (React.createElement(React.Fragment, null,
        React.createElement(Anchor, { tabIndex: tabIndex, className: className, ref: anchorRef, isDisabled: isDisabled, caretIcon: caretIcon, isOpened: isOpened, value: value, hasMenu: hasMenu, valueText: valueText, onClick: onAnchorClick, onKeyDown: onKeyDown, isCaretIconChanged: isCaretIconChanged, prefixIcon: hasIconWrapper && prefixIcon !== undefined ? React.createElement(IconWrapper, null, prefixIcon) : prefixIcon, testId: testIdAnchor, ariaLabel: `${anchorAriaLabel ?? ''} ${Array.isArray(value) ? 'array' : value ?? 'no value'}`, ariaDescription: ariaDescription }),
        React.createElement(Popover, { opened: isOpened, keyboardMode: keyboardMode, onRequestClose: onRequestClose, anchorRef: anchorRef, onTabPress: onTabPress, testId: testIdPopover, parentEventTarget: parentEventTarget, closeOnClickAway: closeOnClickAway },
            React.createElement(SelectboxPopoverContent, { ref: popRef, style: adaptiveStyles },
                Header,
                React.createElement(Scrollable, { mode: "visible" },
                    React.createElement(Menu, { ariaLabel: menuAriaLabel, onItemSelect: onItemSelect, onToggle: onToggle, ref: menuRef }, React.Children.map(children, wrapSelectboxItem(values, props, props.shouldWrap)))),
                Footer))));
});
const getValueText = (props) => {
    const { value, children, multipleFormatter, placeholder } = props;
    if (Array.isArray(value) && value.length) {
        const predicate = (child) => React.isValidElement(child) && value.indexOf(child.props.value) !== -1;
        const result = React.Children.toArray(children)
            .filter(predicate)
            .reduce((acc, valueChild) => {
            return [...acc, valueChild.props.children];
        }, []);
        return multipleFormatter ? multipleFormatter(value) : result;
    }
    else if (typeof value !== 'undefined') {
        const predicate = (child) => React.isValidElement(child) && child.props.value === value;
        const valueChild = React.Children.toArray(children).find(predicate);
        // existence is checked in prop types
        if (valueChild) {
            return valueChild.props.children;
        }
    }
    if (typeof value === 'string' || typeof value === 'number') {
        return value;
    }
    return placeholder;
};
const wrapSelectboxItem = (values, selectboxProps, shouldWrap = true) => (child) => {
    if (!React.isValidElement(child)) {
        return child;
    }
    const { value, isActive } = child.props;
    const isActiveOverride = isActive !== undefined ? isActive : values.indexOf(value) !== -1;
    const props = Object.assign({}, child.props, {
        isActive: isActiveOverride,
        children: shouldWrap ? (React.createElement(SelectboxItemContainerStyled, null,
            React.createElement(SelectboxItemTextStyled, null, child.props.children))) : (child.props.children),
    });
    return React.cloneElement(child, props);
};
const getValues = (value) => {
    if (typeof value === 'undefined') {
        return [];
    }
    return Array.isArray(value) ? value : [value];
};
