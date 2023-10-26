import React from 'react';
import { Localization } from '../../../../config/localization/localization';
import { ChartConfiguratorViewModel } from '../../../view-models/chart-configurator.view-model';
import { ChartTypeViewModel } from '../../../view-models/chart-type.view-model';
import { ThemeViewModel } from '../../../view-models/theme.view-model';
import { ChartReactConfig } from '../../../../config/chart-react-config';
export declare const ChartSettingsChartTypeColorsContainer: import("../../../../context/context2").Context<Record<"chartTypeViewModel", ChartTypeViewModel> & Record<"localization", Localization> & Record<"themeViewModel", ThemeViewModel> & Record<"chartConfiguratorViewModel", ChartConfiguratorViewModel> & Record<"chartReactConfig", ChartReactConfig> & Record<"colorPalette", string[]> & Record<"initialChartTheme", string>, React.FC<Record<string, any>>>;
export default ChartSettingsChartTypeColorsContainer;
