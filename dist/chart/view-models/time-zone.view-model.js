import { context } from '../../context/context2';
import { observable } from 'fp-ts-rxjs';
import { combineLatest, merge } from 'rxjs';
import { newSink } from '../../context/sink2';
import { tap, withLatestFrom } from 'rxjs/operators';
import { createPropertyAdapter } from '../../utils/property.utils';
import { filterMapOption } from '../../utils/monad-functions';
import { callTracerProxy } from '../../utils/debug/call-tracer';
import { reformatUTC, sortTimezones } from '../components/time-zone/time-zone.model';
import { filterListByProperties } from '../../utils/filter-list-by-properties';
import { pipe } from 'fp-ts/function';
import { array, option } from 'fp-ts';
import { getLocalTimezone } from '../../utils/timezones/timezones';
export const EXCHANGE = 'Exchange';
export const UTC = 'UTC';
export const EMPTY_TIMEZONE = '';
export const createTimeZoneViewModel = context.combine(context.key()('chart'), context.key()('chartDataViewModel'), context.key()('localization'), context.key()('multiChartViewModel'), context.key()('aggregationPeriodViewModel'), context.key()('initialTimezones'), context.key()('tradingSessionsProvider'), (chart, chartDataVM, localization, multiChartViewModel, aggregationPeriodVM, initialTimezones, tradingSessionsProvider) => {
    //#region state
    const INITIAL_TIMEZONES = [
        {
            name: localization.timeZone.utc,
            timeZone: UTC,
            utcOffset: '',
        },
        {
            name: localization.timeZone.exchange,
            timeZone: EXCHANGE,
            utcOffset: '',
        },
    ];
    const [setTimeZones, timeZones] = createPropertyAdapter(INITIAL_TIMEZONES);
    initialTimezones.then(tzs => {
        setTimeZones([...INITIAL_TIMEZONES, ...sortTimezones(tzs)]);
    });
    const [setFilteredTimezones, filteredTimezones] = createPropertyAdapter(INITIAL_TIMEZONES);
    const [setCurrentTimezone, currentTimezone] = createPropertyAdapter(multiChartViewModel.state.getValue().lastTimezone);
    // contains tz for exchange
    const [setCurrentExchange, currentExchange] = createPropertyAdapter(EMPTY_TIMEZONE);
    const isAllowedByAggregationType = (period = aggregationPeriodVM.selectedPeriod.getValue()) => ['t', 'r', 's', 'm', 'h'].includes(period.durationType);
    //#endregion state
    const setTimezoneSafe = (timezone) => {
        pipe(timeZones.getValue(), array.findFirst(t => t.timeZone === timezone), option.fold(() => console.warn(`No timezone found for ${timezone}`), t => setTimezone(t.timeZone)));
    };
    const setChartCoreTimezone = (timezone) => {
        let realTimezone = timezone;
        if (timezone === EXCHANGE) {
            realTimezone = currentExchange.getValue();
        }
        realTimezone && chart.timeZoneModel.setTimeZone(realTimezone);
    };
    //#region methods
    const setTimezone = (timezone) => {
        if (multiChartViewModel.state.getValue().isTimezoneSyncEnabled) {
            multiChartViewModel.setTimezone(timezone);
        }
        else {
            setCurrentTimezone(timezone);
        }
    };
    const onSearchTimezone = (value) => {
        setFilteredTimezones(filterListByProperties(timeZones.getValue(), value, [
            { path: ['name'], filterByCapitalLetters: true },
            { path: ['timeZone'], filterByCapitalLetters: true },
            {
                path: ['utcOffset'],
                filterByCapitalLetters: false,
                transformValue: v => `utc${reformatUTC(v)}`,
            },
        ]));
    };
    //#endregion methods
    //#region effects
    const syncTimezoneTochartEffect = pipe(combineLatest([currentTimezone, currentExchange]), tap(([timezone]) => {
        if (!isAllowedByAggregationType()) {
            return;
        }
        // if selected aggregation is < 1d, then sync it to the chart
        setChartCoreTimezone(timezone);
    }));
    const updateExchangeEffect = pipe(filterMapOption(chartDataVM.instrument), tap(instrument => {
        const tradingHours = instrument.tradingHours;
        if (tradingHours) {
            tradingSessionsProvider
                .getTimeZone({ ...instrument })
                .then(timezone => setCurrentExchange(timezone));
        }
        else {
            // if instrument doesn't have a trading hours, thus schedule wouldn't be able to get the exchange timezone
            // set the current timezone to local timezone
            setTimezone(getLocalTimezone());
        }
    }));
    // if current timezone is an empty string i.e. not set => set it to current exchange
    const syncCurrentExchangeToCurrentTimezoneEffect = pipe(currentExchange, withLatestFrom(currentTimezone), observable.filter(([_, selectedTimezone]) => selectedTimezone === EMPTY_TIMEZONE), observable.map(([instrumentExchangeTimezone]) => instrumentExchangeTimezone), tap(() => setTimezone(EXCHANGE)));
    // if user selects an aggregation >= 1d, then we need to set UTC timezone to the chart under the hood
    // but the UI should still show the last selected timezone
    // if user selects an aggregation < 1d, after he had selected >=1 previously,
    // we need to set the timezone that is selected in the UI to the chart
    const syncTimezoneToInstanceOnAggregationChangeEffect = pipe(aggregationPeriodVM.selectedPeriod, tap(period => {
        const allowedAggregation = isAllowedByAggregationType(period);
        const UTCTimezoneInchart = chart.config.timezone === UTC;
        if (!allowedAggregation && !UTCTimezoneInchart) {
            setChartCoreTimezone(UTC);
            return;
        }
        if (allowedAggregation && UTCTimezoneInchart) {
            setChartCoreTimezone(currentTimezone.getValue());
            return;
        }
    }));
    const syncTimezoneFromMultiChartEffect = pipe(multiChartViewModel.state, observable.filter(state => state.isTimezoneSyncEnabled && state.lastTimezone !== currentTimezone.getValue()), observable.map(state => state.lastTimezone), tap(setCurrentTimezone));
    //#endregion
    const effects$ = merge(syncTimezoneTochartEffect, updateExchangeEffect, syncTimezoneFromMultiChartEffect, syncTimezoneToInstanceOnAggregationChangeEffect, syncCurrentExchangeToCurrentTimezoneEffect);
    return newSink(callTracerProxy('timeZoneViewModel', {
        timeZones: filteredTimezones,
        currentTimezone,
        currentExchange,
        setTimezone,
        onSearchTimezone,
        setTimezoneSafe,
    }), effects$);
});
