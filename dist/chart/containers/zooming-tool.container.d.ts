/// <reference types="react" />
import { Localization } from '../../config/localization/localization';
import { ChartWithModules } from '../components/canvas-chart-renderer/chart-with-modules';
import { ChartDataViewModel } from '../view-models/data/chart-data.view-model';
export declare const ZoomingToolContainer: import("../../context/context2").Context<Record<"chart", ChartWithModules> & Record<"chartConfiguratorViewModel", import("../view-models/chart-configurator.view-model").ChartConfiguratorViewModel> & Record<"localization", Localization> & Record<"chartDataViewModel", ChartDataViewModel>, import("react").FC<Record<string, any>>>;
