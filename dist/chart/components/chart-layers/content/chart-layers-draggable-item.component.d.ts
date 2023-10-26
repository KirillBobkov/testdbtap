import React from 'react';
import { LayerItem } from '../../../model/chart-layers.model';
interface ChartLayersDraggableItemProps {
    readonly item: LayerItem;
    readonly index: number;
    readonly portal: HTMLElement;
    readonly items: LayerItem[];
    readonly dragStyles: React.CSSProperties | null;
}
export declare const ChartLayersDraggableItem: React.NamedExoticComponent<React.PropsWithChildren<ChartLayersDraggableItemProps>>;
export {};
