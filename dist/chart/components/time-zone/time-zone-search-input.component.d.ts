import React from 'react';
export interface TimeZoneInputSearchProps {
    readonly value?: string;
    readonly onValueChange: (value: string) => void;
}
export declare const TimeZoneInputSearch: React.FC<TimeZoneInputSearchProps>;
