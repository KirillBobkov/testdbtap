import { ChartWithModules } from '../../components/canvas-chart-renderer/chart-with-modules';
import { MultiChartViewModel } from '../multi-chart.view-model';
/**
 * Maximizes/minimizes chart on double click
 */
export declare const handleDblClickOnChartEffect: import("../../../context/context2").Context<Record<"chart", ChartWithModules> & Record<"multiChartViewModel", MultiChartViewModel> & Record<"chartId", string>, import("rxjs").Observable<import("@devexperts/dxcharts-lite/dist/chart/inputlisteners/canvas-input-listener.component").Point>>;
