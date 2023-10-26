import React, { useCallback, useMemo } from 'react';
import { context } from '../../../../context/context2';
import { namedMemo } from '../../../../utils/named-memo';
import { useProperty } from '../../../../utils/use-property';
import { ChartSettingsChartTypeColorsList } from '../../../components/chart-settings/chart-settings-chart-type-colors/chart-settings-chart-type-colors-list';
import { chartSettingsLens } from '../../../view-models/chart-configurator.view-model';
export const ChartSettingsChartTypeColorsLineContainer = context.combine(context.key()('localization'), context.key()('chartConfiguratorViewModel'), context.key()('themeViewModel'), context.key()('colorPalette'), (localization, chartConfiguratorViewModel, themeViewModel, palette) => namedMemo('ChartSettingsChartTypeColorsLine ', props => {
    const theme = useProperty(themeViewModel.activeTheme);
    const handleColorChange = useCallback((lens) => (color) => chartConfiguratorViewModel.setSettingsByPath(lens, color), []);
    const { themes } = useProperty(chartConfiguratorViewModel.state).settings.chartCore;
    const colorsData = useMemo(() => [
        {
            values: [
                {
                    onValueChange: handleColorChange(chartSettingsLens(['chartCore', 'themes', theme, 'lineTheme', 'upColor'])),
                    value: themes[theme].lineTheme.upColor,
                },
            ],
            id: 'lines_up',
            label: localization.settingsPopup.appearance.colorSettings.lines.up,
        },
        {
            values: [
                {
                    onValueChange: handleColorChange(chartSettingsLens(['chartCore', 'themes', theme, 'lineTheme', 'downColor'])),
                    value: themes[theme].lineTheme.downColor,
                },
            ],
            id: 'lines_down',
            label: localization.settingsPopup.appearance.colorSettings.lines.down,
        },
        {
            values: [
                {
                    onValueChange: handleColorChange(chartSettingsLens(['chartCore', 'themes', theme, 'lineTheme', 'noneColor'])),
                    value: themes[theme].lineTheme.noneColor,
                },
            ],
            id: 'lines_none',
            label: localization.settingsPopup.appearance.colorSettings.lines.none,
        },
    ], [themes, handleColorChange]);
    return (React.createElement(ChartSettingsChartTypeColorsList, { palette: palette, colorsData: colorsData, popoverContainer: props.popoverContainer }));
}));
