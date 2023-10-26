import React from 'react';
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { format, utcToZonedTime } from 'date-fns-tz';
import { reformatUTC } from './time-zone.model';
import { getLocalTimezone } from '../../../utils/timezones/timezones';
export const TimeZoneTimer = memo(({ value }) => {
    const timer = useRef();
    const timeRef = useRef(null);
    const timeZone = useMemo(() => {
        return !value || typeof value !== 'string' ? getLocalTimezone() : value;
    }, [value]);
    const clearTimer = useCallback(() => {
        if (timer.current) {
            clearInterval(timer.current);
        }
    }, []);
    const getTimeZoneStr = useCallback(() => {
        const time = format(utcToZonedTime(new Date(), timeZone), 'HH:mm:ss', { timeZone });
        const zone = reformatUTC(format(new Date(), 'xxx', { timeZone }));
        return `${time} UTC${zone}`;
    }, [timeZone]);
    useEffect(() => {
        clearTimer();
        timer.current = setInterval(() => {
            if (timeRef.current) {
                timeRef.current.innerText = getTimeZoneStr();
            }
        }, 1000);
        return clearTimer;
    }, [clearTimer, getTimeZoneStr]);
    return React.createElement("span", { ref: timeRef }, getTimeZoneStr());
});
