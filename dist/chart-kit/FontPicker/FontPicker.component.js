import React, { useState, memo, useCallback } from 'react';
import { Dropdown } from '../Dropdown/Dropdown';
import { FontPickerAnchor } from './FontPickerAnchor.component';
import { FontPickerPopoverStyled, FontPickerMenuItemValueStyled, FontPickerMenuStyled, } from './FontPickerPopover.styled';
import { MenuItem } from '../Menu/MenuItem.component';
const fontSizes = [10, 12, 14, 16, 20, 24, 28, 32, 40];
const defaultFonts = fontSizes.map((fontsize) => ({ fontSize: `${fontsize}pt` }));
const fontSizeFormatter = (text) => {
    const formattedText = text.toString().slice().match(/[0-9]/gi);
    return formattedText ? formattedText.join('') : '';
};
export const FontPicker = memo((props) => {
    const { value, fonts = defaultFonts, onValueChange, Anchor = FontPickerAnchor, className, parentEventTarget, } = props;
    const [isOpened, setIsOpened] = useState(false);
    const onToggle = useCallback((value) => {
        if (typeof value === 'boolean') {
            setIsOpened(value);
        }
    }, []);
    const onItemSelect = useCallback((value) => {
        onValueChange(value);
        setIsOpened(false);
    }, [onValueChange]);
    const FontPickerPopover = (props) => {
        return React.createElement(FontPickerPopoverStyled, { ...props, align: "start", position: "bottom" });
    };
    return (React.createElement(Dropdown, { Anchor: Anchor, isOpened: isOpened, onToggle: onToggle, anchorAdditionalProps: { value: fontSizeFormatter(value) }, Popover: FontPickerPopover, parentEventTarget: parentEventTarget, className: className }, isOpened && (React.createElement(FontPickerMenuStyled, { onItemSelect: onItemSelect }, fonts.map((font, index) => {
        const fontSize = font.fontSize;
        const isActive = font.fontSize === value;
        return (React.createElement(MenuItem, { key: `item_${index}`, isActive: isActive, value: fontSize },
            React.createElement(FontPickerMenuItemValueStyled, null, fontSizeFormatter(fontSize))));
    })))));
});
