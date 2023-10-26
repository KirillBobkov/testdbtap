import React, { useCallback, useContext, useRef } from 'react';
import { Popover as ChartKitPopover } from '../Popover/Popover.lazy-component';
import { isEventWithComposedPath } from '../../utils/typeGuards';
import { typedMemo } from '../../utils/typed-memo';
import { useA11yModalTabKeyHandler } from '../accessibility/use-a11y-modal-tab-key-handler';
import { useA11yPopFocusController } from '../accessibility/use-a11y-pop-focus-controller';
import { MultiChartComponentContext } from '../../chart/components/multi-chart/multi-chart-context';
import { useA11yAnchorKeyDown } from '../accessibility/use-a11y-anchor-keydown';
import { DropdownPopoverContent } from './Dropdown.styled';
const DropdownRaw = ({ Anchor, Popover = ChartKitPopover, children, isOpened = false, onToggle, anchorAdditionalProps, className, parentEventTarget, style, }) => {
    const anchorRef = useRef(null);
    const popoverRef = useRef(null);
    const onAnchorClick = useCallback(() => {
        onToggle(!isOpened);
    }, [isOpened, onToggle]);
    const onKeyDown = useA11yAnchorKeyDown(() => onAnchorClick(), [onAnchorClick]);
    const onPopoverRequestClose = useCallback((e) => {
        if (anchorRef.current && isEventWithComposedPath(e) && e.composedPath().includes(anchorRef.current)) {
            e.stopPropagation();
        }
        onToggle(false);
    }, [onToggle]);
    useA11yPopFocusController({
        anchorRef,
        popRef: popoverRef,
    });
    const { keyboardModeEnabled } = useContext(MultiChartComponentContext);
    const tabKeyHandler = useA11yModalTabKeyHandler(popoverRef);
    return (React.createElement(Anchor, { onClick: onAnchorClick, onKeyDown: onKeyDown, additionalProps: anchorAdditionalProps, ref: anchorRef },
        React.createElement(Popover, { style: style, keyboardMode: keyboardModeEnabled, onTabPress: tabKeyHandler, className: className, opened: isOpened, onRequestClose: onPopoverRequestClose, anchorRef: anchorRef, parentEventTarget: parentEventTarget, closeOnClickAway: true },
            React.createElement(DropdownPopoverContent, { ref: popoverRef }, children))));
};
export const Dropdown = typedMemo(DropdownRaw);
