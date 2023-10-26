import React, { memo, useCallback, useContext, useMemo } from 'react';
import { RestoreToDefaultButton } from '../../../../chart-kit/RestoreToDefaultButton/RestoreToDefaultButton.component';
import { TEST_IDS } from '../../../../config/e2e/test-ids';
import { chartSettingsLens } from '../../../view-models/chart-configurator.view-model';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { ChartSettingsCheckbox } from '../chart-settings-checkbox/chart-settings-checkbox.component';
import { PriceTypeSelectbox } from '../chart-settings-general/chart-settings-price-type-selectbox.component';
import { ChartSettingsTabDivider, ChartSettingsTabForm, ChartSettingsTabGeneralItemLineStyled, ChartSettingsTabPriceTypeContainerStyled } from '../chart-settings-general/chart-settings-tab-general.styled';
import { ChartSettingsToggleSubsectionAnimation } from '../chart-settings-toggle-subsection.component';
import { ChartSettingsTabContainer } from '../chart-settings.styled';
import { ChartSettingsVolumeButtonsStyled } from './chart-settings-market.styled';
const volumeTypes = ['overlaying', 'separate'];
export const ChartSettingsTabMarketContent = memo(props => {
    const { keyboardModeEnabled } = useContext(MultiChartComponentContext);
    const { a11yTabProps: { role, id, ariaLabelledBy }, chartReactConfig, onValueChange, onRestoreDefaultRequest, value, localization, volumesDisabled, sessionBreaksDisabled, showRestoreToDefault, } = props;
    const { chartCore, chartReact } = value;
    const volumeTypeButtons = useMemo(() => [
        {
            name: localization.settingsPopup.tabs.general.overlaying,
            type: 'overlaying',
            ariaLabel: localization.settingsPopup.tabs.general.overlaying,
        },
        {
            name: localization.settingsPopup.tabs.general.separate,
            type: 'separate',
            ariaLabel: localization.settingsPopup.tabs.general.separate,
        },
    ], [localization.settingsPopup.tabs.general.overlaying, localization.settingsPopup.tabs.general.separate]);
    const showVolumeHandler = useCallback((value = false) => {
        onValueChange(chartSettingsLens(['chartCore', 'components', 'volumes', 'visible']), value);
    }, [onValueChange]);
    const alignCandlesToSessionsHandler = useCallback((value = false) => {
        onValueChange(chartSettingsLens(['chartReact', 'candlesData', 'candleAlignment']), value ? 'session_start' : 'midnight');
    }, [onValueChange]);
    const changePriceTypeHandler = useCallback((value) => {
        onValueChange(chartSettingsLens(['chartReact', 'candlesData', 'price']), value);
    }, [onValueChange]);
    const volumesTypeHandler = useCallback((value) => {
        onValueChange(chartSettingsLens(['chartCore', 'components', 'volumes', 'showSeparately']), value);
    }, [onValueChange]);
    const setVolumeMode = useCallback((value) => {
        switch (value) {
            case 'overlaying':
                volumesTypeHandler(false);
                break;
            case 'separate':
                volumesTypeHandler(true);
                break;
        }
    }, [volumesTypeHandler]);
    const showSessionBreaksHandler = useCallback((visible = false) => {
        onValueChange(chartSettingsLens(['chartReact', 'sessionBreaks', 'visible']), visible);
    }, [onValueChange]);
    const showExtendedHoursHandler = useCallback((visible = false) => {
        onValueChange(chartSettingsLens(['chartReact', 'extendedHours', 'visible']), visible);
    }, [onValueChange]);
    const selectedVolumeMode = useMemo(() => (value.chartCore.components.volumes.showSeparately ? 'separate' : 'overlaying'), [value.chartCore.components.volumes.showSeparately]);
    const isAnyPriceTypeEnabled = useMemo(() => chartReactConfig.priceTypes.length > 1, [chartReactConfig.priceTypes]);
    return (React.createElement(ChartSettingsTabContainer, { "data-test-id": TEST_IDS.chart_settings_tab_market_content },
        React.createElement(ChartSettingsTabForm, { role: role, id: id, "aria-labelledby": ariaLabelledBy },
            chartReactConfig.chartDataOptionsSettings.sessionBreaks.enabled && (React.createElement(ChartSettingsCheckbox, { disabled: sessionBreaksDisabled, label: localization.settingsPopup.tabs.general.sessionBreaks, value: chartReact.sessionBreaks.visible && !sessionBreaksDisabled, onValueChange: showSessionBreaksHandler, fieldTestId: TEST_IDS.settings_popup_session_breaks_field })),
            chartReactConfig.chartDataOptionsSettings.extendedHours.enabled && (React.createElement(ChartSettingsCheckbox, { disabled: sessionBreaksDisabled, label: localization.settingsPopup.tabs.general.extendedHours, value: chartReact.extendedHours.visible && !sessionBreaksDisabled, onValueChange: showExtendedHoursHandler, fieldTestId: TEST_IDS.settings_popup_extended_hours_field })),
            chartReactConfig.chartDataOptionsSettings.candlesAlignment.enabled && (React.createElement(ChartSettingsCheckbox, { disabled: chartReact.extendedHours.visible, label: localization.settingsPopup.appearance.generalSettings.alignCandlesToSessions, value: chartReact.candlesData.candleAlignment === 'session_start', onValueChange: alignCandlesToSessionsHandler })),
            chartReactConfig.chartDataOptionsSettings.priceType.enabled && isAnyPriceTypeEnabled && (React.createElement(ChartSettingsTabPriceTypeContainerStyled, null,
                localization.settingsPopup.priceTypes.label,
                React.createElement(PriceTypeSelectbox, { keyboardModeEnabled: keyboardModeEnabled, priceTypes: chartReactConfig.priceTypes, value: chartReact.candlesData.price, onValueChange: changePriceTypeHandler }))),
            React.createElement(ChartSettingsTabDivider, { tabIndex: -1, visible: chartCore.components.volumes.visible }),
            React.createElement(ChartSettingsCheckbox, { disabled: volumesDisabled, label: localization.settingsPopup.tabs.general.volume, value: chartCore.components.volumes.visible, onValueChange: showVolumeHandler }),
            React.createElement(ChartSettingsToggleSubsectionAnimation, { isOpened: chartCore.components.volumes.visible },
                React.createElement(ChartSettingsTabGeneralItemLineStyled, null,
                    React.createElement(ChartSettingsVolumeButtonsStyled, { buttons: volumeTypeButtons, selected: selectedVolumeMode, onSelect: setVolumeMode, isDisabled: !chartCore.components.volumes.visible, ariaLabel: localization.settingsPopup.tabs.general.volume })))),
        showRestoreToDefault && (React.createElement(RestoreToDefaultButton, { onClick: onRestoreDefaultRequest }, localization.settingsPopup.resetToDefaultsBtn))));
});
export default ChartSettingsTabMarketContent;
