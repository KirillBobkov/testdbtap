/// <reference types="react" />
import { ChartReactConfig } from '../../../../config/chart-react-config';
import { ChartWithModules } from '../../../components/canvas-chart-renderer/chart-with-modules';
import { ChartConfiguratorViewModel } from '../../../view-models/chart-configurator.view-model';
export declare const ChartSettingsMarketContainer: import("../../../../context/context2").Context<Record<"chartConfiguratorViewModel", ChartConfiguratorViewModel> & Record<"chart", ChartWithModules> & Record<"chartReactConfig", ChartReactConfig>, import("react").FC<Record<string, any>>>;
export default ChartSettingsMarketContainer;
