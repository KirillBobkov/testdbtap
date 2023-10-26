import React, { PropsWithChildren } from 'react';
import { TabTypeWithIcon } from './chart-settings.model';
interface ChartSettingsTabProps {
    readonly tab: TabTypeWithIcon;
    readonly index: number;
    readonly isActive: boolean;
    readonly testId?: string;
    readonly onSelect: (index: number) => void;
}
export declare const ChartSettingsTab: React.MemoExoticComponent<(props: PropsWithChildren<ChartSettingsTabProps>) => JSX.Element>;
export {};
