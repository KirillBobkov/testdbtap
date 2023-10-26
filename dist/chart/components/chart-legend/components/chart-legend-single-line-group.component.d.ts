import { FC } from 'react';
import { StudyLineRefHolder } from '../../../dom-mutation-models/chart-legend.dom-mutation-model';
import { StudiesSettingsProps } from '../../studies/studies-settings/studies-settings.component';
export interface ChartLegendSeriesSingleStudyGroupProps {
    readonly uuid: string;
    readonly line: StudyLineRefHolder;
    readonly onDeleteStudySeries: (uuid: string) => void;
    readonly studiesSettingsProps: StudiesSettingsProps;
}
export declare const ChartLegendSeriesSingleStudyGroup: FC<ChartLegendSeriesSingleStudyGroupProps>;
