import { merge } from '@devexperts/dxcharts-lite/dist/chart/utils/merge.utils';
import { cloneUnsafe } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
export const getChartTypeGeneralSettingsDefaultConfig = (type, settings, defaultConfig) => {
    const mergeOptions = { overrideExisting: true, addIfMissing: false };
    switch (type) {
        case 'candle':
        case 'hollow':
        case 'heikinAshi':
        case 'trend':
        case 'bar':
        case 'line':
        case 'area':
        case 'scatterPlot':
        case 'histogram':
        case 'baseline':
            return merge(cloneUnsafe(defaultConfig), getCommonDefaultConfig(settings), {
                ...mergeOptions,
            });
        case 'equivolume':
            return merge(cloneUnsafe(defaultConfig), getEquivolumeDefaultConfig(settings), {
                ...mergeOptions,
            });
        default:
            return merge(cloneUnsafe(defaultConfig), getCommonDefaultConfig(settings), {
                ...mergeOptions,
            });
    }
};
const getCommonDefaultConfig = (config) => {
    return {
        chartCore: {
            components: {
                chart: {
                    equivolume: {
                        showClosePrice: config.chartCore.components.chart.equivolume.showClosePrice,
                    },
                },
            },
        },
    };
};
const getEquivolumeDefaultConfig = (config) => {
    return {
        chartCore: {
            components: {
                chart: {
                    showWicks: config.chartCore.components.chart.showWicks,
                },
            },
        },
    };
};
