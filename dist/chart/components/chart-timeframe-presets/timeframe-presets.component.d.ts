import React from 'react';
import { AggregationPeriod } from '../../model/aggregation.model';
import { Timeframe, TimeframePreset } from '../../model/timeframe-presets.model';
export interface TimeframePresetsProps {
    readonly onSelect: (preset: TimeframePreset) => void;
    readonly periods: AggregationPeriod[];
    readonly timeframes: Timeframe[];
    readonly onPeriodChange: (period: AggregationPeriod) => void;
    readonly selectedTimeframePeriod: AggregationPeriod;
    readonly onTimeframeChange: (timeframe: Timeframe) => void;
    readonly selectedCustomTimeframe: Timeframe;
    readonly saveCustomPeriodTimeframe: (aggregation: AggregationPeriod, timeframe: Timeframe) => void;
    readonly presets: TimeframePreset[];
    readonly onDeletePreset: (presetKey: TimeframePreset) => void;
    readonly selectedTimeframePreset: TimeframePreset | null;
}
export declare const TimeframePresets: React.NamedExoticComponent<TimeframePresetsProps>;
