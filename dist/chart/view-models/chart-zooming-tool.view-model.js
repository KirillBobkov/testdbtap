import { newSink } from '../../context/sink2';
import { context } from '../../context/context2';
import { combineLatest, merge } from 'rxjs';
import { createPropertyAdapter } from '../../utils/property.utils';
import { distinctUntilChanged, tap, map } from 'rxjs/operators';
import { eqStrict, struct } from 'fp-ts/Eq';
import { CanvasElement, CHART_UUID } from '@devexperts/dxcharts-lite/dist/chart/canvas/canvas-bounds-container';
import { floor } from '@devexperts/dxcharts-lite/dist/chart/utils/math.utils';
import { pipe } from 'fp-ts/function';
import { observable } from 'fp-ts-rxjs';
import { callTracerProxy } from '../../utils/debug/call-tracer';
import { VIEWPORT_ANIMATION_ID } from '@devexperts/dxcharts-lite/dist/chart/animation/canvas-animation';
export const createZoomingToolViewModel = context.combine(context.key()('chart'), context.key()('chartConfiguratorViewModel'), (chart, chartConfiguratorVM) => {
    const [setButtonsDisabled, buttonsDisabled] = createPropertyAdapter({
        zoomIn: false,
        zoomOut: false,
    }, buttonsStateEq.equals);
    const xScaleChangedEffect = merge(chart.scale.xChanged, chart.canvasInputListener.observeClickOnDocument()).pipe(tap(() => {
        const bounds = chart.canvasBoundsContainer.getBounds(CanvasElement.PANE_UUID(CHART_UUID));
        const currentVisibleCandles = chart.scale.xEnd - chart.scale.xStart;
        const zoomInDisabled = currentVisibleCandles <= chart.config.components.chart.minCandles;
        const maxCandlesInViewport = bounds.width / chart.config.components.chart.minWidth;
        const zoomOutDisabled = currentVisibleCandles >= maxCandlesInViewport;
        const buttonsState = { zoomIn: zoomInDisabled, zoomOut: zoomOutDisabled };
        if (chart.canvasAnimation) {
            const animation = chart.canvasAnimation.getAnimation(VIEWPORT_ANIMATION_ID);
            if (!animation || (animation && animation.animationTimeLeft <= 0)) {
                setButtonsDisabled({ ...buttonsState });
            }
        }
    }));
    const zoomIn = () => {
        chart.scale.zoomXToPercent(1, true, true);
    };
    const zoomOut = () => {
        chart.scale.zoomXToPercent(1, false, true);
    };
    const eventsEnabled = pipe(chartConfiguratorVM.state, observable.map(s => s.settings.chartCore.components.events.visible), distinctUntilChanged(), observable.map(eventsEnabled => (eventsEnabled ? 24 : 0)));
    const marginBottom = combineLatest([
        chart.canvasBoundsContainer.observeBoundsChanged(CanvasElement.CANVAS),
        chart.canvasBoundsContainer.observeBoundsChanged(CanvasElement.ALL_PANES),
        eventsEnabled,
    ]).pipe(map(([canvasBounds, chartBounds, eventsGap]) => floor(canvasBounds.height - chartBounds.height + 10) + eventsGap), distinctUntilChanged());
    const observeBounds$ = pipe(chart.canvasBoundsContainer.observeBoundsChanged(CanvasElement.CANVAS), observable.map(bounds => ({ ...bounds })));
    const effects = merge(xScaleChangedEffect);
    const vm = callTracerProxy('chartZoomingToolViewModel', {
        zoomIn,
        zoomOut,
        buttonsDisabled,
        marginBottom,
        observeBounds$,
    });
    return newSink(vm, effects);
});
const buttonsStateEq = struct({
    zoomIn: eqStrict,
    zoomOut: eqStrict,
});
