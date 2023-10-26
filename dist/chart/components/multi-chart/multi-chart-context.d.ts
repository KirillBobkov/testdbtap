/// <reference types="react" />
import { Devices } from '@devexperts/dxcharts-lite/dist/chart/utils/device/device-detector.utils';
import { Localization } from '../../../config/localization/localization';
export interface MultiChartComponentContextProps {
    keyboardModeEnabled: boolean;
    localization: Localization;
    device: Devices;
}
export declare const DEFAULT_MULTICHART_COMPONENT_CONTEXT: {
    keyboardModeEnabled: boolean;
    localization: Localization;
    device: "other";
};
export declare const MultiChartComponentContext: import("react").Context<MultiChartComponentContextProps>;
