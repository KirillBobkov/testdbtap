import { context } from '../../../context/context2';
import { LabelsGroups, } from '@devexperts/dxcharts-lite/dist/chart/components/y_axis/price_labels/y-axis-labels.model';
import { CHART_UUID, CanvasElement } from '@devexperts/dxcharts-lite/dist/chart/canvas/canvas-bounds-container';
import { convertToProperty } from '../../../utils/property.utils';
import { getOrderPrice } from '../../model/trading/trading.model';
export const createOrdersAndPositionsYAxisLabelProvider = context.combine(context.key()('chart'), context.key()('tradingVM'), (chart, tradingVM) => {
    const getLabelDrawConfig = (item) => {
        const tradingConfig = chart.config.colors.labels.trading;
        const bgColor = tradingConfig[item].boxColor;
        const textColor = tradingConfig[item].textColor;
        return {
            bgColor,
            textColor,
        };
    };
    const orders = convertToProperty(tradingVM.orders, {});
    const positions = convertToProperty(tradingVM.positions, {});
    const getUnorderedLabels = () => {
        const labels = [];
        // TODO implement in trading VM
        const visible = false;
        if (visible) {
            const lastCandle = chart.chartModel.getLastCandle();
            const marketPrice = lastCandle ? lastCandle.close : 0;
            const currentOrders = orders.getValue();
            const currentPositions = positions.getValue();
            const nonFirstGroupedTradingItems = Object.values(tradingVM.groupedVisualTradingItems.getValue()).reduce((acc, group, index) => (index === 0 ? acc : { ...acc, ...group.items }), {});
            Object.entries(currentOrders).forEach(([key, order]) => {
                const isInGroup = Boolean(nonFirstGroupedTradingItems[order.model.id]);
                !isInGroup &&
                    order.y !== undefined &&
                    labels.push({
                        labels: [
                            {
                                ...getLabelDrawConfig(order.model.side),
                                y: order.y,
                                labelText: chart.chartModel.pane.valueFormatter(getOrderPrice(order.model, marketPrice)),
                            },
                        ],
                        bounds: chart.canvasBoundsContainer.getBounds(CanvasElement.PANE_UUID_Y_AXIS(CHART_UUID)),
                    });
            });
            Object.entries(currentPositions).forEach(([key, position]) => {
                const isInGroup = Boolean(nonFirstGroupedTradingItems[position.model.id]);
                !isInGroup &&
                    position.y !== undefined &&
                    labels.push({
                        labels: [
                            {
                                ...getLabelDrawConfig(position.model.side),
                                y: position.y,
                                labelText: chart.chartModel.pane.valueFormatter(position.model.price),
                                mode: 'label',
                            },
                        ],
                        bounds: chart.canvasBoundsContainer.getBounds(CanvasElement.PANE_UUID_Y_AXIS(CHART_UUID)),
                    });
            });
        }
        return labels;
    };
    chart.yAxis.registerYAxisLabelsProvider({ getUnorderedLabels }, LabelsGroups.MAIN, 'trading_order_labels');
});
