/// <reference types="react" />
import { MultiChartViewModel } from '../view-models/multi-chart.view-model';
import { ChartDataViewModel } from '../view-models/data/chart-data.view-model';
import { ChartTypeViewModel } from '../view-models/chart-type.view-model';
import { ChartConfiguratorViewModel } from '../view-models/chart-configurator.view-model';
import { Layout } from '../components/multichart-settings/multichart-settings.component';
import { Localization } from '../../config/localization/localization';
import { AggregationPeriodViewModel } from '../view-models/aggregation-period.view-model';
export interface MultichartSettingsContainerProps {
    readonly onLayoutChange?: (layout: Layout) => void;
    readonly closePopover: () => void;
}
export declare const MultichartSettingsContainer: import("../../context/context2").Context<Record<"multiChartViewModel", MultiChartViewModel> & Record<"chartDataViewModel", ChartDataViewModel> & Record<"chartTypeViewModel", ChartTypeViewModel> & Record<"chartConfiguratorViewModel", ChartConfiguratorViewModel> & Record<"aggregationPeriodViewModel", AggregationPeriodViewModel> & Record<"localization", Localization>, import("react").FC<MultichartSettingsContainerProps>>;
