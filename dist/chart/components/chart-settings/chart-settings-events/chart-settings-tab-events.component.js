import React, { memo, useCallback } from 'react';
import { RestoreToDefaultButton } from '../../../../chart-kit/RestoreToDefaultButton/RestoreToDefaultButton.component';
import { chartSettingsLens } from '../../../view-models/chart-configurator.view-model';
import { ChartSettingsCheckbox } from '../chart-settings-checkbox/chart-settings-checkbox.component';
import { ChartSettingsTabForm } from '../chart-settings-general/chart-settings-tab-general.styled';
import { ChartSettingsTabContainer } from '../chart-settings.styled';
export const ChartSettingsTabEventsContent = memo((props) => {
    const { value, localization, onValueChange, a11yTabProps: { role, id, ariaLabelledBy }, onRestoreDefaultRequest, showRestoreToDefault, } = props;
    const showEvents = useCallback((value = false) => {
        onValueChange(chartSettingsLens(['chartCore', 'components', 'events', 'visible']), value);
    }, [onValueChange]);
    const showDividends = useCallback((value = false) => {
        onValueChange(chartSettingsLens(['chartCore', 'components', 'events', 'eventsVisibility', 'dividends']), value);
    }, [onValueChange]);
    const showSplits = useCallback((value = false) => {
        onValueChange(chartSettingsLens(['chartCore', 'components', 'events', 'eventsVisibility', 'splits']), value);
    }, [onValueChange]);
    const showEarnings = useCallback((value = false) => {
        onValueChange(chartSettingsLens(['chartCore', 'components', 'events', 'eventsVisibility', 'earnings']), value);
    }, [onValueChange]);
    const showConferenceCalls = useCallback((value = false) => {
        onValueChange(chartSettingsLens(['chartCore', 'components', 'events', 'eventsVisibility', 'conference-calls']), value);
    }, [onValueChange]);
    const showNews = useCallback((value = false) => {
        onValueChange(chartSettingsLens(['chartCore', 'components', 'news', 'visible']), value);
    }, [onValueChange]);
    return (React.createElement(ChartSettingsTabContainer, null,
        React.createElement(ChartSettingsTabForm, { role: role, id: id, "aria-labelledby": ariaLabelledBy },
            React.createElement(ChartSettingsCheckbox, { label: localization.settingsPopup.tabs.events.eventsOnChart, value: value.components.events.visible, onValueChange: showEvents }),
            React.createElement(ChartSettingsCheckbox, { disabled: !value.components.events.visible, label: localization.settingsPopup.tabs.events.dividends, value: value.components.events.visible && value.components.events.eventsVisibility.dividends, onValueChange: showDividends }),
            React.createElement(ChartSettingsCheckbox, { disabled: !value.components.events.visible, label: localization.settingsPopup.tabs.events.splits, value: value.components.events.visible && value.components.events.eventsVisibility.splits, onValueChange: showSplits }),
            React.createElement(ChartSettingsCheckbox, { disabled: !value.components.events.visible, label: localization.settingsPopup.tabs.events.earnings, value: value.components.events.visible && value.components.events.eventsVisibility.earnings, onValueChange: showEarnings }),
            React.createElement(ChartSettingsCheckbox, { disabled: !value.components.events.visible, label: localization.settingsPopup.tabs.events['conference-calls'], value: value.components.events.visible && value.components.events.eventsVisibility['conference-calls'], onValueChange: showConferenceCalls }),
            React.createElement(ChartSettingsCheckbox, { disabled: !value.components.events.visible, label: localization.settingsPopup.tabs.events.newsTitle, value: value.components.events.visible && value.components.news.visible, onValueChange: showNews })),
        showRestoreToDefault && (React.createElement(RestoreToDefaultButton, { onClick: onRestoreDefaultRequest }, localization.settingsPopup.resetToDefaultsBtn))));
});
export default ChartSettingsTabEventsContent;
