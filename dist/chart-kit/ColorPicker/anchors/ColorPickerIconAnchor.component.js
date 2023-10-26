import * as React from 'react';
import { forwardRef, memo, useContext } from 'react';
import { ColorPickerButtonAnchorStyled, ColorPickerButtonTextStyled, ColorPickerWrapperTextStyled, ColorPickerIconWrapperStyled, } from './ColorPickerIconAnchor.styled';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
export const ColorPickerIconAnchor = memo(forwardRef((props, ref) => {
    const { children, onClick, additionalProps, className } = props;
    const iconsConfig = useContext(IconsOverridingContext);
    return (React.createElement(ColorPickerButtonTextStyled, { ref: ref, "aria-labelledby": additionalProps?.ariaLabelledBy, onClick: onClick, className: className, disabled: additionalProps ? additionalProps.disabled : false },
        React.createElement(ColorPickerButtonAnchorStyled, null, additionalProps && (React.createElement(ColorPickerWrapperTextStyled, null,
            React.createElement(ColorPickerIconWrapperStyled, null, iconsConfig.drawings.settingsToolbar.fill)))),
        children));
}));
ColorPickerIconAnchor.displayName = 'ColorPickerIconAnchor';
