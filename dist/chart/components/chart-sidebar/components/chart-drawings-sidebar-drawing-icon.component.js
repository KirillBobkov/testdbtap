import React, { memo, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { useA11yAnchorKeyDown } from '../../../../chart-kit/accessibility/use-a11y-anchor-keydown';
import { useA11yPopFocusController } from '../../../../chart-kit/accessibility/use-a11y-pop-focus-controller';
import { IconsOverridingContext } from '../../../../utils/icons-overriding-context';
import { getIconByDrawingType } from '../../drawings/drawings-selector/getIconByDrawingType';
import { IconsDrawingPopover } from '../../drawings/drawings-selector/icons-drawing-popover.component';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { DrawingsSidebarButtonWithTooltip } from './chart-drawings-sidebar-button-with-tooltip.component';
import { DrawingsSidebarPopoverIWStyled } from './chart-drawings-sidebar-button-with-tooltip.styled';
export const DrawingsSidebarDrawingIcon = memo(props => {
    const { expanded, active, disabled, icons, onSelectIcon } = props;
    const [popoverOpened, togglePopoverOpened] = useState(false);
    const iconsConfig = useContext(IconsOverridingContext);
    const { localization } = useContext(MultiChartComponentContext);
    const buttonRef = useRef(null);
    const popoverRef = useRef(null);
    const closePopoverHandler = useCallback(() => togglePopoverOpened(false), []);
    const togglePopoverHandler = useCallback(() => togglePopoverOpened(opened => !opened), [togglePopoverOpened]);
    const onSelectIconHandler = useCallback((icon) => {
        onSelectIcon(icon);
        togglePopoverOpened(false);
    }, [onSelectIcon]);
    const onKeyDown = useA11yAnchorKeyDown(() => togglePopoverOpened(opened => !opened), [], {
        keyCodes: ['Space', 'Enter'],
    });
    useA11yPopFocusController({
        anchorRef: buttonRef,
        popRef: popoverRef,
        focusSelector: '*[data-active="true"]', // focus at selected menu item when popover is opened
    });
    const iconDrawingIcon = useMemo(() => getIconByDrawingType('icon', iconsConfig), [iconsConfig]);
    return (React.createElement(React.Fragment, null,
        React.createElement(DrawingsSidebarButtonWithTooltip, { "aria-haspopup": "true", "aria-expanded": popoverOpened, ref: buttonRef, isFlat: true, expanded: expanded, isActive: active, disabled: disabled, icon: iconDrawingIcon, label: localization.drawings.types['icon'], disableTooltip: popoverOpened || expanded, onKeyDown: onKeyDown, onClick: togglePopoverHandler }, expanded ? (React.createElement(DrawingsSidebarPopoverIWStyled, null, iconsConfig.dropdownMenuItemWithPopover.arrow)) : null),
        React.createElement(IconsDrawingPopover, { ref: popoverRef, icons: icons, parentRef: buttonRef, onRequestClose: closePopoverHandler, isOpened: popoverOpened, onSelectIcon: onSelectIconHandler })));
});
