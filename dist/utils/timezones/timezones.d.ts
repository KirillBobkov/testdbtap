import { TimeZone, TimezonesConfig } from './timezone.model';
/**
 * List of timezones which were produced using timezone-support library.
 * We had to abandon this library because of its package size and update timezone list manually.
 *
 * @doc-tags chart-react,default-config,timezones
 */
export declare const DEFAULT_LIST_OF_TIME_ZONES: string[];
export declare const getLocalTimezone: () => string;
export declare const DEFAULT_TIMEZONES_CONFIG: TimezonesConfig;
export declare const initTimezones: (timezones: string[] | undefined, workersDisabled: boolean) => Promise<TimeZone[]>;
