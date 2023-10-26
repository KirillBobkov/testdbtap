import React, { useCallback, useMemo } from 'react';
import { context } from '../../../../context/context2';
import { namedMemo } from '../../../../utils/named-memo';
import { useProperty } from '../../../../utils/use-property';
import { ChartSettingsChartTypeColorsList } from '../../../components/chart-settings/chart-settings-chart-type-colors/chart-settings-chart-type-colors-list';
import { chartSettingsLens } from '../../../view-models/chart-configurator.view-model';
export const ChartSettingsChartTypeColorsBarContainer = context.combine(context.key()('localization'), context.key()('chartConfiguratorViewModel'), context.key()('themeViewModel'), context.key()('colorPalette'), (localization, chartConfiguratorViewModel, themeViewModel, palette) => namedMemo('ChartSettingsChartTypeColorsBar ', props => {
    const theme = useProperty(themeViewModel.activeTheme);
    const handleColorChange = useCallback((lens) => (color) => chartConfiguratorViewModel.setSettingsByPath(lens, color), []);
    const { themes } = useProperty(chartConfiguratorViewModel.state).settings.chartCore;
    const colorsData = useMemo(() => [
        {
            values: [
                {
                    onValueChange: handleColorChange(chartSettingsLens(['chartCore', 'themes', theme, 'barTheme', 'upColor'])),
                    value: themes[theme].barTheme.upColor,
                },
            ],
            id: 'bars_up',
            label: localization.settingsPopup.appearance.colorSettings.bars.up,
        },
        {
            values: [
                {
                    value: themes[theme].barTheme.downColor,
                    onValueChange: handleColorChange(chartSettingsLens(['chartCore', 'themes', theme, 'barTheme', 'downColor'])),
                },
            ],
            id: 'bars_down',
            label: localization.settingsPopup.appearance.colorSettings.bars.down,
        },
        {
            values: [
                {
                    onValueChange: handleColorChange(chartSettingsLens(['chartCore', 'themes', theme, 'barTheme', 'noneColor'])),
                    value: themes[theme].barTheme.noneColor,
                },
            ],
            id: 'bars_none',
            label: localization.settingsPopup.appearance.colorSettings.bars.none,
        },
    ], [handleColorChange, themes]);
    return (React.createElement(ChartSettingsChartTypeColorsList, { palette: palette, colorsData: colorsData, popoverContainer: props.popoverContainer }));
}));
