import * as React from 'react';
import { memo, useCallback, useRef } from 'react';
import { ColorPickerMenuStyled, ColorPickerPopoverMain, ColorPickerWrapper } from './ColorPickerPalette.styled';
import { Dropdown } from '../Dropdown/Dropdown';
import { ColorPickerPlusAnchor } from './anchors/ColorPickerPlusAnchor.component';
import { HexColorPicker } from 'react-colorful';
import { ColorPickerContent, ColorPickerPopoverStyled } from './ColorPicker.styled';
import { colorToAlpha } from './utils/color-picker-functions';
import { DEFAULT_TRANSPARENT_COLOR } from './ColorPicker.model';
import debounce from '../../utils/function/debounce.util';
import Color from 'color';
import { ColorPickerColorItem } from './ColorPickerColorItem.component';
import { ColorPickerMenuItemStyled } from './ColorPickerColorItem.styled';
const ColorPickerPopover = (props) => {
    return React.createElement(ColorPickerPopoverStyled, { ...props, closeOnClickAway: true, align: "start", position: "bottom" });
};
export const ColorPickerPalette = memo(({ palette, value, onValueChange, className, isDefaultColor, portal, testIds, createdColor, applyCreatedColor, isPalleteOpened, onTogglePallete, }) => {
    const toolbarRef = useRef();
    const onItemSelect = useCallback((text) => {
        if (typeof text === 'string') {
            onValueChange(text);
        }
    }, [onValueChange]);
    const applyCreatedColorDebounced = useCallback(debounce(applyCreatedColor, 100), [applyCreatedColor]);
    const updateToolbarRef = useCallback((ref) => {
        toolbarRef.current = ref;
    }, []);
    return (React.createElement(ColorPickerWrapper, { ref: (node) => node && updateToolbarRef(node) },
        React.createElement(ColorPickerMenuStyled, { navigateWithArrows: false, className: className, onItemSelect: onItemSelect },
            palette.map((color, idx) => {
                const isActive = value === color;
                const isCustomOpacity = colorToAlpha(color) !== 100 && color !== DEFAULT_TRANSPARENT_COLOR;
                const isCurrentColorDefault = isDefaultColor(color);
                return (React.createElement(ColorPickerMenuItemStyled, { key: color, value: color },
                    React.createElement(ColorPickerColorItem, { key: color, isActive: isActive && !isPalleteOpened, isCustomOpacity: isCustomOpacity, isCurrentColorDefault: isCurrentColorDefault, idx: idx, testIds: testIds, portal: portal, color: color })));
            }),
            React.createElement(Dropdown, { Anchor: ColorPickerPlusAnchor, Popover: ColorPickerPopover, isOpened: isPalleteOpened, onToggle: onTogglePallete, parentEventTarget: toolbarRef.current, anchorAdditionalProps: {
                    createdColor,
                    isPalleteOpened,
                } },
                !isPalleteOpened && React.createElement("span", null, value),
                isPalleteOpened && (React.createElement(ColorPickerContent, null,
                    React.createElement(ColorPickerPopoverMain, null,
                        React.createElement(HexColorPicker, { color: Color(value).hex().toString(), onChange: applyCreatedColorDebounced }))))))));
});
