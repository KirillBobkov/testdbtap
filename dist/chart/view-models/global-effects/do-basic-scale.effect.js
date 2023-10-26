import { pipe } from 'fp-ts/function';
import { context } from '../../../context/context2';
import { tap } from 'rxjs/operators';
export const doBasicScaleEffect = context.combine(context.key()('chartDataViewModel'), context.key()('chart'), (chartDataViewModel, chart) => pipe(
// historicalCandlesUpdated triggered after candlesSetSubject
chartDataViewModel.historicalCandlesUpdated, tap(() => {
    const minCandlesOffset = chart.config.components.chart.minCandlesOffset;
    // at the chart corners the minimum visible candles is minCandlesOffset
    // if reach this point that mean most likely we are not able to display desired data because it's not available
    if (chart.chartModel.mainCandleSeries.getSeriesInViewport().flat().length <= minCandlesOffset) {
        // so, reset scale
        chart.chartModel.doBasicScale();
    }
})));
