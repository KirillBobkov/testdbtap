import { either } from 'fp-ts';
import { constVoid, pipe } from 'fp-ts/function';
import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { A11Y_AGGREGATION_PERIOD_DESC_ID } from '../../../chart-kit/accessibility/use-a11y-descriptions';
import { CustomInputMenuItem } from '../../../chart-kit/CustomInputMenuItem/CustomInputMenuItem.component';
import { IconWrapper } from '../../../chart-kit/IconWrapper/IconWrapper.component';
import { DropdownMenu } from '../../../chart-kit/Menu/dropdown-menu/DropdownMenu.styled';
import { Selectbox } from '../../../chart-kit/Selectbox/Selectbox.component';
import { createKeyDownHandler } from '../../../chart-kit/utils/keyDownHandler';
import { TEST_IDS } from '../../../config/e2e/test-ids';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { ChartReactAppContext } from '../../defaults';
import { getReadableString, periodToStringWithSeparator, stringToPeriod, } from '../../model/aggregation.model';
import { MultiChartComponentContext } from '../multi-chart/multi-chart-context';
import { AdaptivePopoverStyled, AggregationMenuItem, AggregationPeriodActions, AggregationPeriodDeleteButton, AggregationPeriodItemContent, } from './chart-aggregation-period-dropdown.styled';
import { ChartPeriodAnchorStyled } from './chart-period-anchor.styled';
const SelectboxPopover = (props) => {
    return React.createElement(AdaptivePopoverStyled, { ...props, align: "start", position: "bottom" });
};
const PERIODS_LIMIT = 20;
export const ChartAggregationPeriodDropdown = (props) => {
    const { selectedPeriod, onPeriodSelect, allPeriods, addPeriod, removePeriod } = props;
    const [isOpened, setOpen] = useState(false);
    const [isNewActive, setIsNewActive] = useState(false);
    const [customPeriodError, setCustomPeriodError] = useState(undefined);
    const { localization, keyboardModeEnabled } = useContext(MultiChartComponentContext);
    const { config: chartReactConfig } = useContext(ChartReactAppContext);
    const isPeriodsLimitReached = allPeriods.length >= PERIODS_LIMIT;
    useEffect(() => () => setIsNewActive(false), [isOpened]);
    const addNewPeriod = useCallback((value) => pipe(value, addPeriod, either.fold(ve => {
        setCustomPeriodError(ve);
        return void 0;
    }, () => {
        setOpen(false);
        setIsNewActive(false);
        setCustomPeriodError(undefined);
        return void 0;
    })), [addPeriod]);
    const handlePeriodSelect = useCallback((value) => {
        if (typeof value !== 'string') {
            return;
        }
        const period = stringToPeriod(value);
        onPeriodSelect(period);
        setOpen(false);
    }, [onPeriodSelect]);
    const onClearError = useCallback(() => setCustomPeriodError(undefined), []);
    const content = allPeriods.map(period => {
        const stringPeriod = periodToStringWithSeparator(period);
        const isActive = periodToStringWithSeparator(selectedPeriod) === stringPeriod;
        return (React.createElement(AggregationPeriodItem, { ariaDescribedBy: A11Y_AGGREGATION_PERIOD_DESC_ID, testId: TEST_IDS.chart_aggregation_period_dropdown_item, key: stringPeriod, period: period, onRemove: removePeriod, isActive: isActive, deleteEnabled: chartReactConfig.customPeriodInput.enabled }));
    });
    if (chartReactConfig.customPeriodInput.enabled && !isPeriodsLimitReached) {
        content.push(React.createElement(CustomInputMenuItem, { key: 'custom', onEnter: addNewPeriod, keyboardModeEnabled: keyboardModeEnabled, onActiveChange: setIsNewActive, isActive: isNewActive, error: customPeriodError, onClearError: onClearError, inputValidator: customPeriodInputValidator, inactiveText: localization.aggregationPeriod.custom, placeholder: localization.aggregationPeriod.customInputPlaceHolder, testIds: {
                input: TEST_IDS.chart_layout_input,
                inactiveText: TEST_IDS.chart_layout_placeholder,
            } }));
    }
    return (React.createElement(Selectbox, { keyboardMode: keyboardModeEnabled, isOpened: isOpened, onToggle: setOpen, value: periodToStringWithSeparator(selectedPeriod), onValueChange: handlePeriodSelect, Popover: SelectboxPopover, Anchor: ChartPeriodAnchorStyled, Menu: DropdownMenu, hasMenu: true, testIdAnchor: TEST_IDS.selectbox_period_anchor, testIdPopover: TEST_IDS.selectbox_period_popover, anchorAriaLabel: localization.toolbar.a11y_buttons.a11y_period_dropdown }, content));
};
const AggregationPeriodItem = memo(props => {
    const { period, isActive, onRemove, onSelect, ariaDescribedBy, testId, deleteEnabled = true } = props;
    const [focused, setFocused] = useState(false);
    const [hovered, setHovered] = useState(false);
    const iconsConfig = useContext(IconsOverridingContext);
    const { keyboardModeEnabled, localization } = useContext(MultiChartComponentContext);
    const { isMobile } = useContext(ChartReactAppContext);
    const deleteBtnAriaLabel = localization.aggregationPeriod.a11y_deleteAggregationPeriod;
    const stringPeriod = periodToStringWithSeparator(period);
    const removeHandler = useCallback((e) => {
        e.stopPropagation();
        onRemove(period);
    }, [onRemove, period]);
    const keyDownHandler = useMemo(() => createKeyDownHandler(['Delete', () => onRemove(period)]), [onRemove, period]);
    const actionsHandler = useCallback((e) => e.stopPropagation(), []);
    const deleteBtnVisible = (!keyboardModeEnabled && hovered) || (keyboardModeEnabled && focused) || isMobile;
    return (React.createElement(AggregationMenuItem, { ariaDescribedBy: ariaDescribedBy, onFocus: () => setFocused(true), onBlur: () => setFocused(false), onMouseOver: () => setHovered(true), onMouseOut: () => setHovered(false), onSelect: onSelect, onKeyDown: keyDownHandler, key: stringPeriod, value: stringPeriod, testId: testId, keyboardModeEnabled: keyboardModeEnabled, isActive: isActive, isMobile: isMobile },
        React.createElement(AggregationPeriodItemContent, { active: isActive }, getReadableString(period, localization.aggregationPeriod)),
        deleteEnabled && React.createElement(AggregationPeriodActions, { onClick: actionsHandler },
            React.createElement(AggregationPeriodDeleteButton, { disabled: isActive, "aria-label": deleteBtnAriaLabel, "aria-hidden": true, tabIndex: -1, icon: React.createElement(IconWrapper, null, isMobile ? iconsConfig.period.deleteV2 : iconsConfig.period.delete), visible: deleteBtnVisible, onClick: isMobile ? constVoid : removeHandler, onTouchStart: removeHandler }))));
});
function customPeriodInputValidator(value) {
    const digitsLimit = 5;
    const regex = /[0-9]+/g;
    regex.exec(value);
    return regex.lastIndex <= digitsLimit;
}
