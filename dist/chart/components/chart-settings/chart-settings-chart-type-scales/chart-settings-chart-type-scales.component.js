import React, { memo, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { Checkbox } from '../../../../chart-kit/Checkbox/Checkbox.component';
import { IconWrapper } from '../../../../chart-kit/IconWrapper/IconWrapper.component';
import { RestoreToDefaultButton } from '../../../../chart-kit/RestoreToDefaultButton/RestoreToDefaultButton.component';
import { useA11yAnchorKeyDown } from '../../../../chart-kit/accessibility/use-a11y-anchor-keydown';
import { TEST_IDS } from '../../../../config/e2e/test-ids';
import { IconsOverridingContext } from '../../../../utils/icons-overriding-context';
import { ChartReactAppContext } from '../../../defaults';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { YAxisLabelsPopover } from '../../yAxis-settings/yaxis-labels-popover.component';
import { ChartSettingsCheckbox } from '../chart-settings-checkbox/chart-settings-checkbox.component';
import { ChartSettingsField } from '../chart-settings-field.component';
import { ChartSettingsTabContainer } from '../chart-settings.styled';
import { ChartSettingsFitField, ChartSettingsScalesTabItemStyled, ChartSettingsScalesYAxisSideTitleStyled, ChartSettingsTabScalesArrowStyled, ChartSettingsTabScalesDivider, ChartSettingsTabScalesFieldsetGroupItem, ChartSettingsTabScalesLinesAndlabelsItemStyled, ChartSettingsTabScalesMainSectionStyled, } from './chart-settings-chart-type-scales-menu.styled';
export const ChartSettingsChartTypeScales = memo(props => {
    const { localization, config, onRestoreDefaultRequest, toggleAutoScale, changeFitType, setAxisAlign, setAxisType, togglePriceScaleInverse, toggleLockPriceToBarRatio, labelsConfig, setLabelMode, selectCountDownBarClose, selectDescription, yAxisDict, showRestoreToDefault, } = props;
    const { auto, lockPriceToBarRatio, inverse } = config.chartCore.scale;
    const labelsAndLinesRef = useRef(null);
    const sectionRef = useRef(null);
    const [labelPopoverOpen, setLabelPopupOpen] = useState(false);
    const iconsConfig = useContext(IconsOverridingContext);
    const axisType = {
        regular: config.chartCore.components.yAxis.type === 'regular',
        percent: config.chartCore.components.yAxis.type === 'percent',
        logarithmic: config.chartCore.components.yAxis.type === 'logarithmic',
    };
    const axisTypeButtons = useMemo(() => [
        {
            name: localization.yAxis.axisType.regular,
            type: 'regular',
            ariaLabel: localization.yAxis.buttons.a11y_regular,
        },
        {
            name: localization.yAxis.axisType.percent,
            type: 'percent',
            ariaLabel: localization.yAxis.buttons.a11y_percent,
        },
        {
            name: localization.yAxis.axisType.logarithmic,
            type: 'logarithmic',
            ariaLabel: localization.yAxis.buttons.a11y_logarithmic,
        },
    ], [localization]);
    const yAxisSidePositionButtons = useMemo(() => [
        {
            name: localization.yAxis.axisAlign.settingsLeft,
            type: 'left',
            ariaLabel: localization.yAxis.axisAlign.left,
        },
        {
            name: localization.yAxis.axisAlign.settingsRight,
            type: 'right',
            ariaLabel: localization.yAxis.axisAlign.right,
        },
    ], [localization]);
    const fit = useMemo(() => [
        {
            type: 'studies',
            active: config.chartReact.scale.fit.studies,
        },
        {
            type: 'positions',
            active: config.chartReact.scale.fit.positions,
        },
        {
            type: 'orders',
            active: config.chartReact.scale.fit.orders,
        },
    ], [
        config.chartReact.scale.fit.orders,
        config.chartReact.scale.fit.positions,
        config.chartReact.scale.fit.studies,
    ]);
    const onAutoScaleChangeHandler = useCallback((value = false) => toggleAutoScale(value), [toggleAutoScale]);
    const onFitTypeChangeHandler = useCallback((value = false, field) => {
        toggleAutoScale(true);
        field && changeFitType(field, value);
    }, [changeFitType, toggleAutoScale]);
    const onSelectAxisTypeHandler = useCallback((type) => setAxisType(type), [setAxisType]);
    const onScaleSideChangeHandler = useCallback((type) => setAxisAlign(type), [setAxisAlign]);
    const onLabelClose = useCallback(() => {
        setLabelPopupOpen(false);
    }, [setLabelPopupOpen]);
    const toggleLabelandLineOpen = useCallback(() => {
        setLabelPopupOpen(true);
    }, [labelPopoverOpen]);
    const toggleLabelandLineClose = useCallback(() => {
        setLabelPopupOpen(false);
    }, [labelPopoverOpen]);
    const { keyboardModeEnabled } = useContext(MultiChartComponentContext);
    const { isMobile } = useContext(ChartReactAppContext);
    const onLinesAndLabelsKeydownHandler = useA11yAnchorKeyDown(() => toggleLabelandLineOpen(), [toggleLabelandLineOpen]);
    return (React.createElement(ChartSettingsTabContainer, { "data-test-id": TEST_IDS.chart_settings_tab_scales_content },
        React.createElement(ChartSettingsTabScalesMainSectionStyled, { ref: sectionRef },
            React.createElement(ChartSettingsCheckbox, { disabled: axisType.percent, label: localization.yAxis.auto, value: auto, onValueChange: onAutoScaleChangeHandler }),
            fit.map(({ type, active }, index) => (React.createElement(ChartSettingsTabScalesFieldsetGroupItem, { keyboardModeEnabled: keyboardModeEnabled, key: `item-${type}-${index}` },
                React.createElement(ChartSettingsFitField, { disabledStyles: !auto, isDisabled: axisType.percent, label: localization.yAxis.fit[type] },
                    React.createElement(Checkbox, { value: active, testId: TEST_IDS.chart_settings_checkbox, field: type, onValueChange: onFitTypeChangeHandler }))))),
            React.createElement(ChartSettingsTabScalesDivider, null),
            React.createElement(ChartSettingsCheckbox, { label: localization.yAxis.scale.inverse, value: inverse, onValueChange: togglePriceScaleInverse }),
            React.createElement(ChartSettingsCheckbox, { label: localization.yAxis.scale.lock, value: lockPriceToBarRatio, onValueChange: toggleLockPriceToBarRatio }),
            React.createElement(ChartSettingsTabScalesDivider, null),
            React.createElement(ChartSettingsScalesTabItemStyled, { buttons: axisTypeButtons, selected: config.chartCore.components.yAxis.type, onSelect: onSelectAxisTypeHandler, ariaLabel: localization.yAxis.buttons.a11y_scaleType }),
            React.createElement(ChartSettingsTabScalesDivider, null),
            React.createElement(ChartSettingsScalesYAxisSideTitleStyled, null, localization.yAxis.axisAlign.title),
            React.createElement(ChartSettingsScalesTabItemStyled, { buttons: yAxisSidePositionButtons, selected: config.chartCore.components.yAxis.align, onSelect: onScaleSideChangeHandler, ariaLabel: localization.yAxis.buttons.a11y_sideAlign }),
            React.createElement(ChartSettingsTabScalesDivider, null),
            !isMobile && (React.createElement(ChartSettingsTabScalesLinesAndlabelsItemStyled, { tabIndex: 0, keyboardModeEnabled: keyboardModeEnabled, onMouseEnter: toggleLabelandLineOpen, onMouseLeave: toggleLabelandLineClose, onKeyDown: onLinesAndLabelsKeydownHandler, ref: labelsAndLinesRef },
                React.createElement(ChartSettingsField, { label: localization.yAxis.labelsAndLines },
                    React.createElement(IconWrapper, null, iconsConfig.yAxisMainPopover.reverseLabel)),
                React.createElement(ChartSettingsTabScalesArrowStyled, null,
                    React.createElement(IconWrapper, null, iconsConfig.yAxisMainPopover.arrow)),
                React.createElement(YAxisLabelsPopover, { isOpened: labelPopoverOpen, onClose: onLabelClose, labelsConfig: labelsConfig, changeLabelMode: setLabelMode, labelsPopoverRef: labelsAndLinesRef, selectCountDownBarClose: selectCountDownBarClose, selectDescription: selectDescription, yAxisDict: yAxisDict, position: "right", align: "start" }))),
            showRestoreToDefault && (React.createElement(RestoreToDefaultButton, { onClick: onRestoreDefaultRequest }, localization.settingsPopup.resetToDefaultsBtn)))));
});
export default ChartSettingsChartTypeScales;
