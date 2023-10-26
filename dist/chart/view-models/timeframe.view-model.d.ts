import { Sink } from '../../context/sink2';
import { MultiChartViewModel } from './multi-chart.view-model';
import { Observable } from 'rxjs';
import { TimestampRange, TimeUnits } from '../model/timeframe.model';
import { ChartWithModules } from '../components/canvas-chart-renderer/chart-with-modules';
export interface TimeFrameViewModel {
    readonly timestampRange: Observable<TimestampRange>;
    readonly setTimestampRange: (timestampRange: TimestampRange) => void;
    readonly setTimeUnits: (timeUnits: TimeUnits) => void;
}
export declare const createTimeFrameViewModel: import("../../context/context2").Context<Record<"chart", ChartWithModules> & Record<"multiChartViewModel", MultiChartViewModel> & Record<"chartId", string>, Sink<TimeFrameViewModel>>;
