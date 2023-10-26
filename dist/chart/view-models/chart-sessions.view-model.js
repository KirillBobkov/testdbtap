import { array, option } from 'fp-ts';
import { observable } from 'fp-ts-rxjs';
import { flatten } from 'fp-ts/Array';
import { constTrue, pipe } from 'fp-ts/function';
import { combineLatest, from, merge, of } from 'rxjs';
import { catchError, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { context } from '../../context/context2';
import { newSink } from '../../context/sink2';
import { createPropertyAdapter } from '../../utils/property.utils';
import { generateSessions } from '../../utils/session.utils';
const initialSessions = {
    AFTER_MARKET: [],
    NO_TRADING: [],
    PRE_MARKET: [],
    REGULAR: [],
};
export const createChartSessionsViewModel = context.combine(context.key()('chartConfiguratorViewModel'), context.key()('chartDataViewModel'), context.key()('aggregationPeriodViewModel'), context.key()('chart'), context.key()('tradingSessionsProvider'), (chartConfiguratorVM, chartDataVM, aggregationPeriodVM, chart, tradingSessionsProvider) => {
    const [setSessions, sessions] = createPropertyAdapter(initialSessions);
    const [setNextCandleTimestampOffset, nextCandleTimestampOffset] = createPropertyAdapter(0);
    const changeNextCandleTimestampOffset = (offsetInMs) => setNextCandleTimestampOffset(offsetInMs);
    const getSessions = async (customCandles, filter = ['REGULAR', 'PRE_MARKET', 'AFTER_MARKET', 'NO_TRADING'], from, to) => pipe(chartDataVM.instrument.getValue(), option.map(instrument => {
        const tradingHours = instrument.tradingHours;
        const candles = customCandles ?? chart.chartComponent.chartModel.getCandles();
        const sessions = generateSessions(tradingSessionsProvider, {
            filter,
            tradingHours,
            from,
            to,
            candles,
            symbol: instrument.symbol,
        });
        return sessions;
    }), option.getOrElse(() => Promise.resolve(initialSessions)));
    const switchExtendedHoursEffect = pipe(chartConfiguratorVM.state, observable.map(s => s.settings.chartReact.extendedHours.visible), distinctUntilChanged(), tap(chartDataVM.setExtendedHours));
    // we must sync sessions only when we have a new data available
    const syncSessionsWithChartEffect = pipe(combineLatest([
        sessions,
        pipe(chartConfiguratorVM.state, observable.map(s => s.settings.chartReact.sessionBreaks.visible), distinctUntilChanged()),
        pipe(chartConfiguratorVM.state, observable.map(s => s.settings.chartReact.extendedHours.visible), distinctUntilChanged()),
        pipe(chartConfiguratorVM.sessionBreaksDisabled, distinctUntilChanged()),
    ]), tap(([sessions, sessionBreaks, extendedHours, sessionBreaksDisabled]) => {
        const generatedSessions = flatten(Object.values(sessions));
        if ((sessionBreaks || extendedHours) && !sessionBreaksDisabled) {
            const chartHighlights = pipe(generatedSessions, array.map(toHighlight), array.filter(filterOutRegular), array.filter(sessionBreaks ? constTrue : filterOutNoTrading), array.filter(extendedHours ? constTrue : filterOutExtendedHours));
            chart.highlights.setHighlights(chartHighlights);
            chart.highlights.setHighlightsVisible(true);
        }
        else {
            chart.highlights.setHighlights([]);
            chart.highlights.setHighlightsVisible(false);
        }
    }));
    const candlesChangedEffect = pipe(merge(chart.chartModel.candlesSetSubject, chart.chartModel.candlesPrependSubject), filter(() => {
        const value = aggregationPeriodVM.selectedPeriod.getValue();
        return (value.durationType !== 'd' &&
            value.durationType !== 'w' &&
            value.durationType !== 'mo' &&
            value.durationType !== 'y');
    }), switchMap(() => from(getSessions())), catchError(() => of(initialSessions)), tap(sessions => setSessions(sessions)));
    const effects$ = merge(switchExtendedHoursEffect, syncSessionsWithChartEffect, candlesChangedEffect);
    return newSink({
        sessions,
        nextCandleTimestampOffset,
        changeNextCandleTimestampOffset,
        generateSessions: (filter, from, to = Date.now(), candles = []) => getSessions(candles, filter, from, to),
    }, effects$);
});
const toHighlight = (session) => session.type === 'NO_TRADING'
    ? {
        ...session,
        border: {
            left: true,
        },
    }
    : {
        ...session,
    };
const filterOutRegular = (highlight) => highlight.type !== 'REGULAR';
const filterOutNoTrading = (highlight) => highlight.type !== 'NO_TRADING';
const filterOutExtendedHours = (highlight) => highlight.type !== 'PRE_MARKET' && highlight.type !== 'AFTER_MARKET';
