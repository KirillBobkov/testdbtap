import React from 'react';
import { ChartSettings } from '../../../model/chart.model';
import { Lens } from 'monocle-ts';
export interface BackgroundMenuGridPopoverProps {
    readonly isOpened: boolean;
    readonly onClose: () => void;
    readonly settings: ChartSettings;
    readonly onSettingsChange: (lens: Lens<ChartSettings, any>, value: any) => void;
    readonly anchorRef: ReactRef;
}
export declare const BackgroundMenuGridPopover: React.NamedExoticComponent<BackgroundMenuGridPopoverProps>;
