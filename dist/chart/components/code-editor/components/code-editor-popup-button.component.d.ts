import { FC } from 'react';
import { CKButtonProps } from '../../../../chart-kit/Button/default/Button.component';
export interface CodeEditorPopupButtonProps extends CKButtonProps {
    readonly mode: 'default' | 'primary';
    readonly hasIcon?: boolean;
}
export declare const CodeEditorPopupButton: FC<CodeEditorPopupButtonProps>;
