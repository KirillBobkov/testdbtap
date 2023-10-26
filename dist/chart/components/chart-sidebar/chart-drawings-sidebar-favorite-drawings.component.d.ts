import React from 'react';
import { DrawingType } from '../../model/drawing.model';
export interface DrawingsSidebarFavoriteDrawingsToolbarProps {
    readonly favoriteDrawings: Array<DrawingType>;
    readonly expanded: boolean;
    readonly disabled?: boolean;
    readonly onSelectDrawing: (type: DrawingType) => void;
    readonly checkIfDrawingActive: (type: DrawingType) => boolean;
    readonly onMouseEnter?: (e: React.MouseEvent) => void;
}
export declare const DrawingsSidebarFavoriteDrawingsToolbar: React.NamedExoticComponent<DrawingsSidebarFavoriteDrawingsToolbarProps>;
