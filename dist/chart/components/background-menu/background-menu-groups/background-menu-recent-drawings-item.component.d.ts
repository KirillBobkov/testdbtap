import React from 'react';
import { DrawingType } from '../../../model/drawing.model';
export interface BackgroundMenuRecentDrawingsItemProps {
    readonly recentDrawings: DrawingType[];
    readonly onRecentDrawingSelect: (type: DrawingType) => void;
    readonly onPopoverClose: () => void;
}
export declare const BackgroundMenuRecentDrawingsItem: React.NamedExoticComponent<BackgroundMenuRecentDrawingsItemProps>;
