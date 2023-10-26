import React from 'react';
import { ChartSettings } from '../../model/chart.model';
import { TabDefaultConfig, TabTypeWithIcon } from './chart-settings.model';
import { Lens } from 'monocle-ts';
export interface ChartSettingsProps {
    readonly tabs: TabTypeWithIcon[];
    readonly value: ChartSettings;
    readonly onValueChange: (lens: Lens<ChartSettings, any>, value: any) => void;
    readonly tabsDefaultConfig: TabDefaultConfig[];
    readonly isOpened: boolean;
    readonly onPopoverToggle: (isOpened: boolean) => void;
}
export declare const ChartSettingsComponent: React.MemoExoticComponent<(props: ChartSettingsProps) => JSX.Element>;
