import React from 'react';
import { TimeZone } from '@devexperts/dxcharts-lite/dist/chart/model/time-zone.model';
export interface TimeZoneDropdownProps {
    readonly value: string;
    readonly currentExchange: string;
    readonly timeZones: Array<TimeZone>;
    readonly onSelect: (timeZone: string) => void;
    readonly onSearchTimezone: (value: string) => void;
}
export declare const TimeZoneDropdown: React.FC<TimeZoneDropdownProps>;
export default TimeZoneDropdown;
