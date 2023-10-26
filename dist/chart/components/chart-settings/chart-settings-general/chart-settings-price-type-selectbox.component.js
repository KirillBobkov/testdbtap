import React, { memo, useContext, useMemo, useState } from 'react';
import { ChartSettingsTabAdaptivePopoverStyled, ChartSettingsTabCrosshairAnchorStyled, ChartSettingsTabCrosshairDropdownMenuItemStyled, ChartSettingsTabCrosshairDropdownMenuStyled, ChartSettingsTabMenuSelectboxStyled, } from './chart-settings-tab-general.styled';
import { IconsOverridingContext } from '../../../../utils/icons-overriding-context';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
const SelectboxPopover = memo((props) => {
    return React.createElement(ChartSettingsTabAdaptivePopoverStyled, { ...props, align: "start", position: "bottom" });
});
export const PriceTypeSelectbox = memo((props) => {
    const { value, keyboardModeEnabled, onValueChange, priceTypes } = props;
    const { localization } = useContext(MultiChartComponentContext);
    const iconsConfig = useContext(IconsOverridingContext);
    const priceTypeToLabelKeys = useMemo(() => ({
        last: localization.settingsPopup.tabs.general.priceType.last,
        mark: localization.settingsPopup.tabs.general.priceType.mark,
        bid: localization.settingsPopup.tabs.general.priceType.bid,
        ask: localization.settingsPopup.tabs.general.priceType.ask,
    }), [localization]);
    const [isPriceTypeSelectboxOpen, setIsPriceTypeSelectboxOpen] = useState(false);
    return (React.createElement(ChartSettingsTabMenuSelectboxStyled, { value: value, onValueChange: onValueChange, onToggle: setIsPriceTypeSelectboxOpen, isOpened: isPriceTypeSelectboxOpen, Popover: SelectboxPopover, Anchor: ChartSettingsTabCrosshairAnchorStyled, Menu: ChartSettingsTabCrosshairDropdownMenuStyled, keyboardMode: keyboardModeEnabled, caretIcon: iconsConfig.selectBox.arrow }, priceTypes.map(priceType => {
        const isActive = value === priceType;
        return (React.createElement(ChartSettingsTabCrosshairDropdownMenuItemStyled, { key: priceType, value: priceType, isActive: isActive, label: priceTypeToLabelKeys[priceType] }, priceTypeToLabelKeys[value]));
    })));
});
