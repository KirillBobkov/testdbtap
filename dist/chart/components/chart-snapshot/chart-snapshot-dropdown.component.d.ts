import React from 'react';
import { Localization } from '../../../config/localization/localization';
export interface ChartSnapshotMenuItem {
    /**
     * unique key for dropdown item
     */
    readonly key: string;
    readonly onSelect?: () => void;
    readonly icon?: React.ReactNode;
    /**
     * label will be rendered in the menu
     */
    readonly label: string;
}
export interface ChartSnapshotProps {
    readonly localization: Localization;
    readonly items: ChartSnapshotMenuItem[];
}
export declare const ChartSnapshotDropdown: React.MemoExoticComponent<(props: ChartSnapshotProps) => JSX.Element>;
