import React, { memo, useCallback, useContext, useMemo, useState, useEffect } from 'react';
import { OpacityContainerStyled } from './OpacitySelector.styled';
import { OpacitySelectorInputStyled, OpacitySelectorSliderStyled, SliderWrapperStyled, OpacitySelectorInputUnitWrapperStyled, OpacitySelectorTransparentIcon, } from './OpacitySelectorSliderStyled';
import * as Color from 'color';
import { IconWrapper } from '../IconWrapper/IconWrapper.component';
import { ChangeOpacityIcon } from './icons/ChangeOpacityTransparent.icon';
import { getPureColor } from '../ColorPicker/utils/color-picker-functions';
import { MultiChartComponentContext } from '../../chart/components/multi-chart/multi-chart-context';
import debounce from '../../utils/function/debounce.util';
const [min, max] = [0, 100];
export const OpacitySelector = memo(props => {
    const { value, onChange, color = '#6e6c6b', isDisabled = false, className } = props;
    const [localValue, setLocalValue] = useState(value);
    useEffect(() => {
        setLocalValue(value);
    }, [value]);
    const onChangeInner = useMemo(() => debounce((opacity) => onChange(opacity), 60), [onChange]);
    const blurHandler = useCallback(() => {
        onChange(localValue);
    }, [localValue, onChange]);
    const keyDownHandler = useCallback((e) => {
        e.stopPropagation();
        if (e.keyCode === 13) {
            onChange(localValue);
        }
    }, [localValue, onChange]);
    const keyUpHandler = useCallback((e) => {
        e.stopPropagation();
    }, []);
    const changeLocalValueHandler = useCallback((val) => {
        const opacity = Number(val);
        setLocalValue(opacity);
        onChangeInner(opacity);
    }, [onChangeInner]);
    const stringValue = useMemo(() => localValue.toFixed(0), [localValue]);
    const startColor = useMemo(() => Color.rgb(color).fade(1.0).string(), [color]);
    const endColor = useMemo(() => getPureColor(color), [color]);
    const { keyboardModeEnabled } = useContext(MultiChartComponentContext);
    return (React.createElement(OpacityContainerStyled, { className: className },
        React.createElement(SliderWrapperStyled, { keyboardModeEnabled: keyboardModeEnabled },
            React.createElement(OpacitySelectorSliderStyled, { type: "range", min: min, max: max, value: stringValue, onChange: e => changeLocalValueHandler(e.target.value), startColor: startColor, endColor: endColor, disabled: isDisabled }),
            React.createElement(OpacitySelectorTransparentIcon, null,
                React.createElement(IconWrapper, { width: 236, height: 20 }, ChangeOpacityIcon))),
        !keyboardModeEnabled && (React.createElement(OpacitySelectorInputUnitWrapperStyled, null,
            React.createElement(OpacitySelectorInputStyled, { onBlur: blurHandler, type: "number", value: stringValue, min: 0, max: 100, onValueChange: changeLocalValueHandler, onKeyDown: keyDownHandler, onKeyUp: keyUpHandler, isDisabled: isDisabled })))));
});
