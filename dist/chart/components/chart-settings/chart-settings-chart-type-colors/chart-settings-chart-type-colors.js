import React, { memo } from 'react';
import { RestoreToDefaultButton } from '../../../../chart-kit/RestoreToDefaultButton/RestoreToDefaultButton.component';
import { TEST_IDS } from '../../../../config/e2e/test-ids';
import { ChartSettingsTabContainer } from '../chart-settings.styled';
import { ChartSettingsChartTypeColorsCommon } from './chart-settings-chart-type-colors-common.component';
import { ChartFormThemeSwitcher, ChartSettingsFieldsetContainerStyled, } from './chart-settings-chart-type-colors.styled';
export const ChartSettingsChartTypeColors = memo(props => {
    const { changeTheme, activeTheme, onColorChange, palette, ColorSettingsComponent, settings, localization, popoverContainer, showRestoreToDefault, onRestoreDefaultRequest, showThemeSwitcher, } = props;
    return (React.createElement(ChartSettingsTabContainer, { "data-test-id": TEST_IDS.chart_settings_tab_colors_content },
        showThemeSwitcher && (React.createElement(ChartSettingsFieldsetContainerStyled, { role: "radiogroup", "aria-labelledby": "radio_group_theme" },
            React.createElement(ChartFormThemeSwitcher, { localization: localization, changeTheme: changeTheme, activeTheme: activeTheme }))),
        React.createElement(ColorSettingsComponent, { popoverContainer: popoverContainer }),
        React.createElement(ChartSettingsChartTypeColorsCommon, { settings: settings, localization: localization, onColorChange: onColorChange, palette: palette, popoverContainer: popoverContainer, activeTheme: activeTheme }),
        showRestoreToDefault && (React.createElement(RestoreToDefaultButton, { onClick: onRestoreDefaultRequest }, localization.settingsPopup.resetToDefaultsBtn))));
});
