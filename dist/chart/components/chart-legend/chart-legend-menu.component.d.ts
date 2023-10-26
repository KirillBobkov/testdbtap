import { Lens } from 'monocle-ts';
import React from 'react';
import { ChartReactSettings, ChartSettings } from '../../model/chart.model';
import { RCMenuProps } from '../../../chart-kit/Popover/popover-menu-generic';
export interface LegendMenuProps extends RCMenuProps {
    readonly onSettingsChange: (lens: Lens<ChartSettings, any>, value: any) => void;
    readonly settings: ChartReactSettings['legend'];
    readonly chartCoreVolumesVisible: boolean;
}
export declare const LegendMenu: React.NamedExoticComponent<LegendMenuProps>;
