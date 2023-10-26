import { firstOf, lastOf } from '@devexperts/dxcharts-lite/dist/chart/utils/array.utils';
import { array } from 'fp-ts';
import { pipe } from 'fp-ts/function';
import { alignSessionsToCandles } from '../chart/model/chart-sessions.model';
export const generateSessions = async (tradingSessionsProvider, options) => {
    const { tradingHours, from = firstOf(options.candles)?.timestamp, to = lastOf(options.candles)?.timestamp, symbol, filter, } = options;
    const sessionsMap = {
        AFTER_MARKET: [],
        NO_TRADING: [],
        PRE_MARKET: [],
        REGULAR: [],
    };
    if (from !== undefined && to !== undefined) {
        pipe(await tradingSessionsProvider.generateSessions(from, to, { symbol, tradingHours }), sessions => alignSessionsToCandles(sessions, options.candles), array.map(s => {
            if (filter.includes(s.type)) {
                if (!sessionsMap[s.type]) {
                    sessionsMap[s.type] = [];
                }
                const neededSession = sessionsMap[s.type];
                if (neededSession) {
                    neededSession.push(s);
                }
            }
        }));
    }
    return sessionsMap;
};
/**
 * Generates sessions limited to @param to and filters them. In other words - if @param to is in the middle of the session,
 * the session will be limited to this parameter
 */
export const generateSessionsStrict = async (provider, from, to, options) => {
    const { tradingHours, period, symbol, filter } = options;
    return pipe(await provider.generateSessions(from, to + 1, { tradingHours, symbol }), sessions => alignSessionsToCandles(sessions, options.candles), array.filter(s => filter.includes(s.type) && to >= s.from), array.map(s => {
        if (to < s.to) {
            const resPeriod = to + period <= s.to ? to + period : s.to;
            return {
                ...s,
                to: resPeriod,
            };
        }
        else {
            return s;
        }
    }));
};
