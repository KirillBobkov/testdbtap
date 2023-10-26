import React, { FC } from 'react';
import { StudiesSettingsProps } from '../../studies/studies-settings/studies-settings.component';
export interface ChartLegendSeriesStackedStudyGroupProps {
    readonly uuid: string;
    readonly title: string;
    readonly onDeleteStudySeries: (uuid: string) => void;
    readonly studiesSettingsProps: StudiesSettingsProps;
    readonly children: React.ReactNode;
}
export declare const ChartLegendSeriesStackedStudyGroup: FC<ChartLegendSeriesStackedStudyGroupProps>;
