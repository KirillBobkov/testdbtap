import React from 'react';
export interface CKPopupHeaderProps {
    readonly isClosable?: boolean;
    readonly onRequestClose: () => void;
    readonly className?: string;
    readonly closeBtnAriaLabel?: string;
    readonly children?: React.ReactNode;
}
export declare const PopupHeader: React.FC<CKPopupHeaderProps>;
