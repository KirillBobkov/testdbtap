import { StudySeriesConfig } from '@dx-private/dxchart5-modules/dist/studies/model/study-series';
import { TickValues } from '@dx-private/dxchart5-modules/dist/studies/model/studies.model';
import { TStudySettings } from '../../chart/model/studies.model';
export interface CalculateStudyOptions {
    chartId?: string;
    addedStudies?: TStudySettings[];
}
export interface StudiesDataProvider {
    /**
     * Example of expecting result
     * * [
     *   [0.2, 0.5], // for 1st candle
     *   [0.2, 0.6], // for 2nd candle
     *   [0.2, 0.7], // for 3rd candle
     * ]
     * @param config
     */
    calculateStudy: (config: StudySeriesConfig, options: CalculateStudyOptions) => Promise<TickValues[]>;
}
