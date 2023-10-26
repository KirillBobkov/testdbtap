import { addDays } from 'date-fns';
export const LOCALSTORAGE_TIMEZONES_KEY = 'timezones';
const utcDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'UTC' }));
const utcHours = utcDate.getHours();
const utcMinutes = utcDate.getMinutes();
export const parseTimezones = (tzs) => {
    const timezones = tzs.map(tz => {
        const name = parseTimezone(tz);
        const utcOffset = getUTCOffset(tz);
        return {
            timeZone: tz,
            name,
            utcOffset,
        };
    });
    return timezones;
};
export const saveTimeZonesToLS = (timezones, tzs) => {
    const lsTimezones = {
        timezones,
        expireTimeStamp: addDays(new Date(Date.now()), 1).getTime(),
        timezonesRaw: JSON.stringify(tzs),
    };
    localStorage.setItem(LOCALSTORAGE_TIMEZONES_KEY, JSON.stringify(lsTimezones));
};
const parseTimezoneFallback = (timeZone) => {
    let name = timeZone.slice(timeZone.indexOf('/') + 1);
    if (timeZone.indexOf('GMT') === -1) {
        if (name.indexOf('/') > -1) {
            name = name.split('/')[1];
        }
    }
    return name;
};
const parseTimezone = (timeZone) => {
    const match = timeZone.match(/(?<city>[a-z-_]+)$/i);
    return (match?.groups && match.groups?.city) ?? parseTimezoneFallback(timeZone);
};
const getUTCOffset = (timeZone) => {
    const date = new Date(new Date().toLocaleString('en-US', { timeZone }));
    const diffM = date.getMinutes() - utcMinutes;
    const diffMString = diffM.toString().replace(/\D/g, '');
    const diffH = diffM < 0 ? date.getHours() - utcHours - 1 : date.getHours() - utcHours;
    const diffHString = diffH.toString().replace(/\D/g, '');
    const sign = diffH >= 0 ? '+' : '-';
    const numberOfDigits = diffHString.length;
    const formattedH = numberOfDigits === 1 ? `0${diffHString}` : diffHString;
    return `${sign}${formattedH}:${diffM ? diffMString : '00'}`;
};
