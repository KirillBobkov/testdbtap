import React, { ReactNode } from 'react';
import { TimeframePreset } from '../../../model/timeframe-presets.model';
export interface TimeframePresetItemProps {
    readonly children: ReactNode;
    readonly onSelect: (presetKey: TimeframePreset) => void;
    readonly preset: TimeframePreset;
    readonly isSelected: boolean;
}
export declare const TimeframePresetItem: React.NamedExoticComponent<TimeframePresetItemProps>;
