import { AggregationPeriodViewModel } from '../aggregation-period.view-model';
import { AggregationPeriod } from '../../model/aggregation.model';
import { TimeFrameViewModel } from '../timeframe.view-model';
import { ChartConfiguratorViewModel } from '../chart-configurator.view-model';
import { ChartWithModules } from '../../components/canvas-chart-renderer/chart-with-modules';
export type TimeframeChangeStrategy = 'basic' | 'smart';
export declare const keepSameTimestampRangeOnAggregationEffect: import("../../../context/context2").Context<Record<"aggregationPeriodViewModel", AggregationPeriodViewModel> & Record<"chart", ChartWithModules> & Record<"timeFrameViewModel", TimeFrameViewModel> & Record<"chartConfiguratorViewModel", ChartConfiguratorViewModel>, import("rxjs").Observable<[[AggregationPeriod, AggregationPeriod], import("../../model/timeframe.model").TimestampRange]>>;
/**
 * Relates to 'smart' timeframeOnCandles option.
 * Determines if the X timeframe should be preserved when changing instrument.
 * @doc-tags period,tricky,hardcoded-config,blogic,scaling,viewport
 */
export declare function resolveAggregationChangeStrategy(prevPeriod: AggregationPeriod, curPeriod: AggregationPeriod): TimeframeChangeStrategy;
