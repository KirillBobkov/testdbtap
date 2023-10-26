import { context } from '../../../../context/context2';
import { LabelsGroups, } from '@devexperts/dxcharts-lite/dist/chart/components/y_axis/price_labels/y-axis-labels.model';
export const createViewportHighLowLabelProvider = context.combine(context.key()('yAxisConfiguratorViewModel'), context.key()('chart'), context.key()('chartDataViewModel'), (yAxisVM, chart, chartDataViewModel) => {
    chart.config.components.yAxis.labels.settings.highLow = {
        mode: 'none',
        type: 'badge',
    };
    if (yAxisVM.labelsConfig.getValue().labels.highLow) {
        const getLabelDrawConfig = (type) => {
            const highLowConfig = chart.config.colors.labels.highLow;
            const bgColor = highLowConfig[type].boxColor;
            const textColor = highLowConfig[type].textColor;
            const lineColor = chart.config.colors.chartAreaTheme.gridColor;
            return {
                bgColor,
                textColor,
                lineColor,
            };
        };
        const getUnorderedLabels = () => {
            const labels = [];
            const mode = yAxisVM.labelsConfig.getValue().labels.highLow;
            if (mode !== 'none' && chart.chartModel.mainCandleSeries.dataPoints.length !== 0) {
                const { high, low } = chart.chartModel.mainCandleSeries.zippedHighLow;
                const maxY = chart.chartModel.toY(high);
                const minY = chart.chartModel.toY(low);
                if (isFinite(minY) && isFinite(maxY)) {
                    const maxVisualLabel = {
                        description: chart.config.colors.labels.highLow.high.descriptionText,
                        mode,
                        labelText: chart.chartModel.pane.valueFormatter(high),
                        y: maxY,
                        ...getLabelDrawConfig('high'),
                    };
                    const minVisualLabel = {
                        description: chart.config.colors.labels.highLow.low.descriptionText,
                        mode,
                        labelText: chart.chartModel.pane.valueFormatter(low),
                        y: minY,
                        ...getLabelDrawConfig('low'),
                    };
                    labels.push({
                        labels: [maxVisualLabel, minVisualLabel],
                    });
                }
            }
            return labels;
        };
        chart.yAxis.registerYAxisLabelsProvider({ getUnorderedLabels }, LabelsGroups.MAIN, 'viewport_high_low');
    }
});
