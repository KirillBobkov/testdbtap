import { YAxisConfiguratorViewModel } from '../y-axis-configurator.view-model';
import { ChartDataViewModel } from '../../data/chart-data.view-model';
import { ChartWithModules } from '../../../components/canvas-chart-renderer/chart-with-modules';
import { AggregationPeriodViewModel } from '../../aggregation-period.view-model';
export declare const createPrevDayCloseProvider: import("../../../../context/context2").Context<Record<"yAxisConfiguratorViewModel", YAxisConfiguratorViewModel> & Record<"chartDataViewModel", ChartDataViewModel> & Record<"aggregationPeriodViewModel", AggregationPeriodViewModel> & Record<"chart", ChartWithModules>, void>;
