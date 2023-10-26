import * as React from 'react';
import { ReactNode } from 'react';
interface IndicatorListSectionProps {
    readonly title?: string;
    readonly children: ReactNode;
    readonly header?: ReactNode;
    readonly footer?: ReactNode;
    readonly actionButton?: ReactNode;
    readonly ariaLabel?: string;
    readonly headingId?: string;
}
export declare const IndicatorListSection: React.NamedExoticComponent<IndicatorListSectionProps>;
export {};
