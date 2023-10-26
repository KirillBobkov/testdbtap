import { ChartReactConfig } from '../../../config/chart-react-config';
import { ChartWithModules } from '../../components/canvas-chart-renderer/chart-with-modules';
import { ChartDataViewModel } from '../data/chart-data.view-model';
import { MultiChartViewModel } from '../multi-chart.view-model';
export declare const saveXScaleEffect: import("../../../context/context2").Context<Record<"chart", ChartWithModules> & Record<"chartDataViewModel", ChartDataViewModel> & Record<"multiChartViewModel", MultiChartViewModel> & Record<"chartReactConfig", ChartReactConfig> & Record<"chartId", string>, import("rxjs").Observable<void | {
    start: number;
    end: number;
}>>;
