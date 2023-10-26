import { Option } from 'fp-ts/Option';
import { Sink } from '../../context/sink2';
import { Property } from '../../utils/property.utils';
import { ChartWithModules } from '../components/canvas-chart-renderer/chart-with-modules';
import { MultiChartViewModel } from './multi-chart.view-model';
import { Bounds } from '@devexperts/dxcharts-lite/dist/chart/model/bounds.model';
export interface PaneData {
    readonly bounds: Bounds;
    readonly uuid: string;
    readonly isTop?: boolean;
    readonly isBottom?: boolean;
}
export interface PanesData {
    readonly panes: PaneData[];
    readonly right: number;
}
export interface ChartPaneViewModel {
    readonly panesData: Property<PanesData>;
    readonly hoveredPane: Property<Option<string>>;
    readonly movePaneUp: (uuid: string) => void;
    readonly movePaneDown: (uuid: string) => void;
    readonly setHoveredPane: (data: Option<string>) => void;
}
export declare const createChartPaneViewModel: import("../../context/context2").Context<Record<"multiChartViewModel", MultiChartViewModel> & Record<"chart", ChartWithModules> & Record<"chartId", string>, Sink<ChartPaneViewModel>>;
