import React, { memo, useMemo } from 'react';
import { TextNoteContainerStyled } from './text-note.styled';
import { createPortal } from 'react-dom';
import { MultilineTextTool } from '../../../chart-kit/MultilineTextTool/MultilineTextTool.component';
import { calculateHeight, calculateLineHeight, getTextWidth, } from '@dx-private/dxchart5-modules/dist/drawings/common/text-drawing-functions';
export const TextNote = memo(props => {
    const { container, data, onChange, onSubmit, onCancel } = props;
    const width = useMemo(() => getTextWidth(data.text, data.font), [data.text, data.font]);
    const height = useMemo(() => calculateHeight(data.text, data.font), [data.text, data.font]);
    const lineHeight = useMemo(() => calculateLineHeight(data.text, data.fontSize), [data.text, data.fontSize]);
    return createPortal(React.createElement(TextNoteContainerStyled, { key: data.id, top: data.position.y, left: data.position.x },
        React.createElement(MultilineTextTool, { text: data.text, fontSize: data.fontSize, color: data.color, background: data.background, lineHeight: lineHeight, isFocused: true, width: width, height: height, onChange: onChange, onSubmit: onSubmit, onCancel: onCancel })), container);
});
