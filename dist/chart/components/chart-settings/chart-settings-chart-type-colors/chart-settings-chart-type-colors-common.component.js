import React, { memo, useCallback, useMemo } from 'react';
import { chartSettingsLens } from '../../../view-models/chart-configurator.view-model';
import { ChartSettingsChartTypeColorsList, } from './chart-settings-chart-type-colors-list';
import { getLabelTextColorByBackgroundColor } from '@devexperts/dxcharts-lite/dist/chart/utils/canvas/canvas-text-functions.utils';
export const ChartSettingsChartTypeColorsCommon = memo(props => {
    const { settings, localization, onColorChange, activeTheme } = props;
    const handleColorChange = useCallback((lens) => (color) => onColorChange(lens, color), [onColorChange]);
    const commonColorsData = useMemo(() => [
        {
            values: [
                {
                    onValueChange: (color) => {
                        handleColorChange(chartSettingsLens([
                            'chartCore',
                            'themes',
                            activeTheme,
                            'waterMarkTheme',
                            'firstRowColor',
                        ]))(color);
                        handleColorChange(chartSettingsLens([
                            'chartCore',
                            'themes',
                            activeTheme,
                            'waterMarkTheme',
                            'secondRowColor',
                        ]))(color);
                        handleColorChange(chartSettingsLens([
                            'chartCore',
                            'themes',
                            activeTheme,
                            'waterMarkTheme',
                            'thirdRowColor',
                        ]))(color);
                    },
                    id: 'common_watermark',
                    value: settings.themes[activeTheme].waterMarkTheme.firstRowColor,
                    label: localization.settingsPopup.appearance.colorSettings.common.waterMark,
                },
            ],
            id: 'common_watermark',
            label: localization.settingsPopup.appearance.colorSettings.common.waterMark,
        },
        {
            values: [
                {
                    onValueChange: handleColorChange(chartSettingsLens([
                        'chartCore',
                        'themes',
                        activeTheme,
                        'chartAreaTheme',
                        'gridColor',
                    ])),
                    value: settings.themes[activeTheme].chartAreaTheme.gridColor,
                },
            ],
            id: 'common_grid',
            label: localization.settingsPopup.appearance.colorSettings.common.grid,
        },
        {
            values: [
                {
                    onValueChange: (value) => {
                        handleColorChange(chartSettingsLens([
                            'chartCore',
                            'themes',
                            activeTheme,
                            'xAxis',
                            'labelTextColor',
                        ]))(value);
                        handleColorChange(chartSettingsLens([
                            'chartCore',
                            'themes',
                            activeTheme,
                            'yAxis',
                            'labelTextColor',
                        ]))(value);
                    },
                    // settings.colors.yAxis.labelTextColor should be the same
                    value: settings.themes[activeTheme].xAxis.labelTextColor,
                },
            ],
            id: 'common_axis_labels',
            label: localization.settingsPopup.appearance.colorSettings.common.axisLabels,
        },
        {
            values: [
                {
                    onValueChange: (color) => {
                        handleColorChange(chartSettingsLens([
                            'chartCore',
                            'themes',
                            activeTheme,
                            'crossTool',
                            'lineColor',
                        ]))(color);
                        handleColorChange(chartSettingsLens([
                            'chartCore',
                            'themes',
                            activeTheme,
                            'crossTool',
                            'labelBoxColor',
                        ]))(color);
                        handleColorChange(chartSettingsLens([
                            'chartCore',
                            'themes',
                            activeTheme,
                            'crossTool',
                            'labelTextColor',
                        ]))(getLabelTextColorByBackgroundColor(color, settings.themes[activeTheme].crossTool.labelTextColor, 'rgba(0, 0, 0, 1)'));
                    },
                    value: settings.themes[activeTheme].crossTool.lineColor,
                },
            ],
            id: 'cross_tool_crosshair',
            label: localization.settingsPopup.appearance.colorSettings.crossTool.crosshair,
        },
        {
            values: [
                {
                    value: settings.themes[activeTheme].newsTheme.backgroundColor,
                    onValueChange: handleColorChange(chartSettingsLens([
                        'chartCore',
                        'themes',
                        activeTheme,
                        'newsTheme',
                        'backgroundColor',
                    ])),
                },
            ],
            id: 'news',
            label: localization.settingsPopup.appearance.colorSettings.news.background,
        },
        {
            values: [
                {
                    onValueChange: handleColorChange(chartSettingsLens([
                        'chartCore',
                        'themes',
                        activeTheme,
                        'chartAreaTheme',
                        'backgroundGradientTopColor',
                    ])),
                    value: settings.themes[activeTheme].chartAreaTheme.backgroundGradientTopColor,
                },
                {
                    onValueChange: handleColorChange(chartSettingsLens([
                        'chartCore',
                        'themes',
                        activeTheme,
                        'chartAreaTheme',
                        'backgroundGradientBottomColor',
                    ])),
                    value: settings.themes[activeTheme].chartAreaTheme.backgroundGradientBottomColor,
                },
            ],
            id: 'gradient_bottom_background',
            label: localization.settingsPopup.appearance.colorSettings.common.background,
        },
    ], [localization, settings, handleColorChange, activeTheme]);
    return React.createElement(ChartSettingsChartTypeColorsList, { ...props, colorsData: commonColorsData });
});
