import React from 'react';
import { ControlProps } from '../../../../../../chart-kit/Control/Control';
import { RegressionTrendSectionSettings } from '@dx-private/dxchart5-modules/dist/drawings/figures/RegressionTrend';
import { DrawingsDictionary } from '../../../../../../config/localization/drawings';
export interface RegressionTrendCoefGroupsProps extends ControlProps<RegressionTrendSectionSettings[]> {
    dictionary: DrawingsDictionary;
}
export declare const RegressionTrendCoefGroup: React.NamedExoticComponent<RegressionTrendCoefGroupsProps>;
