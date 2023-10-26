import { Point } from '@devexperts/dxcharts-lite/dist/chart/inputlisteners/canvas-input-listener.component';
import React from 'react';
import { SecondarySeriesRefHolder } from '../../../dom-mutation-models/chart-legend.dom-mutation-model';
import { ChartLegendSecondarySeriesModel } from '../../../view-models/chart-legend/chart-legend.view-model';
import { DataMenuSelectedSeriesType } from '../../../view-models/data/data-menu.vm';
import { ChartType } from '../../../model/chart.model';
import { ReorderType } from '../../right-click-menu/right-click-menu-reorder-btns.component';
export interface ChartLegendItemProps {
    readonly popupPosition: Point;
    readonly isOpened: boolean;
    readonly onCloseSeries: () => void;
    readonly series: SecondarySeriesRefHolder;
    readonly onDeleteSeries: (series: ChartLegendSecondarySeriesModel) => void;
    readonly onOpenSeries: (id: string) => void;
    readonly palette: string[];
    readonly testId?: string;
    readonly selectedSeries?: DataMenuSelectedSeriesType;
    readonly onChangeSeriesColor: (color: string) => void;
    readonly onChangeSeriesChartType: (type: ChartType) => void;
    readonly onSeriesReorder: (reorderType: ReorderType) => void;
}
export declare const ChartLegendSecondarySeriesItem: React.MemoExoticComponent<(props: ChartLegendItemProps) => JSX.Element>;
