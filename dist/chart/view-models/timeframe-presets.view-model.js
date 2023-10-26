import { at } from '@devexperts/dxcharts-lite/dist/chart/utils/array.utils';
import { addDays } from 'date-fns';
import { array, number, option } from 'fp-ts';
import { observable } from 'fp-ts-rxjs';
import { contramap } from 'fp-ts/Ord';
import { constFalse, constUndefined, constVoid, flow, identity, pipe } from 'fp-ts/function';
import { from, merge, of, takeUntil } from 'rxjs';
import { catchError, distinctUntilChanged, filter, skip, switchMap, take, tap } from 'rxjs/operators';
import { context } from '../../context/context2';
import { newSink } from '../../context/sink2';
import { waitForCandlesSet } from '../../utils/chart';
import { convertToProperty, createPropertyAdapter } from '../../utils/property.utils';
import { notEmpty } from '../../utils/typeGuards';
import { aggregationPeriodEq, periodToMinutes } from '../model/aggregation.model';
import { timeframePeriods as DEFAULT_TIMEFRAME_PERIODS, MAX_PRESETS_NUMBER, applyLabelFormatting, getTimeframeBasedOnPeriod, getValueInDays, parseTimeframePresetFromString, serializeTimeframePreset, timeframePresetEq, } from '../model/timeframe-presets.model';
// if amount of days in the preset are below than the threshold
// then we will use trading days (not calendar) to select candles' range
const SESSIONS_TAKE_THRESHOLD_DAYS = 14;
export const createTimeframePresetsViewModel = context.combine(context.key()('multiChartDataService'), context.key()('chart'), context.key()('aggregationPeriodViewModel'), context.key()('initialTimeframePresets'), context.key()('userDataViewModel'), context.key()('chartId'), context.key()('chartSessionsViewModel'), context.key()('chartConfiguratorViewModel'), context.key()('multiChartViewModel'), (multiChartDataService, chart, aggregationPeriodViewModel, timeframePresetsConfig, userDataVM, chartId, chartSessionsViewModel, chartConfiguratorVM, multiChartViewModel) => {
    const initialMultiChartViewModelInfo = multiChartViewModel.getChartInfo(chartId);
    const [setSelectedTimeframePreset, selectedTimeframePreset] = createPropertyAdapter(initialMultiChartViewModelInfo.timeframePreset ?? null, constFalse);
    const [setTimeframePresetList, timeframePresetList] = createPropertyAdapter(getInitialTimeframePresetList(userDataVM, timeframePresetsConfig));
    const selectPreset = (preset) => {
        pipe(timeframePresetList.getValue(), array.findFirst(currentPreset => timeframePresetEq.equals(currentPreset, preset)), option.fold(constUndefined, setSelectedTimeframePreset));
    };
    const _doAddPreset = (preset) => pipe(timeframePresetList.getValue(), array.append(preset), setTimeframePresetList);
    const addPreset = (preset) => {
        const currentPresets = timeframePresetList.getValue();
        pipe(currentPresets, checkForPresetAlreadyExist(preset), isExist => isExist || checkForPresetsIsOverflowMaxSize(currentPresets), option.fromPredicate(identity), option.fold(() => _doAddPreset(preset), constVoid));
    };
    const deletePreset = (preset) => pipe(timeframePresetList.getValue(), array.filter(currentPreset => !timeframePresetEq.equals(currentPreset, preset)), setTimeframePresetList);
    const setTimeframeParams = (start, end) => {
        chart.scale.setXScale(start, end);
        chart.scale.doAutoScale(true);
        Object.values(chart.paneManager.panes).forEach(p => p.scale.doAutoScale(true));
    };
    const setTimeframeRangeToChartByTimeframePresetEffect = pipe(selectedTimeframePreset, filter(notEmpty), switchMap(preset => {
        const filter = chartConfiguratorVM.state.getValue().settings.chartReact.extendedHours
            .visible
            ? ['REGULAR', 'PRE_MARKET', 'AFTER_MARKET']
            : ['REGULAR'];
        return from(chartSessionsViewModel
            .generateSessions(filter, addDays(Date.now(), -SESSIONS_TAKE_THRESHOLD_DAYS * 2).getTime())
            .then(sessions => [preset, sessions.REGULAR ?? []]));
    }), switchMap(([preset, sessions]) => {
        const now = Date.now();
        const lastRegularSessionsTimeStamp = (sessions && at(-1, sessions)?.to) ?? chart.chartModel.getLastCandle()?.timestamp ?? now;
        const lastTimeStamp = lastRegularSessionsTimeStamp > now ? now : lastRegularSessionsTimeStamp;
        const rangeInDays = getValueInDays(preset);
        let firstTimestamp = addDays(Date.now(), -rangeInDays).getTime();
        if (rangeInDays <= SESSIONS_TAKE_THRESHOLD_DAYS) {
            firstTimestamp = getStartTimestamp(rangeInDays, lastTimeStamp, sessions, preset);
        }
        if (aggregationPeriodEq.equals(aggregationPeriodViewModel.selectedPeriod.getValue(), preset.aggregation)) {
            const firstCandleTs = chart.chartModel.mainCandleSeries.dataPoints[0]?.timestamp;
            firstCandleTs &&
                multiChartDataService.requestMoreHistoryData(chartId, {
                    fromTime: firstTimestamp,
                    toTime: firstCandleTs,
                });
            return of(firstTimestamp);
        }
        else {
            //#region load required amount of data
            // chart-data vm takes xScaleViewport.startTimeStamp to request data
            // TODO rework this?
            multiChartViewModel.updateLocalChartInfo(chartId, {
                xScaleViewport: {
                    startTimestamp: firstTimestamp,
                    endTimestamp: multiChartViewModel.getChartInfo(chartId).xScaleViewport.endTimestamp,
                },
            });
            //#endregion
            // TODO hack, if the data for the period is already loaded
            // then candles will be set immediately and sub below (candles set) won't work
            setTimeout(() => {
                aggregationPeriodViewModel.changeAggregationPeriod(preset.aggregation);
            }, 0);
            return pipe(waitForCandlesSet(chart), observable.map(() => firstTimestamp));
        }
    }), tap(startTimestamp => {
        let firstCandleByPreset = chart.chartModel.candleFromTimestamp(startTimestamp);
        const firstCandle = chart.chartModel.getVisualCandle(0);
        // HACK just for the demo, to make all default timeframe preset works fine
        if (selectedTimeframePreset.getValue()?.timeframe.label === 'All' && firstCandle) {
            firstCandleByPreset = firstCandle;
        }
        const lastCandleByPreset = chart.chartModel.getLastVisualCandle();
        const startUnit = firstCandleByPreset.startUnit ?? 0;
        const endUnit = pipe(option.fromNullable(lastCandleByPreset), option.map(candle => candle.startUnit + candle.width), option.getOrElse(() => 0));
        setTimeframeParams(startUnit, endUnit);
    }), catchError(err => {
        console.error(err);
        return of([]);
    }));
    const resetTimeframePresetOnUserActionEffect = pipe(
    // the effect should work only after preset is actually applied
    setTimeframeRangeToChartByTimeframePresetEffect, switchMap(() => pipe(merge(aggregationPeriodViewModel.selectedPeriod.pipe(observable.filter(period => {
        const aggregation = selectedTimeframePreset.getValue()?.aggregation;
        return aggregation !== undefined && !aggregationPeriodEq.equals(period, aggregation);
    })), chart.scale.xChanged), 
    // skip 1 because propery is behaviour subject, which fires value on subscribe
    takeUntil(selectedTimeframePreset.pipe(skip(1))), take(1))), tap(() => setSelectedTimeframePreset(null)));
    //#region aggregation and timeframe component logic
    const [setTimeframePeriods, timeframePeriods] = createPropertyAdapter(DEFAULT_TIMEFRAME_PERIODS);
    const [setSelectedTimeframePeriod, selectedTimeframePeriod] = createPropertyAdapter(DEFAULT_TIMEFRAME_PERIODS[0]);
    const [setSelectedCustomTimeframe, selectedCustomTimeframe] = createPropertyAdapter(getTimeframeBasedOnPeriod(DEFAULT_TIMEFRAME_PERIODS[0])[0]);
    const changeSelectedTimeframePeriod = (period) => {
        setSelectedTimeframePeriod(period);
    };
    const changeSelectedCustomTimeframe = (timeframe) => {
        setSelectedCustomTimeframe(timeframe);
    };
    const saveCustomPeriodTimeframe = (aggregation, _timeframe) => {
        const preset = applyLabelFormatting(_timeframe, aggregation);
        addPreset(preset);
        return preset;
    };
    const setAggregationRestrictionRule = (rule) => pipe(DEFAULT_TIMEFRAME_PERIODS, array.filter(rule), setTimeframePeriods);
    const sortedPresets = pipe(timeframePresetList, observable.map(presets => pipe(presets, array.sort(contramap(
    // Add aggregation value in minutes to timeframe value
    // so it will sort multiple timeframe presets with different aggregations in ascending order.
    // Since timeframe value is presented in ms and much bigger than aggregation in minutes we can just sum them
    // in order to achieve desired sorting behaviour
    (preset) => preset.timeframe.value + periodToMinutes(preset.aggregation))(number.Ord)))));
    const customTimeframes = pipe(selectedTimeframePeriod, observable.map(getTimeframeBasedOnPeriod), distinctUntilChanged());
    const syncTimeframePresetsToMultiChartChartsEffect = pipe(selectedTimeframePreset, tap(timeframePreset => {
        multiChartViewModel.updateLocalChartInfo(chartId, { timeframePreset: timeframePreset ?? undefined });
    }));
    const syncTimeframePresetsToUserDataEffect = pipe(timeframePresetList, observable.map(array.map(serializeTimeframePreset)), tap(userDataVM.updateTimeframePresetsList));
    const syncTimeframePresetsFromUserDataEffect = pipe(userDataVM.userData, skip(1), observable.map(ud => ud.timeframePresets), observable.filter(userDataTimeframePresets => userDataTimeframePresets.length !== timeframePresetList.getValue().length), observable.map(array.filterMap(parseTimeframePresetFromString)), tap(setTimeframePresetList));
    //#endregion
    const effects = merge(resetTimeframePresetOnUserActionEffect, syncTimeframePresetsToUserDataEffect, syncTimeframePresetsFromUserDataEffect, syncTimeframePresetsToMultiChartChartsEffect);
    return newSink({
        presets: convertToProperty(sortedPresets, []),
        selectPreset,
        addPreset,
        deletePreset,
        timeframePeriods,
        customTimeframes,
        selectedTimeframePeriod,
        changeSelectedTimeframePeriod,
        selectedCustomTimeframe,
        changeSelectedCustomTimeframe,
        saveCustomPeriodTimeframe,
        defaultTimeframePresetsList: timeframePresetsConfig.presets,
        selectedTimeframePreset,
        setSelectedTimeframePreset,
        setAggregationRestrictionRule,
    }, effects);
});
export const checkForPresetAlreadyExist = (preset) => (presets) => pipe(presets, array.elem(timeframePresetEq)(preset));
export const checkForPresetsIsOverflowMaxSize = (presets, MAX_SIZE = MAX_PRESETS_NUMBER) => presets.length >= MAX_SIZE;
const getInitialTimeframePresetList = (userDataVM, timeframePresetsConfig) => pipe(userDataVM.userData.getValue().timeframePresets, option.fromPredicate(a => a.length !== 0), option.fold(() => timeframePresetsConfig.presets, flow(array.filterMap(parseTimeframePresetFromString))));
const getStartTimestamp = (rangeInDays, lastCandleTimestamp, listOfSessions, preset) => {
    const session = listOfSessions.reverse()[rangeInDays - 1];
    return session?.from ?? lastCandleTimestamp - preset.timeframe.value * 1000;
};
