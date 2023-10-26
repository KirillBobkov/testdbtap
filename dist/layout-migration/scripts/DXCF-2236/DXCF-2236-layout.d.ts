export declare const layout: {
    selectedLayoutId: string;
    layouts: {
        id: string;
        name: string;
        lastUpdateTimeStamp: number;
        version: string;
        charts: ({
            index: number;
            symbol: string;
            aggregation: {
                duration: number;
                durationType: string;
            };
            tho: boolean;
            chartType: string;
            studies: never[];
            chartCoreConfig: {
                rtl: boolean;
                scale: {
                    auto: boolean;
                    fit: {
                        studies: boolean;
                        positions: boolean;
                        orders: boolean;
                    };
                };
                components: {
                    chart: {
                        showCandlesBorder: boolean;
                    };
                    yAxis: {
                        type: string;
                        labels: {
                            descriptions: boolean;
                            settings: {
                                countdownToBarClose: {
                                    mode: string;
                                };
                                lastPrice: {
                                    mode: string;
                                };
                                studies: {
                                    mode: string;
                                };
                                bidAsk: {
                                    mode: string;
                                };
                                highLow: {
                                    mode: string;
                                };
                                prevDayClose: {
                                    mode: string;
                                };
                                prePostMarket: {
                                    mode: string;
                                };
                            };
                        };
                    };
                    grid: {
                        visible: boolean;
                    };
                    volumes: {
                        visible: boolean;
                        showSeparately: boolean;
                    };
                    offsets: {
                        visible: boolean;
                        left: number;
                        right: number;
                        top: number;
                        bottom: number;
                        topLimit: number;
                        bottomLimit: number;
                    };
                    studies: {
                        visible: boolean;
                    };
                    waterMark: {
                        visible: boolean;
                    };
                    crossTool: {
                        visible: boolean;
                    };
                    highLow: {
                        visible: boolean;
                    };
                    events: {
                        visible: boolean;
                    };
                };
                magnet: number;
                colors: {
                    candleTheme: {
                        bullColor: string;
                        bearColor: string;
                        noneColor: string;
                        bullWickColor: string;
                        bearWickColor: string;
                    };
                    barTheme: {
                        bullColor: string;
                        bearColor: string;
                        noneColor: string;
                    };
                    lineTheme: {
                        bullColor: string;
                        bearColor: string;
                        noneColor: string;
                    };
                    chartAreaTheme: {
                        backgroundColor: string;
                        axisColor: string;
                        gridColor: string;
                        volumeFillColor: string;
                    };
                    crossTool: {
                        lineColor: string;
                        labelBoxColor: string;
                        labelTextColor: string;
                    };
                };
            };
            chartReactConfig: {
                sessionBreaks: {
                    visible: boolean;
                };
                extendedHours: {
                    visible: boolean;
                };
                trading: {
                    visible: boolean;
                };
            };
            secondarySeries: never[];
            drawings: {
                AMD: {
                    id: string;
                    type: string;
                    keyPoints: {
                        timestamp: number;
                        value: number;
                    }[];
                    properties: {
                        line: {
                            lineColor: string;
                            lineWidth: number;
                            lineDash: never[];
                        };
                        showPrice: boolean;
                        showTime: boolean;
                        hitTestLineOffset: number;
                        "level-0": {
                            coefficient: number;
                            visible: boolean;
                            lineColor: string;
                            lineWidth: number;
                            lineDash: never[];
                        };
                        "level-1": {
                            coefficient: number;
                            visible: boolean;
                            lineColor: string;
                            lineWidth: number;
                            lineDash: never[];
                        };
                        "level-2": {
                            coefficient: number;
                            visible: boolean;
                            lineColor: string;
                            lineWidth: number;
                            lineDash: never[];
                        };
                        "level-3": {
                            coefficient: number;
                            visible: boolean;
                            lineColor: string;
                            lineWidth: number;
                            lineDash: never[];
                        };
                        "level-4": {
                            coefficient: number;
                            visible: boolean;
                            lineColor: string;
                            lineWidth: number;
                            lineDash: never[];
                        };
                        "level-5": {
                            coefficient: number;
                            visible: boolean;
                            lineColor: string;
                            lineWidth: number;
                            lineDash: never[];
                        };
                        "level-6": {
                            coefficient: number;
                            visible: boolean;
                            lineColor: string;
                            lineWidth: number;
                            lineDash: never[];
                        };
                        "level-7": {
                            coefficient: number;
                            visible: boolean;
                            lineColor: string;
                            lineWidth: number;
                            lineDash: never[];
                        };
                        "level-8": {
                            coefficient: number;
                            visible: boolean;
                            lineColor: string;
                            lineWidth: number;
                            lineDash: never[];
                        };
                        "level-9": {
                            coefficient: number;
                            visible: boolean;
                            lineColor: string;
                            lineWidth: number;
                            lineDash: never[];
                        };
                        "level-10": {
                            coefficient: number;
                            visible: boolean;
                            lineColor: string;
                            lineWidth: number;
                            lineDash: never[];
                        };
                        "level-11": {
                            coefficient: number;
                            visible: boolean;
                            lineColor: string;
                            lineWidth: number;
                            lineDash: never[];
                        };
                        labels: {
                            showPrice: boolean;
                            pricePlacement: string;
                            showCoefficient: boolean;
                            coefficientPlacement: string;
                        };
                        style: {
                            extendLeft: boolean;
                            extendRight: boolean;
                            fillBackground: boolean;
                            radioButtonMode: boolean;
                        };
                    };
                }[];
            };
            positions: {
                drawingsToolbar: {
                    top: number;
                    left: number;
                };
            };
        } | {
            index: number;
            symbol: string;
            aggregation: {
                duration: number;
                durationType: string;
            };
            tho: boolean;
            chartType: string;
            studies: never[];
            chartCoreConfig: {
                rtl: boolean;
                scale: {
                    auto: boolean;
                    fit: {
                        studies: boolean;
                        positions: boolean;
                        orders: boolean;
                    };
                };
                components: {
                    chart: {
                        showCandlesBorder: boolean;
                    };
                    yAxis: {
                        type: string;
                        labels: {
                            descriptions: boolean;
                            settings: {
                                countdownToBarClose: {
                                    mode: string;
                                };
                                lastPrice: {
                                    mode: string;
                                };
                                studies: {
                                    mode: string;
                                };
                                bidAsk: {
                                    mode: string;
                                };
                                highLow: {
                                    mode: string;
                                };
                                prevDayClose: {
                                    mode: string;
                                };
                                prePostMarket: {
                                    mode: string;
                                };
                            };
                        };
                    };
                    grid: {
                        visible: boolean;
                    };
                    volumes: {
                        visible: boolean;
                        showSeparately: boolean;
                    };
                    offsets: {
                        visible: boolean;
                        left: number;
                        right: number;
                        top: number;
                        bottom: number;
                        topLimit: number;
                        bottomLimit: number;
                    };
                    studies: {
                        visible: boolean;
                    };
                    waterMark: {
                        visible: boolean;
                    };
                    crossTool: {
                        visible: boolean;
                    };
                    highLow: {
                        visible: boolean;
                    };
                    events: {
                        visible: boolean;
                    };
                };
                magnet: number;
                colors: {
                    candleTheme: {
                        bullColor: string;
                        bearColor: string;
                        noneColor: string;
                        bullWickColor: string;
                        bearWickColor: string;
                    };
                    barTheme: {
                        bullColor: string;
                        bearColor: string;
                        noneColor: string;
                    };
                    lineTheme: {
                        bullColor: string;
                        bearColor: string;
                        noneColor: string;
                    };
                    chartAreaTheme: {
                        backgroundColor: string;
                        axisColor: string;
                        gridColor: string;
                        volumeFillColor: string;
                    };
                    crossTool: {
                        lineColor: string;
                        labelBoxColor: string;
                        labelTextColor: string;
                    };
                };
            };
            chartReactConfig: {
                sessionBreaks: {
                    visible: boolean;
                };
                extendedHours: {
                    visible: boolean;
                };
                trading: {
                    visible: boolean;
                };
            };
            secondarySeries: never[];
            drawings: {
                AMD?: undefined;
            };
            positions: {
                drawingsToolbar: {
                    top: number;
                    left: number;
                };
            };
        })[];
        multiChart: {
            layout: string;
            selectedChartIndex: string;
            sync: {
                instrument: boolean;
                chartType: boolean;
                aggregation: boolean;
                appearance: boolean;
                studies: boolean;
            };
        };
    }[];
};
