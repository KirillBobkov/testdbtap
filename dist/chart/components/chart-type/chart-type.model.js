import { DEFAULT_LOCALIZATION } from '../../../config/localization/localization';
export const typeToString = (type, localization = DEFAULT_LOCALIZATION) => {
    switch (type) {
        case 'baseline':
            return localization.toolbar.chartType.baseline;
        case 'area':
            return localization.toolbar.chartType.area;
        case 'line':
            return localization.toolbar.chartType.line;
        case 'bar':
            return localization.toolbar.chartType.bar;
        case 'hollow':
            return localization.toolbar.chartType.hollowCandles;
        case 'candle':
            return localization.toolbar.chartType.candle;
        case 'heikinAshi':
            return localization.toolbar.chartType.heikinAshi;
        case 'histogram':
            return localization.toolbar.chartType.histogram;
        case 'scatterPlot':
            return localization.toolbar.chartType.scatter;
        case 'trend':
            return localization.toolbar.chartType.trend;
        case 'equivolume':
            return localization.toolbar.chartType.equivolume;
    }
};
export const toType = (type, localization = DEFAULT_LOCALIZATION) => {
    switch (type) {
        case localization.toolbar.chartType.baseline:
            return 'baseline';
        case localization.toolbar.chartType.area:
            return 'area';
        case localization.toolbar.chartType.line:
            return 'line';
        case localization.toolbar.chartType.bar:
            return 'bar';
        case localization.toolbar.chartType.hollowCandles:
            return 'hollow';
        case localization.toolbar.chartType.candle:
            return 'candle';
        case localization.toolbar.chartType.heikinAshi:
            return 'heikinAshi';
        case localization.toolbar.chartType.histogram:
            return 'histogram';
        case localization.toolbar.chartType.scatter:
            return 'scatterPlot';
        case localization.toolbar.chartType.trend:
            return 'trend';
        case localization.toolbar.chartType.equivolume:
            return 'equivolume';
        default:
            return 'candle';
    }
};
