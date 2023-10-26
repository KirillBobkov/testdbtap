import React from 'react';
import { ChartSettings } from '../../../model/chart.model';
import { Lens } from 'monocle-ts';
export interface BackgroundMenuGridItemProps {
    readonly settings: ChartSettings;
    readonly onSettingsChange: (lens: Lens<ChartSettings, any>, value: any) => void;
    readonly onPopoverClose: () => void;
}
export declare const BackgroundMenuGridItem: React.NamedExoticComponent<BackgroundMenuGridItemProps>;
