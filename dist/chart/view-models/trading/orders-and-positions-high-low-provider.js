import { getDefaultHighLowWithIndex } from '@devexperts/dxcharts-lite/dist/chart/model/scale.model';
import { mergeHighLow } from '@devexperts/dxcharts-lite/dist/chart/model/scaling/auto-scale.model';
import { getOrderPrice } from '../../model/trading/trading.model';
export const createOrdersAndPositionsHighLowProvider = (configProvider, chartModel, tradingModel) => {
    const calculateHighLow = () => {
        const config = configProvider();
        const highLows = [getDefaultHighLowWithIndex()];
        if (config.chartReact.scale.fit.orders) {
            highLows.push(getOrdersHighLow(chartModel, Object.values(tradingModel.orders.getValue()).map(o => o.model)));
        }
        if (config.chartReact.scale.fit.positions) {
            highLows.push(getPositionsHighLow(Object.values(tradingModel.positions.getValue()).map(p => p.model)));
        }
        return mergeHighLow(highLows);
    };
    return {
        isHighLowActive: () => {
            const config = configProvider();
            return config.chartReact.scale.fit.orders || config.chartReact.scale.fit.positions;
        },
        calculateHighLow: () => {
            const highLow = calculateHighLow();
            return {
                ...highLow,
                high: chartModel.mainCandleSeries.view.toAxisUnits(highLow.high),
                low: chartModel.mainCandleSeries.view.toAxisUnits(highLow.low),
            };
        },
    };
};
function getOrdersHighLow(chartModel, orders) {
    const lastCandle = chartModel.getLastCandle();
    const marketPrice = lastCandle ? lastCandle.close : 0;
    const ordersPrices = orders.map(o => getOrderPrice(o, marketPrice));
    const high = Math.max(...ordersPrices);
    const low = Math.min(...ordersPrices);
    return { high, low };
}
function getPositionsHighLow(positions) {
    const positionsPrices = positions.map(p => p.price);
    const high = Math.max(...positionsPrices);
    const low = Math.min(...positionsPrices);
    return { high, low };
}
