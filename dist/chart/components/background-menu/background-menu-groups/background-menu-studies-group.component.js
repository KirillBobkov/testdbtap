import React, { memo, useContext } from 'react';
import { RightClickPopoverMenuItemLabelStyled, RightClickPopoverMenuItemStyled, RightClickPopoverMenuStyled, } from '../../right-click-menu/right-click-menu.styled';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { ChartSettingsTabDivider } from '../../chart-settings/chart-settings-general/chart-settings-tab-general.styled';
export const BackgroundMenuStudiesGroup = memo(props => {
    const { onClearIndicators } = props;
    const { localization } = useContext(MultiChartComponentContext);
    return (React.createElement(React.Fragment, null,
        React.createElement(RightClickPopoverMenuStyled, { onItemSelect: onClearIndicators },
            React.createElement(RightClickPopoverMenuItemStyled, { value: 'Clear indicators' },
                React.createElement(RightClickPopoverMenuItemLabelStyled, null, localization.studies.rightClickMenu.clearIndicators))),
        React.createElement(ChartSettingsTabDivider, { visible: true })));
});
