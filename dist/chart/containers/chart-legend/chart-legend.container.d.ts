import React from 'react';
import { ChartReactConfig } from '../../../config/chart-react-config';
import { ChartWithModules } from '../../components/canvas-chart-renderer/chart-with-modules';
import { AggregationPeriodViewModel } from '../../view-models/aggregation-period.view-model';
import { ChartConfiguratorViewModel } from '../../view-models/chart-configurator.view-model';
import { ChartDataViewModel } from '../../view-models/data/chart-data.view-model';
import { ChartLegendViewModel } from '../../view-models/chart-legend/chart-legend.view-model';
import { DxScriptEditViewModel } from '../../view-models/dx-script-edit.view-model';
import { InitialLoaderVM } from '../../view-models/loading/initial-loader.vm';
import { StudiesSettingsViewModel } from '../../view-models/studies/studies-settings.view-model';
import { OrderEntryViewModel } from '../../view-models/trading/order-entry.view-model';
import { TradingViewModel } from '../../view-models/trading/trading.view-model';
import { Localization } from '../../../config/localization/localization';
import { DataLoaderVM } from '../../view-models/loading/data-loader.vm';
export interface ChartLegendContainerProps {
    readonly id: string;
}
export declare const ChartLegendContainer: import("../../../context/context2").Context<Record<"chart", ChartWithModules> & Record<"chartLegendVM", ChartLegendViewModel> & Record<"chartConfiguratorViewModel", ChartConfiguratorViewModel> & Record<"themeViewModel", import("../../view-models/theme.view-model").ThemeViewModel> & Record<"chartTypeViewModel", import("../../view-models/chart-type.view-model").ChartTypeViewModel> & Record<"compareChartViewModel", import("../../view-models/data/compare-chart.view-model").CompareChartViewModel> & Record<"tradingVM", TradingViewModel> & Record<"tradingCoreVM", import("../../view-models/trading/trading-core.view-model").TradingCoreViewModel> & Record<"dynamicObjectsVM", import("../../view-models/dynamic-objects.view-model").DynamicObjectsViewModel> & Record<"orderEntryVM", OrderEntryViewModel> & Record<"dxScriptEditViewModel", DxScriptEditViewModel> & Record<"localization", Localization> & Record<"studiesSettingsViewModel", StudiesSettingsViewModel> & Record<"chartReactConfig", ChartReactConfig> & Record<"chartDataViewModel", ChartDataViewModel> & Record<"colorPalette", string[]> & Record<"initialLoaderVM", InitialLoaderVM> & Record<"aggregationPeriodViewModel", AggregationPeriodViewModel> & Record<"dataLoaderVM", DataLoaderVM>, React.FC<ChartLegendContainerProps>>;
