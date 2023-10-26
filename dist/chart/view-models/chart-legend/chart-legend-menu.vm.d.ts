import { Property } from '../../../utils/property.utils';
import { ChartWithModules } from '../../components/canvas-chart-renderer/chart-with-modules';
import { Point } from '@devexperts/dxcharts-lite/dist/chart/inputlisteners/canvas-input-listener.component';
import { ChartLegendViewModel } from './chart-legend.view-model';
export interface ChartLegendMenuViewModel {
    readonly isOpened: Property<boolean>;
    readonly closeMenu: () => void;
    readonly menuPosition: Property<Point>;
}
export declare const createChartLegendMenuViewModel: import("../../../context/context2").Context<Record<"chart", ChartWithModules> & Record<"chartLegendVM", ChartLegendViewModel>, import("../../../utils/adt/sink.utils").Sink1<"Observable", ChartLegendMenuViewModel>>;
