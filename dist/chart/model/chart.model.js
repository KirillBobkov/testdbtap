import { fromCompare } from 'fp-ts/Ord';
import { sort } from 'fp-ts/Array';
import { eq } from 'fp-ts';
import { every, some } from 'fp-ts/Record';
import { flow, pipe } from 'fp-ts/function';
import { Lens } from 'monocle-ts';
export const ChartOffsetsEq = eq.struct({
    visible: eq.eqStrict,
    top: eq.eqStrict,
    bottom: eq.eqStrict,
    right: eq.eqStrict,
    left: eq.eqStrict,
});
export const defaultChartTypes = [
    'candle',
    'bar',
    'line',
    'area',
    'equivolume',
    'heikinAshi',
    'scatterPlot',
    'hollow',
    'histogram',
    'baseline',
    'trend',
];
export const DEFAULT_CHART_REACT_SETTINGS = {
    legend: {
        opened: true,
        showOHLC: true,
        showVolume: true,
        showInstrument: true,
        showPeriod: true,
        mode: 'pinned',
    },
    timeframeChangeStrategy: {
        aggregations: 'smart',
        instrument: 'basic',
    },
    aggregationPeriod: {
        applyUponCreation: true,
    },
    sessionBreaks: {
        visible: false,
    },
    extendedHours: {
        visible: false,
    },
    trading: {
        visible: false,
        showOrders: false,
        showPositions: false,
        executedOrders: {
            enabled: false,
            displayMode: 'bubbles',
        },
        bounds: { min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER },
        rightOffset: 100,
    },
    candlesData: {
        price: 'last',
        candleAlignment: 'midnight',
    },
    scale: {
        fit: {
            studies: true,
            orders: false,
            positions: false,
        },
    },
};
export const toChartSettings = (config, initialChartReactSettings) => {
    return {
        chartCore: mapFullChartConfig2ChartCoreConfig(config),
        chartReact: {
            legend: {
                opened: initialChartReactSettings.legend.opened,
                showOHLC: initialChartReactSettings.legend.showOHLC,
                showVolume: initialChartReactSettings.legend.showVolume,
                showPeriod: initialChartReactSettings.legend.showPeriod,
                showInstrument: initialChartReactSettings.legend.showInstrument,
                mode: initialChartReactSettings.legend.mode,
            },
            timeframeChangeStrategy: {
                aggregations: initialChartReactSettings.timeframeChangeStrategy.aggregations,
                instrument: initialChartReactSettings.timeframeChangeStrategy.instrument,
            },
            aggregationPeriod: {
                applyUponCreation: initialChartReactSettings.aggregationPeriod.applyUponCreation,
            },
            sessionBreaks: {
                visible: initialChartReactSettings.sessionBreaks.visible,
            },
            extendedHours: {
                visible: initialChartReactSettings.extendedHours.visible,
            },
            trading: {
                visible: initialChartReactSettings.trading.visible,
                showOrders: initialChartReactSettings.trading.showOrders,
                showPositions: initialChartReactSettings.trading.showPositions,
                executedOrders: {
                    enabled: initialChartReactSettings.trading.executedOrders.enabled,
                    displayMode: initialChartReactSettings.trading.executedOrders.displayMode,
                },
                bounds: {
                    min: initialChartReactSettings.trading.bounds.min,
                    max: initialChartReactSettings.trading.bounds.max,
                },
                rightOffset: initialChartReactSettings.trading.rightOffset,
            },
            candlesData: {
                price: initialChartReactSettings.candlesData.price,
                candleAlignment: initialChartReactSettings.candlesData.candleAlignment,
            },
            scale: {
                fit: {
                    studies: initialChartReactSettings.scale.fit.studies,
                    orders: initialChartReactSettings.scale.fit.orders,
                    positions: initialChartReactSettings.scale.fit.positions,
                },
            },
        },
    };
};
export const mapFullChartConfig2ChartCoreConfig = (config) => {
    return {
        rtl: config.rtl,
        scale: {
            auto: config.scale.auto,
            lockPriceToBarRatio: config.scale.lockPriceToBarRatio,
            inverse: config.scale.inverse,
        },
        components: {
            chart: {
                showCandlesBorder: config.components.chart.showActiveCandlesBorder,
                showWicks: config.components.chart.showWicks,
                equivolume: {
                    showClosePrice: config.components.chart.equivolume.showClosePrice,
                },
            },
            drawings: {
                magnet: config.components.drawings.magnet,
            },
            yAxis: {
                type: config.components.yAxis.type,
                align: config.components.yAxis.align,
                visible: config.components.yAxis.visible,
                labels: {
                    descriptions: config.components.yAxis.labels.descriptions,
                    settings: {
                        countdownToBarClose: {
                            mode: config.components.yAxis.labels.settings.countdownToBarClose.mode,
                        },
                        lastPrice: { mode: config.components.yAxis.labels.settings.lastPrice.mode },
                        ...(config.components.yAxis.labels.settings.bidAsk && {
                            bidAsk: {
                                mode: config.components.yAxis.labels.settings.bidAsk.mode,
                            },
                        }),
                        ...(config.components.yAxis.labels.settings.prePostMarket && {
                            prePostMarket: {
                                mode: config.components.yAxis.labels.settings.prePostMarket.mode,
                            },
                        }),
                        ...(config.components.yAxis.labels.settings.prevDayClose && {
                            prevDayClose: {
                                mode: config.components.yAxis.labels.settings.prevDayClose.mode,
                            },
                        }),
                        ...(config.components.yAxis.labels.settings.highLow && {
                            highLow: {
                                mode: config.components.yAxis.labels.settings.highLow.mode,
                            },
                        }),
                        ...(config.components.yAxis.labels.settings.studies && {
                            studies: {
                                mode: config.components.yAxis.labels.settings.studies.mode,
                            },
                        }),
                    },
                },
            },
            grid: {
                visible: config.components.grid.visible,
                vertical: config.components.grid.vertical,
                horizontal: config.components.grid.horizontal,
            },
            volumes: {
                visible: config.components.volumes.visible,
                showSeparately: config.components.volumes.showSeparately,
            },
            offsets: {
                visible: config.components.offsets.visible,
                top: config.components.offsets.top,
                right: config.components.offsets.right,
                left: config.components.offsets.left,
                bottom: config.components.offsets.bottom,
            },
            waterMark: {
                visible: config.components.waterMark.visible,
            },
            crossTool: {
                magnetTarget: config.components.crossTool.magnetTarget,
                type: config.components.crossTool.type,
            },
            highLow: {
                visible: config.components.highLow.visible,
            },
            events: {
                visible: config.components.events.visible,
                eventsVisibility: config.components.events.eventsVisibility,
            },
            news: {
                visible: config.components.news.visible,
            },
        },
        themes: config.themes,
    };
};
/**
 * Make a copy of chart core settings. Required when saving layout.
 * Make sure we save only required fields and nothing more (something else may be in old layouts).
 * @param config
 * @doc-tags tricky,migration
 */
export const copyChartCoreSettings = (config) => {
    return {
        rtl: config.rtl,
        scale: {
            auto: config.scale.auto,
            lockPriceToBarRatio: config.scale.lockPriceToBarRatio,
            inverse: config.scale.inverse,
        },
        components: {
            chart: {
                showCandlesBorder: config.components.chart.showCandlesBorder,
                showWicks: config.components.chart.showWicks,
                equivolume: {
                    showClosePrice: config.components.chart.equivolume.showClosePrice,
                },
            },
            drawings: {
                magnet: config.components.drawings.magnet,
            },
            yAxis: {
                type: config.components.yAxis.type,
                align: config.components.yAxis.align,
                visible: config.components.yAxis.visible,
                labels: {
                    descriptions: config.components.yAxis.labels.descriptions,
                    settings: {
                        countdownToBarClose: {
                            mode: config.components.yAxis.labels.settings.countdownToBarClose.mode,
                        },
                        lastPrice: {
                            mode: config.components.yAxis.labels.settings.lastPrice.mode,
                        },
                        ...(config.components.yAxis.labels.settings.bidAsk && {
                            bidAsk: {
                                mode: config.components.yAxis.labels.settings.bidAsk.mode,
                            },
                        }),
                        ...(config.components.yAxis.labels.settings.prePostMarket && {
                            prePostMarket: {
                                mode: config.components.yAxis.labels.settings.prePostMarket.mode,
                            },
                        }),
                        ...(config.components.yAxis.labels.settings.prevDayClose && {
                            prevDayClose: {
                                mode: config.components.yAxis.labels.settings.prevDayClose.mode,
                            },
                        }),
                        ...(config.components.yAxis.labels.settings.highLow && {
                            highLow: {
                                mode: config.components.yAxis.labels.settings.highLow.mode,
                            },
                        }),
                        ...(config.components.yAxis.labels.settings.studies && {
                            studies: {
                                mode: config.components.yAxis.labels.settings.studies.mode,
                            },
                        }),
                    },
                },
            },
            grid: {
                visible: config.components.grid.visible,
                vertical: config.components.grid.vertical,
                horizontal: config.components.grid.horizontal,
            },
            volumes: {
                visible: config.components.volumes.visible,
                showSeparately: config.components.volumes.showSeparately,
            },
            offsets: {
                visible: config.components.offsets.visible,
                top: config.components.offsets.top,
                right: config.components.offsets.right,
                left: config.components.offsets.left,
                bottom: config.components.offsets.bottom,
            },
            waterMark: {
                visible: config.components.waterMark.visible,
            },
            crossTool: {
                magnetTarget: config.components.crossTool.magnetTarget,
                type: config.components.crossTool.type,
            },
            highLow: {
                visible: config.components.highLow.visible,
            },
            events: {
                visible: config.components.events.visible,
                eventsVisibility: {
                    'conference-calls': config.components.events.eventsVisibility['conference-calls'],
                    dividends: config.components.events.eventsVisibility.dividends,
                    splits: config.components.events.eventsVisibility.splits,
                    earnings: config.components.events.eventsVisibility.earnings,
                },
            },
            news: {
                visible: config.components.news.visible,
            },
        },
        themes: {
            dark: map2ChartCoreColors(config.themes.dark),
            light: map2ChartCoreColors(config.themes.light),
        },
    };
};
/**
 * Make a copy of chart react settings. Required when saving layout.
 * Make sure we save only required fields and nothing more (something else may be in old layouts).
 * @param config
 * @doc-tags tricky,migration
 */
export const copyChartReactSettings = (config) => {
    return {
        legend: {
            opened: config.legend.opened,
            showOHLC: config.legend.showOHLC,
            showVolume: config.legend.showVolume,
            showPeriod: config.legend.showPeriod,
            showInstrument: config.legend.showInstrument,
            mode: config.legend.mode,
        },
        sessionBreaks: {
            visible: config.sessionBreaks.visible,
        },
        extendedHours: {
            visible: config.extendedHours.visible,
        },
        trading: {
            visible: config.trading.visible,
            showOrders: config.trading.showOrders,
            showPositions: config.trading.showPositions,
            executedOrders: {
                enabled: config.trading.executedOrders.enabled,
                displayMode: config.trading.executedOrders.displayMode,
            },
            bounds: { min: config.trading.bounds.min, max: config.trading.bounds.max },
            rightOffset: config.trading.rightOffset,
        },
        candlesData: {
            price: config.candlesData.price,
            candleAlignment: config.candlesData.candleAlignment,
        },
        timeframeChangeStrategy: {
            aggregations: config.timeframeChangeStrategy.aggregations,
            instrument: config.timeframeChangeStrategy.instrument,
        },
        aggregationPeriod: {
            applyUponCreation: config.aggregationPeriod.applyUponCreation,
        },
        scale: {
            fit: {
                studies: config.scale.fit.studies,
                orders: config.scale.fit.orders,
                positions: config.scale.fit.positions,
            },
        },
    };
};
export const map2ChartCoreColors = (colors) => {
    return {
        candleTheme: {
            upColor: colors.candleTheme.upColor,
            downColor: colors.candleTheme.downColor,
            noneColor: colors.candleTheme.noneColor,
            upWickColor: colors.candleTheme.upWickColor,
            downWickColor: colors.candleTheme.downWickColor,
        },
        barTheme: {
            upColor: colors.barTheme.upColor,
            downColor: colors.barTheme.downColor,
            noneColor: colors.barTheme.noneColor,
        },
        lineTheme: {
            upColor: colors.lineTheme.upColor,
            downColor: colors.lineTheme.downColor,
            noneColor: colors.lineTheme.noneColor,
        },
        equivolumeTheme: {
            upColor: colors.equivolumeTheme.upColor,
            downColor: colors.equivolumeTheme.downColor,
            noneColor: colors.equivolumeTheme.noneColor,
        },
        chartAreaTheme: {
            backgroundMode: colors.chartAreaTheme.backgroundMode,
            backgroundColor: colors.chartAreaTheme.backgroundColor,
            backgroundGradientBottomColor: colors.chartAreaTheme.backgroundGradientBottomColor,
            backgroundGradientTopColor: colors.chartAreaTheme.backgroundGradientTopColor,
            gridColor: colors.chartAreaTheme.gridColor,
        },
        scatterPlot: {
            mainColor: colors.scatterPlot.mainColor,
        },
        areaTheme: {
            lineColor: colors.areaTheme.lineColor,
            startColor: colors.areaTheme.startColor,
            stopColor: colors.areaTheme.stopColor,
        },
        baseLineTheme: {
            lowerSectionStrokeColor: colors.baseLineTheme.lowerSectionStrokeColor,
            upperSectionStrokeColor: colors.baseLineTheme.upperSectionStrokeColor,
            lowerSectionFillColor: colors.baseLineTheme.lowerSectionFillColor,
            upperSectionFillColor: colors.baseLineTheme.upperSectionFillColor,
            baselineColor: colors.baseLineTheme.baselineColor,
        },
        histogram: {
            upCap: colors.histogram.upCap,
            upBottom: colors.histogram.upBottom,
            upBright: colors.histogram.upBright,
            downCap: colors.histogram.downCap,
            downBottom: colors.histogram.downBottom,
            downBright: colors.histogram.downBright,
            noneCap: colors.histogram.noneCap,
            noneBottom: colors.histogram.noneBottom,
            noneBright: colors.histogram.noneBright,
        },
        crossTool: {
            lineColor: colors.crossTool.lineColor,
            labelBoxColor: colors.crossTool.labelBoxColor,
            labelTextColor: colors.crossTool.labelTextColor,
        },
        waterMarkTheme: {
            firstRowColor: colors.waterMarkTheme.firstRowColor,
            secondRowColor: colors.waterMarkTheme.secondRowColor,
            thirdRowColor: colors.waterMarkTheme.thirdRowColor,
        },
        newsTheme: {
            backgroundColor: colors.newsTheme.backgroundColor,
        },
        xAxis: {
            labelTextColor: colors.xAxis.labelTextColor,
        },
        yAxis: {
            labelTextColor: colors.yAxis.labelTextColor,
        },
    };
};
export const chartSettingsAutoScalePriceAxis = Lens.fromPath()(['chartCore', 'scale', 'auto']);
export const chartSettingsLockPriceToBarRatio = Lens.fromPath()([
    'chartCore',
    'scale',
    'lockPriceToBarRatio',
]);
export const chartSettingsPriceAxisFit = Lens.fromPath()(['chartReact', 'scale', 'fit']);
export const chartSettingsAxisType = Lens.fromPath()(['chartCore', 'components', 'yAxis', 'type']);
const isSomePriceAxisFitTrue = flow(chartSettingsPriceAxisFit.get, some(value => value === true));
const isEveryPriceAxisFitFalse = flow(chartSettingsPriceAxisFit.get, every(value => value === false));
export const setChartSettingsAutoScalePriceAxisToFalseIfNoFitSelected = (oldSettings) => (newSettings) => {
    if (!chartSettingsAutoScalePriceAxis.get(newSettings)) {
        return newSettings;
    }
    const isEveryWasFalse = isEveryPriceAxisFitFalse(oldSettings);
    const isEveryNowFalse = isEveryPriceAxisFitFalse(newSettings);
    if (!isEveryWasFalse && isEveryNowFalse) {
        return pipe(newSettings, chartSettingsAutoScalePriceAxis.set(false));
    }
    return newSettings;
};
export const setChartSettingsAutoScalePriceAxisToTrueIfFitSelected = (oldSettings) => (newSettings) => {
    if (chartSettingsAutoScalePriceAxis.get(newSettings)) {
        return newSettings;
    }
    const isSomeWasTrue = isSomePriceAxisFitTrue(oldSettings);
    const isSomeNowTrue = isSomePriceAxisFitTrue(newSettings);
    if (!isSomeWasTrue && isSomeNowTrue) {
        return pipe(newSettings, chartSettingsAutoScalePriceAxis.set(true));
    }
    return newSettings;
};
export const resetChartSettingsPriceAxisFitToDefaultIfAutoScale = (oldSettings) => (newSettings) => {
    const oldFlag = chartSettingsAutoScalePriceAxis.get(oldSettings);
    const newFlag = chartSettingsAutoScalePriceAxis.get(newSettings);
    const isFlagChanged = !oldFlag && newFlag;
    const isSomeNowTrue = isSomePriceAxisFitTrue(newSettings);
    if (isFlagChanged && !isSomeNowTrue) {
        const oldSettingsPriceAxisFit = chartSettingsPriceAxisFit.get(oldSettings);
        return chartSettingsPriceAxisFit.set(oldSettingsPriceAxisFit)(newSettings);
    }
    return newSettings;
};
export const getSingleColorFromCandleSeriesColors = (model) => {
    const colors = model.colors;
    return {
        // @ts-ignore
        area: colors.areaTheme.startColor,
        // @ts-ignore
        line: colors.lineTheme.upColor,
    };
};
export const getNativeChartColorsFromMainColor = (color, chartType) => {
    switch (chartType) {
        case 'baseline':
        case 'area':
            return {
                areaTheme: {
                    lineColor: color,
                    startColor: color,
                    stopColor: 'transparent',
                    fillColor: color,
                },
            };
        case 'line':
        default:
            return {
                lineTheme: {
                    upColor: color,
                    downColor: color,
                    noneColor: color,
                },
            };
    }
};
export const toNativeChartSeriesConfig = (color, chartType) => {
    const colorsToProvide = getNativeChartColorsFromMainColor(color, chartType);
    return {
        ...colorsToProvide,
    };
};
export const toCandles = (data) => ({
    hi: data.high,
    lo: data.low,
    open: data.open,
    close: data.close,
    timestamp: data.time,
    volume: data.volume,
    expansion: false,
    idx: undefined,
    impVolatility: data.impVolatility,
    vwap: data.vwap,
});
const chartCandleDataOrd = fromCompare((a, b) => a.time === b.time ? 0 : a.time > b.time ? 1 : -1);
export const sortChartCandle = sort(chartCandleDataOrd);
export function getAvailableCrosstoolMagnetTargets(chartType) {
    switch (chartType) {
        case 'candle':
        case 'trend':
        case 'hollow':
        case 'heikinAshi':
        case 'bar':
            return ['O', 'C', 'H', 'L', 'OHLC', 'none'];
        case 'area':
        case 'baseline':
        case 'histogram':
        case 'line':
        case 'scatterPlot':
            return ['C', 'none'];
        case 'equivolume':
            return ['C', 'H', 'L', 'none'];
    }
}
