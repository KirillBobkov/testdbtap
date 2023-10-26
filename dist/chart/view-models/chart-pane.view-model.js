import { option } from 'fp-ts';
import { pipe } from 'fp-ts/function';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { context } from '../../context/context2';
import { newSink } from '../../context/sink2';
import { callTracerProxy } from '../../utils/debug/call-tracer';
import { createPropertyAdapter } from '../../utils/property.utils';
import { onSubscribe } from './utils/vm-on-subscribe';
import { CanvasElement } from '@devexperts/dxcharts-lite/dist/chart/canvas/canvas-bounds-container';
export const createChartPaneViewModel = context.combine(context.key()('multiChartViewModel'), context.key()('chart'), context.key()('chartId'), (multiChartViewModel, chart, chartId) => {
    const panes = chart.paneManager.panes;
    const initialPanesOrder = multiChartViewModel.state.getValue().charts[parseInt(chartId, 10)].panes.order;
    const initialPanesHeightRatio = multiChartViewModel.state.getValue().charts[parseInt(chartId, 10)].panes.heightRatio;
    initialPanesOrder.length > 0 && chart.canvasBoundsContainer.setPanesOrder(initialPanesOrder);
    chart.canvasBoundsContainer.overrideChartHeightRatios(initialPanesHeightRatio);
    const [setPanesData, panesData] = createPropertyAdapter({
        panes: Object.values(panes).map(p => map2PanesData(p)),
        right: 0,
    });
    const [setHoveredPane, hoveredPane] = createPropertyAdapter(option.none);
    const movePaneUp = (paneId) => {
        panes[`${paneId}`].moveUp();
        setHoveredPane(option.none);
    };
    const movePaneDown = (paneId) => {
        panes[`${paneId}`].moveDown();
        setHoveredPane(option.none);
    };
    const getRightMargin = () => {
        const allPanesBounds = chart.bounds.getBounds(CanvasElement.ALL_PANES);
        return chart.mainCanvasModel.width - allPanesBounds.x - allPanesBounds.width;
    };
    const hoverEffect = pipe(chart.crossEventProducer.crossSubject, tap(hoverData => {
        if (hoverData !== null) {
            const [, , uuid] = hoverData;
            const pane = panes[uuid];
            if (pane !== undefined) {
                // avoid unnecessary react update
                if (uuid !== option.toUndefined(hoveredPane.getValue())) {
                    setHoveredPane(option.some(uuid));
                }
            }
            else {
                setHoveredPane(option.none);
            }
        }
        else {
            setHoveredPane(option.none);
        }
    }));
    const panesUpdateEffect = pipe(merge(chart.paneManager.paneAddedSubject, chart.paneManager.paneRemovedSubject, chart.chartResizeHandler.canvasResized), tap(() => setPanesData({
        panes: Object.values(chart.paneManager.panes).map(p => map2PanesData(p)),
        right: getRightMargin(),
    })));
    const setInitialPanesDataEffect = onSubscribe(() => setPanesData({
        panes: Object.values(chart.paneManager.panes).map(p => map2PanesData(p)),
        right: getRightMargin(),
    }));
    const syncLocalPanesInfoChangedToMultiChartEffect = pipe(merge(chart.canvasBoundsContainer.barResizerChangedSubject, chart.canvasBoundsContainer.panesOrderChangedSubject), tap(_ => {
        multiChartViewModel.updateLocalChartInfo(chartId, {
            panes: {
                heightRatio: chart.canvasBoundsContainer.graphsHeightRatio,
                order: chart.canvasBoundsContainer.panesOrder,
            },
        });
        setPanesData({
            panes: Object.values(chart.paneManager.panes).map(p => map2PanesData(p)),
            right: getRightMargin(),
        });
    }));
    const effects = merge(hoverEffect, syncLocalPanesInfoChangedToMultiChartEffect, panesUpdateEffect, setInitialPanesDataEffect);
    const vm = callTracerProxy('chartPaneViewModel', {
        movePaneUp,
        movePaneDown,
        panesData,
        hoveredPane,
        setHoveredPane,
    });
    return newSink(vm, effects);
});
const map2PanesData = (pane) => {
    return {
        bounds: pane.getBounds(),
        uuid: pane.uuid,
        isTop: !pane.canMoveUp(),
        isBottom: !pane.canMoveDown(),
    };
};
