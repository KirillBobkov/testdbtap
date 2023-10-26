import { FC } from 'react';
import { StudyLineRefHolder } from '../../../dom-mutation-models/chart-legend.dom-mutation-model';
import { StudiesSettingsProps } from '../../studies/studies-settings/studies-settings.component';
export interface ChartLegendSeparateStudiesProps {
    readonly uuid: string;
    readonly title: string;
    readonly lines: StudyLineRefHolder[];
    readonly onDeleteStudySeries: (uuid: string) => void;
    readonly studiesSettingsProps: StudiesSettingsProps;
}
export declare const ChartLegendSeparateStudies: FC<ChartLegendSeparateStudiesProps>;
