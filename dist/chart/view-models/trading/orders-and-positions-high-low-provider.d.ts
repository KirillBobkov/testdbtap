/**
 * High low provider for trading items - orders and positions.
 * @param config
 * @param chartModel
 * @doc-tags auto-scale,high-low,scaling
 */
import { ChartModel } from '@devexperts/dxcharts-lite/dist/chart/components/chart/chart.model';
import { HighLowProvider } from '@devexperts/dxcharts-lite/dist/chart/model/scaling/auto-scale.model';
import { TradingViewModel } from './trading.view-model';
import { ChartSettings } from '../../model/chart.model';
export declare const createOrdersAndPositionsHighLowProvider: (configProvider: () => ChartSettings, chartModel: ChartModel, tradingModel: TradingViewModel) => HighLowProvider;
