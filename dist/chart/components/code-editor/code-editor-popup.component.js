import React, { useCallback, useMemo, useRef } from 'react';
import { Popup as DefaultPopup } from '../../../chart-kit/Popup/Popup.lazy-component';
import { CodeEditorPopupHeader } from './components/code-editor-popup-header.component';
import { CodeEditorPopupEditorContainerStyled, CodeEditorPopupErrorsContainerStyled, CodeEditorPopupInfoStyled, CodeEditorPopupPendingStatusStyled, CodeEditorPopupUIStyled, } from './code-editor-popup.styled';
import { CodeEditorPopupFooter } from './components/code-editor-popup-footer.component';
import { CodeEditorFocusHandler } from './components/code-editor-popup-focus-handler.component';
import { CodeEditor } from './components/code-editor.component';
const Popup = props => {
    const { isClosable, onRequestClose, header, readonly, addedOnChart, onDuplicate, onAdd, onUpdateOnChart, codeEditorDict, addButtonDisabled, updateButtonDisabled, isAutoSaving, updateScriptName, isMaxStudiesReached, } = props;
    const headerProps = useMemo(() => ({
        onRequestClose,
        isClosable,
        readonly,
        header,
        updateScriptName,
        isAutoSaving,
        codeEditorDict,
    }), [onRequestClose, isClosable, readonly, header, updateScriptName, isAutoSaving, codeEditorDict]);
    const footerProps = useMemo(() => ({
        addedOnChart,
        onDuplicate,
        onAdd,
        onUpdateOnChart,
        codeEditorDict,
        addButtonDisabled,
        updateButtonDisabled,
        isMaxStudiesReached,
        readonly,
    }), [
        addedOnChart,
        onDuplicate,
        onAdd,
        onUpdateOnChart,
        codeEditorDict,
        addButtonDisabled,
        updateButtonDisabled,
        isMaxStudiesReached,
        readonly,
    ]);
    const PopupHeader = useMemo(() => React.createElement(CodeEditorPopupHeader, { ...headerProps }), [headerProps]);
    const PopupFooter = useMemo(() => React.createElement(CodeEditorPopupFooter, { ...footerProps }), [footerProps]);
    return (React.createElement(DefaultPopup, { ...props, headerWrapped: false, PopupUI: CodeEditorPopupUIStyled, header: PopupHeader, footer: PopupFooter, showDividerOnScroll: true }));
};
export const CodeEditorPopup = props => {
    const { onClose, onDuplicate, onAddToChart, onUpdateOnChart, onDelete, opened, addedOnChart, readonly = false, header, id, code, onCodeChange, isCompiling = false, errors, codeEditorDict, addButtonDisabled, updateButtonDisabled, popupOrder, isAutoSaving, updateScriptName, isMaxStudiesReached, } = props;
    const onAddHandler = useCallback(() => onAddToChart(id), [id, onAddToChart]);
    const onDuplicateHandler = useCallback(() => onDuplicate({ name: header, code, locked: false }), [code, header, onDuplicate]);
    const onCloseHandler = useCallback(() => {
        // delete script if code editor is empty
        !code && onDelete(id);
        onClose(id);
    }, [id, onClose, onDelete, code]);
    const onUpdateOnChartHandler = useCallback(() => onUpdateOnChart(id), [id, onUpdateOnChart]);
    const onCodeChangeHandler = useCallback((code) => onCodeChange(code, id), [id, onCodeChange]);
    const formatError = (e) => `line ${e.region.bounds.beginLine + 1}: ${e.message}`;
    const editor = useRef(null);
    const isInfoEmpty = (!errors || errors.length === 0) && !isCompiling;
    return (React.createElement(Popup, { popupOrder: popupOrder, header: header, isModal: false, isOpened: opened, isClosable: true, isClosableWithKeyboard: true, readonly: readonly, shouldCloseOnClickAway: false, addedOnChart: addedOnChart, codeEditorDict: codeEditorDict, resizable: true, updateButtonDisabled: updateButtonDisabled, addButtonDisabled: addButtonDisabled, onAdd: onAddHandler, onUpdateOnChart: onUpdateOnChartHandler, onDuplicate: onDuplicateHandler, onRequestClose: onCloseHandler, isAutoSaving: isAutoSaving, updateScriptName: updateScriptName, isMaxStudiesReached: isMaxStudiesReached, scrollableMode: "wheeling" },
        React.createElement(React.Fragment, null,
            React.createElement(CodeEditorPopupEditorContainerStyled, { isEmpty: isInfoEmpty },
                React.createElement(CodeEditor, { readonly: readonly, code: code, errors: errors, onCodeChange: onCodeChangeHandler, ref: editor })),
            React.createElement(CodeEditorPopupInfoStyled, { isEmpty: isInfoEmpty },
                isCompiling && (React.createElement(CodeEditorPopupPendingStatusStyled, null, codeEditorDict.pending)),
                errors && (React.createElement(CodeEditorPopupErrorsContainerStyled, null, errors.map(e => (React.createElement("div", null, formatError(e))))))),
            React.createElement(CodeEditorFocusHandler, { editor: editor }))));
};
