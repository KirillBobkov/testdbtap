import React from 'react';
import { DraggableLocation } from 'react-beautiful-dnd';
import { LayerItem, LayerItemsGroup } from '../../../model/chart-layers.model';
interface ChartLayersContentDraggableGroupItemProps {
    readonly items: LayerItem[];
    readonly item: LayerItemsGroup;
    readonly toggleVisibility: (id: string, visible: boolean) => void;
    readonly toggleLocked: (id: string, lock: boolean) => void;
    readonly onChangeName: (id: string, name: string) => void;
    readonly isSelected: boolean;
    readonly onClickHandle: (selectedItems: string[] | ((selectedItems: string[]) => string[])) => void;
    readonly currentDestinationElement: DraggableLocation | null;
    readonly portal: HTMLElement;
    readonly dragStyles: React.CSSProperties | null;
}
export declare const ChartLayersContentDraggableGroupItem: React.NamedExoticComponent<ChartLayersContentDraggableGroupItemProps>;
export {};
