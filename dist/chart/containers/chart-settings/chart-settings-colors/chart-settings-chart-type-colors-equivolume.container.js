import React, { useCallback, useMemo } from 'react';
import { context } from '../../../../context/context2';
import { namedMemo } from '../../../../utils/named-memo';
import { useProperty } from '../../../../utils/use-property';
import { chartSettingsLens } from '../../../view-models/chart-configurator.view-model';
import { ChartSettingsChartTypeColorsList } from '../../../components/chart-settings/chart-settings-chart-type-colors/chart-settings-chart-type-colors-list';
export const ChartSettingsChartTypeColorsEquivolumeContainer = context.combine(context.key()('localization'), context.key()('chartConfiguratorViewModel'), context.key()('themeViewModel'), context.key()('colorPalette'), (localization, chartConfiguratorViewModel, themeViewModel, palette) => namedMemo('ChartSettingsChartTypeColorsLine ', props => {
    const theme = useProperty(themeViewModel.activeTheme);
    const handleColorChange = useCallback((lens) => (color) => chartConfiguratorViewModel.setSettingsByPath(lens, color), []);
    const { themes } = useProperty(chartConfiguratorViewModel.state).settings.chartCore;
    const colorsData = useMemo(() => [
        {
            values: [
                {
                    onValueChange: handleColorChange(chartSettingsLens([
                        'chartCore',
                        'themes',
                        theme,
                        'equivolumeTheme',
                        'upColor',
                    ])),
                    value: themes[theme].equivolumeTheme.upColor,
                },
            ],
            id: 'up_tick',
            label: localization.settingsPopup.appearance.colorSettings.equivolume.up,
        },
        {
            values: [
                {
                    value: themes[theme].equivolumeTheme.downColor,
                    onValueChange: handleColorChange(chartSettingsLens([
                        'chartCore',
                        'themes',
                        theme,
                        'equivolumeTheme',
                        'downColor',
                    ])),
                },
            ],
            id: 'down_tick',
            label: localization.settingsPopup.appearance.colorSettings.equivolume.down,
        },
        {
            values: [
                {
                    onValueChange: handleColorChange(chartSettingsLens([
                        'chartCore',
                        'themes',
                        theme,
                        'equivolumeTheme',
                        'noneColor',
                    ])),
                    value: themes[theme].equivolumeTheme.noneColor,
                },
            ],
            id: 'none_tick',
            label: localization.settingsPopup.appearance.colorSettings.equivolume.none,
        },
    ], [themes, handleColorChange]);
    return (React.createElement(ChartSettingsChartTypeColorsList, { palette: palette, colorsData: colorsData, popoverContainer: props.popoverContainer }));
}));
