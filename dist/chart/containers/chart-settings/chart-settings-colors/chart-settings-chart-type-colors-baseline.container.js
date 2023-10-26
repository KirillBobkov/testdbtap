import React, { useCallback, useMemo } from 'react';
import { context } from '../../../../context/context2';
import { namedMemo } from '../../../../utils/named-memo';
import { useProperty } from '../../../../utils/use-property';
import { ChartSettingsChartTypeColorsList } from '../../../components/chart-settings/chart-settings-chart-type-colors/chart-settings-chart-type-colors-list';
import { chartSettingsLens } from '../../../view-models/chart-configurator.view-model';
import Color from 'color';
export const ChartSettingsChartTypeColorsBaselineContainer = context.combine(context.key()('localization'), context.key()('chartConfiguratorViewModel'), context.key()('themeViewModel'), context.key()('colorPalette'), (localization, chartConfiguratorViewModel, themeViewModel, palette) => namedMemo('ChartSettingsChartTypeColorsBaseline ', props => {
    const theme = useProperty(themeViewModel.activeTheme);
    const handleColorChange = useCallback((direction) => (color) => {
        chartConfiguratorViewModel.setSettingsByPath(chartSettingsLens([
            'chartCore',
            'themes',
            theme,
            'baseLineTheme',
            `${direction}SectionStrokeColor`,
        ]), color);
        chartConfiguratorViewModel.setSettingsByPath(chartSettingsLens([
            'chartCore',
            'themes',
            theme,
            'baseLineTheme',
            `${direction}SectionFillColor`,
        ]), Color(color).alpha(0.07).toString());
    }, [theme]);
    const { themes } = useProperty(chartConfiguratorViewModel.state).settings.chartCore;
    const colorsData = useMemo(() => [
        {
            values: [
                {
                    onValueChange: handleColorChange('upper'),
                    value: themes[theme].baseLineTheme.upperSectionStrokeColor,
                },
            ],
            id: 'baseline_up',
            label: localization.settingsPopup.appearance.colorSettings.baseline.upper,
        },
        {
            values: [
                {
                    onValueChange: handleColorChange('lower'),
                    value: themes[theme].baseLineTheme.lowerSectionStrokeColor,
                },
            ],
            id: 'baseline_down',
            label: localization.settingsPopup.appearance.colorSettings.baseline.lower,
        },
    ], [themes, handleColorChange]);
    return (React.createElement(ChartSettingsChartTypeColorsList, { palette: palette, colorsData: colorsData, popoverContainer: props.popoverContainer }));
}));
