import React, { memo } from 'react';
import { ChartSettingsChartTypeColorsItem } from './chart-settings-chart-type-colors-item';
export const ChartSettingsChartTypeColorsList = memo(props => {
    const { colorsData, palette, popoverContainer } = props;
    return (React.createElement(React.Fragment, null, colorsData.map((color) => (React.createElement(ChartSettingsChartTypeColorsItem, { key: color.id, id: color.id, values: color.values, label: color.label, palette: palette, popoverContainer: popoverContainer })))));
});
