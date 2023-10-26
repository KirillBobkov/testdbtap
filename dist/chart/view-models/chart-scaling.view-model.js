import { newSink } from '../../context/sink2';
import { context } from '../../context/context2';
import { merge, of } from 'rxjs';
import { pipe } from 'fp-ts/function';
import { observable } from 'fp-ts-rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { createPropertyAdapter } from '../../utils/property.utils';
import { callTracerProxy } from '../../utils/debug/call-tracer';
export const createChartScalingViewModel = context.combine(context.key()('drawingViewModel'), context.key()('chartConfiguratorViewModel'), context.key()('chart'), (drawingVM, chartConfiguratorVM, chart) => {
    const initialAutoScale = chartConfiguratorVM.state.getValue().settings.chartCore.scale.auto;
    const initialZoomOutBtnState = !!chart.scale.history.length;
    const getMagnifyingDrawing = (auto) => auto ? 'magnifying_tool_time_range' : 'magnifying_tool_rectangle';
    const [setMagnifyingDrawing, currentMagnifyingDrawing] = createPropertyAdapter(getMagnifyingDrawing(initialAutoScale));
    const [toggleZoomOutBtn, isZoomOutBtnEnabled] = createPropertyAdapter(initialZoomOutBtnState);
    // TODO rework
    const zoomIn = () => {
        const scaleModel = chart.scale;
        const scaleHistory = scaleModel.history;
        // put initial scale in history
        if (scaleHistory.length === 0) {
            const currentScale = {
                xStart: scaleModel.xStart,
                xEnd: scaleModel.xEnd,
                yStart: scaleModel.yStart,
                yEnd: scaleModel.yEnd,
            };
            scaleModel.pushToHistory(currentScale);
        }
        drawingVM.startNewDrawing(currentMagnifyingDrawing.getValue());
    };
    const zoomOut = () => {
        const scaleModel = chart.scale;
        // delete last history item
        scaleModel.popFromHistory();
        const scaleHistory = scaleModel.history;
        if (scaleHistory.length) {
            const prevHistoryItem = { ...scaleHistory[scaleHistory.length - 1] };
            // remove initial scale from history
            if (scaleHistory.length === 1) {
                scaleModel.popFromHistory();
            }
            scaleModel.setYScale(prevHistoryItem.yStart, prevHistoryItem.yEnd);
            scaleModel.setXScale(prevHistoryItem.xStart, prevHistoryItem.xEnd);
            scaleModel.recalculateZoom();
        }
    };
    //#region effects
    const checkZoomOutBtnStateEffect = pipe(chart.scale.changed, switchMap(() => of(chart.scale.history)), map(history => !!history.length), distinctUntilChanged(), tap(v => toggleZoomOutBtn(v)));
    const autoScaleStateEffect = pipe(chartConfiguratorVM.state, observable.map(s => s.settings.chartCore.scale.auto), distinctUntilChanged(), map(getMagnifyingDrawing), tap(setMagnifyingDrawing));
    const effects = merge(autoScaleStateEffect, checkZoomOutBtnStateEffect);
    //#endregion
    return newSink(callTracerProxy('chartScalingViewModel', {
        zoomIn,
        zoomOut,
        isZoomOutBtnEnabled,
    }), effects);
});
