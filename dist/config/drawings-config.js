import { MAIN_FONT } from '@devexperts/dxcharts-lite/dist/chart/chart.config';
import Color from 'color';
import { DEFAULT_CHART_PALETTE } from './chart-palette';
/**
 * Default drawings config in chart-react.
 * @param localization
 * @param colorPalette
 * @doc-tags chart-react,default-config,drawings
 */
const createDrawingsConfig = (colorPalette) => {
    const defaultDrawingsColor = colorPalette['drawing-line-default-bg'];
    const drawingTextBg = colorPalette['drawing-text-bg'];
    const drawingLineDefaultBg = colorPalette['drawing-line-default-bg'];
    const drawingCalloutAndPriceTextColor = colorPalette['drawing-text-default'];
    const drawingCalloutAndPriceBg = colorPalette['drawing-line-default-bg'];
    const drawingBorderColorText = colorPalette['drawing-text-border'];
    const defaultGannFanMainLineColor = 'rgba(129, 183, 90, 1)';
    return {
        line: {
            type: 'line',
            properties: {
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                labels: {
                    showPrice: false,
                    sidePlacement: 'right',
                },
                arrows: {
                    start: false,
                    end: false,
                    angle: 32,
                    length: 14,
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                style: {
                    extendLeft: false,
                    extendRight: false,
                },
                text: {
                    textBg: drawingTextBg,
                    textStyle: {
                        bold: false,
                        underline: false,
                        italic: false,
                    },
                    availableBackgroundColors: [],
                    textFill: defaultDrawingsColor,
                    backgroundOffsetHeight: 8,
                    backgroundOffsetWidth: 14,
                },
                measureBox: {
                    showPriceChangePercent: false,
                    showPriceChangeAbs: false,
                    showBars: false,
                    showTimeDiff: false,
                    showDistance: false,
                    showAngle: false,
                    position: 'middle',
                },
                showPrice: true,
                showTime: true,
            },
        },
        icon: {
            type: 'icon',
            properties: {
                iconStyle: {
                    fillStyle: defaultDrawingsColor,
                    opacity: 0.75,
                },
                background: {
                    fillStyle: '#FFFFFF',
                    opacity: 0,
                    lineColor: '#FFAA00',
                },
                icon: {
                    w: 448,
                    h: 512,
                    name: 'arrow-left',
                    svg: 'M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z',
                },
            },
        },
        info_line: {
            type: 'info_line',
            properties: {
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                labels: {
                    showPrice: false,
                    sidePlacement: 'right',
                },
                arrows: {
                    start: false,
                    end: false,
                    angle: 32,
                    length: 14,
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                style: {
                    extendLeft: false,
                    extendRight: false,
                },
                text: {
                    textBg: drawingTextBg,
                    textStyle: {
                        bold: false,
                        underline: false,
                        italic: false,
                    },
                    availableBackgroundColors: [],
                    textFill: defaultDrawingsColor,
                    backgroundOffsetHeight: 8,
                    backgroundOffsetWidth: 14,
                },
                measureBox: {
                    showPriceChangePercent: true,
                    showPriceChangeAbs: true,
                    showBars: true,
                    showTimeDiff: true,
                    showDistance: true,
                    showAngle: true,
                    position: 'middle',
                },
                showPrice: true,
                showTime: true,
            },
        },
        horizontal_ray: {
            type: 'horizontal_ray',
            properties: {
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                showPrice: true,
                showTime: false,
            },
        },
        path: {
            type: 'path',
            properties: {
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                arrows: {
                    start: false,
                    end: true,
                },
                showTime: true,
                showPrice: true,
            },
        },
        date_price_range: {
            type: 'date_price_range',
            properties: {
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                borders: {
                    all: {
                        lineColor: defaultDrawingsColor,
                        lineWidth: 1,
                        lineDash: [],
                    },
                    visible: false,
                },
                background: {
                    fillStyle: defaultDrawingsColor,
                    opacity: 0.1,
                },
                showPrice: true,
                showTime: true,
                measureBoxFigure: {
                    text: {
                        textBg: drawingTextBg,
                        textStyle: {
                            bold: false,
                            underline: false,
                            italic: false,
                        },
                        availableBackgroundColors: [],
                        textFill: defaultDrawingsColor,
                        backgroundOffsetHeight: 4,
                        backgroundOffsetWidth: 10,
                    },
                    measureBox: {
                        showPriceChangeAbs: true,
                        showPriceChangePercent: true,
                        showBars: true,
                        showPriceChangeDistance: true,
                        position: 'center',
                        showTimeDiff: true,
                    },
                },
            },
        },
        date_range: {
            type: 'date_range',
            properties: {
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                borders: {
                    left: {
                        lineColor: defaultDrawingsColor,
                        lineWidth: 1,
                        lineDash: [],
                    },
                    right: {
                        lineColor: defaultDrawingsColor,
                        lineWidth: 1,
                        lineDash: [],
                    },
                    visible: true,
                },
                background: {
                    fillStyle: defaultDrawingsColor,
                    opacity: 0.1,
                },
                showPrice: true,
                showTime: true,
                measureBoxFigure: {
                    text: {
                        textBg: drawingTextBg,
                        textStyle: {
                            bold: false,
                            underline: false,
                            italic: false,
                        },
                        availableBackgroundColors: [],
                        textFill: defaultDrawingsColor,
                        backgroundOffsetHeight: 4,
                        backgroundOffsetWidth: 10,
                    },
                    measureBox: {
                        showPriceChangeAbs: false,
                        showPriceChangePercent: false,
                        showBars: true,
                        position: 'center',
                        showTimeDiff: true,
                    },
                },
            },
        },
        price_range: {
            type: 'price_range',
            properties: {
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                borders: {
                    top: {
                        lineColor: defaultDrawingsColor,
                        lineWidth: 1,
                        lineDash: [],
                    },
                    bottom: {
                        lineColor: defaultDrawingsColor,
                        lineWidth: 1,
                        lineDash: [],
                    },
                    visible: true,
                },
                background: {
                    fillStyle: defaultDrawingsColor,
                    opacity: 0.1,
                },
                showPrice: true,
                showTime: true,
                measureBoxFigure: {
                    text: {
                        textBg: drawingTextBg,
                        textStyle: {
                            bold: false,
                            underline: false,
                            italic: false,
                        },
                        availableBackgroundColors: [],
                        textFill: defaultDrawingsColor,
                        backgroundOffsetHeight: 4,
                        backgroundOffsetWidth: 10,
                    },
                    measureBox: {
                        showPriceChangeAbs: true,
                        showPriceChangePercent: true,
                        showBars: false,
                        showPriceChangeDistance: true,
                        position: 'center',
                        showTimeDiff: false,
                    },
                },
            },
        },
        highlighter: {
            type: 'highlighter',
            properties: {
                line: {
                    lineColor: Color(defaultDrawingsColor).fade(0.8).toString(),
                    lineWidth: 20,
                    lineDash: [],
                    lineCap: 'round',
                },
                arrows: {
                    start: false,
                    end: false,
                },
                background: {
                    fillStyle: defaultDrawingsColor,
                    opacity: 0,
                },
                showTime: true,
                showPrice: true,
            },
        },
        horizontal_line: {
            type: 'horizontal_line',
            properties: {
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                hitTestLineOffset: 6,
                showPrice: true,
                style: {
                    extendLeft: true,
                    extendRight: true,
                },
            },
        },
        extended_line: {
            type: 'extended_line',
            properties: {
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                labels: {
                    showPrice: false,
                    sidePlacement: 'right',
                },
                arrows: {
                    start: false,
                    end: false,
                    angle: 32,
                    length: 14,
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                style: {
                    extendLeft: true,
                    extendRight: true,
                },
                text: {
                    textBg: drawingTextBg,
                    textStyle: {
                        bold: false,
                        underline: false,
                        italic: false,
                    },
                    availableBackgroundColors: [],
                    textFill: '#FFAA00',
                    backgroundOffsetHeight: 8,
                    backgroundOffsetWidth: 14,
                },
                measureBox: {
                    showPriceChangePercent: false,
                    showPriceChangeAbs: false,
                    showBars: false,
                    showTimeDiff: false,
                    showDistance: false,
                    showAngle: false,
                    position: 'middle',
                },
                showPrice: true,
                showTime: true,
            },
        },
        vertical_line: {
            type: 'vertical_line',
            properties: {
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                hitTestLineOffset: 6,
                showTime: true,
                style: {
                    extendUp: true,
                    extendDown: true,
                },
            },
        },
        brush: {
            type: 'brush',
            properties: {
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                arrows: {
                    start: false,
                    end: false,
                },
                background: {
                    fillStyle: defaultDrawingsColor,
                    opacity: 0,
                },
                showTime: true,
                showPrice: true,
            },
        },
        vertical_arrow_up: {
            type: 'vertical_arrow_up',
            properties: {
                line: {
                    lineColor: drawingLineDefaultBg,
                    lineWidth: 1,
                    lineDash: [],
                },
                hitTestLineOffset: 6,
                headSideWidth: 10,
                headSideHeight: 8,
                height: 26,
                borderWidth: 0,
                color: 'transparent',
            },
        },
        vertical_arrow_down: {
            type: 'vertical_arrow_down',
            properties: {
                line: {
                    lineColor: drawingLineDefaultBg,
                    lineWidth: 1,
                    lineDash: [],
                },
                hitTestLineOffset: 6,
                headSideWidth: 10,
                headSideHeight: 8,
                height: 26,
                borderWidth: 0,
                color: 'transparent',
            },
        },
        arrow: {
            type: 'arrow',
            properties: {
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                labels: {
                    showPrice: false,
                    sidePlacement: 'right',
                },
                arrows: {
                    start: false,
                    end: true,
                    angle: 32,
                    length: 14,
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                style: {
                    extendLeft: false,
                    extendRight: false,
                },
                text: {
                    textBg: drawingTextBg,
                    textStyle: {
                        bold: false,
                        underline: false,
                        italic: false,
                    },
                    availableBackgroundColors: [],
                    textFill: '#FFAA00',
                    backgroundOffsetHeight: 8,
                    backgroundOffsetWidth: 14,
                },
                measureBox: {
                    showPriceChangePercent: false,
                    showPriceChangeAbs: false,
                    showBars: false,
                    showTimeDiff: false,
                    showDistance: false,
                    showAngle: false,
                    position: 'middle',
                },
                showPrice: true,
                showTime: true,
            },
        },
        magnifying_tool_rectangle: {
            type: 'magnifying_tool_rectangle',
            properties: {
                background: {
                    fillStyle: defaultDrawingsColor,
                },
                projection: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [6, 6],
                },
                text: {
                    textBg: 'rgba(51,51,51,1)',
                    textSize: '11pt',
                    backgroundOffsetWidth: 6,
                    backgroundOffsetHeight: 3,
                },
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                showPrice: true,
                showTime: true,
            },
        },
        magnifying_tool_time_range: {
            type: 'magnifying_tool_time_range',
            properties: {
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [6, 6],
                },
                background: {
                    fillStyle: defaultDrawingsColor,
                },
                projection: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [6, 6],
                },
                text: {
                    textBg: 'rgba(51,51,51,1)',
                    textSize: '11pt',
                    backgroundOffsetWidth: 6,
                    backgroundOffsetHeight: 3,
                },
                showPrice: false,
                showTime: true,
            },
        },
        magnifying_tool_time_range_wheel: {
            type: 'magnifying_tool_time_range_wheel',
            properties: {
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [6, 6],
                },
                background: {
                    fillStyle: defaultDrawingsColor,
                },
                projection: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [6, 6],
                },
                text: {
                    textBg: 'rgba(51,51,51,1)',
                    textSize: '11pt',
                    backgroundOffsetWidth: 6,
                    backgroundOffsetHeight: 3,
                },
                showPrice: false,
                showTime: true,
            },
        },
        callout: {
            type: 'callout',
            properties: {
                showPrice: true,
                showTime: true,
                isTransparent: false,
                showBorder: false,
                text: {
                    bgBorder: drawingCalloutAndPriceBg,
                    textFill: drawingCalloutAndPriceTextColor,
                    textBg: drawingCalloutAndPriceBg,
                    textSize: '12pt',
                    borderRadius: 3,
                    padding: {
                        x: 7,
                        y: 4,
                    },
                    textStyle: {
                        bold: false,
                        underline: false,
                        italic: false,
                    },
                },
                textValue: '',
            },
        },
        price_label: {
            type: 'price_label',
            properties: {
                showPrice: true,
                showTime: true,
                isTransparent: false,
                showBorder: false,
                points: {
                    defaultKeyPoint: {
                        shape: 'circle',
                        radius: 3,
                        fillStyle: colorPalette['drawing-handle-default-bg'],
                        lineWidth: 0,
                        lineColor: colorPalette['drawing-handle_border-bg'],
                        opacity: 1,
                    },
                    activeKeyPoint: {
                        shape: 'circle',
                        radius: 3,
                        fillStyle: colorPalette['drawing-handle-default-bg'],
                        lineWidth: 0,
                        lineColor: colorPalette['drawing-handle_border-bg'],
                        opacity: 1,
                    },
                    defaultHoverKeyPoint: {
                        shape: 'circle',
                        radius: 3,
                        fillStyle: colorPalette['drawing-handle-default-bg'],
                        lineWidth: 0,
                        lineColor: colorPalette['drawing-handle_border-bg'],
                        opacity: 1,
                    },
                    activeHoverKeyPoint: {
                        shape: 'circle',
                        radius: 3,
                        fillStyle: colorPalette['drawing-handle-default-bg'],
                        lineWidth: 0,
                        lineColor: colorPalette['drawing-handle_border-bg'],
                        opacity: 1,
                    },
                    addingKeyPoint: {
                        shape: 'circle',
                        radius: 3,
                        fillStyle: colorPalette['drawing-handle-default-bg'],
                        lineWidth: 0,
                        lineColor: colorPalette['drawing-handle_border-bg'],
                        opacity: 1,
                    },
                },
                text: {
                    bgBorder: drawingCalloutAndPriceBg,
                    textFill: drawingCalloutAndPriceTextColor,
                    textBg: drawingCalloutAndPriceBg,
                    textSize: '12pt',
                    textFontFamily: MAIN_FONT,
                    borderRadius: 4,
                    padding: {
                        x: 7,
                        y: 1,
                    },
                    textStyle: {
                        bold: false,
                        underline: false,
                        italic: false,
                    },
                },
            },
        },
        fibonacci_ark: {
            type: 'fibonacci_ark',
            properties: {
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                hitTestLineOffset: 6,
                showPrice: true,
                showTime: true,
                circles: [
                    {
                        coefficient: 0.236,
                        visible: true,
                        line: {
                            lineColor: 'rgba(111, 88, 155, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                    },
                    {
                        coefficient: 0.382,
                        visible: true,
                        line: {
                            lineColor: 'rgba(52, 120, 160, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                    },
                    {
                        coefficient: 0.5,
                        visible: true,
                        line: {
                            lineColor: 'rgba(76, 175, 174, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                    },
                    {
                        coefficient: 0.618,
                        visible: true,
                        line: {
                            lineColor: 'rgba(39, 145, 101, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                    },
                    {
                        coefficient: 0.786,
                        visible: true,
                        line: {
                            lineColor: defaultGannFanMainLineColor,
                            lineWidth: 1,
                            lineDash: [],
                        },
                    },
                    {
                        coefficient: 1,
                        visible: true,
                        line: {
                            lineColor: defaultDrawingsColor,
                            lineWidth: 1,
                            lineDash: [],
                        },
                    },
                    {
                        coefficient: 1.618,
                        visible: true,
                        line: {
                            lineColor: 'rgba(228, 137, 30, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                    },
                    {
                        coefficient: 2.618,
                        visible: true,
                        line: {
                            lineColor: 'rgba(209, 97, 81, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                    },
                    {
                        coefficient: 3.618,
                        visible: true,
                        line: {
                            lineColor: 'rgba(159, 72, 125, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                    },
                    {
                        coefficient: 4.236,
                        visible: true,
                        line: {
                            lineColor: 'rgba(125, 83, 126, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                    },
                    {
                        coefficient: 4.618,
                        visible: true,
                        line: {
                            lineColor: 'rgba(163, 96, 160, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                    },
                ],
                background: {
                    opacity: 0.2,
                },
                labels: {
                    showCoefficient: true,
                },
                halfMode: true,
            },
        },
        fibonacci_circles: {
            type: 'fibonacci_circles',
            properties: {
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                showPrice: true,
                showTime: true,
                hitTestLineOffset: 6,
                circles: [
                    {
                        coefficient: 0.236,
                        visible: true,
                        line: {
                            lineColor: 'rgba(111, 88, 155, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                    },
                    {
                        coefficient: 0.382,
                        visible: true,
                        line: {
                            lineColor: 'rgba(52, 120, 160, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                    },
                    {
                        coefficient: 0.5,
                        visible: true,
                        line: {
                            lineColor: 'rgba(76, 175, 174, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                    },
                    {
                        coefficient: 0.618,
                        visible: true,
                        line: {
                            lineColor: 'rgba(39, 145, 101, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                    },
                    {
                        coefficient: 0.786,
                        visible: true,
                        line: {
                            lineColor: 'rgba(129, 183, 90, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                    },
                    {
                        coefficient: 1,
                        visible: true,
                        line: {
                            lineColor: defaultDrawingsColor,
                            lineWidth: 1,
                            lineDash: [],
                        },
                    },
                    {
                        coefficient: 1.618,
                        visible: true,
                        line: {
                            lineColor: 'rgba(228, 137, 30, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                    },
                    {
                        coefficient: 2.618,
                        visible: true,
                        line: {
                            lineColor: 'rgba(209, 97, 81, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                    },
                    {
                        coefficient: 3.618,
                        visible: true,
                        line: {
                            lineColor: 'rgba(159, 72, 125, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                    },
                    {
                        coefficient: 4.236,
                        visible: true,
                        line: {
                            lineColor: 'rgba(125, 83, 126, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                    },
                    {
                        coefficient: 4.618,
                        visible: true,
                        line: {
                            lineColor: 'rgba(163, 96, 160, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                    },
                ],
                labels: {
                    showCoefficient: true,
                },
                background: {
                    opacity: 0.2,
                },
            },
        },
        ray: {
            type: 'ray',
            properties: {
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                labels: {
                    showPrice: false,
                    sidePlacement: 'right',
                },
                arrows: {
                    start: false,
                    end: false,
                    angle: 32,
                    length: 14,
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                style: {
                    extendLeft: false,
                    extendRight: true,
                },
                text: {
                    textBg: drawingTextBg,
                    textStyle: {
                        bold: false,
                        underline: false,
                        italic: false,
                    },
                    availableBackgroundColors: [],
                    textFill: '#FFAA00',
                    backgroundOffsetHeight: 8,
                    backgroundOffsetWidth: 14,
                },
                measureBox: {
                    showPriceChangePercent: false,
                    showPriceChangeAbs: false,
                    showBars: false,
                    showTimeDiff: false,
                    showDistance: false,
                    showAngle: false,
                    position: 'middle',
                },
                showPrice: true,
                showTime: true,
            },
        },
        fibonacci_rays: {
            type: 'fibonacci_rays',
            properties: {
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                showPrice: true,
                showTime: true,
                hitTestLineOffset: 6,
                rays: [
                    {
                        coefficient: -1,
                        visible: true,
                        lineColor: '#66FFB2',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: -0.618,
                        visible: true,
                        lineColor: '#66FF8A',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: -0.5,
                        visible: true,
                        lineColor: '#66FF66',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: -0.382,
                        visible: true,
                        lineColor: '#8CFF66',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: -0.236,
                        visible: true,
                        lineColor: '#B5FF66',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.236,
                        visible: true,
                        lineColor: '#DAFF66',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.382,
                        visible: true,
                        lineColor: '#FFFF66',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.5,
                        visible: true,
                        lineColor: '#FFD766',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.618,
                        visible: true,
                        lineColor: '#FFB266',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 1,
                        visible: true,
                        lineColor: '#FF8A66',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 1.618,
                        visible: true,
                        lineColor: '#FF7866',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 1.618,
                        visible: true,
                        lineColor: '#e03621',
                        lineWidth: 1,
                        lineDash: [],
                    },
                ],
                labels: {
                    showCoefficient: true,
                },
                background: {
                    opacity: 0.2,
                },
            },
        },
        fibonacci_time_zones: {
            type: 'fibonacci_time_zones',
            properties: {
                hitTestLineOffset: 6,
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 2,
                    lineDash: [6, 6],
                },
                showPrice: true,
                showTime: true,
                labels: {
                    showCoefficient: true,
                    sidePlacement: 'left',
                    placementToTheLine: 'bottom',
                },
                zones: [
                    {
                        visible: true,
                        lineColor: defaultDrawingsColor,
                        lineWidth: 1,
                        lineDash: [],
                        coefficient: 0,
                    },
                    {
                        visible: true,
                        lineColor: defaultDrawingsColor,
                        lineWidth: 1,
                        lineDash: [],
                        coefficient: 1,
                    },
                    {
                        visible: true,
                        lineColor: defaultDrawingsColor,
                        lineWidth: 1,
                        lineDash: [],
                        coefficient: 2,
                    },
                    {
                        visible: true,
                        lineColor: defaultDrawingsColor,
                        lineWidth: 1,
                        lineDash: [],
                        coefficient: 3,
                    },
                    {
                        visible: true,
                        lineColor: defaultDrawingsColor,
                        lineWidth: 1,
                        lineDash: [],
                        coefficient: 5,
                    },
                    {
                        visible: true,
                        lineColor: defaultDrawingsColor,
                        lineWidth: 1,
                        lineDash: [],
                        coefficient: 8,
                    },
                    {
                        visible: true,
                        lineColor: defaultDrawingsColor,
                        lineWidth: 1,
                        lineDash: [],
                        coefficient: 13,
                    },
                    {
                        visible: true,
                        lineColor: defaultDrawingsColor,
                        lineWidth: 1,
                        lineDash: [],
                        coefficient: 21,
                    },
                    {
                        visible: true,
                        lineColor: defaultDrawingsColor,
                        lineWidth: 1,
                        lineDash: [],
                        coefficient: 34,
                    },
                    {
                        visible: true,
                        lineColor: defaultDrawingsColor,
                        lineWidth: 1,
                        lineDash: [],
                        coefficient: 55,
                    },
                    {
                        visible: true,
                        lineColor: defaultDrawingsColor,
                        lineWidth: 1,
                        lineDash: [],
                        coefficient: 89,
                    },
                ],
                background: {
                    opacity: 0.2,
                },
            },
        },
        fibonacci_channel: {
            type: 'fibonacci_channel',
            properties: {
                hitTestLineOffset: 6,
                line: { lineColor: drawingLineDefaultBg, lineWidth: 1, lineDash: [] },
                showPrice: true,
                showTime: true,
                labels: { showCoefficient: true, showPrice: true, sidePlacement: 'right', placementToTheLine: 'top' },
                zones: [
                    {
                        coefficient: 0,
                        visible: true,
                        lineColor: defaultDrawingsColor,
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.236,
                        visible: true,
                        lineColor: 'rgba(111, 88, 155, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.382,
                        visible: true,
                        lineColor: 'rgba(52, 120, 160, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.5,
                        visible: true,
                        lineColor: 'rgba(76, 175, 174, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.618,
                        visible: true,
                        lineColor: 'rgba(39, 145, 101, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.786,
                        visible: true,
                        lineColor: 'rgba(129, 183, 90, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 1,
                        visible: true,
                        lineColor: defaultDrawingsColor,
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 1.618,
                        visible: true,
                        lineColor: 'rgba(228, 137, 30, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 2.618,
                        visible: true,
                        lineColor: 'rgba(209, 97, 81, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 3.618,
                        visible: true,
                        lineColor: 'rgba(125, 83, 126, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 4.236,
                        visible: true,
                        lineColor: 'rgba(163, 96, 160, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                ],
                background: {
                    opacity: 0.2,
                },
                style: { extendLeft: false, extendRight: false },
            },
        },
        ellipse: {
            type: 'ellipse',
            properties: {
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                hitTestLineOffset: 6,
                background: {
                    fillStyle: defaultDrawingsColor,
                    opacity: 0.2,
                },
                showTime: true,
                showPrice: true,
            },
        },
        trend_channel: {
            type: 'trend_channel',
            properties: {
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                hitTestLineOffset: 6,
                style: {
                    extendLeft: true,
                    extendRight: true,
                    fillBackground: true,
                    radioButtonMode: false,
                },
            },
        },
        curve: {
            type: 'curve',
            properties: {
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                style: {
                    extendLeft: true,
                    extendRight: true,
                },
                background: {
                    fillStyle: defaultDrawingsColor,
                    opacity: 0.2,
                },
                showTime: true,
                showPrice: true,
            },
        },
        arc: {
            type: 'arc',
            properties: {
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                background: {
                    fillStyle: defaultDrawingsColor,
                    opacity: 0.2,
                },
                showTime: true,
                showPrice: true,
            },
        },
        gann_fan: {
            type: 'gann_fan',
            properties: {
                line: {
                    lineColor: 'rgba(129, 183, 90, 1)',
                    lineWidth: 1,
                    lineDash: [],
                },
                hitTestLineOffset: 6,
                showPrice: true,
                showTime: true,
                rays: [
                    {
                        line: {
                            lineColor: 'rgba(159, 72, 125, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                        coefficient: 1 / 8,
                        visible: true,
                    },
                    {
                        line: {
                            lineColor: 'rgba(209, 97, 81, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                        coefficient: 1 / 4,
                        visible: true,
                    },
                    {
                        line: {
                            lineColor: 'rgba(228, 137, 30, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                        coefficient: 1 / 3,
                        visible: true,
                    },
                    {
                        line: {
                            lineColor: 'rgba(239, 181, 33, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                        coefficient: 1 / 2,
                        visible: true,
                    },
                    {
                        line: {
                            lineColor: 'rgba(129, 183, 90, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                        coefficient: 1 / 1,
                        visible: true,
                    },
                    {
                        line: {
                            lineColor: 'rgba(39, 145, 101, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                        coefficient: 2 / 1,
                        visible: true,
                    },
                    {
                        line: {
                            lineColor: 'rgba(76, 175, 174, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                        coefficient: 3 / 1,
                        visible: true,
                    },
                    {
                        line: {
                            lineColor: 'rgba(52, 120, 160, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                        coefficient: 4 / 1,
                        visible: true,
                    },
                    {
                        line: {
                            lineColor: 'rgba(111, 88, 155, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                        coefficient: 8 / 1,
                        visible: true,
                    },
                ],
                labels: {
                    showCoefficient: true,
                },
                background: {
                    opacity: 0.2,
                },
            },
        },
        multichannel: {
            type: 'multichannel',
            properties: {
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                hitTestLineOffset: 6,
            },
        },
        fibonacci_retracements: {
            type: 'fibonacci_retracements',
            properties: {
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                showPrice: true,
                showTime: true,
                hitTestLineOffset: 6,
                levels: [
                    {
                        coefficient: 0,
                        visible: true,
                        lineColor: defaultDrawingsColor,
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.236,
                        visible: true,
                        lineColor: 'rgba(111, 88, 155, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.382,
                        visible: true,
                        lineColor: 'rgba(52, 120, 160, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.5,
                        visible: true,
                        lineColor: 'rgba(76, 175, 174, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.618,
                        visible: true,
                        lineColor: 'rgba(39, 145, 101, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.764,
                        visible: true,
                        lineColor: 'rgba(129, 183, 90, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 1,
                        visible: true,
                        lineColor: defaultDrawingsColor,
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 1.618,
                        visible: true,
                        lineColor: 'rgba(228, 137, 30, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 2.618,
                        visible: true,
                        lineColor: 'rgba(209, 97, 81, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 3.618,
                        visible: true,
                        lineColor: 'rgba(125, 83, 126, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 4.236,
                        visible: true,
                        lineColor: 'rgba(163, 96, 160, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 4.236,
                        visible: true,
                        lineColor: 'rgb(201,76,193)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                ],
                labels: {
                    showPrice: true,
                    showCoefficient: true,
                    sidePlacement: 'left',
                    placementToTheLine: 'top',
                },
                style: {
                    extendLeft: true,
                    extendRight: true,
                },
                background: {
                    opacity: 0.2,
                },
            },
        },
        pitchfork: {
            type: 'pitchfork',
            properties: {
                background: {
                    opacity: 0.2,
                },
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                hitTestLineOffset: 6,
                levels: [
                    {
                        coefficient: 0.236,
                        visible: true,
                        lineColor: 'rgba(111, 88, 155, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.382,
                        visible: true,
                        lineColor: 'rgba(52, 120, 160, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.486,
                        visible: true,
                        lineColor: 'rgba(76, 175, 174, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.618,
                        visible: true,
                        lineColor: 'rgba(39, 145, 101, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.764,
                        visible: true,
                        lineColor: 'rgba(129, 183, 90, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 1,
                        visible: true,
                        lineColor: defaultDrawingsColor,
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 1.272,
                        visible: true,
                        lineColor: 'rgba(228, 137, 30, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 1.618,
                        visible: true,
                        lineColor: 'rgba(209, 97, 81, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 2.058,
                        visible: true,
                        lineColor: 'rgba(125, 83, 126, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                ],
            },
        },
        text: {
            type: 'text',
            properties: {
                hitTestLineOffset: 6,
                isTransparent: false,
                showBorder: false,
                text: {
                    textFontFamily: MAIN_FONT,
                    bgBorder: drawingBorderColorText,
                    textFill: drawingCalloutAndPriceTextColor,
                    textBg: defaultDrawingsColor,
                    textSize: '12pt',
                    lineHeight: '14pt',
                    borderRadius: 3,
                    textStyle: {
                        bold: false,
                        underline: false,
                        italic: false,
                    },
                    backgroundOffsetWidth: 7,
                    backgroundOffsetHeight: 4,
                    availableBackgroundColors: [defaultDrawingsColor],
                },
                textValue: '',
            },
        },
        rectangle: {
            type: 'rectangle',
            properties: {
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                background: {
                    fillStyle: defaultDrawingsColor,
                    opacity: 0.2,
                },
                showTime: true,
                showPrice: true,
            },
        },
        fibonacci_projection: {
            type: 'fibonacci_projection',
            properties: {
                showPrice: true,
                showTime: true,
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [2, 6],
                },
                zones: [
                    {
                        coefficient: 0,
                        visible: true,
                        lineColor: defaultDrawingsColor,
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.236,
                        visible: true,
                        lineColor: 'rgba(111, 88, 155, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.382,
                        visible: true,
                        lineColor: 'rgba(52, 120, 160, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.5,
                        visible: true,
                        lineColor: 'rgba(76, 175, 174, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.618,
                        visible: true,
                        lineColor: 'rgba(39, 145, 101, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.786,
                        visible: true,
                        lineColor: 'rgba(129, 183, 90, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 1,
                        visible: true,
                        lineColor: defaultDrawingsColor,
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 1.618,
                        visible: true,
                        lineColor: 'rgba(228, 137, 30, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 2.618,
                        visible: true,
                        lineColor: 'rgba(209, 97, 81, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 3.618,
                        visible: true,
                        lineColor: 'rgba(125, 83, 126, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 4.236,
                        visible: true,
                        lineColor: 'rgba(163, 96, 160, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                ],
                hitTestLineOffset: 6,
                labels: {
                    showPrice: true,
                    showCoefficient: true,
                    sidePlacement: 'left',
                    placementToTheLine: 'top',
                },
                style: {
                    extendLeft: true,
                    extendRight: true,
                },
                background: {
                    opacity: 0.2,
                },
            },
        },
        gann_box: {
            type: 'gann_box',
            properties: {
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                background: {
                    opacity: 0.2,
                },
                showTime: true,
                showPrice: true,
                labels: {
                    showCoefficient: true,
                },
                coefficients: {
                    priceLevel: [
                        {
                            visible: true,
                            value: 0,
                            line: {
                                lineColor: defaultDrawingsColor,
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                        {
                            visible: true,
                            value: 0.25,
                            line: {
                                lineColor: 'rgba(129, 183, 90, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                        {
                            visible: true,
                            value: 0.382,
                            line: {
                                lineColor: 'rgba(39, 145, 101, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                        {
                            visible: true,
                            value: 0.5,
                            line: {
                                lineColor: 'rgba(76, 175, 174, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                        {
                            visible: true,
                            value: 0.618,
                            line: {
                                lineColor: 'rgba(52, 120, 160, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                        {
                            visible: true,
                            value: 0.75,
                            line: {
                                lineColor: 'rgba(111, 88, 155, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                        {
                            visible: true,
                            value: 1,
                            line: {
                                lineColor: defaultDrawingsColor,
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                    ],
                    timeLevel: [
                        {
                            visible: true,
                            value: 0,
                            line: {
                                lineColor: defaultDrawingsColor,
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                        {
                            visible: true,
                            value: 0.25,
                            line: {
                                lineColor: 'rgba(111, 88, 155, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                        {
                            visible: true,
                            value: 0.382,
                            line: {
                                lineColor: 'rgba(52, 120, 160, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                        {
                            visible: true,
                            value: 0.5,
                            line: {
                                lineColor: 'rgba(76, 175, 174, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                        {
                            visible: true,
                            value: 0.618,
                            line: {
                                lineColor: 'rgba(39, 145, 101, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                        {
                            visible: true,
                            value: 0.75,
                            line: {
                                lineColor: 'rgba(129, 183, 90, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                        {
                            visible: true,
                            value: 1,
                            line: {
                                lineColor: defaultDrawingsColor,
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                    ],
                },
                text: {
                    textBg: 'transparent',
                    textStyle: {
                        bold: false,
                        underline: false,
                        italic: false,
                    },
                    availableBackgroundColors: [],
                    textFill: '#FFAA00',
                    backgroundOffsetHeight: 8,
                    backgroundOffsetWidth: 14,
                },
            },
        },
        gann_square: {
            type: 'gann_square',
            properties: {
                background: {
                    opacity: 0.2,
                },
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [2, 6],
                },
                showPrice: true,
                showTime: true,
                coefficients: {
                    levels: [
                        {
                            visible: true,
                            value: 0,
                            line: {
                                lineColor: defaultDrawingsColor,
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                        {
                            visible: true,
                            value: 1,
                            line: {
                                lineColor: defaultDrawingsColor,
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                        {
                            visible: true,
                            value: 2,
                            line: {
                                lineColor: 'rgba(228, 137, 30, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                        {
                            visible: true,
                            value: 3,
                            line: {
                                lineColor: 'rgba(209, 97, 81, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                        {
                            visible: true,
                            value: 4,
                            line: {
                                lineColor: 'rgba(159, 72, 125, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                        {
                            visible: true,
                            value: 5,
                            line: {
                                lineColor: defaultDrawingsColor,
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                    ],
                    fans: [
                        {
                            visible: false,
                            value: 8,
                            line: {
                                lineColor: 'rgba(111, 88, 155, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                        {
                            visible: false,
                            value: 5,
                            line: {
                                lineColor: 'rgba(52, 120, 160, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                        {
                            visible: false,
                            value: 4,
                            line: {
                                lineColor: 'rgba(76, 175, 174, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                        {
                            visible: false,
                            value: 3,
                            line: {
                                lineColor: 'rgba(39, 145, 101, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                        {
                            visible: true,
                            value: 2,
                            line: {
                                lineColor: 'rgba(129, 183, 90, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                        {
                            visible: true,
                            value: 1,
                            line: {
                                lineColor: defaultDrawingsColor,
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                        {
                            visible: true,
                            value: 0.5,
                            line: {
                                lineColor: 'rgba(228, 137, 30, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                        {
                            visible: false,
                            value: 0.333,
                            line: {
                                lineColor: 'rgba(209, 97, 81, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                        {
                            visible: false,
                            value: 0.25,
                            line: {
                                lineColor: 'rgba(159, 72, 125, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                        {
                            visible: false,
                            value: 0.2,
                            line: {
                                lineColor: 'rgba(111, 88, 155, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                        {
                            visible: false,
                            value: 0.125,
                            line: {
                                lineColor: 'rgba(111, 88, 155, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                        },
                    ],
                    arcs: [
                        {
                            visible: true,
                            value: 1,
                            line: {
                                lineColor: defaultDrawingsColor,
                                lineWidth: 1,
                                lineDash: [],
                            },
                            type: 'toZero',
                        },
                        {
                            visible: true,
                            value: 1,
                            line: {
                                lineColor: defaultDrawingsColor,
                                lineWidth: 1,
                                lineDash: [],
                            },
                            type: 'toOne',
                        },
                        {
                            visible: true,
                            value: 1.5,
                            line: {
                                lineColor: defaultDrawingsColor,
                                lineWidth: 1,
                                lineDash: [],
                            },
                            type: 'toZero',
                        },
                        {
                            visible: true,
                            value: 2,
                            line: {
                                lineColor: 'rgba(228, 137, 30, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                            type: 'toZero',
                        },
                        {
                            visible: true,
                            value: 2,
                            line: {
                                lineColor: 'rgba(228, 137, 30, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                            type: 'toOne',
                        },
                        {
                            visible: true,
                            value: 3,
                            line: {
                                lineColor: 'rgba(209, 97, 81, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                            type: 'toZero',
                        },
                        {
                            visible: true,
                            value: 3,
                            line: {
                                lineColor: 'rgba(209, 97, 81, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                            type: 'toOne',
                        },
                        {
                            visible: true,
                            value: 4,
                            line: {
                                lineColor: 'rgba(159, 72, 125, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                            type: 'toZero',
                        },
                        {
                            visible: true,
                            value: 4,
                            line: {
                                lineColor: 'rgba(125, 83, 126, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                            type: 'toOne',
                        },
                        {
                            visible: true,
                            value: 5,
                            line: {
                                lineColor: 'rgba(159, 72, 125, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                            type: 'toZero',
                        },
                        {
                            visible: true,
                            value: 5,
                            line: {
                                lineColor: 'rgba(159, 72, 125, 1)',
                                lineWidth: 1,
                                lineDash: [],
                            },
                            type: 'toOne',
                        },
                    ],
                },
                text: {
                    textBg: 'transparent',
                    textStyle: {
                        bold: false,
                        underline: false,
                        italic: false,
                    },
                    availableBackgroundColors: [],
                    textFill: '#FFAA00',
                    backgroundOffsetHeight: 8,
                    backgroundOffsetWidth: 14,
                },
            },
        },
        elliott_wave: {
            type: 'elliott_wave',
            properties: {
                showPrice: true,
                showTime: true,
                settings: {
                    degreeType: 'Minor',
                },
                text: {
                    textBg: 'transparent',
                    textFill: defaultDrawingsColor,
                    textStyle: {
                        bold: false,
                        underline: false,
                        italic: false,
                    },
                    backgroundOffsetWidth: 7,
                    backgroundOffsetHeight: 5,
                    availableBackgroundColors: [defaultDrawingsColor],
                },
                line: {
                    lineVisibility: true,
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
            },
        },
        elliott_correction_wave: {
            type: 'elliott_correction_wave',
            properties: {
                showPrice: true,
                showTime: true,
                settings: {
                    degreeType: 'Intermediate',
                },
                text: {
                    textBg: 'transparent',
                    textFill: defaultDrawingsColor,
                    textStyle: {
                        bold: false,
                        underline: false,
                        italic: false,
                    },
                    backgroundOffsetWidth: 7,
                    backgroundOffsetHeight: 5,
                    availableBackgroundColors: [defaultDrawingsColor],
                },
                line: {
                    lineVisibility: true,
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
            },
        },
        regression_trend: {
            type: 'regression_trend',
            properties: {
                showPrice: true,
                showTime: true,
                line: {
                    lineVisibility: true,
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                deviation: {
                    useUpperDeviation: true,
                    useLowerDeviation: true,
                    source: 'Close',
                },
                sections: [
                    {
                        backgroundColor: 'rgba(77, 153, 83, 1)',
                        visible: true,
                        type: 'up',
                        deviationCoef: 2,
                        line: {
                            lineColor: 'rgba(77, 153, 83, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                    },
                    {
                        backgroundColor: 'rgba(255, 170, 0, 1)',
                        visible: true,
                        type: 'base',
                        deviationCoef: 0,
                        line: {
                            lineColor: defaultDrawingsColor,
                            lineWidth: 1,
                            lineDash: [],
                        },
                    },
                    {
                        backgroundColor: 'rgba(217, 44, 64, 1)',
                        visible: true,
                        type: 'down',
                        deviationCoef: -2,
                        line: {
                            lineColor: 'rgba(217, 44, 64, 1)',
                            lineWidth: 1,
                            lineDash: [],
                        },
                    },
                ],
                extendLines: false,
                pearsonR: true,
            },
        },
        fibonacci_spiral: {
            type: 'fibonacci_spiral',
            properties: {
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                showPrice: true,
                showTime: true,
                style: {
                    extendLeft: false,
                    extendRight: true,
                },
                counterclockwise: false,
                spiralLength: 1000,
            },
        },
        cycle_brackets: {
            type: 'cycle_brackets',
            properties: {
                line: {
                    lineColor: defaultDrawingsColor,
                    lineWidth: 1,
                    lineDash: [],
                },
                background: {
                    fillStyle: defaultDrawingsColor,
                    opacity: 0.2,
                },
                showTime: true,
                showPrice: true,
            },
        },
        fibonacci_time_extension: {
            type: 'fibonacci_time_extension',
            properties: {
                showPrice: true,
                showTime: true,
                line: {
                    lineVisibility: true,
                    lineColor: defaultDrawingsColor,
                    lineWidth: 2,
                    lineDash: [6, 6],
                },
                zones: [
                    {
                        coefficient: 0,
                        visible: true,
                        lineColor: defaultDrawingsColor,
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.382,
                        visible: true,
                        lineColor: 'rgba(111, 88, 155, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.5,
                        visible: false,
                        lineColor: 'rgba(52, 120, 160, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.618,
                        visible: true,
                        lineColor: 'rgba(76, 175, 174, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 1,
                        visible: true,
                        lineColor: 'rgba(39, 145, 101, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 1.382,
                        visible: true,
                        lineColor: defaultDrawingsColor,
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 1.618,
                        visible: true,
                        lineColor: 'rgba(228, 137, 30, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 2,
                        visible: true,
                        lineColor: 'rgba(209, 97, 81, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 2.382,
                        visible: true,
                        lineColor: 'rgba(125, 83, 126, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 2.618,
                        visible: true,
                        lineColor: 'rgba(163, 96, 160, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 3,
                        visible: true,
                        lineColor: 'rgba(129, 183, 90, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                ],
                hitTestLineOffset: 6,
                labels: {
                    showCoefficient: true,
                    sidePlacement: 'left',
                    placementToTheLine: 'bottom',
                },
                background: {
                    opacity: 0.2,
                },
            },
        },
        fibonacci_time_ratios: {
            type: 'fibonacci_time_ratios',
            properties: {
                showPrice: true,
                showTime: true,
                line: {
                    lineVisibility: true,
                    lineColor: defaultDrawingsColor,
                    lineWidth: 2,
                    lineDash: [6, 6],
                },
                zones: [
                    {
                        coefficient: 0,
                        visible: true,
                        lineColor: defaultDrawingsColor,
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.236,
                        visible: true,
                        lineColor: 'rgba(100, 74, 120, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.382,
                        visible: true,
                        lineColor: 'rgba(111, 88, 155, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.5,
                        visible: true,
                        lineColor: 'rgba(52, 120, 160, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.618,
                        visible: true,
                        lineColor: 'rgba(76, 175, 174, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 0.786,
                        visible: true,
                        lineColor: 'rgba(70, 195, 114, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 1,
                        visible: true,
                        lineColor: 'rgba(39, 145, 101, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 1.618,
                        visible: true,
                        lineColor: 'rgba(228, 137, 30, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 2.61,
                        visible: true,
                        lineColor: 'rgba(209, 97, 81, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                    {
                        coefficient: 4.236,
                        visible: true,
                        lineColor: 'rgba(125, 83, 126, 1)',
                        lineWidth: 1,
                        lineDash: [],
                    },
                ],
                hitTestLineOffset: 6,
                labels: {
                    showCoefficient: true,
                    sidePlacement: 'left',
                    placementToTheLine: 'bottom',
                },
                background: {
                    opacity: 0.2,
                },
            },
        },
    };
};
export const getDefaultDrawingsConfig = (chartPalette) => createDrawingsConfig(chartPalette);
export const DEFAULT_DRAWINGS_CONFIG = createDrawingsConfig(DEFAULT_CHART_PALETTE.dark);
