import React from 'react';
import { DrawingType } from '../../../model/drawing.model';
export interface BackgroundMenuRecentDrawingsPopoverProps {
    readonly isOpened: boolean;
    readonly onClose: () => void;
    readonly anchorRef: ReactRef;
    readonly recentDrawings: DrawingType[];
    readonly onRecentDrawingSelect: (type: DrawingType) => void;
}
export declare const BackgroundMenuRecentDrawingsPopover: React.NamedExoticComponent<BackgroundMenuRecentDrawingsPopoverProps>;
