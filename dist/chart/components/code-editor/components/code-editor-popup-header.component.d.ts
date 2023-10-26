import React from 'react';
import { Localization } from '../../../../config/localization/localization';
import { CKPopupHeaderProps } from '../../../../chart-kit/Popup/PopupHeader.component';
export interface CodeEditorPopupHeaderProps extends CKPopupHeaderProps {
    readonly readonly?: boolean;
    readonly isAutoSaving: boolean;
    readonly header: string;
    readonly updateScriptName: (value: string | undefined) => void;
    readonly codeEditorDict: Localization['codeEditor'];
}
export declare const CodeEditorPopupHeader: React.FC<CodeEditorPopupHeaderProps>;
