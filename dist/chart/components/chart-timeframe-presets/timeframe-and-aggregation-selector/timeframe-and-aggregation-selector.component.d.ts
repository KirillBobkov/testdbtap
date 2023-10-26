import React from 'react';
import { AggregationPeriod } from '../../../model/aggregation.model';
import { Timeframe } from '../../../model/timeframe-presets.model';
interface TimeframeAggregationSelectorComponentProps {
    readonly periods: AggregationPeriod[];
    readonly timeframes: Timeframe[];
    readonly onPeriodChange: (period: AggregationPeriod) => void;
    readonly selectedCustomPeriod: AggregationPeriod;
    readonly onTimeframeChange: (timeframe: Timeframe) => void;
    readonly selectedCustomTimeframe: Timeframe;
    readonly saveCustomPeriodTimeframe: (aggregation: AggregationPeriod, timeframe: Timeframe) => void;
    readonly isOpened: boolean;
    readonly onOpenedChange: (isOpened: boolean) => void;
}
export declare const TimeframeAggregationSelectorComponent: React.MemoExoticComponent<(props: TimeframeAggregationSelectorComponentProps) => JSX.Element>;
export {};
