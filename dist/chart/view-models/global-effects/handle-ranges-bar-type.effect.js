import { observable } from 'fp-ts-rxjs';
import { pipe } from 'fp-ts/function';
import { merge, switchMap, tap } from 'rxjs';
import { context } from '../../../context/context2';
import { waitForCandlesSet } from '../../../utils/chart';
import { AGGREGATION_PERIOD_1_HOUR } from '../../model/aggregation.model';
export const handleRangesBarTypeEffect = context.combine(context.key()('chart'), context.key()('aggregationPeriodViewModel'), context.key()('chartTypeViewModel'), (chart, aggregationPeriodViewModel, chartTypeViewModel) => {
    const changeToBarTypeIfRanges = pipe(aggregationPeriodViewModel.selectedPeriod, switchMap(() => pipe(waitForCandlesSet(chart), observable.filter(() => chartTypeViewModel.type.getValue() !== 'bar' &&
        aggregationPeriodViewModel.selectedPeriod.getValue().durationType === 'r'), tap(() => chartTypeViewModel.setType('bar')))));
    const changeAggregationIfRanges = pipe(chartTypeViewModel.type, observable.filter(type => type !== 'bar' && aggregationPeriodViewModel.selectedPeriod.getValue().durationType === 'r'), observable.map(() => {
        aggregationPeriodViewModel.changeAggregationPeriod(AGGREGATION_PERIOD_1_HOUR);
        // TODO HACK, think how we can manage order of two effects in separate VMs
        aggregationPeriodViewModel.selectedByUserPeriod.next(AGGREGATION_PERIOD_1_HOUR);
    }));
    return merge(changeToBarTypeIfRanges, changeAggregationIfRanges);
});
