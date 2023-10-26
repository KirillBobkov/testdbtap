export const DXCF_2236 = {
    name: 'DXCF-2236',
    migrateFn: layout => {
        // eslint-disable-next-line no-restricted-syntax
        const layoutTyped = layout;
        layoutTyped.charts = layoutTyped.charts.map((chart) => {
            Object.keys(chart.drawings).forEach(symbol => {
                chart.drawings[symbol] = chart.drawings[symbol].map((drawing) => {
                    if (drawing.type === 'fibonacci_retracements' || drawing.type === 'fibonacci_projection') {
                        delete drawing.properties.labels.pricePlacement;
                        delete drawing.properties.labels.coefficientPlacement;
                        drawing.properties.labels.sidePlacement = 'left'; // default
                        drawing.properties.labels.verticalPlacement = 'top'; // default
                    }
                    return drawing;
                });
            });
            return chart;
        });
        // eslint-disable-next-line no-restricted-syntax
        return layoutTyped;
    },
};
