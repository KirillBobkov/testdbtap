import React from 'react';
import { Suggest } from '../symbol-suggest/symbol-suggest.model';
import { Instrument } from '../../model/instrument.model';
export interface CompareChartSelectorProps {
    readonly isDisabled: boolean;
    readonly data: Suggest[];
    readonly addCompareInstrument: (instrument: Instrument) => void;
    readonly searchInstruments: (value: string) => void;
    readonly searchValue: string;
}
export declare const CompareChartSelector: React.NamedExoticComponent<CompareChartSelectorProps>;
