import React, { useCallback, useMemo } from 'react';
import { context } from '../../../../context/context2';
import { namedMemo } from '../../../../utils/named-memo';
import { useProperty } from '../../../../utils/use-property';
import { ChartSettingsChartTypeColorsList } from '../../../components/chart-settings/chart-settings-chart-type-colors/chart-settings-chart-type-colors-list';
import { chartSettingsLens } from '../../../view-models/chart-configurator.view-model';
export const ChartSettingsChartTypeColorsCandlesContainer = context.combine(context.key()('localization'), context.key()('chartConfiguratorViewModel'), context.key()('themeViewModel'), context.key()('colorPalette'), (localization, chartConfiguratorViewModel, themeViewModel, palette) => namedMemo('ChartSettingsChartTypeColorsCandles ', props => {
    const theme = useProperty(themeViewModel.activeTheme);
    const handleColorChange = useCallback((lens) => (color) => chartConfiguratorViewModel.setSettingsByPath(lens, color), []);
    const { themes } = useProperty(chartConfiguratorViewModel.state).settings.chartCore;
    const colorsData = useMemo(() => [
        {
            values: [
                {
                    value: themes[theme].candleTheme.upColor,
                    onValueChange: handleColorChange(chartSettingsLens(['chartCore', 'themes', theme, 'candleTheme', 'upColor'])),
                },
            ],
            id: 'candles_bull',
            label: localization.settingsPopup.appearance.colorSettings.candles.bull,
        },
        {
            values: [
                {
                    value: themes[theme].candleTheme.upWickColor,
                    onValueChange: handleColorChange(chartSettingsLens([
                        'chartCore',
                        'themes',
                        theme,
                        'candleTheme',
                        'upWickColor',
                    ])),
                },
            ],
            id: 'candles_bull_border',
            label: localization.settingsPopup.appearance.colorSettings.candles.bullBorder,
        },
        {
            values: [
                {
                    onValueChange: handleColorChange(chartSettingsLens(['chartCore', 'themes', theme, 'candleTheme', 'downColor'])),
                    value: themes[theme].candleTheme.downColor,
                },
            ],
            id: 'candles_bear',
            label: localization.settingsPopup.appearance.colorSettings.candles.bear,
        },
        {
            values: [
                {
                    onValueChange: handleColorChange(chartSettingsLens([
                        'chartCore',
                        'themes',
                        theme,
                        'candleTheme',
                        'downWickColor',
                    ])),
                    value: themes[theme].candleTheme.downWickColor,
                },
            ],
            id: 'candles_bear_border',
            label: localization.settingsPopup.appearance.colorSettings.candles.bearBorder,
        },
        {
            values: [
                {
                    onValueChange: handleColorChange(chartSettingsLens(['chartCore', 'themes', theme, 'candleTheme', 'noneColor'])),
                    value: themes[theme].candleTheme.noneColor,
                },
            ],
            id: 'candles_doji',
            label: localization.settingsPopup.appearance.colorSettings.candles.doji,
        },
    ], [themes, handleColorChange]);
    return (React.createElement(ChartSettingsChartTypeColorsList, { palette: palette, colorsData: colorsData, popoverContainer: props.popoverContainer }));
}));
