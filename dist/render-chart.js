import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { ChartReactApp } from './chart/chart-react-app';
export const createChart = (container, options = {}) => {
    const dxchart = createElement(ChartReactApp, options);
    const root = createRoot(container);
    root.render(dxchart);
};
