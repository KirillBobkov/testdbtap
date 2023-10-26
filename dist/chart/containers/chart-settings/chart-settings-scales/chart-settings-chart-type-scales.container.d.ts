/// <reference types="react" />
import { Localization } from '../../../../config/localization/localization';
import { ChartConfiguratorViewModel } from '../../../view-models/chart-configurator.view-model';
import { YAxisConfiguratorViewModel } from '../../../view-models/y-axis/y-axis-configurator.view-model';
import { FullChartCoreConfig } from '../../../../config/chart-config';
export declare const ChartSettingsChartTypeScalesContainer: import("../../../../context/context2").Context<Record<"yAxisConfiguratorViewModel", YAxisConfiguratorViewModel> & Record<"chartConfiguratorViewModel", ChartConfiguratorViewModel> & Record<"localization", Localization> & Record<"chartConfig", FullChartCoreConfig>, import("react").FC<Record<string, any>>>;
export default ChartSettingsChartTypeScalesContainer;
