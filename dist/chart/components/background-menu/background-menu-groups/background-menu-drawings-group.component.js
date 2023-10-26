import React, { memo, useCallback, useContext, useMemo } from 'react';
import { RightClickPopoverMenuItemLabelStyled, RightClickPopoverMenuItemStyled, RightClickPopoverMenuStyled, } from '../../right-click-menu/right-click-menu.styled';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { ChartSettingsTabDivider } from '../../chart-settings/chart-settings-general/chart-settings-tab-general.styled';
import { BackgroundMenuRecentDrawingsItem } from './background-menu-recent-drawings-item.component';
const DrawingsItemsTypes = { hide: 'Hide drawings', clear: 'Clear drawings' };
export const BackgroundMenuDrawingsGroup = memo(props => {
    const { drawingsVisible, recentDrawings, onRecentDrawingSelect, onChangeDrawingsVisibility, onClearDrawings, onPopoverClose, } = props;
    const { localization } = useContext(MultiChartComponentContext);
    const hideDrawingsLabel = useMemo(() => (drawingsVisible ? localization.drawings.hideDrawings : localization.drawings.unhideDrawings), [drawingsVisible]);
    const onDrawingsGroupItemSelect = useCallback((value) => {
        switch (value) {
            case DrawingsItemsTypes.hide:
                onChangeDrawingsVisibility();
                break;
            case DrawingsItemsTypes.clear:
                onClearDrawings();
                break;
        }
    }, [onChangeDrawingsVisibility]);
    return (React.createElement(React.Fragment, null,
        React.createElement(BackgroundMenuRecentDrawingsItem, { recentDrawings: recentDrawings, onRecentDrawingSelect: onRecentDrawingSelect, onPopoverClose: onPopoverClose }),
        React.createElement(RightClickPopoverMenuStyled, { onItemSelect: onDrawingsGroupItemSelect },
            React.createElement(RightClickPopoverMenuItemStyled, { value: 'Hide drawings' },
                React.createElement(RightClickPopoverMenuItemLabelStyled, null, hideDrawingsLabel)),
            React.createElement(RightClickPopoverMenuItemStyled, { value: 'Clear drawings' },
                React.createElement(RightClickPopoverMenuItemLabelStyled, null, localization.drawings.clearDrawings))),
        React.createElement(ChartSettingsTabDivider, { visible: true })));
});
