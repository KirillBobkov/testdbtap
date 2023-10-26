import React, { memo, useCallback, useContext, useState } from 'react';
import { IconsOverridingContext } from '../../../../utils/icons-overriding-context';
import { TimeframePresetItemDancingStyled, TimeframePresetItemDancingIconWrapperStyled, } from './timeframe-preset-dancing.styled';
import { MultiChartComponentContext } from '../../multi-chart/multi-chart-context';
export const TimeframePresetItemDancing = memo(props => {
    const { onDeletePreset, preset } = props;
    const [animated, setAnimated] = useState(true);
    const iconsConfig = useContext(IconsOverridingContext);
    const { localization } = useContext(MultiChartComponentContext);
    const onDeletePresetHandler = useCallback((e) => {
        e.stopPropagation();
        onDeletePreset(preset);
    }, [onDeletePreset, preset]);
    const onMouseOverHandler = useCallback(() => {
        animated && setAnimated(false);
    }, [animated]);
    const onMouseLeaveHandler = useCallback(() => {
        !animated && setAnimated(true);
    }, [animated]);
    return (React.createElement(TimeframePresetItemDancingStyled, { "aria-label": `${localization.timeframePresets.a11y_remove_preset} ${preset.timeframe.label}`, key: preset.timeframe.label, onClick: onDeletePresetHandler, onMouseOver: onMouseOverHandler, onMouseLeave: onMouseLeaveHandler, onFocus: onMouseOverHandler, onBlur: onMouseLeaveHandler, animated: animated }, !animated ? (React.createElement(React.Fragment, null,
        React.createElement("div", { style: { visibility: 'hidden' } }, preset.timeframe.label),
        React.createElement(TimeframePresetItemDancingIconWrapperStyled, { width: 24, height: 24 }, iconsConfig.layout.delete))) : (preset.timeframe.label)));
});
