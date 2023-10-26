import React, { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ColorPickerButtonPaletteStyled } from './ColorPickerColorItem.styled';
import { ColorPickerCustomColorComponent } from './ColorPickerCustomColor.component';
import { ColorPickerDraggableItem } from './ColorPickerDraggableItem';
export const ColorPickerColorItem = memo((props) => {
    const { isActive, isCustomOpacity, isCurrentColorDefault, color, testIds, idx, portal } = props;
    return (React.createElement(React.Fragment, null, isCustomOpacity ? (React.createElement(Draggable, { draggableId: color, index: idx }, (draggableProvidedCustom, snapshot) => (React.createElement(React.Fragment, null,
        React.createElement(ColorPickerDraggableItem, { provided: draggableProvidedCustom, snapshot: snapshot, portal: portal },
            React.createElement(ColorPickerCustomColorComponent, { color: color, isActive: isActive })),
        snapshot.isDragging && (React.createElement(ColorPickerCustomColorComponent, { color: color, isActive: isActive })))))) : !isCurrentColorDefault ? (React.createElement(Draggable, { draggableId: color, index: idx }, (draggableProvidedDefault, snapshot) => (React.createElement(React.Fragment, null,
        React.createElement(ColorPickerDraggableItem, { provided: draggableProvidedDefault, snapshot: snapshot, portal: portal },
            React.createElement(ColorPickerButtonPaletteStyled, { "data-test-id": testIds?.colorButtonPalette, color: color, isActive: isActive })),
        snapshot.isDragging && (React.createElement(ColorPickerButtonPaletteStyled, { "data-test-id": testIds?.colorButtonPalette, color: color, isActive: isActive })))))) : (React.createElement(ColorPickerButtonPaletteStyled, { "data-test-id": testIds?.colorButtonPalette, color: color, isActive: isActive }))));
});
