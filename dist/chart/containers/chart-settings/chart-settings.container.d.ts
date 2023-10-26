import React from 'react';
import { ChartReactConfig } from '../../../config/chart-react-config';
import { ChartSettings } from '../../model/chart.model';
import { ChartConfiguratorViewModel } from '../../view-models/chart-configurator.view-model';
export declare const ChartSettingsContainer: import("../../../context/context2").Context<Record<"chartConfiguratorViewModel", ChartConfiguratorViewModel> & Record<"chartReactConfig", ChartReactConfig> & Record<"chartTypeViewModel", import("../../view-models/chart-type.view-model").ChartTypeViewModel> & Record<"chart", import("../../components/canvas-chart-renderer/chart-with-modules").ChartWithModules> & Record<"localization", import("../../../config/localization/localization").Localization> & Record<"themeViewModel", import("../../view-models/theme.view-model").ThemeViewModel> & Record<"colorPalette", string[]> & Record<"initialChartTheme", string> & Record<"yAxisConfiguratorViewModel", import("../../view-models/y-axis/y-axis-configurator.view-model").YAxisConfiguratorViewModel> & Record<"chartConfig", import("../../../config/chart-config").FullChartCoreConfig>, React.FC<Record<string, any>>>;
export declare const getGeneralTabDefaultConfig: (defaultSettingsConfig: ChartSettings) => {
    chartCore: {
        components: {
            crossTool: {
                type: string;
                magnetTarget: import("@devexperts/dxcharts-lite/dist/chart/components/cross_tool/cross-tool.component").MagnetTarget;
            };
            grid: {
                vertical: boolean;
                horizontal: boolean;
            };
            highLow: {
                visible: boolean;
            };
            chart: {
                showWicks: boolean;
                equivolume: {
                    showClosePrice: boolean;
                };
            };
            waterMark: {
                visible: boolean;
            };
        };
    };
};
