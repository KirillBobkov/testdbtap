import { observable } from 'fp-ts-rxjs';
import { pipe } from 'fp-ts/function';
import { combineLatest, merge } from 'rxjs';
import { share, tap } from 'rxjs/operators';
import { context } from '../../context/context2';
import { newSink } from '../../context/sink2';
import { callTracerProxy } from '../../utils/debug/call-tracer';
import { createPropertyAdapter } from '../../utils/property.utils';
export const createChartTypeViewModel = context.combine(context.key()('chart'), context.key()('actionsHistoryVM'), context.key()('multiChartViewModel'), context.key()('chartTypesConfig'), context.key()('initialChartType'), context.key()('chartId'), (chart, actionsHistoryVM, multiChartViewModel, chartTypesConfig, initialChartType, chartId) => {
    const initialMultiChartViewModelState = multiChartViewModel.state.getValue();
    const [setLocalType, localType] = createPropertyAdapter(getInitialChartType(initialMultiChartViewModelState, initialChartType));
    const [, chartTypes] = createPropertyAdapter([...chartTypesConfig.listOfChartTypes]);
    const setType = (type) => {
        const sync = multiChartViewModel.state.getValue().isChartTypeSyncEnabled;
        const currentType = localType.getValue();
        const action = (type) => {
            if (sync) {
                multiChartViewModel.setChartType(type);
            }
            else {
                setLocalType(type);
            }
        };
        const redo = () => action(type);
        const undo = () => action(currentType);
        actionsHistoryVM.pushAction({
            type: 'chart_type_change',
            undo,
            redo,
        });
    };
    const syncLocalTypeToMultiChartChartsEffect = pipe(localType, tap(chartType => multiChartViewModel.updateLocalChartInfo(chartId, { chartType })));
    const syncToInstanceEffect = pipe(localType, tap(type => chart.setChartType(type)));
    const syncFromMultiChartEffect = combineLatest([multiChartViewModel.state, localType]).pipe(observable.filter(([state, localType]) => state.isChartTypeSyncEnabled && state.lastChartType !== localType), observable.map(([state]) => state.lastChartType), tap(setLocalType));
    const effects = pipe(merge(syncToInstanceEffect, syncFromMultiChartEffect, syncLocalTypeToMultiChartChartsEffect), share());
    const vm = callTracerProxy('chartTypeViewModel', {
        type: localType,
        types: chartTypes,
        setType,
    });
    return newSink(vm, effects);
});
const getInitialChartType = (state, defaultType) => state.isChartTypeSyncEnabled ? state.lastChartType : defaultType;
