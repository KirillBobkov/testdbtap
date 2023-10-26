import React from 'react';
import { ChartLegendGroupTitleStyled, ChartLegendGroupWrapperStyled } from './chart-legend-series-group.styled';
export const ChartLegendSeriesGroup = ({ title, children }) => {
    if (!React.Children.count(children)) {
        return null;
    }
    return (React.createElement(ChartLegendGroupWrapperStyled, null,
        React.createElement(ChartLegendGroupTitleStyled, null, title),
        children));
};
