import { Localization } from '../../../../../../config/localization/localization';
import * as React from 'react';
export interface StudiesSettingsContentHeaderProps {
    readonly localization: Localization;
    readonly onCreateNewScript: () => void;
    readonly filterString: string;
    readonly handleTextFilterChange: (value?: string) => void;
    readonly dxScriptEnabled: boolean;
}
export declare const StudiesSettingsContentHeader: React.NamedExoticComponent<StudiesSettingsContentHeaderProps>;
