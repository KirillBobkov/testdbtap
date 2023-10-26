import { addYears } from 'date-fns';
export const DEFAULT_OPTIONS = {
    feedURL: 'https://webdev.prosp.devexperts.com:8095/schedule-view',
};
export const createDefaultTradingSessionsProvider = (initOptions = DEFAULT_OPTIONS) => {
    const reqCache = new Map();
    const createReq = (tradingHours) => {
        const cached = reqCache.get(tradingHours);
        if (cached) {
            return cached;
        }
        const req = fetch(`${initOptions.feedURL}/per-calendar-day`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                schedules: [tradingHours],
                // request 1 year of sessions - it'd be enough for historical data which needs sessions
                // only candles with aggregation period less than 1 day need trading sessions
                // also, dxfeed can't provide history candles for more than a year if aggregation less than a day
                start: addYears(Date.now(), -1),
                tz: 'UTC',
            }),
        }).then(res => res.json());
        reqCache.set(tradingHours, req);
        return req;
    };
    const getTimeZone = (options) => {
        if (options.tradingHours === undefined) {
            return Promise.resolve('UTC');
        }
        const tradingHours = options.tradingHours;
        return createReq(options.tradingHours).then((res) => {
            const schedule = res[0][tradingHours].schedule;
            return schedule.timeZone;
        });
    };
    const generateSessions = (from, to, options) => {
        const tradingHours = options.tradingHours;
        return tradingHours
            ? createReq(tradingHours).then((res) => {
                const schedule = res[0][tradingHours].schedule;
                const days = schedule.days;
                const sessions = days.flatMap(day => day.sessions);
                return sessions
                    .map(session => ({
                    from: Date.parse(`${session.startTime}`),
                    to: Date.parse(`${session.endTime}`),
                    type: session.type,
                }))
                    .filter(session => session.to >= from && session.from <= to);
            })
            : Promise.resolve([]);
    };
    return {
        generateSessions,
        getTimeZone,
    };
};
