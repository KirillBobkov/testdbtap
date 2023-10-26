import React from 'react';
import { Bounds, PopoverCoordinates } from '../../../chart-kit/Popover/Popover.model';
import { Localization } from '../../../config/localization/localization';
import { LayerItem } from '../../model/chart-layers.model';
export interface ChartLayersProps {
    readonly updatePopoverCustomPosition?: (position: PopoverCoordinates) => void;
    readonly customPosition: PopoverCoordinates;
    readonly layerItems: LayerItem[];
    readonly createGroup: (items: string[]) => void;
    readonly setItemVisible: (id: string, visible: boolean) => void;
    readonly setItemLocked: (id: string, lock: boolean) => void;
    readonly renameItem: (id: string, name: string) => void;
    readonly moveItemDnD: (fromIdx: number, toIdx: number) => void;
    readonly deleteItem: (id: string) => void;
    readonly isOpened: boolean;
    readonly setOpened: (value: boolean) => void;
    readonly localization: Localization;
    readonly bounds: Bounds;
}
export declare const ChartLayers: React.MemoExoticComponent<(props: ChartLayersProps) => JSX.Element>;
