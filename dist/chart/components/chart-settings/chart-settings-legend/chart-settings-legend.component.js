import React, { memo, useCallback, useContext, useMemo } from 'react';
import { RestoreToDefaultButton } from '../../../../chart-kit/RestoreToDefaultButton/RestoreToDefaultButton.component';
import { chartSettingsLens } from '../../../view-models/chart-configurator.view-model';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { ChartSettingsCheckbox } from '../chart-settings-checkbox/chart-settings-checkbox.component';
import { ChartSettingsTabForm } from '../chart-settings-general/chart-settings-tab-general.styled';
import { ChartSettingsTabContainer } from '../chart-settings.styled';
import { ChartSettingsLegendButtonsStyled } from './chart-settings-legend.styled';
export const ChartSettingsTabLegendContent = memo(props => {
    const { settings, onSettingsChange, onRestoreDefaultRequest, showRestoreToDefault, chartCoreVolumesVisible } = props;
    const { localization } = useContext(MultiChartComponentContext);
    return (React.createElement(ChartSettingsTabContainer, null,
        React.createElement(LegendsSettingsContent, { a11yTabProps: props.a11yTabProps, onSettingsChange: onSettingsChange, settings: settings, chartCoreVolumesVisible: chartCoreVolumesVisible }),
        showRestoreToDefault && (React.createElement(RestoreToDefaultButton, { onClick: onRestoreDefaultRequest }, localization.settingsPopup.resetToDefaultsBtn))));
});
export const LegendsSettingsContent = memo(props => {
    const { onSettingsChange, settings, a11yTabProps, chartCoreVolumesVisible } = props;
    const { localization } = useContext(MultiChartComponentContext);
    const legendTypeButtons = useMemo(() => [
        {
            name: localization.settingsPopup.tabs.legend.pinned,
            type: 'pinned',
            ariaLabel: localization.settingsPopup.tabs.legend.pinned,
        },
        {
            name: localization.settingsPopup.tabs.legend.floating,
            type: 'floating',
            ariaLabel: localization.settingsPopup.tabs.legend.floating,
        },
    ], [localization]);
    const showInstrumentNameHandler = useCallback((value = false) => onSettingsChange(chartSettingsLens(['chartReact', 'legend', 'showInstrument']), value), [onSettingsChange]);
    const showPeriodHandler = useCallback((value = false) => onSettingsChange(chartSettingsLens(['chartReact', 'legend', 'showPeriod']), value), [onSettingsChange]);
    const showOHLCHandler = useCallback((value = false) => onSettingsChange(chartSettingsLens(['chartReact', 'legend', 'showOHLC']), value), [onSettingsChange]);
    const showVolumeHandler = useCallback((value = false) => onSettingsChange(chartSettingsLens(['chartReact', 'legend', 'showVolume']), value), [onSettingsChange]);
    const setLegendModeHandler = useCallback((mode = 'pinned') => onSettingsChange(chartSettingsLens(['chartReact', 'legend', 'mode']), mode), [onSettingsChange]);
    return (React.createElement(ChartSettingsTabForm, { role: a11yTabProps?.role, id: a11yTabProps?.id, "aria-labelledby": a11yTabProps?.ariaLabelledBy },
        React.createElement(ChartSettingsCheckbox, { label: localization.settingsPopup.tabs.legend.instrumentName, value: settings.showInstrument, onValueChange: showInstrumentNameHandler }),
        React.createElement(ChartSettingsCheckbox, { label: localization.settingsPopup.tabs.legend.ohlc, value: settings.showOHLC, onValueChange: showOHLCHandler }),
        React.createElement(ChartSettingsCheckbox, { disabled: !chartCoreVolumesVisible, label: localization.settingsPopup.tabs.legend.volume, value: chartCoreVolumesVisible && settings.showVolume, onValueChange: showVolumeHandler }),
        React.createElement(ChartSettingsCheckbox, { label: localization.settingsPopup.tabs.legend.period, value: settings.showPeriod, onValueChange: showPeriodHandler }),
        false && (React.createElement(ChartSettingsLegendButtonsStyled, { buttons: legendTypeButtons, selected: settings.mode, onSelect: setLegendModeHandler, ariaLabel: localization.settingsPopup.tabs.legend.title }))));
});
export default ChartSettingsTabLegendContent;
