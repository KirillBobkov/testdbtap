import * as React from 'react';
import { forwardRef, memo } from 'react';
import { FontPickerButtonStyled, FontPickerAnchorContent } from './FontPickerAnchor.styled';
export const FontPickerAnchor = memo(forwardRef((props, ref) => {
    const { children, onClick, className, additionalProps } = props;
    return (React.createElement(FontPickerButtonStyled, { ref: ref, onClick: onClick, className: className },
        React.createElement(FontPickerAnchorContent, null,
            additionalProps && additionalProps.value,
            children)));
}));
