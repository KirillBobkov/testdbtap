import React, { memo, useEffect, useCallback } from 'react';
import { CodeEditorPopup } from './code-editor-popup.component';
const initAceEditorDxScriptMode = (keywords) => import('./dxScript/mode-dxscript').then(module => module.initDxScriptEditor(keywords));
const initAceEditorDxScriptTheme = () => import('./dxScript/theme-dxscript').then(module => module.initDxScriptTheme());
const CodeEditors = memo(props => {
    const { popups, scriptIsInitialized, keywords, localization, closePopup, duplicateScript, addToChart, updateScriptOnChart, onScriptEdit, deleteScript, isMaxStudiesReached, initScript, } = props;
    useEffect(() => {
        async function initDxScript() {
            await initAceEditorDxScriptMode(keywords);
            await initAceEditorDxScriptTheme();
            initScript();
        }
        if (!scriptIsInitialized) {
            initDxScript();
        }
    }, [keywords, scriptIsInitialized, initScript]);
    const updateScriptNameHandler = useCallback((p) => (updatedName) => onScriptEdit({ ...p.dxScript, name: updatedName || '' }), [onScriptEdit]);
    const updateScriptHandler = useCallback((p) => (updatedScript) => onScriptEdit({ ...p.dxScript, code: updatedScript }), [onScriptEdit]);
    return (React.createElement(React.Fragment, null, scriptIsInitialized &&
        popups.map(p => (React.createElement(CodeEditorPopup, { popupOrder: p.popupOrder, id: p.dxScript.id, code: p.dxScript.code ?? '', addedOnChart: p.addedOnChart, header: p.dxScript.name, errors: p.dxScript.errors, opened: p.opened, isCompiling: p.isCompiling, key: p.dxScript.id, addButtonDisabled: p.addButtonDisabled, isMaxStudiesReached: isMaxStudiesReached, updateButtonDisabled: p.updateButtonDisabled, readonly: p.dxScript.locked, isAutoSaving: p.isAutoSaving, codeEditorDict: localization.codeEditor, onClose: closePopup, onDelete: deleteScript, onDuplicate: duplicateScript, onAddToChart: addToChart, onUpdateOnChart: updateScriptOnChart, updateScriptName: updateScriptNameHandler(p), onCodeChange: updateScriptHandler(p) })))));
});
export default CodeEditors;
