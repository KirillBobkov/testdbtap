import { array, option } from 'fp-ts';
import { constVoid, pipe } from 'fp-ts/function';
import React, { memo, useCallback, useMemo, useRef } from 'react';
import { useA11yListboxArrowsFocusController } from '../../../chart-kit/accessibility/use-a11y-listbox-arrows-focus-controller';
import { useA11yModalTabKeyHandler } from '../../../chart-kit/accessibility/use-a11y-modal-tab-key-handler';
import { ChartSettingsTab } from './chart-settings-tab.component';
import { ChartSettingsContainer, ChartSettingsTabContentStyled, ChartSettingsTabsStyled, } from './chart-settings.styled';
export const ChartSettingsContent = memo((props) => {
    const { tabs, value, onValueChange, tabsDefaultConfig, activeTab, changeActiveTab, leftSectionRef: leftSectionRefCallback, rightSectionRef: rightSectionRefCallback, popoverRef: popoverRefCallback, } = props;
    //#region refs
    const popoverRef = useRef(null);
    const leftSectionRef = useRef(null);
    const setPopoverRefHandler = useCallback((node) => {
        popoverRef.current = node;
        popoverRefCallback(node);
    }, [popoverRefCallback]);
    const setLeftSectionRefHandler = useCallback((node) => {
        leftSectionRef.current = node;
        leftSectionRefCallback(node);
    }, [leftSectionRefCallback]);
    //#endregion
    const tabLabel = tabs[activeTab] && tabs[activeTab].label.toLowerCase();
    const a11yTabProps = useMemo(() => ({
        role: 'tabpanel',
        id: `${tabLabel}-tab`,
        ariaLabelledBy: tabLabel,
    }), [tabLabel]);
    const getTabContent = useCallback((index, tabsDefaultConfig) => {
        const selectedTabDefaultConfig = pipe(option.fromNullable(tabsDefaultConfig), option.chain(array.findFirst(config => config.id === tabs[index].id)), option.fold(constVoid, match => match.defaultConfig));
        const TabContentComponent = tabs[index].content();
        return (React.createElement(TabContentComponent, { value: value, onValueChange: onValueChange, defaultConfig: selectedTabDefaultConfig, key: tabs[index].label, a11yTabProps: a11yTabProps, popoverRef: popoverRef.current }));
    }, [a11yTabProps, tabs, popoverRef, value, onValueChange]);
    useA11yListboxArrowsFocusController({
        wrapperRef: leftSectionRef,
        childrenSelector: 'button',
        direction: 'vertical',
        role: 'tablist',
        childRole: 'tab',
    });
    const tabKeyHandler = useA11yModalTabKeyHandler(popoverRef);
    const keyDownHandler = useCallback((event) => {
        tabKeyHandler(event.nativeEvent);
    }, [tabKeyHandler]);
    return (React.createElement(ChartSettingsContainer, { ref: setPopoverRefHandler, onKeyDown: keyDownHandler },
        React.createElement(ChartSettingsTabsStyled, { ref: setLeftSectionRefHandler }, tabs.map((tab, index) => {
            const isActive = activeTab === index;
            return (React.createElement(ChartSettingsTab, { key: tab.label + index, isActive: isActive, tab: tab, index: index, testId: tab.testId, onSelect: changeActiveTab }));
        })),
        React.createElement(ChartSettingsTabContentStyled, { ref: rightSectionRefCallback }, getTabContent(activeTab, tabsDefaultConfig))));
});
