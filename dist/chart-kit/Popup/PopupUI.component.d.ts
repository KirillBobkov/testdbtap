import React, { MouseEventHandler, ReactNode } from 'react';
import { ScrollableMode } from '../Scrollable/Scrollable';
export declare const PopupEventTargetProvider: React.Provider<HTMLDivElement | undefined>, PopupEventTargetConsumer: React.Consumer<HTMLDivElement | undefined>;
export interface CKPopupUIProps {
    readonly header: ReactNode;
    readonly footer?: ReactNode;
    readonly isModal?: boolean;
    readonly shouldCloseOnClickAway?: boolean;
    readonly onBackdropClick: MouseEventHandler<HTMLElement>;
    readonly className?: string;
    readonly children?: ReactNode;
    readonly isOpened: boolean;
    readonly resizable?: boolean;
    readonly draggable?: boolean;
    readonly minHeight?: number;
    readonly minWidth?: number;
    readonly defaultSize?: {
        width: number;
        height: number;
    };
    readonly top?: number;
    readonly left?: number;
    readonly popupOrder?: number;
    readonly testId?: string;
    readonly scrollable?: boolean;
    readonly scrollableMode?: ScrollableMode;
    readonly showDividerOnScroll?: boolean;
    readonly zIndex?: number;
}
export declare const PopupUI: React.MemoExoticComponent<React.ForwardRefExoticComponent<CKPopupUIProps & React.RefAttributes<HTMLDivElement>>>;
