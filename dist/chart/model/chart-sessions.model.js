import { autoDetectPeriod } from '@devexperts/dxcharts-lite/dist/chart/utils/auto-period-detector.utils';
/**
 * This function aligns sessions to candle timestamp taking into account candle period
 * for example if candle time = 100, period = 10 and session.from = 105
 * session.from will be aligned to 100
 * if candle time = 100, period = 10 and session.from = 111
 * session.from won't be changed
 * @param sessions {@interface Session[]}
 * @param candles {@interface Candle[]}
 * @param _period in ms {number}
 */
export const alignSessionsToCandles = (sessions, candles, _period = 0) => {
    // need to get period in ms
    const period = autoDetectPeriod(candles) ?? _period;
    const search = (arr, session, period) => {
        let start = 0;
        let end = arr.length - 1;
        while (start <= end) {
            const mid = Math.floor((start + end) / 2);
            const endTime = arr[mid].timestamp + period;
            if (endTime > session.from && endTime < session.to) {
                let i = mid;
                while (arr[i - 1] && arr[i - 1].timestamp + period > session.from) {
                    i--;
                }
                if (arr[i].timestamp < session.from) {
                    return arr[i].timestamp;
                }
            }
            if (endTime < session.from) {
                start = mid + 1;
            }
            else {
                end = mid - 1;
            }
        }
        return null;
    };
    return sessions.map(session => {
        const timestamp = search(candles, session, period);
        if (timestamp) {
            return {
                ...session,
                from: timestamp,
            };
        }
        return session;
    });
};
