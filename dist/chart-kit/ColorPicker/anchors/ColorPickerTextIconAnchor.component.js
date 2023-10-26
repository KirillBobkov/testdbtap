import * as React from 'react';
import { forwardRef, memo, useContext } from 'react';
import { ColorPickerButtonAnchorStyled, ColorPickerButtonTextStyled, ColorPickerTextIconAnchorStyled, ColorPickerWrapperTextStyled, } from './ColorPickerTextIconAnchor.styled';
import { IconsOverridingContext } from '../../../utils/icons-overriding-context';
import { DrawingsToolbarIconWrapperStyled } from '../../../chart/components/drawings/drawing-settings-toolbar/drawings-settings-toolbar.styled';
export const ColorPickerTextIconAnchor = memo(forwardRef((props, ref) => {
    const { children, onClick, additionalProps, className } = props;
    const iconsConfig = useContext(IconsOverridingContext);
    const drawingsToolbarFontPickerIcon = (React.createElement(DrawingsToolbarIconWrapperStyled, null, iconsConfig.drawings.settingsToolbar.fontpicker));
    return (React.createElement(ColorPickerButtonTextStyled, { ref: ref, onClick: onClick, className: className, disabled: additionalProps ? additionalProps.disabled : false },
        React.createElement(ColorPickerButtonAnchorStyled, null, additionalProps && (React.createElement(ColorPickerWrapperTextStyled, null,
            React.createElement(ColorPickerTextIconAnchorStyled, null, drawingsToolbarFontPickerIcon)))),
        children));
}));
ColorPickerTextIconAnchor.displayName = 'ColorPickerTextIconAnchor';
