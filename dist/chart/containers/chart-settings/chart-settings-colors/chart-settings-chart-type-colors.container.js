import { deepEqual } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
import React, { useCallback } from 'react';
import { context } from '../../../../context/context2';
import { namedMemo } from '../../../../utils/named-memo';
import { useDirectProperty, useProperty } from '../../../../utils/use-property';
import { useSink } from '../../../../utils/use-sink';
import { ChartSettingsChartTypeColors } from '../../../components/chart-settings/chart-settings-chart-type-colors/chart-settings-chart-type-colors';
import { ChartSettingsChartTypeColorsAreaContainer } from './chart-settings-chart-type-colors-area.container';
import { ChartSettingsChartTypeColorsBarContainer } from './chart-settings-chart-type-colors-bar.container';
import { ChartSettingsChartTypeColorsBaselineContainer } from './chart-settings-chart-type-colors-baseline.container';
import { ChartSettingsChartTypeColorsCandlesContainer } from './chart-settings-chart-type-colors-candles.container';
import { ChartSettingsChartTypeColorsEquivolumeContainer } from './chart-settings-chart-type-colors-equivolume.container';
import { ChartSettingsChartTypeColorsHistogramContainer } from './chart-settings-chart-type-colors-histogram.container';
import { ChartSettingsChartTypeColorsLineContainer } from './chart-settings-chart-type-colors-line.container';
import { ChartSettingsChartTypeColorsScatterContainer } from './chart-settings-chart-type-colors-scatter.container';
import { getChartTypeColorsDefaultConfig } from './chart-type-colors.config';
const getColorsContainer = (chartType) => {
    switch (chartType) {
        case 'candle':
        case 'hollow':
        case 'heikinAshi':
        case 'trend':
            return ChartSettingsChartTypeColorsCandlesContainer;
        case 'bar':
            return ChartSettingsChartTypeColorsBarContainer;
        case 'equivolume':
            return ChartSettingsChartTypeColorsEquivolumeContainer;
        case 'line':
            return ChartSettingsChartTypeColorsLineContainer;
        case 'area':
            return ChartSettingsChartTypeColorsAreaContainer;
        case 'scatterPlot':
            return ChartSettingsChartTypeColorsScatterContainer;
        case 'histogram':
            return ChartSettingsChartTypeColorsHistogramContainer;
        case 'baseline':
            return ChartSettingsChartTypeColorsBaselineContainer;
        default:
            return ChartSettingsChartTypeColorsCandlesContainer;
    }
};
export const ChartSettingsChartTypeColorsContainer = context.combine(context.key()('chartTypeViewModel'), context.key()('localization'), context.key()('themeViewModel'), context.key()('chartConfiguratorViewModel'), context.key()('chartReactConfig'), context.key()('colorPalette'), context.key()('initialChartTheme'), (chartTypeViewModel, localization, themeViewModel, chartConfiguratorViewModel, chartReactConfig, palette) => namedMemo('ChartSettingsChartTypeColors', props => {
    const activeTheme = useProperty(themeViewModel.activeTheme);
    const onColorChange = chartConfiguratorViewModel.setSettingsByPath;
    const chartCore = useDirectProperty(chartConfiguratorViewModel.state, ['settings', 'chartCore']);
    const ChartSettingsChartTypeColorsContainer = getColorsContainer(chartTypeViewModel.type.getValue());
    const defaultSettingsConfig = chartConfiguratorViewModel.defaultConfig;
    const selectedChartTypeColorsDefaultConfig = getChartTypeColorsDefaultConfig(chartTypeViewModel.type.getValue(), props.defaultConfig, defaultSettingsConfig);
    const showRestoreToDefault = !deepEqual(selectedChartTypeColorsDefaultConfig.chartCore.themes[activeTheme], chartCore.themes[activeTheme]);
    const ColorSettingsComponent = useSink(() => ChartSettingsChartTypeColorsContainer({
        localization,
        colorPalette: palette,
        chartConfiguratorViewModel,
        themeViewModel,
    }), []);
    const onRestoreDefaultRequest = useCallback(() => {
        const defaultTypeThemeConfig = selectedChartTypeColorsDefaultConfig.chartCore.themes[activeTheme];
        themeViewModel.onRestoreDefaultTheme(defaultTypeThemeConfig);
    }, [activeTheme]);
    return (React.createElement(ChartSettingsChartTypeColors, { changeTheme: themeViewModel.changeTheme, activeTheme: activeTheme, localization: localization, onColorChange: onColorChange, settings: chartCore, palette: palette, ColorSettingsComponent: ColorSettingsComponent, popoverContainer: props.popoverRef, showRestoreToDefault: showRestoreToDefault, onRestoreDefaultRequest: onRestoreDefaultRequest, showThemeSwitcher: chartReactConfig.themeControls.enabled }));
}));
export default ChartSettingsChartTypeColorsContainer;
