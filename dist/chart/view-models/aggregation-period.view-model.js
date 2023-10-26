import { array, either, string } from 'fp-ts';
import { observable } from 'fp-ts-rxjs';
import { constTrue, pipe } from 'fp-ts/function';
import { combineLatest, merge, Subject } from 'rxjs';
import { finalize, skip, tap } from 'rxjs/operators';
import { context } from '../../context/context2';
import { newSink } from '../../context/sink2';
import { callTracerProxy } from '../../utils/debug/call-tracer';
import { createPropertyAdapter } from '../../utils/property.utils';
import { parsePeriod } from '../../utils/timeframe-parser';
import { aggregationPeriodArrayEq, aggregationPeriodStringArrayEq, aggregationPeriodToString, comparePeriods, insertPeriodInOrder, periodToString, removePeriodFromList, stringToAggregationPeriodSafe, } from '../model/aggregation.model';
import { validateEmptyString, validationError } from './utils/validators';
export const createAggregationPeriodViewModel = context.combine(context.key()('userDataViewModel'), context.key()('multiChartViewModel'), context.key()('actionsHistoryVM'), context.key()('initialAggregationPeriod'), context.key()('localization'), context.key()('chartId'), (userDataViewModel, multiChartViewModel, actionsHistoryVM, initialAggregationPeriod, localization, chartId) => {
    //#region state
    const initialMultiChartViewModelState = multiChartViewModel.state.getValue();
    const [setAllPeriods, allPeriods] = createPropertyAdapter([]);
    const [setCustomPeriods, customPeriods] = createPropertyAdapter([]);
    const [setSelectedAggregationPeriod, selectedAggregationPeriod] = createPropertyAdapter(getInitialAggregationPeriodType(initialMultiChartViewModelState, initialAggregationPeriod));
    const selectedByUserPeriod = new Subject();
    let aggregationRestrictionRule = constTrue;
    const aggregationPeriodChangedSubscribers = new Set();
    //#endregion
    //#region methods
    const onPeriodChanged = (cb) => {
        aggregationPeriodChangedSubscribers.add(cb);
        return () => aggregationPeriodChangedSubscribers.delete(cb);
    };
    const validateWithAggregationRestrictionRule = (period) => pipe(period, either.fromPredicate(aggregationRestrictionRule, () => validationError(localization.aggregationPeriod.validation_nonexistentCustomPeriod)));
    const removePeriod = (removedPeriod) => {
        const currentCustomPeriods = customPeriods.getValue();
        if (currentCustomPeriods.some(current => comparePeriods(current, removedPeriod))) {
            setCustomPeriods(removePeriodFromList(removedPeriod, currentCustomPeriods));
        }
    };
    const _addPeriod = (period) => {
        const currentAllPeriods = allPeriods.getValue();
        const currentCustomPeriods = customPeriods.getValue();
        if (!currentAllPeriods.some(current => comparePeriods(current, period))) {
            setCustomPeriods(insertPeriodInOrder(period, currentCustomPeriods));
        }
        const applyUponCreation = multiChartViewModel.getSelectedChartInfo().chartSettings.chartReact.aggregationPeriod.applyUponCreation;
        applyUponCreation && setSelectedAggregationPeriod(period);
    };
    const addRawPeriod = (periodString) => pipe(periodString, string.trim, validateEmptyString(), either.chain(validateAggregationPeriodString(localization.aggregationPeriod.validation_nonexistentCustomPeriod)), either.chain(validateWithAggregationRestrictionRule), either.fold(either.left, parsedPeriod => {
        _addPeriod(parsedPeriod);
        const applyUponCreation = multiChartViewModel.getChartInfo(chartId).chartSettings.chartReact.aggregationPeriod
            .applyUponCreation;
        // TODO HACK, think how we can manage order of two effects in separate VMs
        applyUponCreation && selectedByUserPeriod.next(selectedAggregationPeriod.getValue());
        return either.right(void 0);
    }));
    const addPeriod = (period) => pipe(period, validateWithAggregationRestrictionRule, either.fold(either.left, period => {
        _addPeriod(period);
        return either.right(void 0);
    }));
    const changeAggregationPeriod = (type) => {
        const sync = multiChartViewModel.state.getValue().isAggregationPeriodTypeSyncEnabled;
        const currentType = selectedAggregationPeriod.getValue();
        const action = (type) => {
            if (sync) {
                multiChartViewModel.setAggregationPeriodType(type);
            }
            else {
                setSelectedAggregationPeriod(type);
            }
        };
        const redo = () => action(type);
        const undo = () => action(currentType);
        actionsHistoryVM.pushAction({
            type: 'aggregation_change',
            redo,
            undo,
        });
    };
    const setAggregationRestrictionRule = (rule) => {
        aggregationRestrictionRule = rule;
    };
    //#endregion
    //#region effects
    const syncCustomPeriodsFromUserData = pipe(userDataViewModel.userData, observable.map(ud => ud.customPeriods), observable.filter(periods => periods.length !== customPeriods.getValue().length), observable.map(mapUserDataPeriodsToAggregationPeriods), observable.filter(periods => !aggregationPeriodArrayEq.equals(periods, customPeriods.getValue())), tap(setCustomPeriods));
    const syncCustomPeriodsToUserDataPeriods = pipe(customPeriods, skip(1), observable.map(array.map(aggregationPeriodToString)), observable.filter(periods => !aggregationPeriodStringArrayEq.equals(periods, userDataViewModel.userData.getValue().customPeriods)), tap(userDataViewModel.updateCustomPeriods));
    const syncCustomPeriodsToAllPeriods = pipe(customPeriods, skip(1), tap(setAllPeriods));
    const syncAggregationPeriodFromMultiChartEffect = pipe(combineLatest([multiChartViewModel.state, selectedAggregationPeriod]), observable.filter(([state, localAggregation]) => state.isAggregationPeriodTypeSyncEnabled &&
        periodToString(state.lastAggregationPeriodType) !== periodToString(localAggregation)), observable.map(([state]) => state.lastAggregationPeriodType), tap(setSelectedAggregationPeriod));
    const syncAggregationPeriodToMultiChartChartsEffect = pipe(selectedAggregationPeriod, tap(aggregationPeriod => multiChartViewModel.updateLocalChartInfo(chartId, {
        period: aggregationPeriod,
    })));
    const notifyAggregationPeriodChangedEffect = pipe(selectedAggregationPeriod, tap(() => aggregationPeriodChangedSubscribers.forEach(cb => cb(chartId, selectedAggregationPeriod.getValue()))), finalize(() => aggregationPeriodChangedSubscribers.clear()));
    //#endregion
    const effects = merge(syncCustomPeriodsToAllPeriods, syncCustomPeriodsToUserDataPeriods, syncCustomPeriodsFromUserData, syncAggregationPeriodFromMultiChartEffect, syncAggregationPeriodToMultiChartChartsEffect, notifyAggregationPeriodChangedEffect);
    return newSink(callTracerProxy('aggregationPeriodViewModel', {
        allPeriods,
        selectedPeriod: selectedAggregationPeriod,
        selectedByUserPeriod,
        setAllPeriods,
        addRawPeriod,
        addPeriod,
        removePeriod,
        changeAggregationPeriod,
        onPeriodChanged,
        setAggregationRestrictionRule,
    }), effects);
});
function mapUserDataPeriodsToAggregationPeriods(userDataPeriods) {
    return pipe(userDataPeriods, array.filterMap(stringToAggregationPeriodSafe));
}
const getInitialAggregationPeriodType = (state, defaultAggregation) => state.isAggregationPeriodTypeSyncEnabled ? state.lastAggregationPeriodType : defaultAggregation;
const validateAggregationPeriodString = (errorMessage) => (period) => pipe(period, parsePeriod, either.fromNullable(validationError(errorMessage)));
