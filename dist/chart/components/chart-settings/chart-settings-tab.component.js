import React, { memo, useCallback } from 'react';
import { ChartSettingsTabItemContainerStyled, ChartSettingsTabItemIconStyled, ChartSettingsTabItemLabelStyled, ChartSettingsTabButtonStyled, } from './chart-settings.styled';
export const ChartSettingsTab = memo((props) => {
    const { tab, isActive, index, testId, onSelect } = props;
    const tabLabelLowerCased = tab.label.toLowerCase();
    const onSelectHandler = useCallback(() => {
        onSelect(index);
    }, [index, onSelect]);
    return (React.createElement(ChartSettingsTabButtonStyled, { id: tabLabelLowerCased, "aria-controls": `${tabLabelLowerCased}-tab`, "aria-selected": isActive, isActive: isActive, "data-test-id": testId, "data-active": isActive, onClick: onSelectHandler },
        React.createElement(ChartSettingsTabItemContainerStyled, null,
            React.createElement(ChartSettingsTabItemIconStyled, null, tab.icon),
            React.createElement(ChartSettingsTabItemLabelStyled, null, tab.label))));
});
