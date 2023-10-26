import React, { memo, useCallback } from 'react';
import { ToolbarItem } from '../components/toolbar-item.component';
import { Lens } from 'monocle-ts';
import { DrawingsToolbarStyled } from '../drawings-settings-toolbar.styled';
import { BackgroundFillControl } from '../../drawing-settings-popups/components/background-fill-control.component';
import { DrawingToolbarEventTargetConsumer } from '../drawing-toolbar-event-target-context';
const iconDrawingSettingsLens = Lens.fromPath()(['properties', 'iconStyle']);
export const IconDrawingSettingsShortcuts = memo(props => {
    const { value, onValueChange, palette, className, drawingsDict } = props;
    const drawingProperties = value.properties;
    const updateIconStyle = useCallback((icon) => {
        const newValue = iconDrawingSettingsLens.set(icon)(value);
        onValueChange(newValue);
    }, [value, onValueChange]);
    return (React.createElement(DrawingToolbarEventTargetConsumer, null, eventTarget => (React.createElement(DrawingsToolbarStyled, { className: className },
        React.createElement(ToolbarItem, { padding: false },
            React.createElement(BackgroundFillControl, { value: drawingProperties.iconStyle, onValueChange: updateIconStyle, palette: palette, drawingsDict: drawingsDict, renderWithWrap: true, parentEventTarget: eventTarget, disableBottomMargin: true }))))));
});
