import { YAxisLabelsProvider } from '@devexperts/dxcharts-lite/dist/chart/components/y_axis/price_labels/y-axis-labels.model';
import { ChartWithModules } from '../../../components/canvas-chart-renderer/chart-with-modules';
import { AggregationPeriodViewModel } from '../../aggregation-period.view-model';
import { ChartSessionsViewModel } from '../../chart-sessions.view-model';
import { ChartDataViewModel } from '../../data/chart-data.view-model';
import { YAxisConfiguratorViewModel } from '../y-axis-configurator.view-model';
export declare const createCountdownToBarCloseProvider: import("../../../../context/context2").Context<Record<"yAxisConfiguratorViewModel", YAxisConfiguratorViewModel> & Record<"chartDataViewModel", ChartDataViewModel> & Record<"chart", ChartWithModules> & Record<"aggregationPeriodViewModel", AggregationPeriodViewModel> & Record<"chartSessionsViewModel", ChartSessionsViewModel>, (nextCandleTimestampsCache: Map<number, number>) => YAxisLabelsProvider>;
/**
 * Countdown label date formatter function
 * Returns different date format depends on the difference between current time and next candle time of appearance
 * Link to the requirements:
 * https://confluence.in.devexperts.com/display/DR/Price+Scale#req-scale-17
 */
export declare function countdownDateTimeFormatter(diff: number): string;
