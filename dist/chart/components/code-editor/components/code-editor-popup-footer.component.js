import React, { useMemo, useEffect, useCallback, useContext } from 'react';
import { CodeEditorPopupFlexContainer, CodeEditorPopupIWStyled } from '../code-editor-popup.styled';
import { CodeEditorPopupButton } from './code-editor-popup-button.component';
import { CodeEditorPopupFooterContainer, CodeEditorPopupFooterMessage } from './code-editor-popup-footer.styled';
import { IconsOverridingContext } from '../../../../utils/icons-overriding-context';
import { IconWrapper } from '../../../../chart-kit/IconWrapper/IconWrapper.component';
const DXSCRIPT_DOCS_LINK = 'https://script.dxfeed.com/';
export const CodeEditorPopupFooter = props => {
    const { readonly = false, addedOnChart = true, onDuplicate, updateButtonDisabled, onAdd, onUpdateOnChart, codeEditorDict, addButtonDisabled, isMaxStudiesReached, } = props;
    const [isMessageShowing, setIsMessageShowing] = React.useState(false);
    const onDocsClickHandler = useCallback(() => {
        window.open(DXSCRIPT_DOCS_LINK, '_blank');
    }, []);
    const onAddOrShowMessage = useCallback(() => {
        if (isMaxStudiesReached) {
            setIsMessageShowing(true);
        }
        else {
            onAdd();
        }
    }, [onAdd, isMaxStudiesReached]);
    useEffect(() => {
        if (!isMaxStudiesReached) {
            setIsMessageShowing(false);
        }
    }, [isMaxStudiesReached]);
    const iconsConfig = useContext(IconsOverridingContext);
    const renderControlButton = useMemo(() => {
        if (!addedOnChart) {
            return (React.createElement(CodeEditorPopupButton, { mode: "default", hasIcon: true, isFlat: true, disabled: addButtonDisabled, onClick: onAddOrShowMessage },
                React.createElement(CodeEditorPopupIWStyled, null,
                    React.createElement(IconWrapper, null, iconsConfig.studies.script.addToChart)),
                codeEditorDict.addToChartBtn));
        }
        if (!readonly) {
            return (React.createElement(CodeEditorPopupButton, { mode: "default", hasIcon: true, isFlat: true, disabled: updateButtonDisabled, onClick: onUpdateOnChart },
                React.createElement(CodeEditorPopupIWStyled, null, React.createElement(IconWrapper, null, iconsConfig.codeEditor.update)),
                codeEditorDict.updateBtn));
        }
        return null;
    }, [
        addedOnChart,
        addButtonDisabled,
        onAddOrShowMessage,
        codeEditorDict.addToChartBtn,
        codeEditorDict.updateBtn,
        updateButtonDisabled,
        onUpdateOnChart,
        iconsConfig,
        readonly,
    ]);
    return (React.createElement(CodeEditorPopupFooterContainer, null,
        React.createElement(CodeEditorPopupFlexContainer, { justifyContent: "space-between", alignItems: "center" },
            React.createElement(CodeEditorPopupFlexContainer, { justifyContent: "flex-start", alignItems: "center" },
                renderControlButton,
                React.createElement(CodeEditorPopupButton, { hasIcon: true, mode: "default", onClick: onDuplicate },
                    React.createElement(CodeEditorPopupIWStyled, null,
                        React.createElement(IconWrapper, null, iconsConfig.codeEditor.duplicate)),
                    codeEditorDict.duplicateBtn)),
            isMessageShowing && (React.createElement(CodeEditorPopupFooterMessage, null, codeEditorDict.fiveStudiesMax)),
            React.createElement(CodeEditorPopupButton, { onClick: onDocsClickHandler, mode: "default" }, codeEditorDict.docsBtn))));
};
