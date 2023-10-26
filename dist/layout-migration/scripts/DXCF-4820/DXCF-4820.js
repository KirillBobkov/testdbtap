import { cloneUnsafe } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
import { config } from '../../../config/chart-config';
import { DEFAULT_CHART_PALETTE } from '../../../config/chart-palette';
export const DXCF_4820 = {
    name: 'DXCF_4820',
    migrateFn: layout => {
        layout.charts = layout.charts.map((chart) => {
            const copy = cloneUnsafe(chart);
            const chartConfig = config(DEFAULT_CHART_PALETTE.dark, DEFAULT_CHART_PALETTE.light);
            delete copy.chartCoreConfig.colors;
            copy.chartCoreConfig.themes = {
                dark: chartConfig.themes?.dark,
                light: chartConfig.themes?.light,
            };
            return copy;
        });
        // eslint-disable-next-line no-restricted-syntax
        return layout;
    },
};
