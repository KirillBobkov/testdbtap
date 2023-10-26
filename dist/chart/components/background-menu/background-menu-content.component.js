import React, { memo } from 'react';
import { RightClickMenuTradingButtons } from '../right-click-menu/right-click-menu-trading-btns';
import { ChartSettingsTabDivider } from '../chart-settings/chart-settings-general/chart-settings-tab-general.styled';
import { BackgroundMenuSettingsItemsGroup } from './background-menu-groups/background-menu-settings-items-group.component';
import { BackgroundMenuDrawingsGroup } from './background-menu-groups/background-menu-drawings-group.component';
import { BackgroundMenuStudiesGroup } from './background-menu-groups/background-menu-studies-group.component';
import { BackgroundMenuGeneralGroup } from './background-menu-groups/background-menu-general-group.component';
export const BackgroundMenuContent = memo(props => {
    const { onClose, mainSeriesTradingData, settings, onSettingsChange, onCreateOrder, chartReactConfig, sessionBreaksDisabled, activeTheme, onChangeTheme, recentDrawings, onRecentDrawingSelect, onClearIndicators, onOpenSettings, onResetChart, drawingsVisible, onChangeDrawingsVisibility, onClearDrawings, } = props;
    return (React.createElement(React.Fragment, null,
        settings.chartReact.trading.visible && (React.createElement(React.Fragment, null,
            React.createElement(RightClickMenuTradingButtons, { mainSeriesData: mainSeriesTradingData, createOrder: onCreateOrder }),
            React.createElement(ChartSettingsTabDivider, { visible: true }))),
        React.createElement(BackgroundMenuSettingsItemsGroup, { settings: settings, onSettingsChange: onSettingsChange, chartReactConfig: chartReactConfig, sessionBreaksDisabled: sessionBreaksDisabled, onPopoverClose: onClose, activeTheme: activeTheme, onChangeTheme: onChangeTheme }),
        React.createElement(BackgroundMenuDrawingsGroup, { drawingsVisible: drawingsVisible, recentDrawings: recentDrawings, onRecentDrawingSelect: onRecentDrawingSelect, onChangeDrawingsVisibility: onChangeDrawingsVisibility, onClearDrawings: onClearDrawings, onPopoverClose: onClose }),
        React.createElement(BackgroundMenuStudiesGroup, { onClearIndicators: onClearIndicators }),
        React.createElement(BackgroundMenuGeneralGroup, { onOpenSettings: onOpenSettings, onResetChart: onResetChart })));
});
