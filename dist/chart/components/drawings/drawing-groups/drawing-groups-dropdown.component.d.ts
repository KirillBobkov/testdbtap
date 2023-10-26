import React from 'react';
import { LayerItemsGroup } from '../../../model/chart-layers.model';
export interface DrawingGroupsDropdownProps {
    readonly groups: LayerItemsGroup[];
    readonly selectedGroup: LayerItemsGroup;
    readonly addGroup: (name: string) => void;
    readonly selectGroup: (id: string) => void;
    readonly deleteGroup: (id: string) => void;
    readonly renameGroup: (id: string, name: string) => void;
}
export declare const DrawingGroupsDropdown: React.NamedExoticComponent<DrawingGroupsDropdownProps>;
export default DrawingGroupsDropdown;
