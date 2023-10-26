import React, { PropsWithChildren } from 'react';
import { LayerItemsGroup } from '../../model/chart-layers.model';
export interface ChartLayersGroupItemProps {
    readonly group: LayerItemsGroup;
    readonly onChangeName: (id: string, name: string) => void;
    readonly toggleVisibility: (id: string, visible: boolean) => void;
    readonly toggleLocked: (id: string, lock: boolean) => void;
    readonly onClickHandle: (selectedItems: string[] | ((selectedItems: string[]) => string[])) => void;
    readonly isSelected: boolean;
}
export declare const ChartLayersGroupItem: React.MemoExoticComponent<(props: PropsWithChildren<ChartLayersGroupItemProps>) => JSX.Element>;
