import React, { memo } from 'react';
import { ChartLegendStackedItemWrapperStyled, ChartLegendStudiesTitleStyled, ChartLegendStudiesValueStyled, } from './chart-legend-studies.styled';
export const ChartLegendStackedStudyItem = memo(({ line }) => (React.createElement(ChartLegendStackedItemWrapperStyled, null,
    React.createElement(ChartLegendStudiesTitleStyled, null, line.title),
    React.createElement(ChartLegendStudiesValueStyled, { ref: line.ref }))));
