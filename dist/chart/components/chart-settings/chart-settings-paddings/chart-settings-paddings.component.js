import React, { memo, useCallback, useContext, useState } from 'react';
import { SimpleNumericStepper } from '../../../../chart-kit/SimpleNumericStepper/SimpleNumericStepper';
import { chartSettingsLens } from '../../../view-models/chart-configurator.view-model';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { ChartSettingsTabForm } from '../chart-settings-general/chart-settings-tab-general.styled';
import { ChartSettingsPaddingsControlStyled } from './chart-settings-paddings.styled';
import { RestoreToDefaultButton } from '../../../../chart-kit/RestoreToDefaultButton/RestoreToDefaultButton.component';
import { ChartSettingsTabContainer } from '../chart-settings.styled';
const TOP_BOTTOM_PADDING_LIMIT_PERCENT = 30;
const RIGHT_PADDING_LIMIT_BARS = 999;
export const ChartSettingsPaddingsContent = memo(props => {
    const { localization } = useContext(MultiChartComponentContext);
    const { value, onValueChange, a11yTabProps: { role, id, ariaLabelledBy }, showRestoreToDefault, onRestoreDefaultRequest, } = props;
    const offsets = value.chartCore.components.offsets;
    const { visible, top, bottom, right } = offsets;
    const [isValueChanging, setIsValueChanging] = useState(false);
    const topChangeHandler = useCallback((value) => {
        onValueChange(chartSettingsLens(['chartCore', 'components', 'offsets', 'top']), value);
    }, [onValueChange]);
    const bottomChangeHandler = useCallback((value) => {
        onValueChange(chartSettingsLens(['chartCore', 'components', 'offsets', 'bottom']), value);
    }, [onValueChange]);
    const rightChangeHandler = useCallback((value) => {
        onValueChange(chartSettingsLens(['chartCore', 'components', 'offsets', 'right']), value);
    }, [onValueChange]);
    return (React.createElement(ChartSettingsTabContainer, null,
        React.createElement(ChartSettingsTabForm, { role: role, id: id, "aria-labelledby": ariaLabelledBy },
            React.createElement(ChartSettingsPaddingsControlStyled, null,
                React.createElement(SimpleNumericStepper, { value: top ?? 0, onValueChange: topChangeHandler, units: '%', min: 0, max: TOP_BOTTOM_PADDING_LIMIT_PERCENT, orientation: 'h', sensitivity: 2, label: localization.settingsPopup.tabs.paddings.top, isDisabled: !visible, isChangingCallback: setIsValueChanging })),
            React.createElement(ChartSettingsPaddingsControlStyled, null,
                React.createElement(SimpleNumericStepper, { value: right ?? 0, onValueChange: rightChangeHandler, units: 'bars', min: 0, max: RIGHT_PADDING_LIMIT_BARS, orientation: 'h', sensitivity: 2, label: localization.settingsPopup.tabs.paddings.right, isDisabled: !visible, isChangingCallback: setIsValueChanging })),
            React.createElement(ChartSettingsPaddingsControlStyled, null,
                React.createElement(SimpleNumericStepper, { value: bottom ?? 0, onValueChange: bottomChangeHandler, units: '%', min: 0, max: TOP_BOTTOM_PADDING_LIMIT_PERCENT, orientation: 'h', sensitivity: 2, label: localization.settingsPopup.tabs.paddings.bottom, isDisabled: !visible, isChangingCallback: setIsValueChanging }))),
        showRestoreToDefault && !isValueChanging && (React.createElement(RestoreToDefaultButton, { onClick: onRestoreDefaultRequest }, localization.settingsPopup.resetToDefaultsBtn))));
});
export default ChartSettingsPaddingsContent;
