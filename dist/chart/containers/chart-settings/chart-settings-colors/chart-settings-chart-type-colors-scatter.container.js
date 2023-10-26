import React, { useCallback, useMemo } from 'react';
import { context } from '../../../../context/context2';
import { namedMemo } from '../../../../utils/named-memo';
import { useProperty } from '../../../../utils/use-property';
import { ChartSettingsChartTypeColorsList } from '../../../components/chart-settings/chart-settings-chart-type-colors/chart-settings-chart-type-colors-list';
import { chartSettingsLens } from '../../../view-models/chart-configurator.view-model';
export const ChartSettingsChartTypeColorsScatterContainer = context.combine(context.key()('localization'), context.key()('chartConfiguratorViewModel'), context.key()('themeViewModel'), context.key()('colorPalette'), (localization, chartConfiguratorViewModel, themeViewModel, palette) => namedMemo('ChartSettingsChartTypeColorsScatter ', props => {
    const theme = useProperty(themeViewModel.activeTheme);
    const handleColorChange = useCallback((lens) => (color) => chartConfiguratorViewModel.setSettingsByPath(lens, color), []);
    const { themes } = useProperty(chartConfiguratorViewModel.state).settings.chartCore;
    const colorsData = useMemo(() => [
        {
            values: [
                {
                    onValueChange: handleColorChange(chartSettingsLens(['chartCore', 'themes', theme, 'scatterPlot', 'mainColor'])),
                    value: themes[theme].scatterPlot.mainColor,
                },
            ],
            id: 'scatter_plot',
            label: localization.settingsPopup.appearance.colorSettings.scatterPlot,
        },
    ], [themes, handleColorChange]);
    return (React.createElement(ChartSettingsChartTypeColorsList, { palette: palette, colorsData: colorsData, popoverContainer: props.popoverContainer }));
}));
