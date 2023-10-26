import { uuid } from '@devexperts/dxcharts-lite/dist/chart/utils/uuid.utils';
import { createElement, useMemo } from 'react';
import { context } from '../../context/context2';
import { namedMemo } from '../../utils/named-memo';
import { useProperty } from '../../utils/react.utils';
import { useObservable } from '../../utils/use-observable';
import { CompareChartSelector } from '../components/compare-chart/compare-chart-selector.component';
import { createInstrumentSelectorViewModel } from '../view-models/instrument-selector.view-model';
import { toSuggest } from './instrument-selector/instrument-selector.model';
export const CompareChartSelectorContainer = context.combine(context.defer(createInstrumentSelectorViewModel, 'chartId'), context.key()('compareChartViewModel'), context.key()('chartDataViewModel'), (createCompareInstrumentSelectorVM, compareChartViewModel, chartDataVM) => namedMemo('CompareChartSelectorContainer', () => {
    const isDisabled = useObservable(compareChartViewModel.isDisabled, false);
    // TODO hack, I though defer should create a new model, but it doesn't :\
    const vm = useMemo(() => createCompareInstrumentSelectorVM({ chartId: uuid() }).value.value, []);
    // IMPORTANT useObservable should always use original object without any transformations
    // otherwise it will lead to infinity loop
    const instruments = useObservable(vm.data$, []);
    const data = instruments.map(toSuggest);
    const searchValue = useProperty(vm.searchValue);
    return createElement(CompareChartSelector, {
        isDisabled,
        data,
        searchInstruments: vm.searchInstruments,
        addCompareInstrument: chartDataVM.addCompareInstrument,
        searchValue,
    });
}));
