import { createContext } from 'react';
import { DEFAULT_LOCALIZATION } from '../../../config/localization/localization';
export const DEFAULT_MULTICHART_COMPONENT_CONTEXT = {
    keyboardModeEnabled: false,
    localization: DEFAULT_LOCALIZATION,
    device: 'other',
};
export const MultiChartComponentContext = createContext(DEFAULT_MULTICHART_COMPONENT_CONTEXT);
