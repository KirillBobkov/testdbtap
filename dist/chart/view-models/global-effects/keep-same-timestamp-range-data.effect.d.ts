import { ChartWithModules } from '../../components/canvas-chart-renderer/chart-with-modules';
import { ChartConfiguratorViewModel } from '../chart-configurator.view-model';
import { TimeFrameViewModel } from '../timeframe.view-model';
/**
 * Keep same timestamp range on change data settings (extended hours, price type)
 */
export declare const keepSameTimestampRangeOnDataEffect: import("../../../context/context2").Context<Record<"chart", ChartWithModules> & Record<"timeFrameViewModel", TimeFrameViewModel> & Record<"chartConfiguratorViewModel", ChartConfiguratorViewModel>, import("rxjs").Observable<import("../../model/timeframe.model").TimestampRange>>;
