import React, { CSSProperties } from 'react';
import { DraggableLocation } from 'react-beautiful-dnd';
import { DrawingLayerItem, LayerItem } from '../../../model/chart-layers.model';
interface ChartLayersContentDraggableDrawingItemProps {
    readonly items: LayerItem[];
    readonly item: DrawingLayerItem;
    readonly toggleVisibility: (id: string, visible: boolean) => void;
    readonly toggleLocked: (id: string, lock: boolean) => void;
    readonly onChangeName: (id: string, name: string) => void;
    readonly className?: string;
    readonly style?: CSSProperties;
    readonly onClickHandle: (selectedItems: string[] | ((selectedItems: string[]) => string[])) => void;
    readonly isSelected: boolean;
    readonly currentDestinationElement: DraggableLocation | null;
    readonly portal: HTMLElement;
    readonly dragStyles: React.CSSProperties | null;
}
export declare const ChartLayersContentDraggableDrawingItem: React.NamedExoticComponent<ChartLayersContentDraggableDrawingItemProps>;
export {};
