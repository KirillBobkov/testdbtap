import React, { useCallback, useMemo } from 'react';
import { context } from '../../../../context/context2';
import { namedMemo } from '../../../../utils/named-memo';
import { useProperty } from '../../../../utils/use-property';
import { ChartSettingsChartTypeColorsList } from '../../../components/chart-settings/chart-settings-chart-type-colors/chart-settings-chart-type-colors-list';
import { chartSettingsLens } from '../../../view-models/chart-configurator.view-model';
import Color from 'color';
export const ChartSettingsChartTypeColorsHistogramContainer = context.combine(context.key()('localization'), context.key()('chartConfiguratorViewModel'), context.key()('themeViewModel'), context.key()('colorPalette'), (localization, chartConfiguratorViewModel, themeViewModel, palette) => namedMemo('ChartSettingsChartTypeColorsHistogram ', props => {
    const theme = useProperty(themeViewModel.activeTheme);
    const handleColorChange = useCallback((direction) => (color) => {
        chartConfiguratorViewModel.setSettingsByPath(chartSettingsLens(['chartCore', 'themes', theme, 'histogram', `${direction}Cap`]), color);
        chartConfiguratorViewModel.setSettingsByPath(chartSettingsLens(['chartCore', 'themes', theme, 'histogram', `${direction}Bottom`]), Color(color).alpha(0.4).toString());
        chartConfiguratorViewModel.setSettingsByPath(chartSettingsLens(['chartCore', 'themes', theme, 'histogram', `${direction}Bright`]), Color(color).alpha(0.4).toString());
    }, [theme]);
    const { themes } = useProperty(chartConfiguratorViewModel.state).settings.chartCore;
    const colorsData = useMemo(() => [
        {
            values: [
                {
                    onValueChange: handleColorChange('up'),
                    value: themes[theme].histogram.upCap,
                },
            ],
            id: 'bull',
            label: localization.settingsPopup.appearance.colorSettings.histogram.bull,
        },
        {
            values: [
                {
                    onValueChange: handleColorChange('down'),
                    value: themes[theme].histogram.downCap,
                },
            ],
            id: 'bear',
            label: localization.settingsPopup.appearance.colorSettings.histogram.bear,
        },
        {
            values: [
                {
                    onValueChange: handleColorChange('none'),
                    value: themes[theme].histogram.noneCap,
                },
            ],
            id: 'none',
            label: localization.settingsPopup.appearance.colorSettings.histogram.none,
        },
    ], [themes, handleColorChange]);
    return (React.createElement(ChartSettingsChartTypeColorsList, { palette: palette, colorsData: colorsData, popoverContainer: props.popoverContainer }));
}));
