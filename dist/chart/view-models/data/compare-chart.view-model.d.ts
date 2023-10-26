import { DataSeriesType } from '@devexperts/dxcharts-lite/dist/chart/model/data-series.config';
import { Observable } from 'rxjs';
import { Sink } from '../../../context/sink2';
import { Property } from '../../../utils/property.utils';
import { ChartWithModules } from '../../components/canvas-chart-renderer/chart-with-modules';
import { CompareInstrument } from '../../model/chart.model';
import { ChartDataViewModel } from './chart-data.view-model';
import { InstrumentSelectorViewModel } from '../instrument-selector.view-model';
import { MultiChartViewModel } from '../multi-chart.view-model';
export interface CompareInstrumentConfig {
    id: string;
    symbol: string;
    chartType: DataSeriesType;
    color: string;
}
export type CompareInstrumentsConfig = Record<string, CompareInstrumentConfig>;
/**
 * Holds state of selected instruments for comparison, excluding main instrument.
 */
export interface CompareChartViewModel {
    compareInstrumentsConfig: Property<CompareInstrumentsConfig>;
    updateCompareInstrumentConfig(config: CompareInstrumentConfig): void;
    isDisabled: Observable<boolean>;
}
export declare const createCompareChartViewModel: import("../../../context/context2").Context<Record<"chart", ChartWithModules> & Record<"chartDataViewModel", ChartDataViewModel> & Record<"multiChartViewModel", MultiChartViewModel> & Record<"initialCompareInstruments", CompareInstrument[]> & Record<"instrumentSelectorViewModel", InstrumentSelectorViewModel> & Record<"chartId", string>, Sink<CompareChartViewModel>>;
