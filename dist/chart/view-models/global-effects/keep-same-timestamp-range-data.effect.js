import { pipe } from 'fp-ts/function';
import { distinctUntilChanged } from 'rxjs';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { context } from '../../../context/context2';
import { waitForCandlesSet } from '../../../utils/chart';
/**
 * Keep same timestamp range on change data settings (extended hours, price type)
 */
export const keepSameTimestampRangeOnDataEffect = context.combine(context.key()('chart'), context.key()('timeFrameViewModel'), context.key()('chartConfiguratorViewModel'), (chart, timeFrameVM, chartConfigVM) => pipe(chartConfigVM.state.pipe(map(s => [s.settings.chartReact.extendedHours.visible, s.settings.chartReact.candlesData.price]), distinctUntilChanged((a, b) => a[0] === b[0] && a[1] === b[1])), withLatestFrom(timeFrameVM.timestampRange), switchMap(([, timestampRange]) => pipe(waitForCandlesSet(chart), map(() => timestampRange))), tap(timestampRange => {
    chart.chartModel.setTimestampRange(...timestampRange);
    chart.scale.doAutoScale(true);
})));
