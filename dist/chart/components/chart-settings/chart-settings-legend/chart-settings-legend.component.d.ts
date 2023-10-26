import { Lazy } from 'fp-ts/function';
import { Lens } from 'monocle-ts';
import React from 'react';
import { ChartReactSettings, ChartSettings } from '../../../model/chart.model';
import { a11yTabProps } from '../chart-settings-content.component';
export interface ChartSettingsTabLegendContentProps {
    readonly settings: ChartReactSettings['legend'];
    readonly onSettingsChange: (lens: Lens<ChartSettings, any>, value: any) => void;
    readonly a11yTabProps: a11yTabProps;
    readonly onRestoreDefaultRequest: Lazy<void>;
    readonly showRestoreToDefault: boolean;
    readonly chartCoreVolumesVisible: boolean;
}
export declare const ChartSettingsTabLegendContent: React.NamedExoticComponent<ChartSettingsTabLegendContentProps>;
export interface LegendsSettingsContentProps {
    readonly onSettingsChange: (lens: Lens<ChartSettings, any>, value: any) => void;
    readonly settings: ChartReactSettings['legend'];
    readonly a11yTabProps?: a11yTabProps;
    readonly chartCoreVolumesVisible: boolean;
}
export declare const LegendsSettingsContent: React.NamedExoticComponent<LegendsSettingsContentProps>;
export default ChartSettingsTabLegendContent;
