import React from 'react';
import { Localization } from '../../../config/localization/localization';
export interface SwitchAxisButtonsProps {
    readonly onPercentButtonClick: () => void;
    readonly isPercentButtonActive: boolean;
    readonly onLogButtonClick: () => void;
    readonly isLogButtonActive: boolean;
    readonly top: number;
    readonly localization: Localization;
}
export declare const SwitchAxisTypeButtonsContainer: React.NamedExoticComponent<SwitchAxisButtonsProps>;
