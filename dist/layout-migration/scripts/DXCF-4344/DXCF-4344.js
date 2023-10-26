import { cloneUnsafe } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
export const DXCF_4344 = {
    name: 'DXCF-4344',
    migrateFn: layout => {
        layout.charts = layout.charts.map((chart) => {
            const copy = cloneUnsafe(chart);
            delete copy.chartCoreConfig.colors.chartAreaTheme.axisColor;
            copy.chartCoreConfig.colors.xAxis = {
                labelTextColor: chart.chartCoreConfig.colors.chartAreaTheme.axisColor,
            };
            copy.chartCoreConfig.colors.yAxis = {
                labelTextColor: chart.chartCoreConfig.colors.chartAreaTheme.axisColor,
            };
            return copy;
        });
        // eslint-disable-next-line no-restricted-syntax
        return layout;
    },
};
