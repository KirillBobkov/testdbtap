import React, { memo, useContext } from 'react';
import { ChartSettingsFieldStyled, ChartSettingssColorsFormFieldsetGroupItem, } from './chart-settings-chart-type-colors-item.styled';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { ChartReactAppContext } from '../../../defaults';
import { useUIOverride } from '../../../ui-overrides';
import { DEFAULT_COLOR_PICKER } from '../../../ui-overrides/color-picker';
const APPROXIMATE_COLORPICKER_WIDTH = 290;
export const ChartSettingsChartTypeColorsItem = memo(props => {
    const { id, values, palette, label, popoverContainer } = props;
    const { keyboardModeEnabled } = useContext(MultiChartComponentContext);
    const { isMobile } = useContext(ChartReactAppContext);
    const mobileCSSProperties = {
        left: 50 % -(APPROXIMATE_COLORPICKER_WIDTH / 2),
    };
    const ColorPicker = useUIOverride(['ColorPickerComponent']) ?? DEFAULT_COLOR_PICKER;
    return (React.createElement(ChartSettingssColorsFormFieldsetGroupItem, { keyboardModeEnabled: keyboardModeEnabled },
        React.createElement(ChartSettingsFieldStyled, { id: id, preventCheck: true, label: label, align: "left" }, values.map(({ value, onValueChange }, index) => (React.createElement(ColorPicker, { key: index, style: isMobile ? mobileCSSProperties : {}, ariaLabelledBy: id, palette: palette, onValueChange: onValueChange, value: value, parentEventTarget: popoverContainer }))))));
});
