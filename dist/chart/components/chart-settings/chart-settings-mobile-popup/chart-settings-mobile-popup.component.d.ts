import { Lazy } from 'fp-ts/function';
import React, { ReactNode } from 'react';
interface ChartSettingsPopupProps {
    readonly children: ReactNode;
    readonly onRequestClose: Lazy<void>;
    readonly isOpened: boolean;
}
export declare const ChartSettingsPopup: React.MemoExoticComponent<(props: ChartSettingsPopupProps) => JSX.Element>;
export {};
