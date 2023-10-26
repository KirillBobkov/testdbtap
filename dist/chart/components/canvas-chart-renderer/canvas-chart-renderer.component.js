import { createChartWithModules } from './chart-with-modules';
export const CanvasChartSymbol = Symbol('Chart');
export const createChart = (chartConfig) => {
    const element = document.createElement('div');
    element.style.height = '100%';
    return createChartWithModules(element, chartConfig);
};
