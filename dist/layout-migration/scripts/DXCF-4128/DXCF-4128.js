const newColorsNames = {
    bullColor: 'upColor',
    bearColor: 'downColor',
    bullWickColor: 'upWickColor',
    bearWickColor: 'downWickColor',
    bullCap: 'upCap',
    bullBottom: 'upBottom',
    bullBright: 'upBright',
    bearCap: 'downCap',
    bearBottom: 'downBottom',
    bearBright: 'downBright',
};
const toNewCandlesNaming = (theme) => {
    for (const [oldKey, newKey] of Object.entries(newColorsNames)) {
        if (theme && theme.hasOwnProperty(oldKey)) {
            Object.assign(theme, { [newKey]: theme[oldKey] });
            delete theme[oldKey];
        }
    }
    return theme;
};
export const DXCF_4128 = {
    name: 'DXCF-4128',
    migrateFn: layout => {
        layout.charts = layout.charts.map((chart) => {
            const colors = {};
            Object.keys(chart.chartCoreConfig.colors).forEach(key => {
                Object.assign(colors, { [key]: toNewCandlesNaming(chart.chartCoreConfig.colors[key]) });
            });
            return {
                ...chart,
                chartCoreConfig: {
                    ...chart.chartCoreConfig,
                    colors,
                },
            };
        });
        // eslint-disable-next-line no-restricted-syntax
        return layout;
    },
};
