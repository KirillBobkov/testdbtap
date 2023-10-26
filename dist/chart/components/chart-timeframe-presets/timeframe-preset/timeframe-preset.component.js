import React, { memo, useCallback, useContext } from 'react';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
import { TimeframePresetItemStyled } from './timeframe-preset.styled';
export const TimeframePresetItem = memo(props => {
    const { children, onSelect, preset, isSelected } = props;
    const { localization } = useContext(MultiChartComponentContext);
    const onSelectHandler = useCallback(() => {
        onSelect(preset);
    }, [onSelect, preset]);
    return (React.createElement(TimeframePresetItemStyled, { "aria-label": `${localization.timeframePresets.a11y_preset} ${preset.timeframe.label}`, "aria-selected": isSelected, selected: isSelected, isFlat: true, onClick: onSelectHandler }, children));
});
