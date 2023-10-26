import * as React from 'react';
import { Localization } from '../../../../../../config/localization/localization';
interface IndicatorListFilterProps {
    handleTextFilterChange: (value?: string) => void;
    value: string;
    localization: Localization;
    onCreateNewScript: () => void;
    dxScriptEnabled: boolean;
}
export declare const IndicatorListFilter: React.NamedExoticComponent<IndicatorListFilterProps>;
export {};
