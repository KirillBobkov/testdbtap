import { CHART_UUID, CanvasElement } from '@devexperts/dxcharts-lite/dist/chart/canvas/canvas-bounds-container';
import { format } from 'date-fns';
import { observable } from 'fp-ts-rxjs';
import { pipe } from 'fp-ts/function';
import { combineLatest, merge } from 'rxjs';
import { distinctUntilChanged, filter, share, shareReplay, switchMap, tap } from 'rxjs/operators';
import { context } from '../../context/context2';
import { newSink } from '../../context/sink2';
import { filterOption } from '../../utils/monad-functions';
import { createPropertyAdapter } from '../../utils/property.utils';
import { camelize } from '../../utils/string.utils';
import { utcToZonedTime } from 'date-fns-tz';
import { option } from 'fp-ts';
export const createEventDataViewModel = context.combine(context.key()('eventsDataProvider'), context.key()('chart'), context.key()('chartConfiguratorViewModel'), context.key()('chartDataViewModel'), context.key()('localization'), context.key()('chartReactConfig'), (eventsDataProvider, chart, chartConfiguratorViewModel, chartDataViewModel, localization, chartReactConfig) => {
    const [setHovered, hoveredTarget] = createPropertyAdapter(option.none);
    const eventsVisible = pipe(chartConfiguratorViewModel.state, observable.map(s => s.settings.chartCore.components.events.visible), distinctUntilChanged(), tap(visible => visible));
    const eventsData = combineLatest([chartDataViewModel.instrument.pipe(filterOption()), eventsVisible]).pipe(filter(([_, visible]) => visible), switchMap(([instrument]) => eventsDataProvider.requestEventsData(instrument.symbol)), shareReplay({ bufferSize: 1, refCount: true }));
    const hoverEffect = combineLatest([
        chart.events.observeEventHovered(),
        eventsData,
        pipe(chartConfiguratorViewModel.state, observable.map(s => ({
            ...s.settings.chartCore.components.events.eventsVisibility,
        }))),
    ]).pipe(tap(([hoveredEvent, events, neededEvents]) => {
        !hoveredEvent ? setHovered(option.none) : handleHover(hoveredEvent, events, neededEvents);
    }));
    const handleHover = (hoveredEvent, events, neededEvents) => {
        const event = events.events.find(i => i.timestamp === hoveredEvent?.timestamp && hoveredEvent.type === i.kind);
        if (!neededEvents[hoveredEvent.type] || event === undefined) {
            setHovered(option.none);
        }
        else {
            const chartBounds = chart.canvasBoundsContainer.getBounds(CanvasElement.PANE_UUID(CHART_UUID));
            const y = chartBounds.y + chartBounds.height;
            const x = chart.chartComponent.chartModel
                .candleFromTimestamp(hoveredEvent.timestamp)
                .xCenter(chart.scale);
            const dict = localization.events;
            const config = chart.getConfig();
            const eventData = getEventsData(dict, event, x, y, config, chartReactConfig);
            setHovered(option.some(eventData));
        }
    };
    const setEventsEffect = pipe(eventsData, tap(data => {
        const chartEvents = data.events.map(toChartCoreEvent);
        chart.events.setEvents(chartEvents);
    }));
    const showEventsEffect = pipe(chartConfiguratorViewModel.state, observable.map(s => s.settings.chartCore.components.events), distinctUntilChanged(), tap(eventsConfig => {
        chart.events.setVisible(eventsConfig.visible);
        chart.events.setEventTypeVisible(eventsConfig.eventsVisibility);
    }));
    const effects = pipe(merge(setEventsEffect, showEventsEffect, hoverEffect), share());
    return newSink({
        events: eventsData,
        hoveredTarget,
    }, effects);
});
const EventStyleMapper = {
    dividends: 'rhombus-small',
    splits: 'rhombus-small',
    earnings: 'rhombus',
    'conference-calls': 'rhombus-large',
};
export const toChartCoreEvent = (data) => ({
    type: data.kind,
    timestamp: data.timestamp,
    style: EventStyleMapper[data.kind],
});
const formatEventType = (eventType) => `${eventType
    .toLowerCase()
    .split('_')
    .map(s => camelize(s, false))
    .join(' ')}`;
// TODO: Refactor in 5.x.x
const formatEventDate = (event, timestamp, timezone, customFormatter) => {
    if (customFormatter) {
        return format(utcToZonedTime(timestamp, timezone), customFormatter(event));
    }
    switch (event) {
        case 'earnings':
        case 'dividends':
        case 'splits':
        case 'conference-calls':
            return format(utcToZonedTime(timestamp, timezone), 'd MMM yyyy');
    }
};
const formatConferenceCall = (event, config, customFormatter) => ({
    title: `${event.referencePeriod} ${formatEventType(event.eventType)}  Webcast`,
    date: `${formatEventDate('conference-calls', event.timestamp, config.timezone, customFormatter)}`,
});
const getEventsData = (dict, event, x, y, config, chartReactConfig) => {
    let eventData = null;
    const customFormatter = chartReactConfig.dateFormatters?.events;
    switch (event.kind) {
        case 'earnings': {
            eventData = {
                title: dict.earnings.type,
                rows: [
                    {
                        name: dict.earnings.basicEps,
                        value: event.basic + '',
                    },
                    {
                        name: dict.earnings.dilutedEps,
                        value: event.diluted + '',
                    },
                    {
                        name: dict.earnings.periodEnding,
                        value: format(utcToZonedTime(event.periodEnding, config.timezone), 'MMM yyyy'),
                    },
                    {
                        name: dict.earnings.date,
                        value: formatEventDate('earnings', event.timestamp, config.timezone, customFormatter),
                    },
                ],
                color: config.colors.events.earnings.color,
                x,
                y,
            };
            break;
        }
        case 'dividends': {
            eventData = {
                title: dict.dividends.type,
                rows: [
                    {
                        name: dict.dividends.gross,
                        value: event.gross + '',
                    },
                    {
                        name: dict.dividends.date,
                        value: formatEventDate('dividends', event.timestamp, config.timezone, customFormatter),
                    },
                ],
                color: config.colors.events.dividends.color,
                x,
                y,
            };
            break;
        }
        case 'splits': {
            eventData = {
                title: `${dict.splits.type} ${event.splitFrom}/${event.splitTo}`,
                rows: [
                    {
                        name: dict.splits.date,
                        value: formatEventDate('splits', event.timestamp, config.timezone, customFormatter),
                    },
                ],
                color: config.colors.events.splits.color,
                x,
                y,
            };
            break;
        }
        case 'conference-calls': {
            eventData = {
                title: `${dict['conference-calls'].type}  `,
                rows: [
                    {
                        name: dict['conference-calls'].title,
                        value: formatConferenceCall(event, config, customFormatter).title,
                    },
                    {
                        name: dict['conference-calls'].date,
                        value: formatConferenceCall(event, config, customFormatter).date,
                    },
                ],
                color: config.colors.events['conference-calls'].color,
                x,
                y,
            };
            break;
        }
    }
    return eventData;
};
