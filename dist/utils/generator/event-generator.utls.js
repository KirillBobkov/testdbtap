import { addDays, format, startOfDay } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { mulberry32 } from './random';
const eventsRandom = mulberry32(4596423324);
export const defaultConfig = {
    quantity: 65,
    startTimestamp: addDays(zonedTimeToUtc(startOfDay(new Date()), Intl.DateTimeFormat().resolvedOptions().timeZone), -365 * 5).getTime(),
    period: 3600 * 24 * 31 * 1000, // 1 Month
};
const generateEarningsEvent = (ts) => {
    const basic = eventsRandom() * 8;
    const diluted = basic + eventsRandom() - eventsRandom();
    return {
        kind: 'earnings',
        basic: parseFloat(basic.toFixed(2)),
        diluted: parseFloat(diluted.toFixed(2)),
        timestamp: ts,
        periodEnding: ts,
    };
};
const generateDividendsEvent = (ts) => ({
    kind: 'dividends',
    gross: `${(eventsRandom() * 3).toFixed(2)}`,
    timestamp: ts,
});
const generateSplitEvent = (ts) => ({
    kind: 'splits',
    splitFrom: 1,
    splitTo: 4,
    timestamp: ts,
});
const generateConfCallEvent = (ts) => ({
    kind: 'conference-calls',
    referencePeriod: format(new Date(ts), 'QQQ yyyy'),
    eventType: 'Earning',
    timestamp: ts,
});
/**
 * Generates mock events data.
 *
 * @param config
 *   quantity - avg number of events
 *
 * @return Array<ProviderEvent>
 */
export const generateEvents = (config = defaultConfig) => {
    const events = [];
    let timestamp = config.startTimestamp;
    const currentTime = Date.now();
    for (let i = 0; i < config.quantity; i++) {
        const r = eventsRandom() * 10;
        if (r > 7) {
            events.push(generateConfCallEvent(timestamp));
            // events below are not allowed in the future (in my opinion)
        }
        else if (r > 4) {
            timestamp < currentTime && events.push(generateEarningsEvent(timestamp));
        }
        else if (r > 1) {
            timestamp < currentTime && events.push(generateDividendsEvent(timestamp));
        }
        else if (timestamp < currentTime) {
            timestamp < currentTime && events.push(generateSplitEvent(timestamp));
        }
        timestamp += config.period;
    }
    return events;
};
