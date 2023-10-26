import React, { memo, useCallback } from 'react';
import { EditableText } from '../../../chart-kit/EditableText/EditableText.component';
import { ChartLayersCommonItem } from './chart-layers-common-item.component';
export const ChartLayersGroupItem = memo((props) => {
    const { group, onChangeName, onClickHandle, isSelected, ...rest } = props;
    const onChangeNameHandler = useCallback((value) => onChangeName(group.id, value), [group.id, onChangeName]);
    return (React.createElement(ChartLayersCommonItem, { id: group.id, locked: group.locked, visible: group.visible, onClickHandle: onClickHandle, isSelected: isSelected, ...rest },
        React.createElement(EditableText, { maxWidth: 150, value: group.name, onValueChange: onChangeNameHandler })));
});
