import React, { memo, useEffect, useState, useRef, useContext } from 'react';
import { CodeEditorPopupHeaderContainer, CodeEditorPopupHeaderEditIcon, CodeEditorPopupHeaderEditText, CodeEditorPopupHeaderEditableText, CodeEditorPopupHeaderLockIcon, CodeEditorPopupHeaderSavingIndicator, } from './code-editor-popup-header.styled';
import { CodeEditorPopupButton } from './code-editor-popup-button.component';
import { useThrottle } from '../../../../chart-kit/utils/useThrottle';
import { IconsOverridingContext } from '../../../../utils/icons-overriding-context';
export const CodeEditorPopupHeader = memo(props => {
    const { isClosable, onRequestClose, header, readonly = false, isAutoSaving, updateScriptName, codeEditorDict, } = props;
    const mounted = useRef(false);
    const [showSavingStatus, handleShowSavingStatus] = useState(false);
    const iconsConfig = useContext(IconsOverridingContext);
    const isSavingIndicator = useThrottle(isAutoSaving, 500);
    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        }
        else {
            handleShowSavingStatus(true);
        }
    }, [isAutoSaving]);
    if (isClosable) {
        return (React.createElement(CodeEditorPopupHeaderContainer, null,
            React.createElement(CodeEditorPopupHeaderEditableText, { value: header, maxWidth: 200, disabled: readonly, onValueChange: updateScriptName, fontParams: "normal normal 400 12px Open Sans Semibold" },
                readonly && (React.createElement(CodeEditorPopupHeaderLockIcon, { width: 16, height: 16 }, iconsConfig.chartLayers.unlock)),
                React.createElement(CodeEditorPopupHeaderEditText, null, header),
                !readonly && (React.createElement(CodeEditorPopupHeaderEditIcon, { width: 16, height: 16 }, iconsConfig.indicatorsTemplate.edit))),
            React.createElement(CodeEditorPopupHeaderSavingIndicator, null, !readonly &&
                showSavingStatus &&
                (isSavingIndicator ? `${codeEditorDict.saving}...` : `${codeEditorDict.saved}`)),
            isClosable && (React.createElement(CodeEditorPopupButton, { mode: "primary", onClick: onRequestClose }, codeEditorDict.close))));
    }
    return null;
});
