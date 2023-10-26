import { Lazy } from 'fp-ts/function';
import { Lens } from 'monocle-ts';
import React from 'react';
import { Localization } from '../../../../config/localization/localization';
import { ChartSettings, ChartType } from '../../../model/chart.model';
import { a11yTabProps } from '../chart-settings-content.component';
export interface ChartSettingsGeneralProps {
    readonly chartType: ChartType;
    readonly localization: Localization;
    readonly value: ChartSettings;
    readonly onRestoreDefaultRequest?: Lazy<void>;
    readonly onValueChange: (lens: Lens<ChartSettings, any>, value: any) => void;
    readonly a11yTabProps?: a11yTabProps;
    readonly showRestoreToDefault?: boolean;
}
export declare const ChartSettingsTabGeneralContent: React.MemoExoticComponent<(props: ChartSettingsGeneralProps) => JSX.Element>;
export default ChartSettingsTabGeneralContent;
