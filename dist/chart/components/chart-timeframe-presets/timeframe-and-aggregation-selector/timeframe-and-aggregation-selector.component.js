import React, { memo, useCallback, useContext, useMemo, useRef } from 'react';
import { IconWrapper } from '../../../../chart-kit/IconWrapper/IconWrapper.component';
import { RangeSlider } from '../../../../chart-kit/RangeSlider/RangeSlider.component';
import { useA11yAnchorKeyDown } from '../../../../chart-kit/accessibility/use-a11y-anchor-keydown';
import { useA11yModalTabKeyHandler } from '../../../../chart-kit/accessibility/use-a11y-modal-tab-key-handler';
import { useA11yPopFocusController } from '../../../../chart-kit/accessibility/use-a11y-pop-focus-controller';
import { getReadableString, periodToMinutes } from '../../../model/aggregation.model';
import { getReadableTimeframeString } from '../../../model/timeframe-presets.model';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { AddingButtonActiveIconWrapper, RangeSliderInfo, RangeSliderTitle, RangeSliderValue, RangeSliderWrapper, TimeframeAggregationSelectorAnchorStyled, TimeframeAggregationSelectorContainer, TimeframeAggregationSelectorPopover, TimeframeAggregationSelectorSaveButton, } from './timeframe-and-aggregation-selector.styled';
import { IconsOverridingContext } from '../../../../utils/icons-overriding-context';
export const TimeframeAggregationSelectorComponent = memo((props) => {
    const { periods, timeframes, selectedCustomPeriod, onPeriodChange, selectedCustomTimeframe, onTimeframeChange, saveCustomPeriodTimeframe, isOpened, onOpenedChange, } = props;
    const { localization, keyboardModeEnabled } = useContext(MultiChartComponentContext);
    const iconsConfig = useContext(IconsOverridingContext);
    const popoverRef = useRef(null);
    const buttonRef = useRef(null);
    const periodSliderElements = periods.map(period => ({
        key: getReadableString(period, localization.aggregationPeriod),
        desc: getReadableString(period, localization.aggregationPeriod),
        value: periodToMinutes(period),
    }));
    const currentPeriodIdx = useMemo(() => periods.findIndex(period => period.duration === selectedCustomPeriod.duration &&
        period.durationType === selectedCustomPeriod.durationType), [periods, selectedCustomPeriod]);
    const timeframeSliderElements = timeframes.map(timeframe => ({
        key: timeframe.label,
        desc: getReadableTimeframeString(timeframe.label),
        value: timeframe.value,
    }));
    const currentTimeFrameIdx = useMemo(() => {
        const selectedIndex = timeframes.findIndex((timeframe) => timeframe.label === selectedCustomTimeframe.label && timeframe.value === selectedCustomTimeframe.value);
        return selectedIndex >= 0 ? selectedIndex : 0;
    }, [timeframes, selectedCustomTimeframe.label, selectedCustomTimeframe.value]);
    const onPeriodChangeHandler = useCallback((idx) => {
        onPeriodChange(periods[idx]);
    }, [onPeriodChange, periods]);
    const onTimeframeChangeHandler = useCallback((idx) => {
        onTimeframeChange(timeframes[idx]);
    }, [onTimeframeChange, timeframes]);
    const togglePopoverHandler = useCallback((e) => {
        e.stopPropagation();
        if (!isOpened) {
            onPeriodChange(periods[0]);
            onTimeframeChange(timeframes[0]);
        }
        onOpenedChange(!isOpened);
    }, [periods, timeframes, isOpened, onPeriodChange, onTimeframeChange, onOpenedChange]);
    const closePopoverHandler = useCallback(() => {
        onOpenedChange(false);
    }, [onOpenedChange]);
    const saveCustomPeriodTimeframeHandler = useCallback(() => {
        saveCustomPeriodTimeframe(periods[currentPeriodIdx], timeframes[currentTimeFrameIdx]);
        closePopoverHandler();
    }, [periods, timeframes, saveCustomPeriodTimeframe, closePopoverHandler, currentPeriodIdx, currentTimeFrameIdx]);
    const onKeyDown = useA11yAnchorKeyDown((e) => {
        togglePopoverHandler(e);
    }, []);
    useA11yPopFocusController({
        anchorRef: buttonRef,
        popRef: popoverRef,
    });
    const onTabPress = useA11yModalTabKeyHandler(popoverRef);
    return (React.createElement(React.Fragment, null,
        React.createElement(TimeframeAggregationSelectorAnchorStyled, { "aria-label": localization.timeframePresets.a11y_toggle_custom_preset, icon: isOpened ? (React.createElement(AddingButtonActiveIconWrapper, null, iconsConfig.periodTimeframe.addTimeframeActive)) : (React.createElement(IconWrapper, null, iconsConfig.periodTimeframe.addTimeframe)), ref: buttonRef, onClick: togglePopoverHandler, onKeyDown: onKeyDown, isActive: isOpened }),
        React.createElement(TimeframeAggregationSelectorPopover, { keyboardMode: keyboardModeEnabled, onTabPress: onTabPress, anchorRef: buttonRef, align: "center", position: "top", opened: isOpened, onRequestClose: closePopoverHandler },
            React.createElement(TimeframeAggregationSelectorContainer, { ref: popoverRef },
                React.createElement(RangeSliderWrapper, null,
                    React.createElement(RangeSliderInfo, null,
                        React.createElement(RangeSliderTitle, null, localization.components.aggregationTimeframe.titles.period),
                        React.createElement(RangeSliderValue, null, periodSliderElements[currentPeriodIdx]?.desc)),
                    React.createElement(RangeSlider, { elements: periodSliderElements, onValueChange: onPeriodChangeHandler, selectedIdx: currentPeriodIdx })),
                React.createElement(RangeSliderWrapper, null,
                    React.createElement(RangeSliderInfo, null,
                        React.createElement(RangeSliderTitle, null, localization.components.aggregationTimeframe.titles.timeframe),
                        React.createElement(RangeSliderValue, null, timeframeSliderElements[currentTimeFrameIdx]?.desc)),
                    React.createElement(RangeSlider, { elements: timeframeSliderElements, onValueChange: onTimeframeChangeHandler, selectedIdx: currentTimeFrameIdx })),
                React.createElement(TimeframeAggregationSelectorSaveButton, { onClick: saveCustomPeriodTimeframeHandler, isFlat: true }, localization.components.aggregationTimeframe.saveBtn)))));
});
