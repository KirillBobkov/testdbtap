import React from 'react';
import { Sink } from '../../context/sink2';
import { Property } from '../../utils/property.utils';
import { ChartWithModules } from '../components/canvas-chart-renderer/chart-with-modules';
import { ChartCoreSettingsColors, ChartType } from '../model/chart.model';
import { ChartConfiguratorViewModel } from '../view-models/chart-configurator.view-model';
import { ChartLegendSecondarySeriesModel, ChartLegendViewModel } from '../view-models/chart-legend/chart-legend.view-model';
import { ChartTypeViewModel } from '../view-models/chart-type.view-model';
import { ThemeViewModel } from '../view-models/theme.view-model';
export declare const DROPDOWN_START_Y_POSITION = 70;
export interface ChartLegendDomMutationModel {
    readonly legendContainer: LegendContainerRefHolder;
    readonly time: React.RefObject<HTMLDivElement>;
    readonly open: React.RefObject<HTMLDivElement>;
    readonly close: React.RefObject<HTMLDivElement>;
    readonly high: React.RefObject<HTMLDivElement>;
    readonly low: React.RefObject<HTMLDivElement>;
    readonly volumeMain: React.RefObject<HTMLDivElement>;
    readonly separateVolume: SeparateVolumeRefHolder;
    readonly stackedStudySeries: Property<StudySeriesRefsHolder[]>;
    readonly separateStudySeries: Property<StudySeriesRefsHolder[]>;
    readonly secondarySeries: Property<SecondarySeriesRefHolder[]>;
    readonly syncState: () => void;
}
export interface LegendContainerRefHolder {
    readonly switcherPositionRef: React.RefObject<HTMLDivElement>;
    readonly containerRef: React.RefObject<HTMLDivElement>;
    readonly setLegendFitsContent: React.MutableRefObject<((fits: boolean) => void) | null>;
    readonly setHeight: React.MutableRefObject<((height: number) => void) | null>;
}
export interface SeparateVolumeRefHolder {
    readonly containerRef: React.RefObject<HTMLDivElement>;
    readonly valueRef: React.RefObject<HTMLDivElement>;
}
export interface StudySeriesRefsHolder {
    readonly uuid: string;
    readonly title: string;
    readonly ref: React.RefObject<HTMLDivElement>;
    readonly lines: StudyLineRefHolder[];
}
export interface StudyLineRefHolder {
    readonly title: string;
    readonly ref: React.RefObject<HTMLDivElement>;
}
export interface SecondarySeriesRefHolder {
    readonly model: ChartLegendSecondarySeriesModel;
    readonly ref: React.RefObject<HTMLDivElement>;
}
export declare const createChartLegendDomMutationModel: import("../../context/context2").Context<Record<"chart", ChartWithModules> & Record<"chartLegendVM", ChartLegendViewModel> & Record<"chartConfiguratorViewModel", ChartConfiguratorViewModel> & Record<"themeViewModel", ThemeViewModel> & Record<"chartTypeViewModel", ChartTypeViewModel>, Sink<ChartLegendDomMutationModel>>;
export declare const getColorByDirection: (barType: ChartType, colors: ChartCoreSettingsColors, direction: string) => any;
