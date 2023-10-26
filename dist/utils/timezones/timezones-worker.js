import { parseTimezones } from './timezone.model';
import { expose } from 'comlink';
const timezonesWorker = {
    parseTimezones(timezones) {
        return {
            tzData: parseTimezones(timezones),
            timezones,
        };
    },
};
expose(timezonesWorker);
