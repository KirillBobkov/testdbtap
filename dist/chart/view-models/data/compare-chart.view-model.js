import { array, option, record } from 'fp-ts';
import { observable } from 'fp-ts-rxjs';
import { constVoid, pipe } from 'fp-ts/function';
import { combineLatest, merge } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { context } from '../../../context/context2';
import { newSink } from '../../../context/sink2';
import { callTracerProxy } from '../../../utils/debug/call-tracer';
import { createPropertyAdapter } from '../../../utils/property.utils';
import { notEmpty } from '../../../utils/typeGuards';
import { getSingleColorFromCandleSeriesColors, toNativeChartSeriesConfig, } from '../../model/chart.model';
export const createCompareChartViewModel = context.combine(context.key()('chart'), context.key()('chartDataViewModel'), context.key()('multiChartViewModel'), context.key()('initialCompareInstruments'), context.key()('instrumentSelectorViewModel'), context.key()('chartId'), (chart, chartDataViewModel, multiChartViewModel, initialCompareInstruments, instrumentSelectorViewModel, chartId) => {
    //#region state
    const [setCompareInstrumentsConfig, compareInstrumentsConfig] = createPropertyAdapter({});
    // before setting initial instruments (state and config), we need to check that instruments exist,
    // and map fetched existing instruments to initial instruments
    const initialInstrumentsEffect = pipe(initialCompareInstruments, array.map(i => instrumentSelectorViewModel.getInstrument(i.symbol)), requests => combineLatest(requests), tap(instruments => {
        pipe(instruments, array.map(option.toUndefined), array.filter(notEmpty), array.reduce([{}, {}], ([initialCIState, initialCIConfig], fetchedInstrument) => {
            const matchIndex = initialCompareInstruments.findIndex(ici => ici.symbol === fetchedInstrument.symbol);
            if (matchIndex !== -1) {
                initialCIConfig[fetchedInstrument.symbol] = {
                    chartType: initialCompareInstruments[matchIndex].chartType,
                    color: initialCompareInstruments[matchIndex].color,
                    symbol: fetchedInstrument.symbol,
                };
            }
            initialCIState[fetchedInstrument.symbol] = fetchedInstrument;
            return [initialCIState, initialCIConfig];
        }), ([initialCompareInstrumentsState, initialCompareInstrumentsConfig]) => {
            chartDataViewModel.setCompareInstruments(initialCompareInstrumentsState);
            setCompareInstrumentsConfig(initialCompareInstrumentsConfig);
        });
    }));
    const isDisabled = pipe(chartDataViewModel.compareInstruments, map(instruments => Object.keys(instruments).length), map(amountOfInstruments => amountOfInstruments >= 4));
    //#endregion
    //#region methods
    const updateCompareInstrumentConfig = (config) => pipe(compareInstrumentsConfig.getValue(), record.updateAt(config.symbol, config), option.fold(constVoid, setCompareInstrumentsConfig));
    const updatechartSeriesConfig = (config) => {
        Object.values(config).forEach(c => {
            chart.chartModel.updateSecondaryCandleSeriesConfig(toNativeChartSeriesConfig(c.color, c.chartType), c.symbol, c.chartType);
        });
        chart.yAxis.updateOrderedLabels();
    };
    //#endregion
    //#region effects
    const syncConfigTochartEffect = pipe(combineLatest([compareInstrumentsConfig, chartDataViewModel.historicalCandlesUpdated]), 
    // if config is empty --> don't run the update
    observable.filter(([config]) => !record.isEmpty(config)), tap(([config]) => updatechartSeriesConfig(config)));
    const updateCompareSeriesConfigOnInstrumentsUpdate = pipe(combineLatest([chartDataViewModel.compareInstruments, chart.chartModel.candlesSetSubject]), tap(([ci]) => {
        const newConfig = Object.keys(ci).reduce((acc, symbol) => ({
            ...acc,
            [symbol]: compareInstrumentsConfig.getValue()[symbol],
        }), {});
        Object.keys(newConfig)
            // if config doesn't exist for symbol --> create new config
            .filter(key => newConfig[key] === undefined)
            .forEach(symbol => {
            const chartSeries = chart.chartModel.secondaryCandleSeries.find(s => s.instrument.symbol === symbol);
            if (chartSeries) {
                const chartType = chartSeries.config.type;
                const colors = getSingleColorFromCandleSeriesColors(chartSeries);
                const color = colors[chartType];
                const config = {
                    id: chartSeries.id,
                    symbol,
                    chartType,
                    color,
                };
                newConfig[symbol] = config;
            }
            else {
                // chart series isn't available now --> remove from state
                delete newConfig[symbol];
            }
        });
        setCompareInstrumentsConfig(newConfig);
    }));
    const syncLocalCompareInstrumentsInfoToMultiChartEffect = pipe(compareInstrumentsConfig, tap(ci => multiChartViewModel.updateLocalChartInfo(chartId, {
        compareInstruments: Object.values(ci),
    })));
    //#endregion
    const effects$ = merge(updateCompareSeriesConfigOnInstrumentsUpdate, initialInstrumentsEffect, syncLocalCompareInstrumentsInfoToMultiChartEffect, syncConfigTochartEffect);
    return newSink(callTracerProxy('compareChartViewModel', {
        updateCompareInstrumentConfig,
        compareInstrumentsConfig,
        isDisabled,
    }), effects$);
});
