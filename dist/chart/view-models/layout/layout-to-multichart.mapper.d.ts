import { ChartReactConfig } from '../../../config/chart-react-config';
import { DxStudiesProvider } from '../../../providers/studies/dx-studies-provider';
import { TimezonesConfig } from '../../../utils/timezones/timezone.model';
import { ChartWithModules } from '../../components/canvas-chart-renderer/chart-with-modules';
import { AggregationPeriod } from '../../model/aggregation.model';
import { Instrument } from '../../model/instrument.model';
import { ChartLayout, MultiChartLayout } from '../../model/layout.model';
import { TStudySettings } from '../../model/studies.model';
import { ChartInfo, MultiChartViewModelState } from '../multi-chart.view-model';
/**
 * Maps chart layout to internal state.
 * Don't forget to COPY OBJECTS, because we don't want unexpected behavior.
 * @arch-tangle-ignore
 * @doc-tags layout
 */
export type ChartLayout2MultiChartStateFn = (layout: MultiChartLayout) => MultiChartViewModelState;
export declare const chartLayout2MultiChartState: import("../../../context/context2").Context<Record<"dxStudiesProvider", DxStudiesProvider> & Record<"chartReactConfig", ChartReactConfig> & Record<"timezones", TimezonesConfig>, ChartLayout2MultiChartStateFn>;
export declare const chartLayout2ChartInfo: (layout: ChartLayout, instrument: Instrument['symbol'] | undefined, defaultStudies: TStudySettings[], aggregation: AggregationPeriod) => ChartInfo;
/**
 * Creates mock instance of ChartBootstrap.
 * This is required for initial load of chart, when we don't have chart-core chunk yet.
 * @doc-tags tricky
 */
export declare const createMockchart: () => ChartWithModules;
