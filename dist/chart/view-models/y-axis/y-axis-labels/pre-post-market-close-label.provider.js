import { context } from '../../../../context/context2';
import { lastOf } from '@devexperts/dxcharts-lite/dist/chart/utils/array.utils';
import { LabelsGroups } from '@devexperts/dxcharts-lite/dist/chart/components/y_axis/price_labels/y-axis-labels.model';
export const createPrePostMarketLabelProvider = context.combine(context.key()('yAxisConfiguratorViewModel'), context.key()('chartDataViewModel'), context.key()('chart'), context.key()('chartSessionsViewModel'), (yAxisVM, chartDataVM, chart, chartSessionsViewModel) => {
    chart.config.components.yAxis.labels.settings.prePostMarket = {
        mode: 'none',
        type: 'badge',
    };
    if (yAxisVM.labelsConfig.getValue().labels.prePostMarket) {
        const getLabelDrawConfig = (type) => {
            const ppmConfig = chart.config.colors.labels.prePostMarket;
            const bgColor = ppmConfig[type].boxColor;
            const textColor = ppmConfig[type].textColor;
            return {
                bgColor,
                textColor,
            };
        };
        const getUnorderedLabels = () => {
            const ppmLabels = [];
            const mode = yAxisVM.labelsConfig.getValue().labels.prePostMarket;
            const value = chartDataVM.serviceData.getValue().prePostMarketClose;
            if (mode !== 'none' && value !== undefined && chart.config.components.yAxis.visible) {
                const y = chart.chartModel.toY(value);
                if (isFinite(y)) {
                    const preMarketStart = lastOf(chartSessionsViewModel.sessions.getValue().PRE_MARKET)?.from ?? Date.now();
                    const afterMarketStart = lastOf(chartSessionsViewModel.sessions.getValue().AFTER_MARKET)?.from ?? Date.now();
                    const type = preMarketStart > afterMarketStart ? 'pre' : 'post';
                    const ppmVisualLabel = {
                        description: chart.config.colors.labels.prePostMarket[type].descriptionText,
                        labelText: chart.chartModel.pane.valueFormatter(value),
                        y,
                        mode,
                        ...getLabelDrawConfig(type),
                    };
                    ppmLabels.push({
                        labels: [ppmVisualLabel],
                    });
                }
            }
            return ppmLabels;
        };
        chart.yAxis.registerYAxisLabelsProvider({ getUnorderedLabels }, LabelsGroups.MAIN, 'pre_post_market_close');
    }
});
