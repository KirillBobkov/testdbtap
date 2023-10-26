import { LabelsGroups, } from '@devexperts/dxcharts-lite/dist/chart/components/y_axis/price_labels/y-axis-labels.model';
import { context } from '../../../../context/context2';
import { periodToMinutes } from '../../../model/aggregation.model';
const PREV_DAY_CLOSE_MAX_PERIOD_MINUTES = 23 * 60;
export const createPrevDayCloseProvider = context.combine(context.key()('yAxisConfiguratorViewModel'), context.key()('chartDataViewModel'), context.key()('aggregationPeriodViewModel'), context.key()('chart'), (yAxisVM, chartDataVM, aggregationPeriodVM, chart) => {
    chart.config.components.yAxis.labels.settings.prevDayClose = {
        mode: 'none',
        type: 'badge',
    };
    if (yAxisVM.labelsConfig.getValue().labels.prevDayClose) {
        const getUnorderedLabels = () => {
            const period = aggregationPeriodVM.selectedPeriod.getValue();
            if (periodToMinutes(period) > PREV_DAY_CLOSE_MAX_PERIOD_MINUTES) {
                return [];
            }
            const pdcLabels = [];
            const mode = yAxisVM.labelsConfig.getValue().labels.prevDayClose;
            const prevDayClose = chartDataVM.serviceData.getValue().prevDayClosePrice;
            if (mode !== 'none' && prevDayClose !== undefined && chart.config.components.yAxis.visible) {
                const y = chart.chartModel.toY(prevDayClose);
                if (isFinite(y)) {
                    const pdcVisualLabel = {
                        labelText: chart.chartModel.pane.valueFormatter(prevDayClose),
                        bgColor: chart.config.colors.labels.prevDayClose.boxColor,
                        textColor: chart.config.colors.labels.prevDayClose.textColor,
                        y,
                        mode,
                    };
                    pdcLabels.push({
                        labels: [pdcVisualLabel],
                    });
                }
            }
            return pdcLabels;
        };
        chart.yAxis.registerYAxisLabelsProvider({ getUnorderedLabels }, LabelsGroups.MAIN, 'prev_day_close');
    }
});
