import React, { memo, useCallback, useContext } from 'react';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { chartSettingsLens } from '../../../view-models/chart-configurator.view-model';
import { TEST_IDS } from '../../../../config/e2e/test-ids';
import { ChartSettingsCheckbox } from '../../chart-settings/chart-settings-checkbox/chart-settings-checkbox.component';
import { ChartSettingsTabDivider } from '../../chart-settings/chart-settings-general/chart-settings-tab-general.styled';
import { BackgroundMenuGridItem } from './background-menu-grid-item.component';
import { BackgroundMenuThemeItem } from './background-menu-theme-item.component';
export const BackgroundMenuSettingsItemsGroup = memo(props => {
    const { settings, onSettingsChange, chartReactConfig, sessionBreaksDisabled, activeTheme, onChangeTheme, onPopoverClose, } = props;
    const { localization } = useContext(MultiChartComponentContext);
    const showCrossToolHandler = useCallback((b) => {
        const value = b ? 'cross-and-labels' : 'none';
        onSettingsChange(chartSettingsLens(['chartCore', 'components', 'crossTool', 'type']), value);
    }, [onSettingsChange]);
    const showSessionBreaksHandler = useCallback((visible = false) => onSettingsChange(chartSettingsLens(['chartReact', 'sessionBreaks', 'visible']), visible), [onSettingsChange]);
    const showExtendedHoursHandler = useCallback((visible = false) => onSettingsChange(chartSettingsLens(['chartReact', 'extendedHours', 'visible']), visible), [onSettingsChange]);
    const showWatermarkHandler = useCallback((value = false) => onSettingsChange(chartSettingsLens(['chartCore', 'components', 'waterMark', 'visible']), value), [onSettingsChange]);
    return (React.createElement(React.Fragment, null,
        React.createElement(ChartSettingsCheckbox, { label: localization.settingsPopup.tabs.general.crosshair, value: settings.chartCore.components.crossTool.type === 'cross-and-labels', onValueChange: showCrossToolHandler }),
        chartReactConfig.chartDataOptionsSettings.sessionBreaks.enabled && (React.createElement(ChartSettingsCheckbox, { disabled: sessionBreaksDisabled, label: localization.settingsPopup.tabs.general.sessionBreaks, value: settings.chartReact.sessionBreaks.visible && !sessionBreaksDisabled, onValueChange: showSessionBreaksHandler, fieldTestId: TEST_IDS.settings_popup_session_breaks_field })),
        chartReactConfig.chartDataOptionsSettings.extendedHours.enabled && (React.createElement(ChartSettingsCheckbox, { disabled: sessionBreaksDisabled, label: localization.settingsPopup.tabs.general.extendedHours, value: settings.chartReact.extendedHours.visible && !sessionBreaksDisabled, onValueChange: showExtendedHoursHandler, fieldTestId: TEST_IDS.settings_popup_extended_hours_field })),
        React.createElement(ChartSettingsCheckbox, { label: localization.settingsPopup.tabs.general.watermark, value: settings.chartCore.components.waterMark.visible, onValueChange: showWatermarkHandler }),
        React.createElement(BackgroundMenuGridItem, { onPopoverClose: onPopoverClose, settings: settings, onSettingsChange: onSettingsChange }),
        React.createElement(BackgroundMenuThemeItem, { onPopoverClose: onPopoverClose, activeTheme: activeTheme, onChangeTheme: onChangeTheme }),
        React.createElement(ChartSettingsTabDivider, { visible: true })));
});
