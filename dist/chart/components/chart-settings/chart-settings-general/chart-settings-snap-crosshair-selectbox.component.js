import React, { memo, useCallback, useContext, useMemo, useState } from 'react';
import { ChartSettingsTabAdaptivePopoverStyled, ChartSettingsTabCrosshairAnchorStyled, ChartSettingsTabCrosshairDropdownMenuItemStyled, ChartSettingsTabCrosshairDropdownMenuStyled, ChartSettingsTabMenuSelectboxStyled, } from './chart-settings-tab-general.styled';
import { IconsOverridingContext } from '../../../../utils/icons-overriding-context';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { typedMemo } from '../../../../utils/typed-memo';
const SelectboxPopover = memo((props) => {
    return React.createElement(ChartSettingsTabAdaptivePopoverStyled, { ...props, align: "start", position: "bottom" });
});
export function isAvailableCrosshairType(value, options) {
    return options.some(v => v === value);
}
const RawSnapCrosshairSelectbox = (props) => {
    const { value, options, keyboardModeEnabled, onValueChange, tabIndex } = props;
    const { localization } = useContext(MultiChartComponentContext);
    const iconsConfig = useContext(IconsOverridingContext);
    const mappedLocalization = useMemo(() => ({
        C: localization.settingsPopup.tabs.general.snapCrosshairTo.close,
        H: localization.settingsPopup.tabs.general.snapCrosshairTo.high,
        L: localization.settingsPopup.tabs.general.snapCrosshairTo.low,
        O: localization.settingsPopup.tabs.general.snapCrosshairTo.open,
        OHLC: localization.settingsPopup.tabs.general.snapCrosshairTo.OHLC,
        none: localization.settingsPopup.tabs.general.snapCrosshairTo.none,
    }), [localization]);
    const [isCrosshairSelectboxOpen, setIsCrosshairSelectboxOpen] = useState(false);
    const onValueChangeHandler = useCallback((type) => {
        if (isAvailableCrosshairType(type, options)) {
            onValueChange(type);
        }
    }, [onValueChange, options]);
    return (React.createElement(ChartSettingsTabMenuSelectboxStyled, { tabIndex: tabIndex, value: value, onValueChange: onValueChangeHandler, onToggle: setIsCrosshairSelectboxOpen, isOpened: isCrosshairSelectboxOpen, Popover: SelectboxPopover, Anchor: ChartSettingsTabCrosshairAnchorStyled, Menu: ChartSettingsTabCrosshairDropdownMenuStyled, keyboardMode: keyboardModeEnabled, caretIcon: iconsConfig.selectBox.arrow }, options.map(type => {
        const isActive = value === type;
        return (React.createElement(ChartSettingsTabCrosshairDropdownMenuItemStyled, { key: type, value: type, isActive: isActive, label: mappedLocalization[type] }, mappedLocalization[type]));
    })));
};
export const SnapCrosshairSelectbox = typedMemo(RawSnapCrosshairSelectbox);
