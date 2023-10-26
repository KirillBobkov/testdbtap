import React, { memo, useContext } from 'react';
import { Checkbox } from '../../../../chart-kit/Checkbox/Checkbox.component';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { ChartSettingsField } from '../chart-settings-field.component';
import { ChartSettingsTabGeneralItemStyled } from '../chart-settings-general/chart-settings-tab-general.styled';
import { TEST_IDS } from '../../../../config/e2e/test-ids';
export const ChartSettingsCheckbox = memo(props => {
    const { label, value, onValueChange, disabled = false, fieldTestId } = props;
    const { keyboardModeEnabled } = useContext(MultiChartComponentContext);
    return (React.createElement(ChartSettingsTabGeneralItemStyled, { keyboardModeEnabled: keyboardModeEnabled },
        React.createElement(ChartSettingsField, { label: label, isDisabled: disabled, testId: fieldTestId },
            React.createElement(Checkbox, { isDisabled: disabled, value: value, onValueChange: onValueChange, "data-test-id": TEST_IDS.chart_settings_checkbox }))));
});
