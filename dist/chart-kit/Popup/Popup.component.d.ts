import React, { ComponentType } from 'react';
import { CKPopupHeaderProps } from './PopupHeader.component';
import { CKPopupUIProps } from './PopupUI.component';
export interface CKPopupProps extends Partial<CKPopupUIProps>, Partial<CKPopupHeaderProps> {
    readonly onRequestClose: () => void;
    readonly PopupUI?: ComponentType<CKPopupUIProps>;
    readonly container?: HTMLElement;
    readonly isOpened: boolean;
    readonly isClosableWithKeyboard?: boolean;
    readonly popupOrder?: number;
    readonly testId?: string;
    readonly anchorRef?: React.MutableRefObject<HTMLElement | null>;
    readonly keyboardMode?: boolean;
    readonly headerWrapped?: boolean;
}
export declare const Popup: React.NamedExoticComponent<CKPopupProps>;
export default Popup;
