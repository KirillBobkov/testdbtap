import { FC } from 'react';
import { Localization } from '../../../../config/localization/localization';
export interface CodeEditorPopupFooterProps {
    readonly readonly?: boolean;
    readonly addedOnChart: boolean;
    readonly onDuplicate: () => void;
    readonly onAdd: () => void;
    readonly onUpdateOnChart: () => void;
    readonly disabled?: boolean;
    readonly codeEditorDict: Localization['codeEditor'];
    readonly addButtonDisabled: boolean;
    readonly updateButtonDisabled: boolean;
    readonly isMaxStudiesReached: boolean;
}
export declare const CodeEditorPopupFooter: FC<CodeEditorPopupFooterProps>;
