import React, { memo, useContext } from 'react';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { ChartLayersHeaderContainer, ChartLayersHeaderLabel, CloseButtonStyled } from './chart-layers-header.styled';
import { IconWrapper } from '../../../../chart-kit/IconWrapper/IconWrapper.component';
import { IconsOverridingContext } from '../../../../utils/icons-overriding-context';
export const ChartLayersHeader = memo(props => {
    const { onClose, className } = props;
    const iconsConfig = useContext(IconsOverridingContext);
    const { localization } = useContext(MultiChartComponentContext);
    return (React.createElement(ChartLayersHeaderContainer, { className: className },
        React.createElement(ChartLayersHeaderLabel, null, localization.chartLayers.headerTitle),
        React.createElement(CloseButtonStyled, { isFlat: true, onClick: onClose, onTouchStart: onClose },
            React.createElement(IconWrapper, null, iconsConfig.chartLayers.close))));
});
