/// <reference types="react" />
import { ChartDataViewModel } from '../view-models/data/chart-data.view-model';
import { CompareChartViewModel } from '../view-models/data/compare-chart.view-model';
export declare const CompareChartSelectorContainer: import("../../context/context2").Context<Omit<Record<"localInstrumentStore", import("../stores/instrument.store").LocalInstrumentStore> & Record<"symbolSuggestProvider", import("../../providers/symbol-suggest-provider").SymbolSuggestProvider> & Record<"chartId", string>, "chartId"> & Record<"compareChartViewModel", CompareChartViewModel> & Record<"chartDataViewModel", ChartDataViewModel>, import("react").FC<Record<string, any>>>;
