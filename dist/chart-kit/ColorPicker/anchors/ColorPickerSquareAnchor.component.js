import * as React from 'react';
import { forwardRef, memo } from 'react';
import { ColorPickerButtonAnchorStyled, ColorPickerSquareButtonContentStyled, ColorPickerSquareButtonStyled, } from './ColorPickerSquareAnchor.styled';
import { ColorAlphaIcon } from '../icons/color-picker-alpha.icon';
export const ColorPickerSquareAnchor = memo(forwardRef((props, ref) => {
    const { children, onClick, additionalProps, className } = props;
    return (React.createElement(ColorPickerSquareButtonStyled, { ref: ref, "aria-labelledby": additionalProps?.ariaLabelledBy, onClick: onClick, className: className, disabled: additionalProps ? additionalProps.disabled : false },
        React.createElement(ColorPickerButtonAnchorStyled, null, additionalProps && (React.createElement(React.Fragment, null,
            React.createElement(ColorAlphaIcon, null),
            React.createElement(ColorPickerSquareButtonContentStyled, { color: additionalProps?.color })))),
        children));
}));
ColorPickerSquareAnchor.displayName = 'ColorPickerSquareAnchor';
