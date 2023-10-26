import { DXChartWidget } from './standalone.config';
declare global {
    interface Window {
        DXChart: DXChartWidget;
    }
}
