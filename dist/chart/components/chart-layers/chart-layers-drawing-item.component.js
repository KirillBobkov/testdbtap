import React, { memo, useCallback } from 'react';
import { ChartLayersCommonItem } from './chart-layers-common-item.component';
import { EditableText } from '../../../chart-kit/EditableText/EditableText.component';
export const ChartLayersDrawingItem = memo((props) => {
    const { drawing, onClickHandle, isSelected, onChangeName, ...rest } = props;
    const onChangeNameHandler = useCallback((value) => onChangeName(drawing.id, value), [drawing.id, onChangeName]);
    return (React.createElement(ChartLayersCommonItem, { id: drawing.id, locked: drawing.locked, visible: drawing.visible, onClickHandle: onClickHandle, isSelected: isSelected, ...rest },
        React.createElement(EditableText, { maxWidth: 150, value: drawing.name, onValueChange: onChangeNameHandler })));
});
