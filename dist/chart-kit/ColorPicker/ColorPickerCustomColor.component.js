import * as React from 'react';
import { ColorPickerCustomColorBox, ColorPickerCustomColorFill, ColorPickerCustomColorWrapperStyled, } from './ColorPickerCustomColor.styled';
import { ColorCircleIcon } from './icons/color-picker-circle.icon';
import { getPureColor } from './utils/color-picker-functions';
export const ColorPickerCustomColorComponent = (props) => {
    const { color, isActive } = props;
    return (React.createElement(ColorPickerCustomColorWrapperStyled, { isActive: isActive },
        React.createElement(ColorPickerCustomColorFill, { color: getPureColor(color) }),
        React.createElement(ColorPickerCustomColorBox, { color: color },
            React.createElement(ColorCircleIcon, null))));
};
