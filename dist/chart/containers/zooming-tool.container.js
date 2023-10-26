import { DEFAULT_BOUNDS } from '@devexperts/dxcharts-lite/dist/chart/canvas/canvas-bounds-container';
import { createElement } from 'react';
import { context } from '../../context/context2';
import { namedMemo } from '../../utils/named-memo';
import { useObservable } from '../../utils/use-observable';
import { useProperty } from '../../utils/use-property';
import { useSink } from '../../utils/use-sink';
import { ChartZoomingTool } from '../components/chart-zooming-tool/chart-zooming-tool.component';
import { createZoomingToolViewModel } from '../view-models/chart-zooming-tool.view-model';
export const ZoomingToolContainer = context.combine(createZoomingToolViewModel, context.key()('chart'), context.key()('localization'), context.key()('chartDataViewModel'), (zoomingToolVMSink, chart, localization, chartDataViewModel) => namedMemo('ChartZoomingToolContainer', () => {
    const zoomingToolVM = useSink(() => zoomingToolVMSink, [zoomingToolVMSink]);
    const currentCanvasBounds = useObservable(zoomingToolVM.observeBounds$, DEFAULT_BOUNDS);
    const buttonsDisabled = useProperty(zoomingToolVM.buttonsDisabled);
    const marginBottom = useObservable(zoomingToolVM.marginBottom, 0);
    const historicalCandles = useObservable(chartDataViewModel.historicalCandlesUpdated, []);
    const dataPresented = historicalCandles.length !== 0;
    return dataPresented
        ? createElement(ChartZoomingTool, {
            zoomIn: zoomingToolVM.zoomIn,
            zoomOut: zoomingToolVM.zoomOut,
            chart,
            buttonsDisabled,
            marginBottom,
            localization,
            currentCanvasBounds,
        })
        : null;
}));
