import { array, string } from 'fp-ts';
import { pipe } from 'fp-ts/function';
import { toChartDataSubscriptionKey } from '../../services/multichart-data.utils';
import { isChartVisibleInMultiChartLayout } from '../../model/multichart.model';
export const getChartDataKeysFromLayout = (layout) => {
    const keys = [];
    layout.charts.forEach(chart => {
        if (isChartVisibleInMultiChartLayout(layout.multiChart.layout, chart.index) && chart.symbol) {
            const options = {
                extendedHours: chart.chartReactConfig.extendedHours.visible,
                priceType: chart.chartReactConfig.candlesData.price,
                candleAlignment: chart.chartReactConfig.candlesData.candleAlignment,
            };
            pipe([chart.symbol], array.map(symbol => toChartDataSubscriptionKey(symbol, chart.aggregation, options)), _keys => keys.push(..._keys));
        }
    });
    return array.uniq(string.Eq)(keys);
};
