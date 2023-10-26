import React, { memo } from 'react';
import { ToolbarItem } from '../components/toolbar-item.component';
import { DrawingsToolbarStyled } from '../drawings-settings-toolbar.styled';
import { isSameColor } from './utils/drawings-with-sections-toolbar-functions';
import { LineStylePicker } from '../../../../../chart-kit/LineStylePicker/LineStylePicker.component';
import { ColorPickerSquareAnchor } from '../../../../../chart-kit/ColorPicker/anchors/ColorPickerSquareAnchor.component';
import { fromCanvasLineDash, fromCanvasLineWidth } from '../../../../../utils/drawing.utils';
import { LineStyleSquareAnchor } from '../../../../../chart-kit/LineStylePicker/anchor/square/LineStyleSquareAnchor.component';
import { DrawingToolbarEventTargetConsumer } from '../drawing-toolbar-event-target-context';
import { useUIOverride } from '../../../../ui-overrides';
import { DEFAULT_COLOR_PICKER } from '../../../../ui-overrides/color-picker';
export const CommonDrawingSettingsShortcuts = memo((props) => {
    const { value, palette, className, onColorChange, onLinePickerChange } = props;
    const drawingProperties = value.properties;
    const ColorPicker = useUIOverride(['ColorPickerComponent']) ?? DEFAULT_COLOR_PICKER;
    return (React.createElement(DrawingToolbarEventTargetConsumer, null, eventTarget => (React.createElement(DrawingsToolbarStyled, { className: className },
        React.createElement(ToolbarItem, { padding: false, margin: true },
            React.createElement(ColorPicker, { Anchor: ColorPickerSquareAnchor, showOpacitySelector: isSameColor(value), palette: palette, value: value.properties.line.lineColor, onValueChange: onColorChange, parentEventTarget: eventTarget })),
        React.createElement(ToolbarItem, null,
            React.createElement(LineStylePicker, { value: {
                    lineWidth: fromCanvasLineWidth(drawingProperties.line.lineWidth),
                    lineDash: fromCanvasLineDash(drawingProperties.line.lineDash),
                }, onValueChange: onLinePickerChange, Anchor: LineStyleSquareAnchor, parentEventTarget: eventTarget }))))));
});
