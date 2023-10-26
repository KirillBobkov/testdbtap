import React, { memo, useCallback, useContext } from 'react';
import { IconsOverridingContext } from '../../../../utils/icons-overriding-context';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { ChartLayersFooterContainer, ChartLayersFooterButtonStyled, ChartLayersFooterIconWrapperStyled, } from './chart-layers-footer.styled';
export const ChartLayersFooter = memo(props => {
    const { onCreateGroup, onDelete, showBorder = true } = props;
    const iconsConfig = useContext(IconsOverridingContext);
    const { localization } = useContext(MultiChartComponentContext);
    const onCreateGroupHandler = useCallback(() => {
        onCreateGroup();
    }, [onCreateGroup]);
    return (React.createElement(ChartLayersFooterContainer, { showBorder: showBorder },
        React.createElement(ChartLayersFooterButtonStyled, { isFlat: true, onClick: onCreateGroupHandler },
            React.createElement(ChartLayersFooterIconWrapperStyled, null, iconsConfig.chartLayers.createGroup),
            localization.chartLayers.createGroupButton),
        React.createElement(ChartLayersFooterButtonStyled, { isFlat: true, onClick: onDelete },
            React.createElement(ChartLayersFooterIconWrapperStyled, null, iconsConfig.chartLayers.deleteItem),
            localization.chartLayers.deleteButton)));
});
