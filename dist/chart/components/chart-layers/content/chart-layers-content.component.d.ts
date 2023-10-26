import { Lazy } from 'fp-ts/function';
import React from 'react';
import { LayerItem } from '../../../model/chart-layers.model';
export interface ChartLayersContentProps {
    readonly onClose: Lazy<void>;
    readonly headerClassName?: string;
    readonly layerItems: LayerItem[];
    readonly createGroup: (items: string[]) => void;
    readonly setItemVisible: (id: string, visible: boolean) => void;
    readonly setItemLocked: (id: string, lock: boolean) => void;
    readonly renameItem: (id: string, name: string) => void;
    readonly moveItemDnD: (fromIdx: number, toIdx: number) => void;
    readonly deleteItem: (id: string) => void;
}
export declare const ChartLayersContent: React.MemoExoticComponent<React.ForwardRefExoticComponent<ChartLayersContentProps & React.RefAttributes<HTMLDivElement>>>;
