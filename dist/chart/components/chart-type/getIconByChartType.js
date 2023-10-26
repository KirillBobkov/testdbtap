import * as React from 'react';
import { IconWrapper } from '../../../chart-kit/IconWrapper/IconWrapper.component';
export const getIconByChartType = (type, iconsConfig) => {
    switch (type) {
        case 'baseline':
            return React.createElement(IconWrapper, null, iconsConfig.chartTypes.baseline);
        case 'area':
            return React.createElement(IconWrapper, null, iconsConfig.chartTypes.area);
        case 'bar':
            return React.createElement(IconWrapper, null, iconsConfig.chartTypes.bar);
        case 'hollow':
            return React.createElement(IconWrapper, null, iconsConfig.chartTypes.hollow);
        case 'candle':
            return React.createElement(IconWrapper, null, iconsConfig.chartTypes.candle);
        case 'line':
            return React.createElement(IconWrapper, null, iconsConfig.chartTypes.line);
        case 'heikinAshi':
            return React.createElement(IconWrapper, null, iconsConfig.chartTypes.heikinashi);
        case 'histogram':
            return React.createElement(IconWrapper, null, iconsConfig.chartTypes.histogram);
        case 'scatterPlot':
            return React.createElement(IconWrapper, null, iconsConfig.chartTypes.scatterplot);
        case 'trend':
            return React.createElement(IconWrapper, null, iconsConfig.chartTypes.trend);
        case 'equivolume':
            return React.createElement(IconWrapper, null, iconsConfig.chartTypes.equivolume);
    }
};
