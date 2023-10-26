import { Point } from '@devexperts/dxcharts-lite/dist/chart/inputlisteners/canvas-input-listener.component';
import { Option } from 'fp-ts/Option';
import React from 'react';
import { LegendContainerRefHolder, SecondarySeriesRefHolder, SeparateVolumeRefHolder, StudySeriesRefsHolder } from '../../dom-mutation-models/chart-legend.dom-mutation-model';
import { AggregationPeriod } from '../../model/aggregation.model';
import { ChartLegendSecondarySeriesModel, ConfigOHLC } from '../../view-models/chart-legend/chart-legend.view-model';
import { ChartWithModules } from '../canvas-chart-renderer/chart-with-modules';
import { StudiesSettingsProps } from '../studies/studies-settings/studies-settings.component';
import { ChartType } from '../../model/chart.model';
import { DataMenuSelectedSeriesType } from '../../view-models/data/data-menu.vm';
import { ReorderType } from '../right-click-menu/right-click-menu-reorder-btns.component';
export interface ChartLegendDMProps {
    readonly container: LegendContainerRefHolder;
    readonly time: React.RefObject<HTMLDivElement>;
    readonly open: React.RefObject<HTMLDivElement>;
    readonly close: React.RefObject<HTMLDivElement>;
    readonly high: React.RefObject<HTMLDivElement>;
    readonly low: React.RefObject<HTMLDivElement>;
    readonly mainVolume: React.RefObject<HTMLDivElement>;
    readonly separateVolume: SeparateVolumeRefHolder;
    readonly stackedStudySeries: StudySeriesRefsHolder[];
    readonly separatedStudySeries: StudySeriesRefsHolder[];
    readonly secondarySeries: SecondarySeriesRefHolder[];
}
export interface ChartLegendComponentConfig {
    readonly opened: boolean;
    readonly showMainInstrument: boolean;
    readonly showOHLC: boolean;
    readonly showPeriod: boolean;
    readonly configOHLC: ConfigOHLC;
}
export interface ChartLegendProps {
    readonly config: ChartLegendComponentConfig;
    readonly selectedSeries: Option<string>;
    readonly popupPosition: Point;
    readonly onCloseSeries: () => void;
    readonly onDeleteSeries: (series: ChartLegendSecondarySeriesModel) => void;
    readonly onOpenSeries: (id: string) => void;
    readonly onDeleteStudySeries: (uuid: string) => void;
    readonly onOpenedChange: (opened: boolean) => void;
    readonly showStudies: boolean;
    readonly isOpened?: boolean;
    readonly domMutationProps: ChartLegendDMProps;
    readonly showMainLegendVolumes: boolean;
    readonly showSeparateLegendVolumes: boolean;
    readonly id: string;
    readonly chart: ChartWithModules;
    readonly period: AggregationPeriod;
    readonly mainInstrumentSymbol?: string;
    readonly studiesSettingsProps: StudiesSettingsProps;
    readonly onContextMenu?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    readonly Header?: React.ReactNode;
    readonly selectedSeriesDataMenu?: DataMenuSelectedSeriesType;
    readonly onChangeSeriesColor: (color: string) => void;
    readonly onChangeSeriesChartType: (type: ChartType) => void;
    readonly onSeriesReorder: (reorderType: ReorderType) => void;
}
export declare const ChartLegend: React.NamedExoticComponent<ChartLegendProps>;
