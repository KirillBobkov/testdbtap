import { cloneUnsafe } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
import { merge } from '@devexperts/dxcharts-lite/dist/chart/utils/merge.utils';
export const getChartTypeColorsDefaultConfig = (type, settings, defaultConfig) => {
    const mergeOptions = { overrideExisting: true, addIfMissing: false };
    switch (type) {
        case 'candle':
        case 'hollow':
        case 'heikinAshi':
        case 'trend':
            return merge(cloneUnsafe(settings), getCandlesDefaultConfig(defaultConfig), {
                ...mergeOptions,
            });
        case 'bar':
            return merge(cloneUnsafe(settings), getBarDefaultConfig(defaultConfig), {
                ...mergeOptions,
            });
        case 'line':
            return merge(cloneUnsafe(settings), getLineDefaultConfig(defaultConfig), {
                ...mergeOptions,
            });
        case 'area':
            return merge(cloneUnsafe(settings), getAreaDefaultConfig(defaultConfig), {
                ...mergeOptions,
            });
        case 'equivolume':
            return merge(cloneUnsafe(settings), getEquivolumeDefaultConfig(defaultConfig), {
                ...mergeOptions,
            });
        case 'scatterPlot':
            return merge(cloneUnsafe(settings), getScatterplotDefaultConfig(defaultConfig), {
                ...mergeOptions,
            });
        case 'histogram':
            return merge(cloneUnsafe(settings), getHistogramDefaultConfig(defaultConfig), {
                ...mergeOptions,
            });
        case 'baseline':
            return merge(cloneUnsafe(settings), getBaselineDefaultConfig(defaultConfig), {
                ...mergeOptions,
            });
        default:
            return merge(cloneUnsafe(settings), getCandlesDefaultConfig(defaultConfig), {
                ...mergeOptions,
            });
    }
};
const getCandlesDefaultConfig = (defaultConfig) => {
    const getCandlesDefaultThemeConfig = (theme) => ({
        candleTheme: {
            upColor: defaultConfig.chartCore.themes[theme].candleTheme.upColor,
            downColor: defaultConfig.chartCore.themes[theme].candleTheme.downColor,
            noneColor: defaultConfig.chartCore.themes[theme].candleTheme.noneColor,
            upWickColor: defaultConfig.chartCore.themes[theme].candleTheme.upWickColor,
            downWickColor: defaultConfig.chartCore.themes[theme].candleTheme.downWickColor,
        },
    });
    return {
        chartCore: {
            themes: {
                dark: { ...getCandlesDefaultThemeConfig('dark') },
                light: { ...getCandlesDefaultThemeConfig('light') },
            },
        },
    };
};
const getBarDefaultConfig = (defaultConfig) => {
    const getBarDefaultThemeConfig = (theme) => ({
        barTheme: {
            upColor: defaultConfig.chartCore.themes[theme].barTheme.upColor,
            downColor: defaultConfig.chartCore.themes[theme].barTheme.downColor,
            noneColor: defaultConfig.chartCore.themes[theme].barTheme.noneColor,
        },
    });
    return {
        chartCore: {
            themes: {
                dark: { ...getBarDefaultThemeConfig('dark') },
                light: { ...getBarDefaultThemeConfig('light') },
            },
        },
    };
};
const getLineDefaultConfig = (defaultConfig) => {
    const getLineDefaultThemeConfig = (theme) => ({
        lineTheme: {
            upColor: defaultConfig.chartCore.themes[theme].lineTheme.upColor,
            downColor: defaultConfig.chartCore.themes[theme].lineTheme.downColor,
            noneColor: defaultConfig.chartCore.themes[theme].lineTheme.noneColor,
        },
    });
    return {
        chartCore: {
            themes: {
                dark: { ...getLineDefaultThemeConfig('dark') },
                light: { ...getLineDefaultThemeConfig('light') },
            },
        },
    };
};
const getAreaDefaultConfig = (defaultConfig) => {
    const getAreaDefaultThemeConfig = (theme) => ({
        areaTheme: {
            lineColor: defaultConfig.chartCore.themes[theme].areaTheme.lineColor,
            startColor: defaultConfig.chartCore.themes[theme].areaTheme.startColor,
            stopColor: defaultConfig.chartCore.themes[theme].areaTheme.stopColor,
        },
    });
    return {
        chartCore: {
            themes: {
                dark: { ...getAreaDefaultThemeConfig('dark') },
                light: { ...getAreaDefaultThemeConfig('light') },
            },
        },
    };
};
const getEquivolumeDefaultConfig = (defaultConfig) => {
    const getEquivolumeDefaultThemeConfig = (theme) => ({
        equivolumeTheme: {
            upColor: defaultConfig.chartCore.themes[theme].equivolumeTheme.upColor,
            downColor: defaultConfig.chartCore.themes[theme].equivolumeTheme.downColor,
            noneColor: defaultConfig.chartCore.themes[theme].equivolumeTheme.noneColor,
        },
    });
    return {
        chartCore: {
            themes: {
                dark: { ...getEquivolumeDefaultThemeConfig('dark') },
                light: { ...getEquivolumeDefaultThemeConfig('light') },
            },
        },
    };
};
const getScatterplotDefaultConfig = (defaultConfig) => {
    const getScatterplotDefaultThemeConfig = (theme) => ({
        scatterPlot: {
            mainColor: defaultConfig.chartCore.themes[theme].scatterPlot.mainColor,
        },
    });
    return {
        chartCore: {
            themes: {
                dark: { ...getScatterplotDefaultThemeConfig('dark') },
                light: { ...getScatterplotDefaultThemeConfig('light') },
            },
        },
    };
};
const getHistogramDefaultConfig = (defaultConfig) => {
    const getHistogramDefaultThemeConfig = (theme) => ({
        histogram: {
            upCap: defaultConfig.chartCore.themes[theme].histogram.upCap,
            upBottom: defaultConfig.chartCore.themes[theme].histogram.upBottom,
            upBright: defaultConfig.chartCore.themes[theme].histogram.upBright,
            downCap: defaultConfig.chartCore.themes[theme].histogram.downCap,
            downBottom: defaultConfig.chartCore.themes[theme].histogram.downBottom,
            downBright: defaultConfig.chartCore.themes[theme].histogram.downBright,
            noneCap: defaultConfig.chartCore.themes[theme].histogram.noneCap,
            noneBottom: defaultConfig.chartCore.themes[theme].histogram.noneBottom,
            noneBright: defaultConfig.chartCore.themes[theme].histogram.noneBright,
        },
    });
    return {
        chartCore: {
            themes: {
                dark: { ...getHistogramDefaultThemeConfig('dark') },
                light: { ...getHistogramDefaultThemeConfig('light') },
            },
        },
    };
};
const getBaselineDefaultConfig = (defaultConfig) => {
    const getBaselineDefaultThemeConfig = (theme) => ({
        baseLineTheme: {
            upperSectionStrokeColor: defaultConfig.chartCore.themes[theme].baseLineTheme.upperSectionStrokeColor,
            lowerSectionStrokeColor: defaultConfig.chartCore.themes[theme].baseLineTheme.lowerSectionStrokeColor,
            upperSectionFillColor: defaultConfig.chartCore.themes[theme].baseLineTheme.upperSectionFillColor,
            lowerSectionFillColor: defaultConfig.chartCore.themes[theme].baseLineTheme.lowerSectionFillColor,
        },
    });
    return {
        chartCore: {
            themes: {
                dark: { ...getBaselineDefaultThemeConfig('dark') },
                light: { ...getBaselineDefaultThemeConfig('light') },
            },
        },
    };
};
