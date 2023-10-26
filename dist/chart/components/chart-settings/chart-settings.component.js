import React, { memo, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { MultiChartComponentContext } from '../multi-chart/multi-chart-context';
import { ChartSettingsPopoverStyled } from './chart-settings.styled';
import { useA11yAnchorKeyDown } from '../../../chart-kit/accessibility/use-a11y-anchor-keydown';
import { TEST_IDS } from '../../../config/e2e/test-ids';
import { ChartSettingsPopup } from './chart-settings-mobile-popup/chart-settings-mobile-popup.component';
import { ChartSettingsContent } from './chart-settings-content.component';
import { useA11yPopFocusController } from '../../../chart-kit/accessibility/use-a11y-pop-focus-controller';
import { useResizeObserver } from '../../../utils/use-resize-observer';
import { ChartReactAppContext } from '../../defaults';
import { constVoid } from 'fp-ts/function';
import { ChartToolbarButtonWithTooltip } from '../chart-toolbar/chart-toolbar-button-with-tooltip.component';
export const ChartSettingsComponent = memo((props) => {
    const { tabs, tabsDefaultConfig, value, onValueChange, isOpened, onPopoverToggle } = props;
    const { localization, keyboardModeEnabled } = useContext(MultiChartComponentContext);
    const { isMobile } = useContext(ChartReactAppContext);
    const [popoverMeasurements, setPopoverMeasurements] = useState({
        width: 0,
        height: 0,
    });
    const [activeTab, setActiveTab] = useState(0);
    //#region refs
    const anchorRef = useRef(null);
    const leftSectionRef = useRef(null);
    const rightSectionRef = useRef(null);
    const popoverRef = useRef(null);
    const setLeftSectionRefHandler = useCallback((node) => {
        leftSectionRef.current = node;
    }, []);
    const setPopoverRefHandler = useCallback((node) => {
        popoverRef.current = node;
    }, []);
    //#endregion
    //#region right section resize handlers
    // content of a tab section changes a lot of time --> width and height changes too
    // when changing the tab, or check/uncheck some checkboxes
    // and we need to control that changes
    const setPopoverMeasurementsHandler = useCallback((contentRect) => {
        const leftSectionWidth = leftSectionRef.current?.getBoundingClientRect().width ?? 0;
        setPopoverMeasurements({
            width: contentRect.width + leftSectionWidth,
            height: (popoverRef.current?.offsetHeight && popoverRef.current.offsetHeight) ?? contentRect.height,
        });
    }, [setPopoverMeasurements, leftSectionRef]);
    // that handler executes on initial render of the popover
    // updates the ref to a right section along the way
    const setRightSectionRefHandler = useCallback((node) => {
        if (node !== null) {
            rightSectionRef.current = node;
            setPopoverMeasurementsHandler(node.getBoundingClientRect());
        }
    }, [setPopoverMeasurementsHandler]);
    // callback for a resize observer
    // updates the width and height of a popover after observer detected changes of a
    // right section bounds
    const onRightSectionResize = useCallback((entries) => {
        for (const entry of entries) {
            const contentRect = entry.contentRect;
            setPopoverMeasurementsHandler(contentRect);
        }
    }, [setPopoverMeasurementsHandler]);
    // resize observer is for detecting of a bounds changes of a right section
    // doesn't handle initial render
    useResizeObserver(rightSectionRef, onRightSectionResize);
    //#endregion
    const togglePopupHandler = useCallback((e) => {
        onPopoverToggle(!isOpened);
        if (!isOpened) {
            setPopoverMeasurements({ width: 0, height: 0 });
        }
    }, [isOpened, onPopoverToggle]);
    const closePopupHandler = useCallback(() => {
        onPopoverToggle(false);
    }, [isOpened, onPopoverToggle]);
    const onKeyDown = useA11yAnchorKeyDown((e) => {
        togglePopupHandler(e);
    }, []);
    const iconsConfig = useContext(IconsOverridingContext);
    const chartSettingsContent = useMemo(() => (React.createElement(ChartSettingsContent, { value: value, onValueChange: onValueChange, leftSectionRef: setLeftSectionRefHandler, rightSectionRef: setRightSectionRefHandler, popoverRef: setPopoverRefHandler, tabs: tabs, tabsDefaultConfig: tabsDefaultConfig, activeTab: activeTab, changeActiveTab: setActiveTab })), [
        tabs,
        tabsDefaultConfig,
        activeTab,
        setLeftSectionRefHandler,
        setRightSectionRefHandler,
        setPopoverRefHandler,
        onValueChange,
        value,
    ]);
    useA11yPopFocusController({
        anchorRef,
        popRef: popoverRef,
        focusSelector: '*[data-active="true"]',
    });
    return (React.createElement(React.Fragment, null,
        React.createElement(ChartToolbarButtonWithTooltip, { icon: iconsConfig.toolbar.chartSettings, ref: anchorRef, onClick: togglePopupHandler, onKeyDown: onKeyDown, hasMenu: true, isActive: isOpened, testId: TEST_IDS.chart_settings_button, disableTooltip: isOpened, label: localization.toolbar.tooltip.chart_settings_button, ariaLabel: localization.toolbar.a11y_buttons.a11y_chart_settings_button, ariaExpanded: isOpened, ariaHaspopup: true }),
        isMobile ? (React.createElement(ChartSettingsPopup, { onRequestClose: closePopupHandler, isOpened: isOpened }, chartSettingsContent)) : (React.createElement(ChartSettingsPopoverStyled, { onTabPress: constVoid, dividerOffset: leftSectionRef?.current?.getBoundingClientRect().width ?? 0, popoverMeasurements: popoverMeasurements, anchorRef: anchorRef, align: "start", position: "bottom", opened: isOpened, keyboardMode: keyboardModeEnabled, testId: TEST_IDS.chart_settings, onRequestClose: closePopupHandler }, chartSettingsContent))));
});
