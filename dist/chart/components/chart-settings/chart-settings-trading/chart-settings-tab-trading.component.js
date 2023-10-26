import React, { memo, useCallback, useMemo } from 'react';
import { RestoreToDefaultButton } from '../../../../chart-kit/RestoreToDefaultButton/RestoreToDefaultButton.component';
import { chartSettingsLens } from '../../../view-models/chart-configurator.view-model';
import { ChartSettingsCheckbox } from '../chart-settings-checkbox/chart-settings-checkbox.component';
import { ChartSettingsTabForm } from '../chart-settings-general/chart-settings-tab-general.styled';
import { ChartSettingsTabContainer } from '../chart-settings.styled';
import { ChartSettingsTabScalesDivider } from '../chart-settings-chart-type-scales/chart-settings-chart-type-scales-menu.styled';
import { ChartSettingsTradingTypeGroupStyled } from './chart-settings-tab-trading.styled';
export const ChartSettingsTabTradingContent = memo((props) => {
    const { settings, localization, onValueChange, a11yTabProps: { role, id, ariaLabelledBy }, showRestoreToDefault, onRestoreDefaultRequest, tradingAllowed, } = props;
    const showOrdersHandler = useCallback((value = false) => {
        onValueChange(chartSettingsLens(['chartReact', 'trading', 'showOrders']), value);
    }, [onValueChange]);
    const showPositionsHandler = useCallback((value = false) => {
        onValueChange(chartSettingsLens(['chartReact', 'trading', 'showPositions']), value);
    }, [onValueChange]);
    const showExecutedOrdersHandler = useCallback((value = false) => {
        onValueChange(chartSettingsLens(['chartReact', 'trading', 'executedOrders', 'enabled']), value);
    }, [onValueChange]);
    const showOrdersAndPositionsHandler = useCallback((value = false) => {
        onValueChange(chartSettingsLens(['chartReact', 'trading', 'visible']), value);
        showOrdersHandler(value);
        showPositionsHandler(value);
        showExecutedOrdersHandler(value);
    }, [onValueChange, showOrdersHandler, showPositionsHandler, showExecutedOrdersHandler]);
    const executedOrdersDisplayModeButtons = useMemo(() => [
        {
            name: localization.trading.executedOrders.bubbles,
            type: 'bubbles',
            ariaLabel: localization.trading.executedOrders.bubbles,
        },
        {
            name: localization.trading.executedOrders.labels,
            type: 'labels',
            ariaLabel: localization.trading.executedOrders.labels,
        },
    ], [localization]);
    const onSelectExecutedOrderDisplayModeHandler = useCallback((mode) => onValueChange(chartSettingsLens(['chartReact', 'trading', 'executedOrders', 'displayMode']), mode), [onValueChange]);
    return (React.createElement(ChartSettingsTabContainer, null,
        React.createElement(ChartSettingsTabForm, { role: role, id: id, "aria-labelledby": ariaLabelledBy },
            React.createElement(ChartSettingsCheckbox, { disabled: !tradingAllowed, label: localization.settingsPopup.tabs.trading.tradingFromChart, value: settings.visible && tradingAllowed, onValueChange: showOrdersAndPositionsHandler }),
            React.createElement(ChartSettingsCheckbox, { disabled: !(settings.visible && tradingAllowed), label: localization.settingsPopup.tabs.trading.showOrders, value: settings.showOrders && tradingAllowed, onValueChange: showOrdersHandler }),
            React.createElement(ChartSettingsCheckbox, { disabled: !(settings.visible && tradingAllowed), label: localization.settingsPopup.tabs.trading.showPositions, value: settings.showPositions && tradingAllowed, onValueChange: showPositionsHandler })),
        React.createElement(ChartSettingsTabScalesDivider, null),
        React.createElement(ChartSettingsCheckbox, { disabled: !(settings.visible && tradingAllowed), label: localization.settingsPopup.tabs.trading.showExecutedOrders, value: settings.executedOrders.enabled && tradingAllowed, onValueChange: showExecutedOrdersHandler }),
        React.createElement(ChartSettingsTradingTypeGroupStyled, { buttons: executedOrdersDisplayModeButtons, selected: settings.executedOrders.displayMode, onSelect: onSelectExecutedOrderDisplayModeHandler, ariaLabel: localization.trading.executedOrders.buttons.a11y_orderMode, isDisabled: !settings.executedOrders.enabled }),
        showRestoreToDefault && (React.createElement(RestoreToDefaultButton, { onClick: onRestoreDefaultRequest }, localization.settingsPopup.resetToDefaultsBtn))));
});
export default ChartSettingsTabTradingContent;
