import React, { memo, useCallback } from 'react';
import { ToolbarItem } from '../components/toolbar-item.component';
import { Lens } from 'monocle-ts';
import { DrawingsToolbarStyled } from '../drawings-settings-toolbar.styled';
import { ColorPickerSquareAnchor } from '../../../../../chart-kit/ColorPicker/anchors/ColorPickerSquareAnchor.component';
import { DrawingToolbarEventTargetConsumer } from '../drawing-toolbar-event-target-context';
import { useUIOverride } from '../../../../ui-overrides';
import { DEFAULT_COLOR_PICKER } from '../../../../ui-overrides/color-picker';
const highlighterLens = Lens.fromPath();
const lineColorLens = highlighterLens(['properties', 'line', 'lineColor']);
export const HighlighterDrawingSettingsShortcuts = memo((props) => {
    const { value, onValueChange, palette, className } = props;
    const drawingProperties = value.properties;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateColor = useCallback((color) => createHandler(lineColorLens, color), [createHandler]);
    const ColorPicker = useUIOverride(['ColorPickerComponent']) ?? DEFAULT_COLOR_PICKER;
    return (React.createElement(DrawingToolbarEventTargetConsumer, null, eventTarget => (React.createElement(DrawingsToolbarStyled, { className: className },
        React.createElement(ToolbarItem, { padding: false },
            React.createElement(ColorPicker, { palette: palette, value: drawingProperties.line.lineColor, onValueChange: updateColor, Anchor: ColorPickerSquareAnchor, parentEventTarget: eventTarget }))))));
});
