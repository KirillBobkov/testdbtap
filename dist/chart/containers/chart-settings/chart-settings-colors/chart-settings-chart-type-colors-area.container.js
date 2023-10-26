import Color from 'color';
import React, { useCallback, useMemo } from 'react';
import { context } from '../../../../context/context2';
import { namedMemo } from '../../../../utils/named-memo';
import { useProperty } from '../../../../utils/use-property';
import { ChartSettingsChartTypeColorsList } from '../../../components/chart-settings/chart-settings-chart-type-colors/chart-settings-chart-type-colors-list';
import { chartSettingsLens } from '../../../view-models/chart-configurator.view-model';
export const ChartSettingsChartTypeColorsAreaContainer = context.combine(context.key()('localization'), context.key()('chartConfiguratorViewModel'), context.key()('themeViewModel'), context.key()('colorPalette'), (localization, chartConfiguratorViewModel, themeViewModel, palette) => namedMemo('ChartSettingsChartTypeColorsArea ', props => {
    const theme = useProperty(themeViewModel.activeTheme);
    const { themes } = useProperty(chartConfiguratorViewModel.state).settings.chartCore;
    const handleColorChange = useCallback((color) => {
        chartConfiguratorViewModel.setSettingsByPath(chartSettingsLens(['chartCore', 'themes', theme, 'areaTheme', 'lineColor']), color);
        chartConfiguratorViewModel.setSettingsByPath(chartSettingsLens(['chartCore', 'themes', theme, 'areaTheme', 'startColor']), Color(color).alpha(0.4).toString());
        chartConfiguratorViewModel.setSettingsByPath(chartSettingsLens(['chartCore', 'themes', theme, 'areaTheme', 'stopColor']), Color(color).alpha(0.1).toString());
    }, [theme]);
    const colorsData = useMemo(() => [
        {
            values: [
                {
                    onValueChange: handleColorChange,
                    value: themes[theme].areaTheme.lineColor,
                },
            ],
            id: 'area',
            label: localization.settingsPopup.appearance.colorSettings.area.title,
        },
    ], [themes, handleColorChange]);
    return (React.createElement(ChartSettingsChartTypeColorsList, { palette: palette, colorsData: colorsData, popoverContainer: props.popoverContainer }));
}));
