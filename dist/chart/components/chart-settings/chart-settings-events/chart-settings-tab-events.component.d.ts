import { Lazy } from 'fp-ts/function';
import { Lens } from 'monocle-ts';
import React from 'react';
import { Localization } from '../../../../config/localization/localization';
import { ChartCoreSettings, ChartSettings } from '../../../model/chart.model';
import { a11yTabProps } from '../chart-settings-content.component';
export interface ChartSettingsEventProps {
    readonly localization: Localization;
    readonly value: ChartCoreSettings;
    readonly onValueChange: (lens: Lens<ChartSettings, any>, value: any) => void;
    readonly a11yTabProps: a11yTabProps;
    readonly onRestoreDefaultRequest: Lazy<void>;
    readonly showRestoreToDefault: boolean;
}
export declare const ChartSettingsTabEventsContent: React.MemoExoticComponent<(props: ChartSettingsEventProps) => JSX.Element>;
export default ChartSettingsTabEventsContent;
