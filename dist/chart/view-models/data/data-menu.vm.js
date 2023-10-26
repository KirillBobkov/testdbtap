import { tap, distinctUntilChanged } from 'rxjs/operators';
import { map, merge } from 'rxjs';
import { context } from '../../../context/context2';
import { newSink } from '../../../context/sink2';
import { createPropertyAdapter } from '../../../utils/property.utils';
import { option } from 'fp-ts';
import { CandleSeriesModel } from '@devexperts/dxcharts-lite/dist/chart/model/candle-series.model';
import { toType } from '../../components/chart-type/chart-type.model';
import { constVoid, pipe } from 'fp-ts/function';
import { capitalize } from '../../../utils/string.utils';
import { chartSettingsLens } from '../chart-configurator.view-model';
export const COMPARE_SERIES_CHART_TYPES = ['line', 'area'];
export const createDataMenuViewModel = context.combine(context.key()('chart'), context.key()('chartTypeViewModel'), context.key()('compareChartViewModel'), context.key()('tradingVM'), context.key()('tradingCoreVM'), context.key()('chartConfiguratorViewModel'), context.key()('dynamicObjectsVM'), context.key()('orderEntryVM'), (chart, chartTypeViewModel, compareChartViewModel, tradingVM, tradingCoreVM, chartConfiguratorViewModel, dynamicObjectsVM, orderEntryVM) => {
    const [setIsOpened, isOpened] = createPropertyAdapter(false);
    const [setMenuPosition, menuPosition] = createPropertyAdapter({ x: 0, y: 0 });
    const [setSelectedSeries, selectedSeries] = createPropertyAdapter(option.none);
    const closeMenu = () => setIsOpened(false);
    const getSelectedSeriesChartType = (series) => {
        const symbol = series.instrument.symbol;
        const compareConfig = compareChartViewModel.compareInstrumentsConfig.getValue();
        if (compareConfig[symbol]) {
            return toType(capitalize(compareConfig[symbol].chartType));
        }
        return 'line';
    };
    const getSelectedSeriesColor = (series) => {
        const symbol = series.instrument.symbol;
        const compareConfig = compareChartViewModel.compareInstrumentsConfig.getValue();
        if (compareConfig[symbol]) {
            return compareConfig[symbol].color;
        }
        return 'rgba(0,0,0,0)';
    };
    const changeSelectedSeries = (id) => {
        pipe(option.fromNullable(chart.data.chartModel.candleSeries.find(f => f.id === id)), option.fold(constVoid, secondarySeries => setSelectedSeries(option.some({
            id,
            type: 'compare',
            symbol: secondarySeries.instrument.symbol,
            chartType: getSelectedSeriesChartType(secondarySeries),
            color: getSelectedSeriesColor(secondarySeries),
        }))));
    };
    // think about using legend vm update secondary series method (at least in legend components)
    const changeSelectedSeriesPriceType = (type) => {
        chartConfiguratorViewModel.setSettingsByPath(chartSettingsLens(['chartReact', 'candlesData', 'price']), type);
        closeMenu();
    };
    const changeSelectedSeriesChartType = (type) => {
        pipe(selectedSeries.getValue(), option.fold(constVoid, series => {
            switch (series.type) {
                case 'compare':
                    const config = compareChartViewModel.compareInstrumentsConfig.getValue()[series.symbol];
                    const seriesConfig = { ...config, chartType: type };
                    compareChartViewModel.updateCompareInstrumentConfig(seriesConfig);
                    break;
                case 'main':
                    chartTypeViewModel.setType(type);
                    break;
            }
            setSelectedSeries(option.some({ ...series, chartType: type }));
            closeMenu();
        }));
    };
    const changeSelectedSeriesColor = (color) => {
        pipe(selectedSeries.getValue(), option.fold(constVoid, series => {
            const config = compareChartViewModel.compareInstrumentsConfig.getValue()[series.symbol];
            const seriesConfig = { ...config, color };
            compareChartViewModel.updateCompareInstrumentConfig(seriesConfig);
            closeMenu();
        }));
    };
    const reorderSeries = (reorderType) => {
        pipe(selectedSeries.getValue(), option.fold(constVoid, series => {
            switch (reorderType) {
                case 'bringToFront':
                    dynamicObjectsVM.bringToFront(series.id);
                    break;
                case 'sendToBack':
                    dynamicObjectsVM.sendToBack(series.id);
                    break;
            }
            closeMenu();
        }));
    };
    const createOrder = (orderData) => {
        const { side, orderType, quantity } = orderData;
        pipe(selectedSeries.getValue(), option.fold(constVoid, (series) => {
            if (series.type === 'main') {
                const price = Number(series.trading.candlePrice);
                tradingVM.createOriginalOrder(orderType, side, price, quantity);
                closeMenu();
            }
        }));
    };
    const openMenuOnRightClickEffect = chart.hitTestCanvasModel.observeRightClickOnElement().pipe(map(ev => ev.model), tap(model => {
        if (model && model instanceof CandleSeriesModel) {
            setMenuPosition({ ...chart.canvasInputListener.currentPointDocument });
            setIsOpened(true);
            const selectedSeriesType = model === chart.chartModel.mainCandleSeries ? 'main' : 'compare';
            const priceFormatter = chart.mainPane.mainExtent.formatters.regular;
            const realY = tradingCoreVM.boundTradingPosition.getValue().y;
            const candlePrice = tradingCoreVM.yToPrice(realY);
            const formattedCandlePrice = priceFormatter(candlePrice);
            switch (selectedSeriesType) {
                case 'main':
                    setSelectedSeries(option.some({
                        id: model.id,
                        type: selectedSeriesType,
                        symbol: model.instrument.symbol,
                        chartType: chartTypeViewModel.type.getValue(),
                        trading: {
                            candlePrice: formattedCandlePrice,
                            marketPrice: priceFormatter(tradingCoreVM.marketPrice.getValue()),
                            quantity: orderEntryVM.orderEntry.getValue().quantity,
                        },
                        priceType: chartConfiguratorViewModel.state.getValue().settings.chartReact.candlesData
                            .price,
                    }));
                    break;
                case 'compare':
                    const color = getSelectedSeriesColor(model);
                    const chartType = getSelectedSeriesChartType(model);
                    setSelectedSeries(option.some({
                        id: model.id,
                        type: selectedSeriesType,
                        symbol: model.instrument.symbol,
                        chartType,
                        color,
                    }));
                    break;
            }
        }
    }));
    const syncSeriesMarketPriceUpdateEffect = pipe(tradingCoreVM.marketPrice, distinctUntilChanged(), tap((marketPrice) => {
        pipe(selectedSeries.getValue(), option.fold(constVoid, series => {
            const formattedPrice = chart.mainPane.mainExtent.formatters.regular(marketPrice);
            series.type === 'main' &&
                setSelectedSeries(option.some({ ...series, trading: { ...series.trading, marketPrice: formattedPrice } }));
        }));
    }));
    const effects = merge(openMenuOnRightClickEffect, syncSeriesMarketPriceUpdateEffect);
    return newSink({
        menuPosition,
        isOpened,
        closeMenu,
        selectedSeries,
        changeSelectedSeriesChartType,
        changeSelectedSeriesColor,
        changeSelectedSeriesPriceType,
        createOrder,
        reorderSeries,
        changeSelectedSeries,
    }, effects);
});
