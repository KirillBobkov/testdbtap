import * as React from 'react';
import { forwardRef, memo } from 'react';
import { ColorPickerButtonAnchorStyled, ColorPickerButtonContentStyled, ColorPickerButtonStyled, } from './ColorPickerAnchor.styled';
import { ColorAlphaIcon } from '../icons/color-picker-alpha.icon';
export const ColorPickerAnchor = memo(forwardRef((props, ref) => {
    const { children, onClick, onKeyDown, additionalProps, className } = props;
    return (React.createElement(ColorPickerButtonStyled, { ref: ref, "aria-label": additionalProps?.ariaLabel, "aria-labelledby": additionalProps?.ariaLabelledBy, testId: additionalProps?.testId, onClick: onClick, onKeyDown: onKeyDown, className: className, disabled: additionalProps ? additionalProps.disabled : false },
        React.createElement(ColorPickerButtonAnchorStyled, null, additionalProps && (React.createElement(React.Fragment, null,
            React.createElement(ColorAlphaIcon, null),
            React.createElement(ColorPickerButtonContentStyled, { color: additionalProps?.color })))),
        children));
}));
