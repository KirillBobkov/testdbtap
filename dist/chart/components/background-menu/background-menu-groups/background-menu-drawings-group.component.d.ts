import React from 'react';
import { DrawingType } from '../../../model/drawing.model';
export interface BackgroundMenuDrawingsGroupProps {
    readonly drawingsVisible: boolean;
    readonly recentDrawings: DrawingType[];
    readonly onRecentDrawingSelect: (type: DrawingType) => void;
    readonly onChangeDrawingsVisibility: () => void;
    readonly onClearDrawings: () => void;
    readonly onPopoverClose: () => void;
}
export declare const BackgroundMenuDrawingsGroup: React.NamedExoticComponent<BackgroundMenuDrawingsGroupProps>;
