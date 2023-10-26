import { context } from '../../context/context2';
import { newSink } from '../../context/sink2';
import { combineLatest, merge } from 'rxjs';
import { pipe } from 'fp-ts/function';
import { observable } from 'fp-ts-rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { createAdapter } from '../../utils/adapter.utils';
import { timestampRangeEq } from '../model/timeframe.model';
export const createTimeFrameViewModel = context.combine(context.key()('chart'), context.key()('multiChartViewModel'), context.key()('chartId'), (chart, multiChartViewModel, chartId) => {
    //#region state
    const [setTimestampRange, timestampRange] = createAdapter();
    const [setTimeUnits, timeUnits] = createAdapter();
    //#endregion
    //#region effects
    const updateTimestampRangeEffect = pipe(
    // edge case: we have default scale, after that we change aggregation, and since scale is not changed (we have the same units)
    // xChanged subject is not triggered - that's why we need candlesSetSubject
    merge(chart.scale.xChanged, chart.chartModel.candlesSetSubject), tap(() => setTimestampRange([
        chart.chartModel.getFirstTimestamp(false),
        chart.chartModel.getLastTimestamp(false),
    ])));
    const updateTimeUnitsEffect = pipe(chart.scale.xChanged, tap(() => setTimeUnits([chart.chartModel.scale.xStart, chart.chartModel.scale.xEnd])));
    const updateLocalAndMultiChartTimeUnitsEffect = pipe(timeUnits, 
    // don't react on scale changes if there are no candles on chart
    observable.filter(_ => chart.chartModel.getCandlesCount() > 0 &&
        // only selected chart can send timeUnits updates...
        multiChartViewModel.selectedChartId.getValue() === chartId), distinctUntilChanged(timestampRangeEq.equals), tap(chartTimeUnits => multiChartViewModel.updateTimeUnits([...chartTimeUnits])));
    // set new scale when timeUnits changed or sync enabled
    const syncTimestampFromMultiChartEffect = pipe(combineLatest([
        multiChartViewModel.timeUnits,
        multiChartViewModel.state.pipe(map(state => state.isAggregationPeriodTypeSyncEnabled), distinctUntilChanged()),
        // sometimes timeUnits are changed because of side effects like resize, we need to make sure they are in sync with a selected chart
        // so this effect will be triggered on every change, and will set correct timeUnits if sync is on
        timeUnits,
        chart.chartModel.candlesSetSubject,
    ]), observable.filter(([_, isAggregationPeriodTypeSyncEnabled]) => isAggregationPeriodTypeSyncEnabled &&
        // we don't want to apply updates from the same chart
        multiChartViewModel.selectedChartId.getValue() !== chartId), tap(([timeUnits]) => {
        const timeRange = multiChartViewModel.timestampRange.getValue();
        // first step - get units which exactly match the timestamps
        // this is important because charts may have different amount of loaded candles,
        // so time units (which is not based on timestamps) may be different since time units are calculated based on candles count
        const startUnit = chart.chartModel.candleFromTimestamp(timeRange[0]).startUnit;
        const endUnit = chart.chartModel.candleFromTimestamp(timeRange[1]).startUnit;
        // however, timestamp show only discrete coordinates (it can't show 4.23 candle, for instance)
        // so we need to use timeUnits from the selected chart which shows real visible part of the candle
        // 4.23 % 1 = 0.23
        const firstCandlePart = timeUnits[0] % 1;
        const lastCandlePart = timeUnits[1] % 1;
        chart.scale.setXScale(startUnit + firstCandlePart, endUnit + lastCandlePart);
    }));
    const updateLocalAndMultiChartTimestampEffect = pipe(timestampRange, 
    // don't react on scale changes if there are no candles on chart
    observable.filter(_ => chart.chartModel.getCandlesCount() > 0 &&
        // only selected chart can send timestamp updates...
        multiChartViewModel.selectedChartId.getValue() === chartId), distinctUntilChanged(timestampRangeEq.equals), tap(chartTimestamp => multiChartViewModel.updateTimestampRange([...chartTimestamp])));
    //#endregion
    const effects = merge(updateLocalAndMultiChartTimestampEffect, syncTimestampFromMultiChartEffect, updateLocalAndMultiChartTimeUnitsEffect, updateTimestampRangeEffect, updateTimeUnitsEffect);
    return newSink({
        timestampRange,
        setTimestampRange,
        setTimeUnits,
    }, effects);
});
