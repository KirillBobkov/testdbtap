import { context } from '../../../../context/context2';
import { LabelsGroups, } from '@devexperts/dxcharts-lite/dist/chart/components/y_axis/price_labels/y-axis-labels.model';
export const createBidAskLabelProvider = context.combine(context.key()('yAxisConfiguratorViewModel'), context.key()('chartDataViewModel'), context.key()('chart'), (yAxisVM, chartDataVM, chart) => {
    chart.config.components.yAxis.labels.settings.bidAsk = {
        mode: 'none',
        type: 'badge',
    };
    if (yAxisVM.labelsConfig.getValue().labels.bidAsk) {
        const getLabelDrawConfig = (item) => {
            const bidAskConfig = chart.config.colors.labels.bidAsk;
            const bgColor = bidAskConfig[item].boxColor;
            const textColor = bidAskConfig[item].textColor;
            return {
                bgColor,
                textColor,
            };
        };
        const getUnorderedLabels = () => {
            const bidAskLabels = [];
            const bid = chartDataVM.serviceData.getValue().bid;
            const ask = chartDataVM.serviceData.getValue().ask;
            const mode = yAxisVM.labelsConfig.getValue().labels.bidAsk;
            if (mode !== 'none' &&
                bid !== undefined &&
                ask !== undefined &&
                chart.config.components.yAxis.visible) {
                const type = chart.config.components.yAxis.labels.settings.bidAsk.type;
                const bidY = chart.chartModel.toY(bid);
                const askY = chart.chartModel.toY(ask);
                if (isFinite(bidY) && isFinite(askY)) {
                    const bidVisualLabel = {
                        description: chart.config.colors.labels.bidAsk.bid.descriptionText,
                        mode,
                        labelType: type,
                        labelText: chart.chartModel.pane.valueFormatter(bid),
                        y: bidY,
                        ...getLabelDrawConfig('bid'),
                    };
                    const askVisualLabel = {
                        description: chart.config.colors.labels.bidAsk.ask.descriptionText,
                        mode,
                        labelType: type,
                        labelText: chart.chartModel.pane.valueFormatter(ask),
                        y: askY,
                        ...getLabelDrawConfig('ask'),
                    };
                    bidAskLabels.push({
                        labels: [bidVisualLabel, askVisualLabel],
                    });
                }
            }
            return bidAskLabels;
        };
        chart.yAxis.registerYAxisLabelsProvider({ getUnorderedLabels }, LabelsGroups.MAIN, 'bid_ask');
    }
});
