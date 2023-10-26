import { firstOf, lastOf } from '@devexperts/dxcharts-lite/dist/chart/utils/array.utils';
import { array, nonEmptyArray, option, record, string, tuple } from 'fp-ts';
import { observable, observableOption } from 'fp-ts-rxjs';
import { head } from 'fp-ts/NonEmptyArray';
import { constVoid, identity, pipe } from 'fp-ts/function';
import { combineLatest, debounceTime, merge, of, pairwise, startWith } from 'rxjs';
import { distinctUntilChanged, share, skip, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { context } from '../../../context/context2';
import { createAdapter } from '../../../utils/adapter.utils';
import { callTracerProxy } from '../../../utils/debug/call-tracer';
import { filterMapOption } from '../../../utils/monad-functions';
import { createPropertyAdapter } from '../../../utils/property.utils';
import { sink } from '../../../utils/sink';
import { instrumentToChartInstrument } from '../../model/instrument.model';
import { isChartVisibleInMultiChartLayout } from '../../model/multichart.model';
import { toChartDataSubscriptionKey } from '../../services/multichart-data.utils';
import { chartDataID } from '../loading/initial-loader.vm';
const initialValues = context.combine(context.key()('initialInstrument'), context.key()('initialExtendedHours'), context.key()('initialPriceType'), context.key()('chartId'), (initialInstrument, initialExtendedHours, initialPriceType, chartId) => ({
    initialInstrument,
    initialExtendedHours,
    initialPriceType,
    chartId,
}));
export const createChartDataViewModel = context.combine(context.key()('multiChartDataService'), context.key()('utilityDataService'), context.key()('chart'), context.key()('multiChartViewModel'), context.key()('actionsHistoryVM'), context.key()('aggregationPeriodViewModel'), context.key()('chartReactConfig'), context.key()('instrumentSelectorViewModel'), context.key()('dataLoaderVM'), context.key()('initialLoaderVM'), initialValues, context.key()('notificationVM'), context.key()('localization'), (multiChartDataService, utilityDataService, chart, multiChartViewModel, actionsHistoryVM, aggregationPeriodViewModel, chartReactConfig, instrumentSelectorViewModel, dataLoaderVM, initialLoaderVM, { initialInstrument, initialPriceType, initialExtendedHours, chartId }, notificationVM, localization) => {
    const instrument = option.fromNullable(option.toUndefined(initialInstrument) ??
        option.toUndefined(multiChartViewModel.getChartInfo(chartId).instrument));
    //#region state
    const [setSelectedInstrument, selectedInstrument] = createPropertyAdapter(instrument);
    const [setMainInstrument, mainInstrument] = createPropertyAdapter(option.none);
    const [setServiceData, serviceData] = createPropertyAdapter({});
    const [setCompareInstruments, compareInstruments] = createPropertyAdapter({});
    const [setExtendedHours, extendedHours] = createPropertyAdapter(initialExtendedHours);
    const priceTypes = chartReactConfig.priceTypes;
    const initialPriceTypeVM = priceTypes.includes(initialPriceType)
        ? initialPriceType
        : takeFirstAvailablePriceType(priceTypes);
    const [setPriceType, priceType] = createPropertyAdapter(initialPriceTypeVM);
    const [setCandlesAlign, candlesAlign] = createPropertyAdapter('midnight');
    const [fireHistoricalCandlesUpdated, historicalCandlesUpdated] = createAdapter();
    const [fireLastCandleUpdated, lastCandleUpdated] = createAdapter();
    const notificationShownForInstrument = new Set();
    const aggregationPeriod = aggregationPeriodViewModel.selectedPeriod;
    /**
     * Observable indicates that some of the properties,
     * that requires fetch the data from the provider, changed
     */
    const propertiesToSubscribeDataChanged = combineLatest([
        filterMapOption(mainInstrument),
        aggregationPeriod,
        compareInstruments,
        extendedHours,
        priceType,
        candlesAlign,
    ]);
    /**
     * Observable indicates that multichart layout changed,
     * therefore we should fetch the data for the charts,
     * that previously were invisible due to layout
     */
    const multichartLayoutToSubscribeDataChanged = pipe(multiChartViewModel.state, observable.map(s => s.layout), distinctUntilChanged());
    const visibilityChanged = pipe(multichartLayoutToSubscribeDataChanged, pairwise(), observable.map(([prevLayout, currentLayout]) => {
        const visibleNow = isChartVisibleInMultiChartLayout(currentLayout, parseInt(chartId, 10));
        const wasVisible = isChartVisibleInMultiChartLayout(prevLayout, parseInt(chartId, 10));
        return visibleNow && !wasVisible;
    }), startWith(isChartVisibleInMultiChartLayout(multiChartViewModel.state.getValue().layout, parseInt(chartId, 10))), distinctUntilChanged(), observable.filter(identity));
    const shouldSubscribeToData = pipe(combineLatest([propertiesToSubscribeDataChanged, visibilityChanged]), observable.filter(() => option.isSome(mainInstrument.getValue())), observable.map(tuple.extract));
    /**
     * - request all existing chart instruments history data
     * - use same aggregation for all
     * - wait for all data to come (with some timeout)
     * - set all data to chart at once - to minimize complexity and visual lags
     */
    const historyData = pipe(shouldSubscribeToData, observable.map(([mainInstrument, aggregationPeriod, compareInstruments, extendedHours, priceType, candlesAlign]) => ({
        mainInstrument,
        compareInstruments: pipe(compareInstruments, record.collect(string.Ord)((_, i) => i.symbol)),
        aggregationPeriod,
        extendedHours,
        priceType,
        candlesAlign,
    })), tap(() => dataLoaderVM.setDataIsLoading(true)), switchMap(({ mainInstrument, compareInstruments, aggregationPeriod, extendedHours, priceType, candlesAlign }) => {
        const startTimestamp = Math.min(multiChartViewModel.state.getValue().charts[parseInt(chartId, 10)].xScaleViewport
            .startTimestamp, 
        // without this chart can request less data than it was requested before
        firstOf(chart.chartModel.mainCandleSeries.dataPoints)?.timestamp ?? Date.now());
        const symbols = [mainInstrument.symbol, ...compareInstruments];
        const options = filterAvailableDataOptions({
            candleAlignment: candlesAlign,
            priceType,
            extendedHours,
            priceIncrement: lastOf(mainInstrument.priceIncrements),
            fromTime: startTimestamp,
        }, chartReactConfig);
        const sub = multiChartDataService.subscribeSymbolsHistoryData(chartId, symbols, aggregationPeriod, options);
        return pipe(sub, observable.map(response => {
            // update loading state
            dataLoaderVM.setDataIsLoading(false);
            const emptyInstruments = [];
            const instruments = response.map(resp => {
                if (!(resp.data instanceof Error)) {
                    return resp;
                }
                emptyInstruments.push(resp.instrument);
                return {
                    data: [],
                    instrument: resp.instrument,
                    type: 'HISTORICAL',
                };
            });
            showNoDataNotification(emptyInstruments);
            return instruments;
        }));
    }), share());
    const clearChartDataFromApi = () => {
        multiChartDataService.unsubscribeSymbolData(chartId);
        setSelectedInstrument(option.none);
        setMainInstrument(option.none);
        chart.setData([
            {
                candles: [],
                instrument: {
                    symbol: '',
                    description: '',
                    priceIncrements: [],
                },
            },
        ]);
        fireHistoricalCandlesUpdated([]);
        fireLastCandleUpdated(undefined);
        setCompareInstruments({});
    };
    const showNoDataNotification = (noDataInstruments) => {
        const str = noDataInstruments
            .filter(instr => !notificationShownForInstrument.has(instr))
            .reduce((acc, instr, idx) => (idx === 0 ? `${instr}` : `${acc}, ${instr}`), '');
        if (str) {
            notificationVM.sendNotification(`${localization.notifications.notificationInstrumentNoData} ${str}`, {
                displayTime: 5000,
            });
        }
        noDataInstruments.forEach(shownI => notificationShownForInstrument.add(shownI));
    };
    const isLimitOfPointsReached = (points, limit) => points.length >= limit;
    const initialHistoryData = pipe(historyData, observable.filter(data => pipe(data, array.every(d => d.type === 'HISTORICAL'))), 
    // if initial history data length is more than maxCandlesCount from config, cut availble part
    observable.map(historyData => {
        const { maxCandlesCount } = chartReactConfig.chartDataOptionsSettings;
        return historyData.map(historyDataSeries => ({
            ...historyDataSeries,
            data: historyDataSeries.data.slice(-maxCandlesCount),
        }));
    }));
    const lazyHistoryData = pipe(historyData, observable.filter(data => pipe(data, array.every(d => d.type === 'LAZY'))), observable.filter(lazyData => {
        const { maxCandlesCount } = chartReactConfig.chartDataOptionsSettings;
        return lazyData.some(lazyDataSeries => {
            const series = chart.chartModel.candleSeries.find(chartSeries => chartSeries.instrument.symbol === lazyDataSeries.instrument);
            if (series?.dataPoints) {
                return series.dataPoints.length < maxCandlesCount;
            }
            return true;
        });
    }), observable.map(lazyData => {
        const lazyHistoryData = [];
        const { maxCandlesCount } = chartReactConfig.chartDataOptionsSettings;
        // pick only existing series with array.reduce
        return lazyData.reduce((lazyDataAccumulator, lazyDataSeries) => {
            const series = chart.chartModel.candleSeries.find(chartSeries => chartSeries.instrument.symbol === lazyDataSeries.instrument);
            if (series?.dataPoints) {
                // if lazy data length is more than maxCandlesCount from config, cut availble part
                const cutNumber = maxCandlesCount - series.dataPoints.length;
                return [
                    ...lazyDataAccumulator,
                    { ...lazyDataSeries, data: lazyDataSeries.data.slice(-cutNumber) },
                ];
            }
            return lazyDataAccumulator;
        }, lazyHistoryData);
    }));
    /**
     * - subscribes to all existing chart instruments last candle data
     */
    const lastCandleData = pipe(shouldSubscribeToData, switchMap(([instrument, aggregation, compareInstruments, extendedHours, priceType, candlesAlign]) => multiChartDataService.subscribeLastCandleUpdates([
        instrument.symbol,
        ...pipe(record.toArray(compareInstruments), array.map(tuple.snd), array.map(i => i.symbol)),
    ], aggregation, filterAvailableDataOptions({
        candleAlignment: candlesAlign,
        priceType,
        extendedHours,
        priceIncrement: lastOf(instrument.priceIncrements),
    }, chartReactConfig))));
    //#endregion
    //#region methods
    const addCompareInstrument = (instrumentToAdd) => {
        const currentCompareInstruments = compareInstruments.getValue();
        const isAlreadyAdded = record.has(instrumentToAdd.symbol, currentCompareInstruments);
        if (isAlreadyAdded) {
            return;
        }
        const action = (state) => {
            setCompareInstruments(state);
        };
        const updatedCompareInstruments = pipe(currentCompareInstruments, record.upsertAt(instrumentToAdd.symbol, instrumentToAdd));
        const redo = () => action(updatedCompareInstruments);
        const undo = () => action(currentCompareInstruments);
        actionsHistoryVM.pushAction({
            type: 'compare_change',
            redo,
            undo,
        });
    };
    const addCompareInstrumentFromApi = (instrument) => addCompareInstrument({ symbol: instrument });
    const setCompareInstrumentsFromApi = (instruments) => {
        const compareObj = {};
        instruments.forEach(i => Object.assign(compareObj, { [i]: { symbol: i } }));
        setCompareInstruments(compareObj);
    };
    const removeCompareInstrument = (instrumentToRemove) => {
        const action = (state) => {
            setCompareInstruments(state);
        };
        const currentCompareInstruments = compareInstruments.getValue();
        const updatedCompareInstruments = pipe(currentCompareInstruments, record.deleteAt(instrumentToRemove));
        const redo = () => action(updatedCompareInstruments);
        const undo = () => action(currentCompareInstruments);
        actionsHistoryVM.pushAction({
            type: 'compare_change',
            redo,
            undo,
        });
    };
    const changeInstrument = (instrument) => {
        if (instrumentEq.equals(instrument, selectedInstrument.getValue())) {
            return;
        }
        const sync = multiChartViewModel.state.getValue().isInstrumentSyncEnabled;
        const currentInstrument = selectedInstrument.getValue();
        const action = (instrument) => {
            if (sync) {
                multiChartViewModel.setInstrument(instrument);
            }
            else {
                setSelectedInstrument(instrument);
            }
        };
        const redo = () => action(instrument);
        const undo = () => action(currentInstrument);
        actionsHistoryVM.pushAction({
            type: 'instrument_change',
            redo,
            undo,
        });
    };
    //#endregion
    //#region effects
    const syncInitialHistoryDataTochartEffect = pipe(initialHistoryData, withLatestFrom(filterMapOption(mainInstrument), compareInstruments), tap(([chartData, mainInstrument, compareInstruments]) => pipe(chartData, array.foldLeft(constVoid, (mainData, compareData) => {
        chart.setData([
            {
                candles: mainData.data.map(toCandles),
                instrument: instrumentToChartInstrument(mainInstrument),
            },
            ...pipe(compareData, array.map(data => ({
                candles: data.data.map(toCandles),
                instrument: compareInstruments[data.instrument],
            }))),
        ]);
        fireHistoricalCandlesUpdated(mainData.data);
    }))));
    const syncLazyHistoryDataTochartEffect = pipe(lazyHistoryData, withLatestFrom(filterMapOption(mainInstrument), compareInstruments), tap(([chartData, mainInstrument, compareInstruments]) => pipe(chartData, option.fromPredicate(array.isNonEmpty), option.fold(constVoid, datas => pipe(datas, nonEmptyArray.matchLeft((mainData, compareDatas) => {
        chart.updateData([
            {
                candles: mainData.data.map(toCandles),
                instrument: instrumentToChartInstrument(mainInstrument),
            },
            ...pipe(compareDatas, array.map(compareData => ({
                candles: compareData.data.map(toCandles),
                instrument: compareInstruments[compareData.instrument],
            }))),
        ]);
    }))))));
    const syncLastCandleDataTochartEffect = pipe(lastCandleData, withLatestFrom(filterMapOption(mainInstrument), compareInstruments, historicalCandlesUpdated), 
    // last candles data shouldn't be set, until history data is fullfilled
    observable.filter(([_, __, ___, candlesSet]) => !array.isEmpty(candlesSet)), observable.map(([data, mainInstrument, compareInstruments]) => ({
        data,
        instruments: {
            [mainInstrument.symbol]: mainInstrument,
            ...compareInstruments,
        },
    })), observable.filterMap(({ data: { candleData, symbol }, instruments }) => pipe(instruments, record.lookup(symbol), option.map(instrument => ({ instrument, candleData })))), tap(({ candleData, instrument }) => {
        const series = chart.chartModel.candleSeries.find(s => s.instrument.symbol === instrument.symbol);
        // if candle already exists - update it
        if (series && series.dataPoints.at(-1)?.timestamp === candleData.time) {
            chart.data.updateLastCandle(toCandles(candleData), instrument.symbol);
        }
        else {
            // if candle doesn't exist - add new last candle and remove first candle if limit of candles is reached
            chart.data.addLastCandle(toCandles(candleData), instrument.symbol);
            series &&
                isLimitOfPointsReached(series.dataPoints, chartReactConfig.chartDataOptionsSettings.maxCandlesCount) &&
                chart.data.removeCandleByIdx(0, instrument.symbol);
        }
        fireLastCandleUpdated(candleData);
    }));
    const serviceDataUpdateEffect = pipe(filterMapOption(mainInstrument), observable.map(i => i.symbol), distinctUntilChanged(), switchMap(utilityDataService.subscribeServiceData), tap(setServiceData));
    const requestMoreDataEffect = pipe(chart.scale.xChanged, skip(1), observable.filter(() => chart.scale.xStart < 0), 
    // preventing too much runs of a scale changed event
    debounceTime(300), tap(() => {
        if (chart.scale.xStart < 0) {
            const { maxCandlesCount } = chartReactConfig.chartDataOptionsSettings;
            const firstAvailableCandleTs = chart.chartModel.mainCandleSeries.dataPoints[0]?.timestamp;
            // request more candles only if maxCandlesCount < current candles
            !isLimitOfPointsReached(chart.chartModel.mainCandleSeries.dataPoints, maxCandlesCount) &&
                firstAvailableCandleTs &&
                multiChartDataService.requestMoreHistoryData(chartId, { toTime: firstAvailableCandleTs });
        }
    }));
    const syncMainInstrumentAndThoToMultiChartChartsEffect = pipe(combineLatest([selectedInstrument, extendedHours, aggregationPeriod]), tap(([selectedInstrument, extendedHours]) => {
        multiChartViewModel.updateLocalChartInfo(chartId, {
            instrument: selectedInstrument,
            extendedHours,
        });
    }));
    /**
     * On chart load there are no instrument info, so try to load it
     */
    const requestInstrumentData = pipe(selectedInstrument, observable.filter(i => option.isSome(i)), observableOption.chain(i => instrumentSelectorViewModel.getInstrument(i)), observableOption.fold(() => {
        chart.watermark.setWaterMarkData({
            firstRow: localization.systemMessages.instrumentIsNotAvailable,
        });
        chart.watermark.setWaterMarkVisible(true);
        // update state for not available instrument
        pipe(selectedInstrument.getValue(), option.fold(() => undefined, i => {
            const subKey = toChartDataSubscriptionKey(i, aggregationPeriod.getValue(), {
                candleAlignment: candlesAlign.getValue(),
                priceType: priceType.getValue(),
                extendedHours: extendedHours.getValue(),
            });
            initialLoaderVM.updateLoadingState(chartDataID(subKey), 'done');
        }));
        return of(option.none);
    }, i => {
        setMainInstrument(option.some(i));
        return of(option.some(i));
    }));
    const initialInstrumentNotSelectedEffect = pipe(selectedInstrument, 
    // show empty message only after layout is loaded
    observable.filter(() => initialLoaderVM.isLoaded.getValue()), distinctUntilChanged(), tap(i => pipe(i, option.fold(() => {
        chart.watermark.setWaterMarkData({
            firstRow: localization.systemMessages.instrumentIsNotSelected,
        });
        chart.watermark.setWaterMarkVisible(true);
    }, constVoid))));
    const syncInstrumentFromMultiChartEffect = pipe(combineLatest([multiChartViewModel.state, selectedInstrument]), observable.filter(([state]) => state.isInstrumentSyncEnabled), observable.map(([state]) => state.lastInstrument), tap(setSelectedInstrument));
    const enableEmptyChartOnHistoryDataEffect = pipe(initialHistoryData, 
    // check that history data contains main instrument with empty array of candles
    observable.filter(historyData => pipe(historyData, array.some(chartData => pipe(mainInstrument.getValue(), option.fold(() => false, i => chartData.instrument === i.symbol && chartData.data.length === 0))))), tap(() => {
        chart.watermark.setWaterMarkData({
            firstRow: localization.systemMessages.noDataAvailable,
        });
        chart.watermark.setWaterMarkVisible(true);
    }));
    //#endregion
    const effects = pipe(merge(syncInitialHistoryDataTochartEffect, syncLazyHistoryDataTochartEffect, syncLastCandleDataTochartEffect, serviceDataUpdateEffect, syncInstrumentFromMultiChartEffect, syncMainInstrumentAndThoToMultiChartChartsEffect, requestMoreDataEffect, requestInstrumentData, initialInstrumentNotSelectedEffect, enableEmptyChartOnHistoryDataEffect), share());
    return sink.newSink(callTracerProxy('chartDataViewModel', {
        selectedInstrument,
        instrument: mainInstrument,
        compareInstruments,
        priceType,
        candlesAlign,
        extendedHours,
        historicalCandlesUpdated,
        lastCandleUpdated,
        lazyHistoryData,
        initialHistoryData,
        changeInstrument,
        addCompareInstrument,
        removeCompareInstrument,
        setCompareInstruments,
        setExtendedHours,
        changePriceType: setPriceType,
        changeCandlesAlignment: setCandlesAlign,
        serviceData,
        addCompareInstrumentFromApi,
        setCompareInstrumentsFromApi,
        clearChartDataFromApi,
    }), effects);
});
const toCandles = (data) => ({
    hi: data.high,
    lo: data.low,
    open: data.open,
    close: data.close,
    timestamp: data.time,
    volume: data.volume,
    expansion: false,
    idx: undefined,
    impVolatility: data.impVolatility,
    vwap: data.vwap,
});
const filterAvailableDataOptions = (options, config) => ({
    ...options,
    ...(config.chartDataOptionsSettings.candlesAlignment.enabled && {
        candleAlignment: options.candleAlignment,
    }),
    ...(config.chartDataOptionsSettings.priceType.enabled && { priceType: options.priceType }),
    ...(config.chartDataOptionsSettings.extendedHours.enabled && {
        extendedHours: options.extendedHours,
    }),
});
export const instrumentNameOption = (instrument) => pipe(instrument, option.map(i => i.symbol));
export const takeFirstAvailablePriceType = (priceTypes) => {
    return pipe(priceTypes, option.fromPredicate(array.isNonEmpty), option.fold(
    // If no price types in config - return "last" price type
    () => 'last', head));
};
const instrumentEq = pipe(string.Eq, option.getEq);
