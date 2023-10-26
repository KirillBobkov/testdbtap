const hyphen1 = '\u002d';
const hyphen2 = '\u2010';
const longMinus = '\u2212';
const hyphenRegex = new RegExp(`(${hyphen1}|${hyphen2})`, 'g');
export const reformatUTC = (utc) => {
    utc = utc.replace(hyphenRegex, longMinus);
    const [hour, minute] = utc.split(':');
    if (hour.length !== 3) {
        return '';
    }
    const first = hour === '+00' ? '' : hour[1] === '0' ? hour[0] + hour[2] : hour;
    const second = minute === '00' ? '' : ':' + minute;
    return first + second;
};
export const reformatTimeZoneName = (name) => {
    return name.replace(/_/g, ' ');
};
export const sortTimezones = (timezones) => {
    return timezones.sort((a, b) => a.name.localeCompare(b.name));
};
