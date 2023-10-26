import React from 'react';
import { context } from '../../context/context2';
import { namedMemo } from '../../utils/named-memo';
import { useProperty } from '../../utils/use-property';
import { ChartMovePaneButtons } from '../components/chart-move-pane-buttons/chart-move-pane-buttons.component';
import { RedispatchToChart } from '../components/redispatch-to-chart/redispatch-to-chart.component';
import { useObservable } from '../../utils/react.utils';
export const ChartPaneContainer = context.combine(context.key()('chartPaneViewModel'), context.key()('chart'), context.key()('chartReactConfig'), context.key()('chartDataViewModel'), (chartPaneViewModel, chart, chartReactConfig, chartDataViewModel) => namedMemo('ChartPaneContainer', () => {
    const panesData = useProperty(chartPaneViewModel.panesData);
    const hoveredPane = useProperty(chartPaneViewModel.hoveredPane);
    const tradingOEEnabled = chartReactConfig.trading.enabled && chartReactConfig.trading.addNewOrderEnabled;
    const historicalCandles = useObservable(chartDataViewModel.historicalCandlesUpdated, []);
    return historicalCandles.length !== 0 ? (React.createElement(RedispatchToChart, { chart: chart },
        React.createElement(ChartMovePaneButtons, { panesData: panesData, hoveredPane: hoveredPane, movePaneUp: chartPaneViewModel.movePaneUp, movePaneDown: chartPaneViewModel.movePaneDown, tradingOEEnabled: tradingOEEnabled }))) : null;
}));
