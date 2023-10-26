import { constVoid } from 'fp-ts/function';
import React, { memo, useCallback, useContext, useMemo } from 'react';
import { Checkbox } from '../../../../chart-kit/Checkbox/Checkbox.component';
import { RestoreToDefaultButton } from '../../../../chart-kit/RestoreToDefaultButton/RestoreToDefaultButton.component';
import { TEST_IDS } from '../../../../config/e2e/test-ids';
import { getAvailableCrosstoolMagnetTargets } from '../../../model/chart.model';
import { chartSettingsLens } from '../../../view-models/chart-configurator.view-model';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { ChartSettingsCheckbox } from '../chart-settings-checkbox/chart-settings-checkbox.component';
import { ChartSettingsField } from '../chart-settings-field.component';
import { ChartSettingsTabContainer } from '../chart-settings.styled';
import { SnapCrosshairSelectbox } from './chart-settings-snap-crosshair-selectbox.component';
import { ChartSettingsTabCrosshairContainerStyled, ChartSettingsTabForm, ChartSettingsTabGeneralItemStyled, } from './chart-settings-tab-general.styled';
export const ChartSettingsTabGeneralContent = memo((props) => {
    const { value, localization, onValueChange, onRestoreDefaultRequest = constVoid, a11yTabProps, showRestoreToDefault = false, chartType, } = props;
    const { chartCore } = value;
    const showCrossToolHandler = useCallback((b) => {
        const value = b ? 'cross-and-labels' : 'none';
        onValueChange(chartSettingsLens(['chartCore', 'components', 'crossTool', 'type']), value);
    }, [onValueChange]);
    const showVerticalGridHandler = useCallback((value = false) => {
        onValueChange(chartSettingsLens(['chartCore', 'components', 'grid', 'vertical']), value);
    }, [onValueChange]);
    const showHorizontalGridHandler = useCallback((value = false) => {
        onValueChange(chartSettingsLens(['chartCore', 'components', 'grid', 'horizontal']), value);
    }, [onValueChange]);
    const showCandleWicksHandler = useCallback((value = false) => {
        onValueChange(chartSettingsLens(['chartCore', 'components', 'chart', 'showWicks']), value);
    }, [onValueChange]);
    const showHighLowHandler = useCallback((value = false) => {
        onValueChange(chartSettingsLens(['chartCore', 'components', 'highLow', 'visible']), value);
    }, [onValueChange]);
    const showWatermarkHandler = useCallback((value = false) => {
        onValueChange(chartSettingsLens(['chartCore', 'components', 'waterMark', 'visible']), value);
    }, [onValueChange]);
    const crossToolMagnetModeHandler = useCallback((value) => {
        onValueChange(chartSettingsLens(['chartCore', 'components', 'crossTool', 'magnetTarget']), value);
        // enable crosstool if selected snap !== "none"
        value !== 'none' && showCrossToolHandler(true);
    }, [onValueChange, showCrossToolHandler]);
    const showClosePriceHandler = useCallback((value) => {
        onValueChange(chartSettingsLens(['chartCore', 'components', 'chart', 'equivolume', 'showClosePrice']), value);
    }, [onValueChange]);
    const { keyboardModeEnabled } = useContext(MultiChartComponentContext);
    const availableCrosstoolMagnetTargets = useMemo(() => getAvailableCrosstoolMagnetTargets(chartType), [chartType]);
    const snapCrosshairTextLabel = useMemo(() => {
        return (localization.settingsPopup.tabs.general.crosshair +
            ', ' +
            `${localization.settingsPopup.tabs.general.snapCrosshairTo.title}`.toLowerCase());
    }, [localization]);
    return (React.createElement(ChartSettingsTabContainer, { "data-test-id": TEST_IDS.chart_settings_tab_general_content },
        React.createElement(ChartSettingsTabForm, { role: a11yTabProps?.role, id: a11yTabProps?.id, "aria-labelledby": a11yTabProps?.ariaLabelledBy },
            React.createElement(ChartSettingsCheckbox, { label: localization.settingsPopup.tabs.general.highLow, value: chartCore.components.highLow.visible, onValueChange: showHighLowHandler }),
            React.createElement(ChartSettingsCheckbox, { label: localization.settingsPopup.tabs.general.horizontalGrid, value: chartCore.components.grid.horizontal, onValueChange: showHorizontalGridHandler }),
            React.createElement(ChartSettingsCheckbox, { label: localization.settingsPopup.tabs.general.verticalGrid, value: chartCore.components.grid.vertical, onValueChange: showVerticalGridHandler }),
            chartType !== 'equivolume' && (React.createElement(ChartSettingsCheckbox, { label: localization.settingsPopup.tabs.general.candleWick, value: chartCore.components.chart.showWicks, onValueChange: showCandleWicksHandler })),
            chartType === 'equivolume' && (React.createElement(ChartSettingsCheckbox, { label: localization.settingsPopup.tabs.general.showClosePrice, value: chartCore.components.chart.equivolume.showClosePrice, onValueChange: showClosePriceHandler })),
            React.createElement(ChartSettingsCheckbox, { label: localization.settingsPopup.tabs.general.watermark, value: chartCore.components.waterMark.visible, onValueChange: showWatermarkHandler }),
            React.createElement(ChartSettingsTabGeneralItemStyled, { keyboardModeEnabled: keyboardModeEnabled },
                React.createElement(ChartSettingsTabCrosshairContainerStyled, null,
                    React.createElement(ChartSettingsField, { label: snapCrosshairTextLabel },
                        React.createElement(Checkbox, { value: chartCore.components.crossTool.type === 'cross-and-labels', onValueChange: showCrossToolHandler, testId: TEST_IDS.chart_settings_checkbox })),
                    React.createElement(SnapCrosshairSelectbox, { onValueChange: crossToolMagnetModeHandler, value: chartCore.components.crossTool.magnetTarget, options: availableCrosstoolMagnetTargets, keyboardModeEnabled: keyboardModeEnabled, tabIndex: chartCore.components.crossTool.type !== 'cross-and-labels' ? -1 : 0 })))),
        showRestoreToDefault && (React.createElement(RestoreToDefaultButton, { onClick: onRestoreDefaultRequest }, localization.settingsPopup.resetToDefaultsBtn))));
});
export default ChartSettingsTabGeneralContent;
