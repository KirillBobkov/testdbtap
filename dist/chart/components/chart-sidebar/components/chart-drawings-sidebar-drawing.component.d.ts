import React from 'react';
import { DrawingType } from '../../../model/drawing.model';
export interface DrawingsSidebarDrawingProps {
    readonly type: DrawingType;
    readonly active?: boolean;
    readonly disabled?: boolean;
    readonly expanded: boolean;
    readonly favorite?: boolean;
    readonly showFavoritesOnHoverOnly?: boolean;
    readonly onSelect: (type: DrawingType) => void;
    readonly onAddToFavorites?: (type: DrawingType) => void;
    readonly onRemoveFromFavorites?: (type: DrawingType) => void;
    readonly onMouseEnter?: (e: React.MouseEvent) => void;
}
export declare const DrawingsSidebarDrawing: React.NamedExoticComponent<DrawingsSidebarDrawingProps>;
