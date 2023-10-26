import { uuid } from '@devexperts/dxcharts-lite/dist/chart/utils/uuid.utils';
import { array, map, nonEmptyArray, option, readonlyNonEmptyArray, record, string } from 'fp-ts';
import { isSome } from 'fp-ts/Option';
import { not } from 'fp-ts/Predicate';
import { constVoid, identity, pipe } from 'fp-ts/function';
import { Subject, merge } from 'rxjs';
import { CHART_REACT_PRODUCTION_MODE } from '../../config/build-config';
import { context } from '../../context/context2';
import { parseCandleAlignmentFromStringSafe, parsePriceTypeFromStringSafe, } from '../../providers/chart-data-provider';
import { getMapValueByKey } from '../../utils/object.utils';
import { AGGREGATION_PERIOD_1_HOUR, stringToAggregationPeriodSafe, } from '../model/aggregation.model';
import { chartDataID } from '../view-models/loading/initial-loader.vm';
import { toChartDataSubscriptionKey } from './multichart-data.utils';
import { rejectAfterDelay } from './multichart-data.utils';
/**
 * @name createMultiChartDataService
 * @description
 * Factory of a {@link MultiChartDataService}
 */
export const createMultiChartDataService = context.combine(context.key()('chartDataProvider'), context.key()('initialLoaderVM'), context.key()('chartReactConfig'), (chartDataProvider, initialLoaderVM, chartReactConfig) => {
    const id = uuid();
    //#region state
    /**
     * @name historyObservablesMap
     * @description Stores observables with a history data
     */
    const historyObservablesMap = new Map();
    /**
     * @name priceIncrementsMap
     * @description Stores price increments for instruments
     */
    const priceIncrementsMap = new Map();
    /**
     * @name lastCandleObservablesMap
     * @description Stores observables with a last candle data
     */
    const lastCandleObservablesMap = new Map();
    /**
     * @name subKeysState
     * @description
     * Stores subscription keys array associated with a chart id.
     * @see
     * First member of an array always is a main instrument subscription key
     * and the rest are compare instruments subscription keys.
     * @example
     * ```ts
     * const subKeysState = {
     * 	1: ['symbol=AAPL|period=1h|extendedHours=true|candleAlignment=s|priceType=mark', 'symbol=TSLA|period=1h|extendedHours=true|candleAlignment=s|priceType=mark'],
     * 	2: ['symbol=IBM|period=1h|candleAlignment=s', 'symbol=MSFT|period=1h|candleAlignment=s'],
     * 	3: [],
     * 	4: []
     * }
     * ```
     */
    const subKeysState = new Map();
    //#endregion
    //#region methods
    //#region helpers
    const getSubKeysByChartId = (chartId) => (state) => pipe(state, getMapValueByKey(string.Eq)(chartId), option.fold(() => [], identity));
    /**
     * @name removeSubKeyFromMap
     * @description
     * Removes the subscription key from a state.
     * @see
     * Method *mutates* the given state object.
     */
    const removeSubKeyFromMap = (chartId) => (key) => (state) => pipe(state, getSubKeysByChartId(chartId), option.fromPredicate(not(array.isEmpty)), option.map(array.filter(k => k !== key)), option.fold(constVoid, filteredsubKeys => {
        state.set(chartId, filteredsubKeys);
    }));
    const mapToSubKeys = (symbols, aggregation, options) => pipe(symbols, array.map(s => toChartDataSubscriptionKey(s, aggregation, options)));
    //#endregion
    const unsubscribeData = (key) => {
        chartDataProvider.unsubscribeCandles(subscriptionId(id, key));
        // complete subjest before it's deleting
        const deleteSubj = lastCandleObservablesMap.get(key);
        deleteSubj?.complete();
        lastCandleObservablesMap.delete(key);
    };
    // /**
    //  * @name cleanupSubscriptions
    //  * @description
    //  * Cleanup the subscriptions state of a given subscription keys.
    //  * @param oldKeys Required to compare with a ```newKeys```
    //  * @doc-tags tricky
    //  */
    const cleanupSubscriptions = (chartId) => (oldKeys) => (newKeys) => {
        // get diff of old and new
        // @ts-ignore
        const diff = array.difference(string.Eq)(newKeys)(oldKeys);
        // filter out subs that are on other charts too
        // because we shouldn't gave up providing data for other charts
        diff.forEach(subKey => removeSubKeyFromMap(chartId)(subKey)(subKeysState));
        const filteredSubKeys = pipe(diff, array.filter(key => pipe(subKeysState, map.collect(string.Ord)((_, v) => v), array.flatten, not(array.elem(string.Eq)(key)))));
        // delete observables that are not needed any more and unsubscribe from a provider
        filteredSubKeys.forEach(key => {
            const subData = fromSubscriptionKey(key);
            // it is needed when initial data is empty (loader did not reach 100%), and after that we change agregation/instrument,
            // loader state must be updated
            initialLoaderVM.updateLoadingState(chartDataID(key), 'done');
            unsubscribeData(toChartDataSubscriptionKey(subData.symbol, subData.aggregation, subData.options));
        });
        if (!CHART_REACT_PRODUCTION_MODE && filteredSubKeys.length > 0) {
            console.log(`ChartID: ${chartId}. UNsubscribed from symbols:`, filteredSubKeys);
        }
    };
    const subscribeLastCandleDatas = (symbols, aggregation, options) => {
        // map to subKeys
        const subKeys = mapToSubKeys(symbols, aggregation, options);
        // get the observables: return existing or create new one
        // lookup is made on all charts in multichart state
        const _observables = pipe(subKeys, array.map(key => pipe(lastCandleObservablesMap, map.lookup(string.Eq)(key))), array.mapWithIndex((index, _obs) => pipe(_obs, option.fold(() => {
            const subject = new Subject();
            const dataCallback = (data) => data.forEach(d => subject.next({ symbol: symbols[index], candleData: d }));
            const key = subKeys[index];
            chartDataProvider.subscribeCandles(symbols[index], aggregation, subscriptionId(id, key), dataCallback, options);
            if (!CHART_REACT_PRODUCTION_MODE) {
                console.log(`Subscribed last candle data for`, symbols[index]);
            }
            lastCandleObservablesMap.set(key, subject);
            return subject;
        }, identity))));
        return _observables;
    };
    //#endregion
    //#region API
    /**
     * @name subscribeSymbolsHistoryData
     * @see
     * the observables array is *zipped* ({@link @rxjs/zip}), that means that
     * resulting observable will not emit until all observables are fullfilled,
     * i.e, history datas for all the given symbols are set
     *
     */
    const subscribeSymbolsHistoryData = (chartId, symbols, aggregation, options) => {
        const subject = new Subject();
        historyObservablesMap.get(chartId)?.complete();
        historyObservablesMap.set(chartId, subject);
        const subKeys = mapToSubKeys(symbols, aggregation, options);
        // get old subKey to cleanup
        const oldSubKeys = getSubKeysByChartId(chartId)(subKeysState);
        // save subkeys to state associated with chartId
        subKeysState.set(chartId, subKeys);
        Promise.all(symbols.map(symbol => Promise.race([
            chartDataProvider.requestHistoryData(symbol, aggregation, options),
            rejectAfterDelay(chartReactConfig.dataTimeout),
        ])
            .then(data => {
            const key = toChartDataSubscriptionKey(symbol, aggregation, options);
            initialLoaderVM.updateLoadingState(chartDataID(key), 'done');
            const chartData = {
                instrument: symbol,
                data,
                type: 'HISTORICAL',
            };
            return chartData;
        })
            .catch(error => {
            const key = toChartDataSubscriptionKey(symbol, aggregation, options);
            initialLoaderVM.updateLoadingState(chartDataID(key), 'done');
            const chartData = {
                instrument: symbol,
                data: error,
                type: 'HISTORICAL',
            };
            return chartData;
        }))).then(data => subject.next(data));
        // cleanup is made only when requesting history data because in terms of business
        // there couldn't be last candles without history
        cleanupSubscriptions(chartId)(oldSubKeys)(subKeys);
        return subject;
    };
    const requestMoreHistoryData = (chartId, options = {}) => pipe(subKeysState, getSubKeysByChartId(chartId), option.fromPredicate(array.isNonEmpty), option.map(nonEmptyArray.map(fromSubscriptionKey)), option.fold(constVoid, subDatas => Promise.all(subDatas.map(subData => chartDataProvider
        .requestHistoryData(subData.symbol, subData.aggregation, {
        ...subData.options,
        priceIncrement: priceIncrementsMap.get(subData.symbol),
        fromTime: options.fromTime,
        toTime: options.toTime,
    })
        .then(data => ({ data, instrument: subData.symbol, type: 'LAZY' })))).then(datas => historyObservablesMap.get(chartId)?.next(datas))));
    const unsubscribeSymbolData = (chartId) => {
        const oldSubKeys = getSubKeysByChartId(chartId)(subKeysState);
        cleanupSubscriptions(chartId)(oldSubKeys)([]);
    };
    /**
     * @name subscribeLastCandleUpdates
     * @see
     * Each value in the observable contains data for a one particular symbol
     * ```ts
     * x->{symbol: AAPL, data: lastCandleData}->{symbol: IBM, data: lastCandleData}->x
     * ```
     */
    const subscribeLastCandleUpdates = (symbols, aggregation, options) => merge(...subscribeLastCandleDatas(symbols, aggregation, options));
    //#endregion
    return {
        subscribeSymbolsHistoryData,
        requestMoreHistoryData,
        unsubscribeSymbolData,
        subscribeLastCandleUpdates,
    };
});
function fromSubscriptionKey(subKey) {
    return pipe(subKey, string.split('|'), readonlyNonEmptyArray.map(string.split('=')), readonlyNonEmptyArray.groupBy(readonlyNonEmptyArray.head), record.map(readonlyNonEmptyArray.flatten), record.map(readonlyNonEmptyArray.last), fromStringRecordToTypedData);
}
// TODO: map to Option, to prevent unfulfilled mandatory data such as symbol and aggregation
/**
 * @name fromStringRecordToTypedData
 * @description
 * maps uncertain record of a strings to a typed {@link SubscriptionData}
 */
function fromStringRecordToTypedData(rec) {
    // fullfill mandatory data
    const symbol = rec.symbol;
    const aggregation = pipe(rec.period, stringToAggregationPeriodSafe, option.fold(() => AGGREGATION_PERIOD_1_HOUR, identity));
    // fullfill options
    const options = {};
    const extendedHours = rec['extendedHours'];
    const priceType = parsePriceTypeFromStringSafe(rec.priceType);
    const candleAlignment = parseCandleAlignmentFromStringSafe(rec.candleAlignment);
    if (extendedHours) {
        options.extendedHours = extendedHours === 'true';
    }
    if (isSome(priceType)) {
        options.priceType = priceType.value;
    }
    if (isSome(candleAlignment)) {
        options.candleAlignment = candleAlignment.value;
    }
    return {
        symbol,
        aggregation,
        options,
    };
}
const subscriptionId = (uuid, subKey) => `${uuid}_${subKey}`;
