import { context } from '../../context/context2';
import { merge, timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { pipe } from 'fp-ts/function';
import { LabelsGroups } from '@devexperts/dxcharts-lite/dist/chart/components/y_axis/price_labels/y-axis-labels.model';
import { newSink } from '../../context/sink2';
import { createCountdownToBarCloseProvider } from './y-axis/y-axis-labels/countdown-to-bar-close-label.provider';
export const countdownViewModel = context.combine(context.key()('chart'), createCountdownToBarCloseProvider, (chart, createCountdownToBarCloseProvider) => {
    const nextCandleTimestampsCache = new Map();
    chart.yAxis.registerYAxisLabelsProvider(createCountdownToBarCloseProvider(nextCandleTimestampsCache), LabelsGroups.MAIN, 'countdown_label');
    const candlesSetSubjectChangedEffect = pipe(chart.chartModel.candlesSetSubject, tap(() => {
        nextCandleTimestampsCache.clear();
    }));
    const countdownVisibleEffect = pipe(merge(chart.chartModel.candlesSetSubject, timer(1000, 1000)), tap(() => {
        const countdownVisible = chart.config.components.yAxis.labels.settings.countdownToBarClose.mode !== 'none';
        if (countdownVisible) {
            chart.chartModel.nextCandleTimeStampSubject.next();
        }
    }));
    const effects = merge(candlesSetSubjectChangedEffect, countdownVisibleEffect);
    return newSink({}, effects);
});
