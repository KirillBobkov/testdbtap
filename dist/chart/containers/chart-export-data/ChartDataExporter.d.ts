import { ChartModel } from '@devexperts/dxcharts-lite/dist/chart/components/chart/chart.model';
import { StudiesModel } from '@dx-private/dxchart5-modules/dist/studies/model/studies.model';
/**
 * Chart Data Export Class.
 * Exports a CSV file with all important candles and studies information
 * such as candles timestamps, candles or studies values.
 *
 * @doc-tags chart-core,candles-export
 */
export declare class ChartDataExporter {
    private chartModel;
    private studiesModel;
    private period;
    constructor(chartModel: ChartModel, studiesModel: StudiesModel, period: string);
    /**
     * Exports the data and downloads the file
     */
    exportChartData(): void;
    private getFileName;
    private getCSVData;
    private getChartCandles;
    private getStudiesData;
    private getChartStudies;
    private getValues;
}
