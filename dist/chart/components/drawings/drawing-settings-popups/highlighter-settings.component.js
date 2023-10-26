import React, { memo, useCallback } from 'react';
import { DrawingSettingsGroup } from '../drawing-settings-section/drawing-settings-group';
import { DrawingSettingsSection } from '../drawing-settings-section/drawing-settings-section.component';
import { Lens } from 'monocle-ts';
import { DrawingSettingsItem } from '../drawing-settings-section/drawing-settings-item';
import { NumericStepper } from '../../../../chart-kit/NumericStepper/NumericStepper.component';
import { useUIOverride } from '../../../ui-overrides';
import { DEFAULT_COLOR_PICKER } from '../../../ui-overrides/color-picker';
const pathLens = Lens.fromPath();
const lineColorLens = pathLens(['properties', 'line', 'lineColor']);
const lineWidthLens = pathLens(['properties', 'line', 'lineWidth']);
export const HighlighterSettings = memo((props) => {
    const { value, palette, drawingsDict, onValueChange } = props;
    const styleSectionDict = drawingsDict.popup.sections.style;
    const drawingProperties = value.properties;
    const createHandler = useCallback((lens, newValue) => onValueChange(lens.set(newValue)(value)), [value, onValueChange]);
    const updateLineWidth = useCallback((width) => createHandler(lineWidthLens, width), [createHandler]);
    const updateColor = useCallback((color) => createHandler(lineColorLens, color), [createHandler]);
    const ColorPicker = useUIOverride(['ColorPickerComponent']) ?? DEFAULT_COLOR_PICKER;
    return (React.createElement(React.Fragment, null,
        React.createElement(DrawingSettingsSection, { title: styleSectionDict.title },
            React.createElement(DrawingSettingsGroup, null,
                React.createElement(DrawingSettingsItem, { label: styleSectionDict.lineColor },
                    React.createElement(ColorPicker, { palette: palette, value: drawingProperties.line.lineColor, onValueChange: updateColor }))),
            React.createElement(DrawingSettingsGroup, null,
                React.createElement(DrawingSettingsItem, { label: styleSectionDict.lineWidth },
                    React.createElement(NumericStepper, { min: 0, max: Number.POSITIVE_INFINITY, step: 1, value: drawingProperties.line.lineWidth, onValueChange: updateLineWidth }))))));
});
