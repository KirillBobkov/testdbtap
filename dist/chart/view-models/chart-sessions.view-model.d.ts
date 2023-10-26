import { HighlightType } from '@devexperts/dxcharts-lite/dist/chart/components/highlights/highlights.model';
import { Candle } from '@devexperts/dxcharts-lite/dist/chart/model/candle.model';
import { Sink } from '../../context/sink2';
import { SessionType, TradingSession, TradingSessionsProvider } from '../../providers/sessions/trading-sessions-provider';
import { Property } from '../../utils/property.utils';
import { ChartWithModules } from '../components/canvas-chart-renderer/chart-with-modules';
import { AggregationPeriodViewModel } from './aggregation-period.view-model';
import { ChartConfiguratorViewModel } from './chart-configurator.view-model';
import { ChartDataViewModel } from './data/chart-data.view-model';
export type ChartSessionsType = SessionType;
export type ChartSessionsVMState = Record<ChartSessionsType, TradingSession[]>;
export interface ChartSessionsViewModel {
    readonly sessions: Property<ChartSessionsVMState>;
    readonly nextCandleTimestampOffset: Property<number>;
    readonly changeNextCandleTimestampOffset: (offsetInMs: number) => void;
    readonly generateSessions: (filter: HighlightType[], from: number, to?: number, customCandles?: Candle[]) => Promise<Partial<Record<HighlightType, TradingSession[]>>>;
}
export declare const createChartSessionsViewModel: import("../../context/context2").Context<Record<"chartConfiguratorViewModel", ChartConfiguratorViewModel> & Record<"chartDataViewModel", ChartDataViewModel> & Record<"aggregationPeriodViewModel", AggregationPeriodViewModel> & Record<"chart", ChartWithModules> & Record<"tradingSessionsProvider", TradingSessionsProvider>, Sink<ChartSessionsViewModel>>;
