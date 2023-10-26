import { context } from '../../../context/context2';
import { isDiffersBy } from '@devexperts/dxcharts-lite/dist/chart/utils/math.utils';
import { map, pairwise, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { periodToMinutes } from '../../model/aggregation.model';
import { waitForCandlesSet } from '../../../utils/chart';
import { pipe } from 'fp-ts/function';
import { zip } from 'rxjs';
export const keepSameTimestampRangeOnAggregationEffect = context.combine(context.key()('aggregationPeriodViewModel'), context.key()('chart'), context.key()('timeFrameViewModel'), context.key()('chartConfiguratorViewModel'), (aggregationPeriodVM, chart, timeFrameVM, chartConfigVM) => pipe(aggregationPeriodVM.selectedPeriod, startWith(aggregationPeriodVM.selectedPeriod.getValue()), pairwise(), withLatestFrom(timeFrameVM.timestampRange), switchMap(params => pipe(zip(aggregationPeriodVM.selectedByUserPeriod, waitForCandlesSet(chart)), map(() => params))), tap(([[prevPeriod, curPeriod], timestampRange]) => {
    const configStrategy = chartConfigVM.state.getValue().settings.chartReact.timeframeChangeStrategy.aggregations;
    const resolvedStrategy = resolveAggregationChangeStrategy(prevPeriod, curPeriod);
    if (configStrategy === 'smart' && resolvedStrategy === 'smart') {
        chart.chartModel.setTimestampRange(...timestampRange);
        chart.scale.doAutoScale(true);
    }
    else {
        chart.chartModel.doBasicScale();
    }
})));
/**
 * Relates to 'smart' timeframeOnCandles option.
 * Determines if the X timeframe should be preserved when changing instrument.
 * @doc-tags period,tricky,hardcoded-config,blogic,scaling,viewport
 */
export function resolveAggregationChangeStrategy(prevPeriod, curPeriod) {
    const switchBetweenNaturalAndNonNatural = (isNaturalAggregation(curPeriod) && !isNaturalAggregation(prevPeriod)) ||
        (isNaturalAggregation(prevPeriod) && !isNaturalAggregation(curPeriod));
    if (switchBetweenNaturalAndNonNatural) {
        return 'basic';
    }
    const prevPeriodMinutes = periodToMinutes(prevPeriod);
    const curPeriodMinutes = periodToMinutes(curPeriod);
    if (isDiffersBy(prevPeriodMinutes, curPeriodMinutes, 25)) {
        return 'basic';
    }
    return 'smart';
}
const isNaturalAggregation = (aggregation) => aggregation.durationType !== 't' && aggregation.durationType !== 'r';
