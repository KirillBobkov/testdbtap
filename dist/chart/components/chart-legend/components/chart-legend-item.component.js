import React from 'react';
import { ChartLegendItemContainerStyled, ChartLegendItemNameStyled, ChartLegendItemMainValueStyled, } from './chart-legend-item.styled';
export const ChartLegendItem = props => {
    const { name, ChartLegendItemRef, valueColor } = props;
    return (React.createElement(ChartLegendItemContainerStyled, null,
        React.createElement(ChartLegendItemNameStyled, null, name),
        React.createElement(ChartLegendItemMainValueStyled, { ref: ChartLegendItemRef, color: valueColor })));
};
