import { TickValues } from '@dx-private/dxchart5-modules/dist/studies/model/studies.model';
import { StudySeriesConfig } from '@dx-private/dxchart5-modules/dist/studies/model/study-series';
import { DxScriptRunner, RunScriptResult, SuccessfulRunResult } from '../dx-script-provider';
import { ChartWithModules } from '../../chart/components/canvas-chart-renderer/chart-with-modules';
export interface DxScriptStudiesDataProvider {
    calculateStudy: (script: string, config: StudySeriesConfig) => Promise<TickValues[]>;
}
/**
 * Studies data provider for dxScript.
 */
export declare const createDxScriptStudiesDataProvider: (dxScriptRunner: DxScriptRunner, chart: ChartWithModules) => DxScriptStudiesDataProvider;
export declare const isSuccessRun: (result: RunScriptResult) => result is SuccessfulRunResult;
