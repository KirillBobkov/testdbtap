import { observable } from 'fp-ts-rxjs';
import { pipe } from 'fp-ts/function';
import { distinctUntilChanged, merge, switchMap, take, tap } from 'rxjs';
import { context } from '../../../context/context2';
import { waitForCandlesSet } from '../../../utils/chart';
import { filterMapOption } from '../../../utils/monad-functions';
export const saveXScaleEffect = context.combine(context.key()('chart'), context.key()('chartDataViewModel'), context.key()('multiChartViewModel'), context.key()('chartReactConfig'), context.key()('chartId'), (chart, chartDataViewModel, multiChartViewModel, chartReactConfig, chartId) => {
    const setDefaultScaleOnInitialLoadEffect = pipe(filterMapOption(chartDataViewModel.instrument), observable.map(i => i.symbol), distinctUntilChanged(), 
    // apply only on initial load
    take(1), 
    // do basic scale only when candles are set to chart-core
    switchMap(() => waitForCandlesSet(chart)), tap(() => {
        const layoutXScale = multiChartViewModel.state.getValue().charts[parseInt(chartId, 10)].xScaleViewport;
        if (!chartReactConfig.shouldInitLayoutXScale ||
            layoutXScale.startTimestamp === layoutXScale.endTimestamp) {
            chart.chartModel.doBasicScale();
        }
        else {
            chart.chartModel.setTimestampRange(layoutXScale.startTimestamp, layoutXScale.endTimestamp);
        }
    }));
    const saveXScaleToLayoutIfEnabledEffect = pipe(
    // save changes only after default scale is set
    setDefaultScaleOnInitialLoadEffect, switchMap(() => chart.scale.xChanged), observable.filter(() => chartReactConfig.shouldInitLayoutXScale), tap(() => {
        const xStart = chart.chartModel.scale.xStart;
        const xEnd = chart.chartModel.scale.xEnd;
        if (xStart !== xEnd) {
            const startTimestamp = chart.chartModel.candleFromUnit(xStart, true).timestamp;
            // xEnd might be a start of the next candle, so we subtract 0.001 to pick current candle for sure
            const endTimestamp = chart.chartModel.candleFromUnit(xEnd - 0.001, true).timestamp;
            multiChartViewModel.updateLocalChartInfo(chartId, {
                xScaleViewport: { startTimestamp, endTimestamp },
            });
        }
    }));
    return merge(setDefaultScaleOnInitialLoadEffect, saveXScaleToLayoutIfEnabledEffect);
});
