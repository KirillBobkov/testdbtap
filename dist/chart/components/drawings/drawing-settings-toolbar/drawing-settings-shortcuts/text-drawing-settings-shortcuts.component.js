import React, { memo, useCallback } from 'react';
import { ToolbarItem } from '../components/toolbar-item.component';
import { Lens } from 'monocle-ts';
import { flow } from 'fp-ts/function';
import { FontPicker } from '../../../../../chart-kit/FontPicker/FontPicker.component';
import { ColorPickerIconAnchor } from '../../../../../chart-kit/ColorPicker/anchors/ColorPickerIconAnchor.component';
import { ColorPickerTextIconAnchor } from '../../../../../chart-kit/ColorPicker/anchors/ColorPickerTextIconAnchor.component';
import { DrawingToolbarEventTargetConsumer } from '../drawing-toolbar-event-target-context';
import { useUIOverride } from '../../../../ui-overrides';
import { DEFAULT_COLOR_PICKER } from '../../../../ui-overrides/color-picker';
const pathLens = Lens.fromPath();
const textBgPropLens = pathLens(['properties', 'text', 'textBg']);
const textColorPropLens = pathLens(['properties', 'text', 'textFill']);
const textSizePropLens = pathLens(['properties', 'text', 'textSize']);
export const TextDrawingSettingsShortcuts = memo((props) => {
    const { value, onValueChange, palette } = props;
    const drawingProperties = value.properties;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateBackgroundColorHandler = useCallback((value) => createHandler(textBgPropLens, value), [createHandler]);
    const updateTextColorHandler = useCallback((value) => createHandler(textColorPropLens, value), [createHandler]);
    const updateBackgroundColor = useCallback((backgroundColor) => updateBackgroundColorHandler(backgroundColor), [updateBackgroundColorHandler]);
    const updateTextColor = useCallback((textColor) => updateTextColorHandler(textColor), [updateTextColorHandler]);
    const updateTextSizeHandler = useCallback(flow((fontSize) => (typeof fontSize === 'number' ? `${fontSize}px` : fontSize), value => createHandler(textSizePropLens, value)), [createHandler]);
    const ColorPicker = useUIOverride(['ColorPickerComponent']) ?? DEFAULT_COLOR_PICKER;
    return (React.createElement(DrawingToolbarEventTargetConsumer, null, eventTarget => (React.createElement(React.Fragment, null,
        React.createElement(ToolbarItem, { margin: true },
            React.createElement(FontPicker, { value: drawingProperties.text.textSize, onValueChange: updateTextSizeHandler, parentEventTarget: eventTarget })),
        React.createElement(ToolbarItem, { margin: true },
            React.createElement(ColorPicker, { palette: palette, value: drawingProperties.text.textFill, onValueChange: updateTextColor, Anchor: ColorPickerTextIconAnchor, parentEventTarget: eventTarget })),
        React.createElement(ToolbarItem, { margin: true },
            React.createElement(ColorPicker, { palette: palette, value: drawingProperties.text.textBg, onValueChange: updateBackgroundColor, Anchor: ColorPickerIconAnchor, parentEventTarget: eventTarget }))))));
});
