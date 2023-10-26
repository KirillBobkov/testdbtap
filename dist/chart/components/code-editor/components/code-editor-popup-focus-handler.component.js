import React, { useCallback, useEffect } from 'react';
import { CodeEditorPopupFreeAreaFocusHandlerStyled } from '../code-editor-popup.styled';
export const CodeEditorFocusHandler = props => {
    const { autofocus = true, children, editor } = props;
    const onFocusHandler = useCallback(() => {
        if (editor && 'current' in editor && editor.current && autofocus) {
            editor.current.editor.focus();
        }
    }, [editor, autofocus]);
    useEffect(() => onFocusHandler(), [onFocusHandler]);
    const onClick = useCallback(() => {
        if (editor && 'current' in editor && editor.current) {
            editor.current.editor.focus();
        }
    }, [editor]);
    return (React.createElement(CodeEditorPopupFreeAreaFocusHandlerStyled, { onClick: onClick }, children));
};
