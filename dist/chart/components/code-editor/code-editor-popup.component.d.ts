import { FC } from 'react';
import { CKPopupProps } from '../../../chart-kit/Popup/Popup.lazy-component';
import { TDxScriptWithoutId, ScriptError } from '../../../providers/dx-script-provider';
import { Localization } from '../../../config/localization/localization';
export interface CodeEditorCustomPopupProps extends CKPopupProps {
    readonly readonly?: boolean;
    readonly addedOnChart: boolean;
    readonly onDuplicate: () => void;
    readonly onAdd: () => void;
    readonly onUpdateOnChart: () => void;
    readonly codeEditorDict: Localization['codeEditor'];
    readonly addButtonDisabled: boolean;
    readonly updateButtonDisabled: boolean;
    readonly popupOrder: number;
    readonly isAutoSaving: boolean;
    readonly header: string;
    readonly updateScriptName: (name: string | undefined) => void;
    readonly isMaxStudiesReached: boolean;
}
export interface CodeEditorPopupProps {
    readonly id: string;
    readonly opened: boolean;
    readonly addedOnChart: boolean;
    readonly code: string;
    readonly header: string;
    readonly onCodeChange: (code: string, id: string) => void;
    readonly onClose: (id: string) => void;
    readonly onDuplicate: (script: TDxScriptWithoutId) => void;
    readonly onAddToChart: (id: string) => void;
    readonly onUpdateOnChart: (id: string) => void;
    readonly onDelete: (id: string) => void;
    readonly addButtonDisabled: boolean;
    readonly updateButtonDisabled: boolean;
    readonly isCompiling?: boolean;
    readonly errors?: ScriptError[];
    readonly readonly?: boolean;
    readonly codeEditorDict: Localization['codeEditor'];
    readonly popupOrder: number;
    readonly isAutoSaving: boolean;
    readonly updateScriptName: (name: string | undefined) => void;
    readonly isMaxStudiesReached: boolean;
}
export declare const CodeEditorPopup: FC<CodeEditorPopupProps>;
