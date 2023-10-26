import React from 'react';
import { TimeframePreset } from '../../../model/timeframe-presets.model';
export interface TimeframePresetItemDancingProps {
    readonly onDeletePreset: (presetKey: TimeframePreset) => void;
    readonly preset: TimeframePreset;
}
export declare const TimeframePresetItemDancing: React.NamedExoticComponent<TimeframePresetItemDancingProps>;
