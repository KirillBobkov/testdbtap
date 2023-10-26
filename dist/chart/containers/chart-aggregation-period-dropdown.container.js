import { createElement, useCallback } from 'react';
import { context } from '../../context/context2';
import { namedMemo } from '../../utils/named-memo';
import { useObservable } from '../../utils/use-observable';
import { ChartAggregationPeriodDropdown } from '../components/chart-period/chart-aggregation-period-dropdown.component';
import { AGGREGATION_PERIOD_1_HOUR, InitialAggregationPeriods } from '../model/aggregation.model';
export const ChartAggregationPeriodDropdownContainer = context.combine(context.key()('aggregationPeriodViewModel'), aggregationPeriodViewModel => namedMemo('ChartAggregationPeriodDropdownContainer', () => {
    const selectedPeriod = useObservable(aggregationPeriodViewModel.selectedPeriod, AGGREGATION_PERIOD_1_HOUR);
    const allPeriods = useObservable(aggregationPeriodViewModel.allPeriods, InitialAggregationPeriods);
    const onPeriodSelect = useCallback((period) => {
        aggregationPeriodViewModel.changeAggregationPeriod(period);
        // TODO HACK, think how we can manage order of two effects in separate VMs
        aggregationPeriodViewModel.selectedByUserPeriod.next(period);
    }, []);
    return createElement(ChartAggregationPeriodDropdown, {
        onPeriodSelect,
        selectedPeriod,
        allPeriods,
        addPeriod: aggregationPeriodViewModel.addRawPeriod,
        removePeriod: aggregationPeriodViewModel.removePeriod,
    });
}));
