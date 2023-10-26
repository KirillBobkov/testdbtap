import { Lazy } from 'fp-ts/function';
import { Lens } from 'monocle-ts';
import React from 'react';
import { ChartReactConfig } from '../../../../config/chart-react-config';
import { Localization } from '../../../../config/localization/localization';
import { ChartSettings } from '../../../model/chart.model';
import { a11yTabProps } from '../chart-settings-content.component';
export interface ChartSettingsTabMarketContentProps {
    readonly a11yTabProps: a11yTabProps;
    readonly chartReactConfig: ChartReactConfig;
    readonly localization: Localization;
    readonly value: ChartSettings;
    readonly onValueChange: (lens: Lens<ChartSettings, any>, value: any) => void;
    readonly onRestoreDefaultRequest: Lazy<void>;
    readonly sessionBreaksDisabled: boolean;
    readonly volumesDisabled: boolean;
    readonly showRestoreToDefault: boolean;
}
export declare const ChartSettingsTabMarketContent: React.NamedExoticComponent<ChartSettingsTabMarketContentProps>;
export default ChartSettingsTabMarketContent;
