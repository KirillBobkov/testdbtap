import { AggregationPeriod } from './aggregation.model';
import { Option } from 'fp-ts/Option';
import { eq } from 'fp-ts';
declare const timeFrameLabelTypes: readonly ["H", "D", "W", "M", "Y"];
export type TimeFrameLabelType = (typeof timeFrameLabelTypes)[number];
export interface Timeframe {
    label: string;
    value: number;
}
export interface TimeframePreset {
    timeframe: Timeframe;
    aggregation: AggregationPeriod;
}
export interface TimeframePresetsList {
    presets: Array<TimeframePreset>;
}
export declare const hour: number;
export declare const day: number;
export declare const week: number;
export declare const month: number;
export declare const year: number;
export declare const MAX_PRESETS_NUMBER = 15;
export declare const getValueInDays: (preset: TimeframePreset) => number;
export declare const DEFAULT_TIMEFRAME_PRESETS: TimeframePresetsList;
export declare const filterAllPreset: (preset: TimeframePreset) => boolean;
export declare const getReadableTimeframeString: (timeframeLabel: string) => string;
export declare const timeframePeriods: AggregationPeriod[];
export declare const SpecialPresets: Array<TimeframePreset>;
export declare const getTimeframeBasedOnPeriod: (period: AggregationPeriod) => Timeframe[];
export declare const serializeTimeframePreset: (timeframePreset: TimeframePreset) => string;
export declare const timeframePresetEq: eq.Eq<{
    readonly timeframe: Timeframe;
    readonly aggregation: AggregationPeriod;
} | null>;
export declare const timeframePresetArrayEq: eq.Eq<TimeframePreset[]>;
export declare const applyLabelFormatting: (timeframe: Timeframe, aggregation: AggregationPeriod) => TimeframePreset;
/**
 * Parse full tiemframe preset from serialized timeframe
 * Parses the timeframe and aggregation period in parts
 * if parsing any part will return none the function will also return none
 * 10D-1s => Option<{timeframe: {label,value}, aggregation: {duration, durationType}}>
 * @param timeframeSerialized {string}
 * @doc-tags chart-react,fp,timeframe-presets
 */
export declare const parseTimeframePresetFromString: (serializedTimeframePreset: string) => Option<TimeframePreset>;
export {};
