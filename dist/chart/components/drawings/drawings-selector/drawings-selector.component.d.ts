import React, { ReactNode } from 'react';
import { DrawingType } from '../../../model/drawing.model';
import { IconsPool, IconsPoolNames } from '../../../../config/icons-pool';
import { Localization } from '../../../../config/localization/localization';
export type DrawingMode = 'NewDrawing' | 'EditDrawing' | 'Default';
export interface DrawingTypeProps {
    readonly drawingType: DrawingType;
    readonly changeDrawingType: (value: DrawingType) => void;
    readonly areDrawingsVisible: boolean;
    readonly areDrawingsDisabled: boolean;
    readonly drawingMode: DrawingMode;
    readonly isClearButtonEnabled: boolean;
    readonly isVisibilityButtonEnabled: boolean;
    readonly clearDrawings: () => void;
    readonly cancelDrawing: () => void;
    readonly changeVisibility: (value: boolean) => void;
    readonly startNewDrawing: (value: DrawingType) => void;
    readonly startNewIconDrawing: (iconType: IconsPoolNames) => void;
    readonly withPopup?: boolean;
    readonly isPopoverOpened: boolean;
    readonly onTogglePopover: (opened: boolean) => void;
    readonly mapTypeToIconFunc?: (type: DrawingType) => ReactNode;
    readonly localization: Localization;
    readonly icons: IconsPool;
    readonly drawingsList: DrawingType[];
}
export declare const DrawingsSelector: React.MemoExoticComponent<(props: DrawingTypeProps) => JSX.Element>;
