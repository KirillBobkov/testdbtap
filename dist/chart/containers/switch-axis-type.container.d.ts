/// <reference types="react" />
import { ChartConfiguratorViewModel } from '../view-models/chart-configurator.view-model';
import { MultiChartViewModel } from '../view-models/multi-chart.view-model';
import { Localization } from '../../config/localization/localization';
import { YAxisConfiguratorViewModel } from '../view-models/y-axis/y-axis-configurator.view-model';
export declare const SwitchAxisTypeContainer: import("../../context/context2").Context<Record<"chartConfiguratorViewModel", ChartConfiguratorViewModel> & Record<"yAxisConfiguratorViewModel", YAxisConfiguratorViewModel> & Record<"multiChartViewModel", MultiChartViewModel> & Record<"localization", Localization>, import("react").FC<Record<string, any>>>;
