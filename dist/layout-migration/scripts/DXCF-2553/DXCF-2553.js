export const DXCF_2553 = {
    name: 'DXCF-2553',
    migrateFn: layout => {
        layout.charts = layout.charts.map((chart) => {
            Object.keys(chart.drawings).forEach(symbol => {
                chart.drawings[symbol] = chart.drawings[symbol].map((drawing) => {
                    switch (drawing.type) {
                        case 'line':
                        case 'info_line':
                        case 'extended_line':
                        case 'arrow':
                        case 'ray':
                            delete drawing.properties.style.fillBackground;
                            delete drawing.properties.style.pricePlacement;
                            drawing.properties.labels.sidePlacement = 'left';
                            return drawing;
                        case 'icon':
                            delete drawing.properties.backgroundStyle;
                            drawing.properties.background = {
                                fillStyle: '#FFFFFF',
                                opacity: 0,
                                lineColor: '#FFAA00',
                            };
                            return drawing;
                        case 'fibonacci_ark':
                        case 'fibonacci_circles':
                            delete drawing.properties.showLabels;
                            drawing.properties.labels = {
                                showCoefficient: true,
                            };
                            return drawing;
                        case 'fibonacci_rays':
                            delete drawing.properties.style;
                            drawing.properties.background = {
                                opacity: 0.2,
                            };
                            delete drawing.properties['ray-0'];
                            delete drawing.properties['ray-1'];
                            delete drawing.properties['ray-2'];
                            delete drawing.properties['ray-3'];
                            delete drawing.properties['ray-4'];
                            delete drawing.properties['ray-5'];
                            delete drawing.properties['ray-6'];
                            delete drawing.properties['ray-7'];
                            delete drawing.properties['ray-8'];
                            delete drawing.properties['ray-9'];
                            delete drawing.properties['ray-10'];
                            delete drawing.properties['ray-11'];
                            drawing.properties.rays = [
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
                            ];
                            return drawing;
                        case 'fibonacci_time_zones':
                            delete drawing.properties.labels;
                            drawing.properties.labels = {
                                showCoefficient: true,
                                sidePlacement: 'left',
                                placementToTheLine: 'bottom',
                            };
                            delete drawing.properties.zones;
                            drawing.properties.zones = [
                                {
                                    visible: true,
                                    lineColor: 'rgba(255,170,0,1)',
                                    lineWidth: 1,
                                    lineDash: [],
                                    coefficient: 0,
                                },
                                {
                                    visible: true,
                                    lineColor: 'rgba(255,170,0,1)',
                                    lineWidth: 1,
                                    lineDash: [],
                                    coefficient: 1,
                                },
                                {
                                    visible: true,
                                    lineColor: 'rgba(255,170,0,1)',
                                    lineWidth: 1,
                                    lineDash: [],
                                    coefficient: 2,
                                },
                                {
                                    visible: true,
                                    lineColor: 'rgba(255,170,0,1)',
                                    lineWidth: 1,
                                    lineDash: [],
                                    coefficient: 3,
                                },
                                {
                                    visible: true,
                                    lineColor: 'rgba(255,170,0,1)',
                                    lineWidth: 1,
                                    lineDash: [],
                                    coefficient: 5,
                                },
                                {
                                    visible: true,
                                    lineColor: 'rgba(255,170,0,1)',
                                    lineWidth: 1,
                                    lineDash: [],
                                    coefficient: 8,
                                },
                                {
                                    visible: true,
                                    lineColor: 'rgba(255,170,0,1)',
                                    lineWidth: 1,
                                    lineDash: [],
                                    coefficient: 13,
                                },
                                {
                                    visible: true,
                                    lineColor: 'rgba(255,170,0,1)',
                                    lineWidth: 1,
                                    lineDash: [],
                                    coefficient: 21,
                                },
                                {
                                    visible: true,
                                    lineColor: 'rgba(255,170,0,1)',
                                    lineWidth: 1,
                                    lineDash: [],
                                    coefficient: 34,
                                },
                                {
                                    visible: true,
                                    lineColor: 'rgba(255,170,0,1)',
                                    lineWidth: 1,
                                    lineDash: [],
                                    coefficient: 55,
                                },
                                {
                                    visible: true,
                                    lineColor: 'rgba(255,170,0,1)',
                                    lineWidth: 1,
                                    lineDash: [],
                                    coefficient: 89,
                                },
                            ];
                            return drawing;
                        case 'fibonacci_channel':
                            delete drawing.properties.labels;
                            drawing.properties.labels = {
                                showCoefficient: true,
                                showPrice: true,
                                sidePlacement: 'right',
                                placementToTheLine: 'top',
                            };
                            delete drawing.properties.zones;
                            drawing.properties.zones = [
                                {
                                    coefficient: 0,
                                    visible: true,
                                    lineColor: 'rgba(111, 88, 155, 1)',
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
                                    lineColor: 'rgba(129, 183, 90, 1)',
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
                            ];
                            return drawing;
                        case 'fibonacci_retracements':
                            delete drawing.properties.labels.verticalPlacement;
                            drawing.properties.labels.placementToTheLine = 'top';
                            delete drawing.properties.style.fillBackground;
                            drawing.properties.background = {
                                opacity: 0.2,
                            };
                            delete drawing.properties['level-0'];
                            delete drawing.properties['level-1'];
                            delete drawing.properties['level-2'];
                            delete drawing.properties['level-3'];
                            delete drawing.properties['level-4'];
                            delete drawing.properties['level-5'];
                            delete drawing.properties['level-6'];
                            delete drawing.properties['level-7'];
                            delete drawing.properties['level-8'];
                            delete drawing.properties['level-9'];
                            delete drawing.properties['level-10'];
                            delete drawing.properties['level-11'];
                            drawing.properties.levels = [
                                {
                                    coefficient: 0,
                                    visible: true,
                                    lineColor: 'rgba(111, 88, 155, 1)',
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
                                    lineColor: 'rgba(228, 137, 30, 1)',
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
                            ];
                            return drawing;
                        case 'pitchfork':
                            delete drawing.properties.style;
                            drawing.properties.background = {
                                opacity: 0.2,
                            };
                            delete drawing.properties['level-0'];
                            delete drawing.properties['level-1'];
                            delete drawing.properties['level-2'];
                            delete drawing.properties['level-3'];
                            delete drawing.properties['level-4'];
                            delete drawing.properties['level-5'];
                            delete drawing.properties['level-6'];
                            delete drawing.properties['level-7'];
                            delete drawing.properties['level-8'];
                            drawing.properties.levels = [
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
                                    lineColor: 'rgba(111, 88, 155, 1)',
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
                            ];
                            return drawing;
                        case 'fibonacci_projection':
                            delete drawing.properties.style.fillBackground;
                            delete drawing.properties.labels.verticalPlacement;
                            drawing.properties.labels.placementToTheLine = 'top';
                            delete drawing.properties.zones;
                            drawing.properties.zones = [
                                {
                                    coefficient: 0,
                                    visible: true,
                                    lineColor: 'rgba(111, 88, 155, 1)',
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
                                    lineColor: 'rgba(129, 183, 90, 1)',
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
                            ];
                            return drawing;
                        case 'gann_box':
                            delete drawing.properties.showLabels;
                            drawing.properties.labels = {
                                showCoefficient: true,
                            };
                            return drawing;
                        default:
                            return drawing;
                    }
                });
            });
            return chart;
        });
        // eslint-disable-next-line no-restricted-syntax
        return layout;
    },
};
