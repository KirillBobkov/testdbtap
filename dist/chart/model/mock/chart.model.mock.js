export const CHART_SETTINGS_FOR_STORY = {
    chartCore: {
        scale: {
            auto: true,
            lockPriceToBarRatio: false,
            inverse: false,
        },
        components: {
            news: {
                visible: true,
            },
            chart: {
                showCandlesBorder: false,
                showWicks: true,
                equivolume: {
                    showClosePrice: true,
                },
            },
            drawings: {
                magnet: 30,
            },
            yAxis: {
                type: 'regular',
                align: 'right',
                visible: true,
                labels: {
                    descriptions: false,
                    settings: {
                        countdownToBarClose: {
                            mode: 'none',
                        },
                        bidAsk: { mode: 'none' },
                        highLow: { mode: 'none' },
                        lastPrice: { mode: 'line-label' },
                        prePostMarket: { mode: 'line-label' },
                        prevDayClose: { mode: 'none' },
                        studies: { mode: 'label' },
                    },
                },
            },
            grid: {
                visible: true,
                vertical: true,
                horizontal: false,
            },
            volumes: {
                visible: true,
                showSeparately: false,
            },
            offsets: {
                visible: true,
                right: 20,
                top: 10,
                left: 0,
                bottom: 10,
            },
            waterMark: {
                visible: true,
            },
            crossTool: {
                type: 'cross-and-labels',
                magnetTarget: 'none',
            },
            highLow: {
                visible: true,
            },
            events: {
                visible: false,
                eventsVisibility: {
                    'conference-calls': true,
                    dividends: true,
                    splits: true,
                    earnings: true,
                },
            },
        },
        themes: {
            dark: {
                candleTheme: {
                    upColor: '#0fa68a',
                    downColor: '#e91d25',
                    downWickColor: '#787b7e',
                    upWickColor: '#787b7e',
                    noneColor: '#4c5458',
                },
                barTheme: {
                    upColor: '#0fa68a',
                    downColor: '#e91d25',
                    noneColor: '#4c5458',
                },
                lineTheme: {
                    upColor: '#0fa68a',
                    downColor: '#e91d25',
                    noneColor: '#4c5458',
                },
                equivolumeTheme: {
                    upColor: '#0fa68a',
                    downColor: '#e91d25',
                    noneColor: '#4c5458',
                },
                scatterPlot: {
                    mainColor: '#ffffff',
                },
                areaTheme: {
                    lineColor: 'rgba(226,61,25,1)',
                    startColor: 'rgba(226,61,25,0.8)',
                    stopColor: 'rgba(226,61,25,0)',
                },
                baseLineTheme: {
                    lowerSectionStrokeColor: '#D92C40',
                    upperSectionStrokeColor: '#4D9953',
                    lowerSectionFillColor: 'rgba(217,44,64,0.07)',
                    upperSectionFillColor: 'rgba(77,153,83,0.07)',
                    baselineColor: 'rgba(255, 255, 255, 0.15)',
                },
                histogram: {
                    upCap: 'rgba(51, 153, 51, 0.4)',
                    upBottom: 'rgba(51, 153, 51, 0.1)',
                    upBright: 'rgba(77, 153, 83, 1)',
                    downCap: 'rgba(153, 51, 51, 0.4)',
                    downBottom: 'rgba(153, 51, 51, 0.1)',
                    downBright: 'rgba(217, 44, 64, 1)',
                    noneCap: 'rgba(255,255,255,0.4)',
                    noneBottom: 'rgba(255,255,255,0.1)',
                    noneBright: 'rgba(255,255,255,1)',
                },
                chartAreaTheme: {
                    backgroundMode: 'regular',
                    backgroundGradientTopColor: '#ffffff',
                    backgroundGradientBottomColor: '#ffffff',
                    backgroundColor: '#ffffff',
                    gridColor: '#373d40',
                },
                crossTool: {
                    lineColor: 'rgba(255,255,255,0.4)',
                    labelBoxColor: 'rgb(59, 59, 59)',
                    labelTextColor: '#aeb1b3',
                },
                waterMarkTheme: {
                    firstRowColor: 'rgba(0, 0, 0, .3)',
                    secondRowColor: 'rgba(0, 0, 0, .3)',
                    thirdRowColor: 'rgba(0, 0, 0, .3)',
                },
                newsTheme: {
                    backgroundColor: 'rgba(100, 217, 245, 1)',
                },
                xAxis: {
                    labelTextColor: 'rgba(128,128,128,1)',
                },
                yAxis: {
                    labelTextColor: 'rgba(128,128,128,1)',
                },
            },
            light: {
                candleTheme: {
                    upColor: '#0fa68a',
                    downColor: '#e91d25',
                    downWickColor: '#787b7e',
                    upWickColor: '#787b7e',
                    noneColor: '#4c5458',
                },
                barTheme: {
                    upColor: '#0fa68a',
                    downColor: '#e91d25',
                    noneColor: '#4c5458',
                },
                lineTheme: {
                    upColor: '#0fa68a',
                    downColor: '#e91d25',
                    noneColor: '#4c5458',
                },
                equivolumeTheme: {
                    upColor: '#0fa68a',
                    downColor: '#e91d25',
                    noneColor: '#4c5458',
                },
                scatterPlot: {
                    mainColor: '#ffffff',
                },
                areaTheme: {
                    lineColor: 'rgba(226,61,25,1)',
                    startColor: 'rgba(226,61,25,0.8)',
                    stopColor: 'rgba(226,61,25,0)',
                },
                baseLineTheme: {
                    lowerSectionStrokeColor: '#D92C40',
                    upperSectionStrokeColor: '#4D9953',
                    lowerSectionFillColor: 'rgba(217,44,64,0.07)',
                    upperSectionFillColor: 'rgba(77,153,83,0.07)',
                    baselineColor: 'rgba(255, 255, 255, 0.15)',
                },
                histogram: {
                    upCap: 'rgba(51, 153, 51, 0.4)',
                    upBottom: 'rgba(51, 153, 51, 0.1)',
                    upBright: 'rgba(77, 153, 83, 1)',
                    downCap: 'rgba(153, 51, 51, 0.4)',
                    downBottom: 'rgba(153, 51, 51, 0.1)',
                    downBright: 'rgba(217, 44, 64, 1)',
                    noneCap: 'rgba(255,255,255,0.4)',
                    noneBottom: 'rgba(255,255,255,0.1)',
                    noneBright: 'rgba(255,255,255,1)',
                },
                chartAreaTheme: {
                    backgroundMode: 'regular',
                    backgroundGradientTopColor: '#ffffff',
                    backgroundGradientBottomColor: '#ffffff',
                    backgroundColor: '#ffffff',
                    gridColor: '#373d40',
                },
                crossTool: {
                    lineColor: 'rgba(255,255,255,0.4)',
                    labelBoxColor: 'rgb(59, 59, 59)',
                    labelTextColor: '#aeb1b3',
                },
                waterMarkTheme: {
                    firstRowColor: 'rgba(0, 0, 0, .3)',
                    secondRowColor: 'rgba(0, 0, 0, .3)',
                    thirdRowColor: 'rgba(0, 0, 0, .3)',
                },
                newsTheme: {
                    backgroundColor: 'rgba(100, 217, 245, 1)',
                },
                xAxis: {
                    labelTextColor: 'rgba(128,128,128,1)',
                },
                yAxis: {
                    labelTextColor: 'rgba(128,128,128,1)',
                },
            },
        },
        rtl: false,
    },
    chartReact: {
        sessionBreaks: {
            visible: false,
        },
        timeframeChangeStrategy: {
            aggregations: 'smart',
            instrument: 'basic',
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
            bounds: { min: Number.NEGATIVE_INFINITY, max: Number.POSITIVE_INFINITY },
            rightOffset: 100,
        },
        legend: {
            opened: true,
            showOHLC: true,
            showVolume: true,
            showPeriod: true,
            showInstrument: false,
            mode: 'pinned',
        },
        candlesData: {
            price: 'mark',
            candleAlignment: 'midnight',
        },
        aggregationPeriod: {
            applyUponCreation: true,
        },
        scale: {
            fit: {
                studies: true,
                orders: false,
                positions: false,
            },
        },
    },
};
export const createMockChartSettings = () => {
    return CHART_SETTINGS_FOR_STORY;
};
