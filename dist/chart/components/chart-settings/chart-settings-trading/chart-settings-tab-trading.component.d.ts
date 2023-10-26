import { Lazy } from 'fp-ts/function';
import { Lens } from 'monocle-ts';
import React from 'react';
import { Localization } from '../../../../config/localization/localization';
import { ChartReactSettings, ChartSettings } from '../../../model/chart.model';
import { a11yTabProps } from '../chart-settings-content.component';
export interface ChartSettingsTradingProps {
    readonly localization: Localization;
    readonly settings: ChartReactSettings['trading'];
    readonly onValueChange: (lens: Lens<ChartSettings, any>, value: any) => void;
    readonly a11yTabProps: a11yTabProps;
    readonly onRestoreDefaultRequest: Lazy<void>;
    readonly showRestoreToDefault: boolean;
    readonly tradingAllowed: boolean;
}
export declare const ChartSettingsTabTradingContent: React.MemoExoticComponent<(props: ChartSettingsTradingProps) => JSX.Element>;
export default ChartSettingsTabTradingContent;
