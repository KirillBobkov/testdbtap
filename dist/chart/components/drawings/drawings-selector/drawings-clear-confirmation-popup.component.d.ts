import React from 'react';
import { DrawingsDictionary } from '../../../../config/localization/drawings';
export interface DrawingsClearConfirmationPopupProps {
    readonly isOpened: boolean;
    readonly onCancel: () => void;
    readonly onClear: () => void;
    readonly drawingsDict: DrawingsDictionary;
}
export declare const DrawingsClearConfirmationPopup: React.MemoExoticComponent<(props: DrawingsClearConfirmationPopupProps) => JSX.Element>;
