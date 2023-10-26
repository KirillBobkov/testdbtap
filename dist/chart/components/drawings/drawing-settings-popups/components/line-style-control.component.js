import React, { memo, useCallback, useMemo } from 'react';
import { DrawingSettingsGroup } from '../../drawing-settings-section/drawing-settings-group';
import { LineStylePicker } from '../../../../../chart-kit/LineStylePicker/LineStylePicker.component';
import { fromCanvasLineDash, fromCanvasLineWidth, toCanvasLineDash, toCanvasLineWidth, } from '../../../../../utils/drawing.utils';
import { DrawingSettingsItem } from '../../drawing-settings-section/drawing-settings-item';
import { LineStyleAnchor } from '../../../../../chart-kit/LineStylePicker/anchor/LineStyleAnchor.component';
import { useUIOverride } from '../../../../ui-overrides';
import { DEFAULT_COLOR_PICKER } from '../../../../ui-overrides/color-picker';
export const LineStyleControl = memo(props => {
    const { value, onValueChange, palette, leadingLabel, className, children, parentEventTarget, ...groupProps } = props;
    const updateColor = useCallback((color) => onValueChange({ ...value, lineColor: color }), [onValueChange, value]);
    const updateLineStyle = useCallback((lineStyle) => onValueChange({
        ...value,
        lineWidth: toCanvasLineWidth(lineStyle.lineWidth),
        lineDash: toCanvasLineDash(lineStyle.lineDash),
    }), [onValueChange, value]);
    const lineStylePickerValue = useMemo(() => ({ lineWidth: fromCanvasLineWidth(value.lineWidth), lineDash: fromCanvasLineDash(value.lineDash) }), [value.lineWidth, value.lineDash]);
    const ColorPicker = useUIOverride(['ColorPickerComponent']) ?? DEFAULT_COLOR_PICKER;
    return (React.createElement(DrawingSettingsGroup, { label: leadingLabel, className: className, ...groupProps },
        React.createElement(DrawingSettingsItem, null,
            React.createElement(ColorPicker, { parentEventTarget: parentEventTarget, palette: palette, value: value.lineColor, onValueChange: updateColor })),
        React.createElement(DrawingSettingsItem, null,
            React.createElement(LineStylePicker, { value: lineStylePickerValue, Anchor: LineStyleAnchor, onValueChange: updateLineStyle, parentEventTarget: parentEventTarget })),
        children));
});
LineStyleControl.displayName = 'LineStyle';
