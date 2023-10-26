import { CanvasElement } from '@devexperts/dxcharts-lite/dist/chart/canvas/canvas-bounds-container';
import { option } from 'fp-ts';
import { tap } from 'rxjs';
import { context } from '../../../context/context2';
/**
 * Maximizes/minimizes chart on double click
 */
export const handleDblClickOnChartEffect = context.combine(context.key()('chart'), context.key()('multiChartViewModel'), context.key()('chartId'), (chart, multiChartViewModel, chartId) => {
    const ht = chart.canvasBoundsContainer.getBoundsHitTest(CanvasElement.ALL_PANES);
    return chart.canvasInputListener.observeDbClick(ht).pipe(tap(() => {
        const clickOnModel = chart.hitTestCanvasModel.resolveModel(chart.canvasInputListener.currentPoint);
        const canMaximize = multiChartViewModel.state.getValue().layout !== '1x1';
        if (clickOnModel || !canMaximize) {
            return;
        }
        if (option.isNone(multiChartViewModel.state.getValue().maximizedChartId)) {
            multiChartViewModel.maximizeChart(option.some(chartId));
        }
        else {
            multiChartViewModel.maximizeChart(option.none);
        }
    }));
});
