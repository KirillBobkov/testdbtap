import React, { memo, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { MultichartSettingsContainer } from '../../containers/multichart-settings.container';
import { context } from '../../../context/context2';
import { MultiChartDropdownStyled, PopoverStyled } from './multichart-settings-dropdown.styled';
import { useDirectProperty } from '../../../utils/use-property';
import { option } from 'fp-ts';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { IconWrapper } from '../../../chart-kit/IconWrapper/IconWrapper.component';
import { TEST_IDS } from '../../../config/e2e/test-ids';
import { namedMemo } from '../../../utils/named-memo';
import { useA11yPopFocusController } from '../../../chart-kit/accessibility/use-a11y-pop-focus-controller';
import { MultiChartComponentContext } from '../multi-chart/multi-chart-context';
import { resolveComponentWithPredicate } from '../../../utils/resolve-component-with-predicate.utils';
import { createKeyDownHandler } from '../../../chart-kit/utils/keyDownHandler';
import { ChartReactAppContext } from '../../defaults';
import { constVoid } from 'fp-ts/function';
import { ChartToolbarButtonWithTooltip } from '../chart-toolbar/chart-toolbar-button-with-tooltip.component';
const MultichartSettingsDropdown = context.combine(MultichartSettingsContainer, context.key()('multiChartViewModel'), context.key()('localization'), (MultichartSettingsContainer, vm, localization) => namedMemo('MultichartSettingsDropdown', (props) => {
    const { popoverContainer } = props;
    const [isVisible, setVisibility] = useState(false);
    const isMaximized = option.isSome(useDirectProperty(vm.state, ['maximizedChartId']));
    const buttonRef = useRef(null);
    const popoverRef = useRef(null);
    const { isMobile } = useContext(ChartReactAppContext);
    const iconsConfig = useContext(IconsOverridingContext);
    const { keyboardModeEnabled } = useContext(MultiChartComponentContext);
    const togglePopover = useCallback(() => {
        setVisibility(!isVisible);
    }, [setVisibility, isVisible]);
    const closePopover = useCallback(() => {
        isVisible && setVisibility(false);
    }, [setVisibility, isVisible]);
    const handleKeyDown = useCallback(createKeyDownHandler(['Space', () => setVisibility(!isVisible)], ['ArrowDown', () => setVisibility(!isVisible)], ['ArrowUp', () => setVisibility(!isVisible)]), [isVisible]);
    useEffect(() => {
        if (isMaximized) {
            setVisibility(false);
        }
    }, [isMaximized]);
    useA11yPopFocusController({
        anchorRef: buttonRef,
        popRef: popoverRef,
        focusSelector: 'button[data-active="true"]',
    });
    return !isMobile ? (React.createElement(React.Fragment, null,
        React.createElement(ChartToolbarButtonWithTooltip, { ariaLabel: localization.toolbar.a11y_buttons.a11y_multichart_popover, ariaExpanded: isVisible, ariaHaspopup: true, tabIndex: -1, icon: React.createElement(IconWrapper, null, iconsConfig.toolbar.multichart.settings.mainIcon), ref: buttonRef, onClick: togglePopover, onKeyDown: handleKeyDown, hasMenu: true, isActive: isVisible, testId: TEST_IDS.multichart_button, disableTooltip: isVisible, label: localization.toolbar.tooltip.multichart_popover }),
        React.createElement(PopoverStyled, { appendTo: popoverContainer, anchorRef: buttonRef, align: "start", position: "bottom", opened: isVisible, keyboardMode: keyboardModeEnabled, onRequestClose: togglePopover, onTabPress: constVoid },
            React.createElement(MultiChartDropdownStyled, { ref: popoverRef },
                React.createElement(MultichartSettingsContainer, { onLayoutChange: closePopover, closePopover: closePopover }))))) : (React.createElement(React.Fragment, null));
}));
export const MultiChartSettingsButton = context.combine(MultichartSettingsDropdown, context.key()('chartReactConfig'), (Dropdown, chartReactConfig) => resolveComponentWithPredicate(chartReactConfig.multiChart.enabled, memo(() => React.createElement(Dropdown, null))));
