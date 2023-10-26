/// <reference types="react" />
import { Localization } from '../../config/localization/localization';
/**
 * Magnifying tool.
 */
export declare const ChartScalingToolContainer: import("../../context/context2").Context<Record<"drawingViewModel", import("../view-models/drawings/drawing.view-model").ChartDrawingViewModel> & Record<"chartConfiguratorViewModel", import("../view-models/chart-configurator.view-model").ChartConfiguratorViewModel> & Record<"chart", import("../components/canvas-chart-renderer/chart-with-modules").ChartWithModules> & Record<"localization", Localization>, import("react").FC<Record<string, any>>>;
