import React from 'react';
import { IconWrapper } from '../../../../chart-kit/IconWrapper/IconWrapper.component';
export const getIconByDrawingType = (type, iconsConfig) => {
    switch (type) {
        case 'line':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.trendLine);
        case 'path':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.path);
        case 'icon':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.icons);
        case 'horizontal_line':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.hline);
        case 'extended_line':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.extendedLine);
        case 'horizontal_ray':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.horizontalRay);
        case 'vertical_line':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.verticalLine);
        case 'brush':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.brush);
        case 'highlighter':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.highlighter);
        case 'ellipse':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.ellipse);
        case 'info_line':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.infoLine);
        case 'curve':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.curve);
        case 'arc':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.arc);
        case 'ray':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.ray);
        case 'rectangle':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.rectangle);
        case 'date_price_range':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.datePriceRange);
        case 'date_range':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.dateRange);
        case 'price_range':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.priceRange);
        case 'trend_channel':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.trendChannel);
        case 'vertical_arrow_up':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.arrowUp);
        case 'vertical_arrow_down':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.arrowDown);
        case 'arrow':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.drawingsArrow);
        case 'pitchfork':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.pitchfork);
        case 'fibonacci_retracements':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.fibRetracements);
        case 'fibonacci_ark':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.fibArc);
        case 'fibonacci_circles':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.fibCircles);
        case 'fibonacci_rays':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.fibRays);
        case 'fibonacci_channel':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.fibChannel);
        case 'callout':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.callout);
        case 'price_label':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.priceLabel);
        case 'elliott_wave':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.elliottImpulseWave);
        case 'elliott_correction_wave':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.elliottCorrectionWave);
        case 'fibonacci_projection':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.fibProjection);
        case 'fibonacci_time_zones':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.fibTimezone);
        case 'gann_box':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.gannBox);
        case 'gann_square':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.gannSquare);
        case 'gann_fan':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.gannFan);
        case 'regression_trend':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.regressionTrend);
        case 'fibonacci_spiral':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.fibSpiral);
        case 'cycle_brackets':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.cycleBrackets);
        case 'fibonacci_time_extension':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.fibTimeExtension);
        case 'fibonacci_time_ratios':
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.fibTimeRatios);
        case 'text':
        default:
            return React.createElement(IconWrapper, null, iconsConfig.drawings.drawingsTypes.text);
    }
};
