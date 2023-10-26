import React, { memo, useCallback } from 'react';
import { RightClickPopoverMenuItemLabelStyled, RightClickPopoverMenuItemStyled, RightClickPopoverMenuStyled, } from '../../right-click-menu/right-click-menu.styled';
import { ChartSettingsTabDivider } from '../../chart-settings/chart-settings-general/chart-settings-tab-general.styled';
export const StudiesMenuGroup = memo(props => {
    const { items, showDivider, groupIdx, onItemSelect } = props;
    const onItemSelectHandler = useCallback((value) => {
        onItemSelect(value, groupIdx);
    }, [groupIdx, onItemSelect]);
    return (React.createElement(React.Fragment, null,
        React.createElement(RightClickPopoverMenuStyled, { onItemSelect: onItemSelectHandler }, items.map(item => (React.createElement(RightClickPopoverMenuItemStyled, { key: item.key, value: item.key },
            React.createElement(RightClickPopoverMenuItemLabelStyled, null, item.label))))),
        React.createElement(ChartSettingsTabDivider, { visible: showDivider })));
});
