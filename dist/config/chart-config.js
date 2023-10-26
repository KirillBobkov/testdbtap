import Color from 'color';
import { DEFAULT_CHART_PALETTE } from './chart-palette';
import { mergeFullChartConfig, } from '../chart/components/canvas-chart-renderer/chart-with-modules.config';
/**
 * Default chart config in chart-react.
 * @param chartPalette
 * @doc-tags chart-react,default-config
 */
export const config = (chartPaletteDark, chartPaletteLight) => ({
    rtl: false,
    scale: {
        keepZoomXOnYAxisChange: false,
        auto: true,
        autoScaleOnCandles: false,
        lockPriceToBarRatio: false,
    },
    components: {
        chart: {
            defaultZoomCandleWidth: 7,
            minWidth: 0.5,
            showCandlesBorder: true,
        },
        xAxis: {
            fontSize: 12,
            padding: {
                top: 7,
                bottom: 10,
            },
        },
        yAxis: {
            fontSize: 12,
            cursor: 'ns-resize',
        },
        crossTool: {
            type: 'none',
            lineDash: [0, 0],
        },
        studies: {
            visible: true,
            studies: [],
        },
        grid: {
            visible: true,
        },
        drawings: {
            visible: true,
            snapping: 'increments',
        },
        offsets: {
            visible: true,
            top: 10,
            bottom: 10,
            right: 10,
            left: 0,
        },
        waterMark: {
            visible: false,
        },
        highLow: {
            visible: false,
        },
        volumes: {
            visible: true,
        },
        navigationMap: {
            visible: false,
        },
        events: {
            visible: false,
        },
    },
    themes: {
        dark: mapPalette2ChartColors(chartPaletteDark),
        light: mapPalette2ChartColors(chartPaletteLight),
    },
    drawingOrder: [
        'MAIN_CLEAR',
        'OVER_SERIES_CLEAR',
        'SERIES_CLEAR',
        'GRID',
        'X_AXIS',
        'Y_AXIS',
        'UNDERLAY_VOLUMES_AREA',
        'DYNAMIC_OBJECTS',
        'WATERMARK',
        'N_MAP_CHART',
        'EVENTS',
    ],
});
export const mapPalette2ChartColors = (chartPalette) => {
    return {
        highlights: {
            NO_TRADING: {
                border: chartPalette['main_chart-session_break-bg'],
                background: 'transparent',
                label: 'transparent',
            },
            AFTER_MARKET: {
                border: chartPalette['main_chart-post_market_data-line'],
                background: chartPalette['main_chart-post_market_data-bg'],
                label: chartPalette['main_chart-post_market_data-label'],
            },
            PRE_MARKET: {
                border: chartPalette['main_chart-pre_market_data-line'],
                background: chartPalette['main_chart-pre_market_data-bg'],
                label: chartPalette['main_chart-pre_market_data-label'],
            },
            REGULAR: {
                border: chartPalette['main_chart-session_break-bg'],
                background: 'transparent',
                label: 'transparent',
            },
        },
        newsTheme: {
            backgroundColor: chartPalette['events-news-bg'],
        },
        drawingsTheme: {
            textBg: chartPalette['drawing-text-bg'],
            textColor: chartPalette['drawing-text-border'],
            points: {
                defaultKeyPoint: {
                    shape: 'circle',
                    radius: 4.5,
                    fillStyle: chartPalette['drawing-handle-default-bg'],
                    lineWidth: 0,
                    lineColor: chartPalette['drawing-handle_border-bg'],
                    opacity: 1,
                },
                activeKeyPoint: {
                    shape: 'circle',
                    radius: 4.5,
                    fillStyle: chartPalette['drawing-handle-default-bg'],
                    lineWidth: 0,
                    lineColor: chartPalette['drawing-handle_border-bg'],
                    opacity: 1,
                },
                defaultHoverKeyPoint: {
                    shape: 'circle',
                    radius: 4.5,
                    fillStyle: chartPalette['drawing-handle-default-bg'],
                    lineWidth: 0,
                    lineColor: chartPalette['drawing-handle_border-bg'],
                    opacity: 1,
                },
                activeHoverKeyPoint: {
                    shape: 'circle',
                    radius: 4.5,
                    fillStyle: chartPalette['drawing-handle-default-bg'],
                    lineWidth: 0,
                    lineColor: chartPalette['drawing-handle_border-bg'],
                    opacity: 1,
                },
                addingKeyPoint: {
                    shape: 'circle',
                    radius: 4.5,
                    fillStyle: chartPalette['drawing-handle-default-bg'],
                    lineWidth: 0,
                    lineColor: chartPalette['drawing-handle_border-bg'],
                    opacity: 1,
                },
            },
            xAxis: {
                highlightColor: chartPalette['drawing-highlight-default-bg'],
                labelColor: chartPalette['drawing-tag-default-bg'],
            },
            yAxis: {
                highlightColor: chartPalette['drawing-highlight-default-bg'],
                labelColor: chartPalette['drawing-tag-default-bg'],
            },
            zoom: {
                edgeColor: chartPalette['main_chart-label-text'],
                captureZoneBorderColor: chartPalette['main_chart-label-text'],
            },
        },
        candleTheme: {
            upColor: chartPalette['main_chart-candle-bull-body-bg'],
            downColor: chartPalette['main_chart-candle-bear-body-bg'],
            noneColor: chartPalette['main_chart-candle-doji-body-bg'],
            upWickColor: chartPalette['main_chart-candle-bull-wick-bg'],
            downWickColor: chartPalette['main_chart-candle-bear-wick-bg'],
            noneWickColor: chartPalette['main_chart-candle-doji-wick-bg'],
            borderOpacity: 1,
        },
        activeCandleTheme: {
            upColor: chartPalette['main_chart-candle-bull-body-active-bg'],
            downColor: chartPalette['main_chart-candle-bear-body-active-bg'],
            noneColor: chartPalette['main_chart-candle-doji-body-active-bg'],
            upWickColor: chartPalette['main_chart-candle-bull-wick-active-bg'],
            downWickColor: chartPalette['main_chart-candle-bear-wick-active-bg'],
            noneWickColor: chartPalette['main_chart-candle-doji-wick-active-bg'],
            borderOpacity: 0.5,
        },
        waterMarkTheme: {
            firstRowColor: chartPalette['main_chart-watermark-text'],
            secondRowColor: chartPalette['main_chart-watermark-text'],
            thirdRowColor: chartPalette['main_chart-watermark-text'],
        },
        barTheme: {
            upColor: chartPalette['main_chart-candle-bull-body-bg'],
            downColor: chartPalette['main_chart-candle-bear-body-bg'],
            noneColor: chartPalette['main_chart-candle-doji-body-bg'],
        },
        equivolumeTheme: {
            upColor: chartPalette['main_chart-candle-bull-body-bg'],
            downColor: chartPalette['main_chart-candle-bear-body-bg'],
            noneColor: chartPalette['main_chart-candle-doji-body-bg'],
        },
        lineTheme: {
            upColor: chartPalette['main_chart-candle-bull-body-bg'],
            downColor: chartPalette['main_chart-candle-bear-body-bg'],
            noneColor: chartPalette['main_chart-candle-doji-body-bg'],
        },
        histogram: {
            upCap: chartPalette['main_chart-bull_bar-cap-bg'],
            upBottom: chartPalette['main_chart-bull_bar-bottom-bg'],
            upBright: chartPalette['main_chart-bull_bar-top-bg'],
            downCap: chartPalette['main_chart-bear_bar-cap-bg'],
            downBottom: chartPalette['main_chart-bear_bar-bottom-bg'],
            downBright: chartPalette['main_chart-bear_bar-top-bg'],
            noneCap: chartPalette['main_chart-doji_bar-cap-bg'],
            noneBottom: chartPalette['main_chart-doji_bar-bottom-bg'],
            noneBright: chartPalette['main_chart-doji_bar-top-bg'],
        },
        baseLineTheme: {
            lowerSectionStrokeColor: chartPalette['main_chart-candle-bear-body-bg'],
            upperSectionStrokeColor: chartPalette['main_chart-candle-bull-body-bg'],
            lowerSectionFillColor: Color(chartPalette['main_chart-candle-bear-body-bg']).alpha(0.07).toString(),
            upperSectionFillColor: Color(chartPalette['main_chart-candle-bull-body-bg']).alpha(0.07).toString(),
            baselineColor: chartPalette['main_chart-divider-default-bg'],
        },
        volume: {
            downBarColor: chartPalette['main_chart-volume_bar-sell'],
            upBarColor: chartPalette['main_chart-volume_bar-buy'],
            noneBarColor: chartPalette['main_chart-doji_bar-top-bg'],
            upCapColor: chartPalette['main_chart-volume_top-buy'],
            downCapColor: chartPalette['main_chart-volume_top-sell'],
            noneCapColor: chartPalette['main_chart-doji_bar-top-bg'],
        },
        executedOrdersTheme: {
            sell: {
                arrows: chartPalette['position_negative-default-bg'],
                exactPriceLine: chartPalette['main_chart-border-active'],
                labels: chartPalette['main_chart-label-text'],
            },
            buy: {
                arrows: chartPalette['position_positive-default-bg'],
                exactPriceLine: chartPalette['main_chart-border-active'],
                labels: chartPalette['main_chart-label-text'],
            },
        },
        scatterPlot: {
            mainColor: chartPalette['main_chart-scatter-default-bg'],
        },
        highLowTheme: {
            highColor: chartPalette['main_chart-high-low-indicator'],
            lowColor: chartPalette['main_chart-high-low-indicator'],
        },
        instrumentInfo: {
            textColor: '#aeb1b3', // TODO remove this ****
        },
        paneResizer: {
            lineColor: chartPalette['main_chart-divider-default-bg'],
            bgColor: chartPalette['main_chart-resize_bar-default-bg'],
            bgHoverColor: chartPalette['main_chart-resize_bar-hover-bg'],
        },
        events: {
            earnings: {
                color: chartPalette['events-earnings-bg'],
            },
            dividends: {
                color: chartPalette['events-dividends-bg'],
            },
            splits: {
                color: chartPalette['events-splits-bg'],
            },
            'conference-calls': {
                color: chartPalette['events-call-bg'],
            },
        },
        secondaryChartTheme: [
            {
                lineTheme: {
                    upColor: chartPalette['main_chart-compare-plot_color-1'],
                    downColor: chartPalette['main_chart-compare-plot_color-1'],
                    noneColor: chartPalette['main_chart-compare-plot_color-1'],
                },
                areaTheme: {
                    lineColor: chartPalette['main_chart-compare-plot_color-1'],
                    startColor: chartPalette['main_chart-compare-plot_color-1-grad_1'],
                    stopColor: chartPalette['main_chart-compare-plot_color-1-grad_2'],
                },
            },
            {
                lineTheme: {
                    upColor: chartPalette['main_chart-compare-plot_color-2'],
                    downColor: chartPalette['main_chart-compare-plot_color-2'],
                    noneColor: chartPalette['main_chart-compare-plot_color-2'],
                },
                areaTheme: {
                    lineColor: chartPalette['main_chart-compare-plot_color-2'],
                    startColor: chartPalette['main_chart-compare-plot_color-2-grad_1'],
                    stopColor: chartPalette['main_chart-compare-plot_color-2-grad_2'],
                },
            },
            {
                lineTheme: {
                    upColor: chartPalette['main_chart-compare-plot_color-3'],
                    downColor: chartPalette['main_chart-compare-plot_color-3'],
                    noneColor: chartPalette['main_chart-compare-plot_color-3'],
                },
                areaTheme: {
                    lineColor: chartPalette['main_chart-compare-plot_color-3'],
                    startColor: chartPalette['main_chart-compare-plot_color-3-grad_1'],
                    stopColor: chartPalette['main_chart-compare-plot_color-3-grad_2'],
                },
            },
            {
                lineTheme: {
                    upColor: chartPalette['main_chart-compare-plot_color-4'],
                    downColor: chartPalette['main_chart-compare-plot_color-4'],
                    noneColor: chartPalette['main_chart-compare-plot_color-4'],
                },
                areaTheme: {
                    lineColor: chartPalette['main_chart-compare-plot_color-4'],
                    startColor: chartPalette['main_chart-compare-plot_color-4-grad_1'],
                    stopColor: chartPalette['main_chart-compare-plot_color-4-grad_2'],
                },
            },
            {
                lineTheme: {
                    upColor: chartPalette['main_chart-compare-plot_color-5'],
                    downColor: chartPalette['main_chart-compare-plot_color-5'],
                    noneColor: chartPalette['main_chart-compare-plot_color-5'],
                },
                areaTheme: {
                    lineColor: chartPalette['main_chart-compare-plot_color-5'],
                    startColor: chartPalette['main_chart-compare-plot_color-5-grad_1'],
                    stopColor: chartPalette['main_chart-compare-plot_color-5-grad_2'],
                },
            },
        ],
        chartAreaTheme: {
            backgroundMode: 'gradient',
            gridColor: chartPalette['main_chart-grid-line'],
            backgroundGradientBottomColor: chartPalette['main_chart-bg'],
            backgroundGradientTopColor: chartPalette['main_chart-bg'],
            backgroundColor: chartPalette['main_chart-bg'],
        },
        areaTheme: {
            lineColor: chartPalette['main_chart-compare-plot_color-6'],
            startColor: chartPalette['main_chart-area-grad_1'],
            stopColor: chartPalette['main_chart-area-grad_2'],
        },
        yAxis: {
            backgroundColor: 'transparent',
            labelBoxColor: chartPalette['main_chart-bg'],
            labelTextColor: chartPalette['main_chart-value-text'],
            labelInvertedTextColor: chartPalette['main_chart-label-inverted-text'],
            rectLabelTextColor: chartPalette['main_chart-crosshair-tag-text'],
            rectLabelInvertedTextColor: chartPalette['main_chart-crosshair-tag-inverted-text'],
            zeroPercentLine: chartPalette['main_chart-zero_percent-line-bg'],
        },
        labels: {
            drawings: {},
            studies: {
                textColor: chartPalette['main_chart-label-text'],
                invertedTextColor: chartPalette['main_chart-label-inverted-text'],
            },
            lastPrice: {
                textNegative: chartPalette['main_chart-label-text'],
                textPositive: chartPalette['main_chart-label-text'],
                textSelected: chartPalette['main_chart-label-inverted-text'],
                boxNegative: chartPalette['main_chart-candle-bear-body-bg'],
                boxPositive: chartPalette['main_chart-candle-bull-body-bg'],
                boxSelected: chartPalette['main_chart-candle-doji-body-bg'],
            },
            countdownToBarClose: {
                textNegative: chartPalette['main_chart-label-text'],
                textPositive: chartPalette['main_chart-label-text'],
                textSelected: chartPalette['main_chart-label-inverted-text'],
                boxNegative: chartPalette['main_chart-candle-bear-body-bg'],
                boxPositive: chartPalette['main_chart-candle-bull-body-bg'],
                boxSelected: chartPalette['main_chart-candle-doji-body-bg'],
            },
            highLow: {
                high: {
                    boxColor: chartPalette['main_chart-crosshair-label-bg'],
                    textColor: chartPalette['main_chart-crosshair-tag-text'],
                },
                low: {
                    boxColor: chartPalette['main_chart-crosshair-label-bg'],
                    textColor: chartPalette['main_chart-crosshair-tag-text'],
                },
            },
            bidAsk: {
                bid: {
                    boxColor: chartPalette['main_chart-candle-bull-body-bg'],
                    textColor: chartPalette['main_chart-crosshair-tag-text'],
                },
                ask: {
                    boxColor: chartPalette['main_chart-candle-bear-body-bg'],
                    textColor: chartPalette['main_chart-crosshair-tag-text'],
                },
            },
            prePostMarket: {
                post: {
                    boxColor: chartPalette['main_chart-post_market_data-label'],
                    textColor: chartPalette['main_chart-crosshair-tag-inverted-text'],
                },
                pre: {
                    boxColor: chartPalette['main_chart-pre_market_data-label'],
                    textColor: chartPalette['main_chart-crosshair-tag-inverted-text'],
                },
            },
            prevDayClose: {
                boxColor: chartPalette['main_chart-crosshair-label-bg'],
                textColor: chartPalette['main_chart-crosshair-tag-text'],
            },
            volumeLabel: {
                boxColor: 'transparent',
                upColor: chartPalette['main_chart-candle-bull-body-bg'],
                downColor: chartPalette['main_chart-candle-bear-body-bg'],
                noneColor: chartPalette['main_chart-candle-doji-body-bg'],
            },
        },
        xAxis: {
            backgroundColor: 'transparent',
            labelTextColor: chartPalette['main_chart-value-text'],
        },
        navigationMap: {
            backgroundColor: 'transparent',
            buttonColor: chartPalette['main_chart-scale-full-bg'],
            buttonArrowColor: chartPalette['icon-primary-default-bg'],
            knotColor: chartPalette['main_chart-scale-full-bg'],
            knotLineColor: chartPalette['icon-primary-default-bg'],
            sliderColor: chartPalette['main_chart-scale-visible-bg'],
            knotBorderColor: '#0b0d1a',
            timeLabelsTextColor: chartPalette['main_chart-value-text'],
            mapColor: chartPalette['main_chart-scale-full-bg'],
            mapFillColor: chartPalette['main_chart-scale-full-bg'],
            mapGradientTopColor: chartPalette['main_chart-scale-full-bg'],
            mapGradientBottomColor: chartPalette['main_chart-scale-full-bg'],
        },
        crossTool: {
            lineColor: chartPalette['main_chart-crosshair-label-bg'],
            labelBoxColor: chartPalette['main_chart-crosshair-label-bg'],
            labelTextColor: chartPalette['main_chart-crosshair-tag-text'],
        },
    };
};
export const getDefaultChartConfig = (chartPaletteDark, chartPaletteLight) => mergeFullChartConfig(config(chartPaletteDark, chartPaletteLight));
export const DEFAULT_CHART_CONFIG = mergeFullChartConfig(config(DEFAULT_CHART_PALETTE.dark, DEFAULT_CHART_PALETTE.light));
