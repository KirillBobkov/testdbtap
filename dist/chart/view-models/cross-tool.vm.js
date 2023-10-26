import { eq, number, option, string, tuple } from 'fp-ts';
import { observable } from 'fp-ts-rxjs';
import { eqStrict } from 'fp-ts/Eq';
import { pipe } from 'fp-ts/function';
import { combineLatest, distinctUntilChanged, filter, merge } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { context } from '../../context/context2';
import { newSink } from '../../context/sink2';
import { createPropertyAdapter } from '../../utils/property.utils';
import { chartSettingsLens } from './chart-configurator.view-model';
export const createCrosshairVM = context.combine(context.key()('chart'), context.key()('multiChartViewModel'), context.key()('chartConfiguratorViewModel'), context.key()('chartId'), (chart, multiChartViewModel, chartConfiguratorVM, chartId) => {
    const [setCrossTool, crossTool] = createPropertyAdapter(option.none);
    //#region effects
    const updateCrossToolEffect = pipe(chart.crosshair.observeCrossToolChanged(), observable.filter(_ => multiChartViewModel.hoveredChartId.getValue() === chartId), tap(crossTool => {
        pipe(option.fromNullable(crossTool), option.map(crossTool => {
            const pane = chart.paneManager.panes[crossTool.paneId];
            const candle = chart.chartModel.candleFromX(crossTool.x, true);
            // visualCandle cannot be undefined because crosstool works only for visual candles
            // eslint-disable-next-line no-restricted-syntax
            return {
                timestamp: candle.timestamp,
                price: pane?.regularValueFromY(crossTool.y),
                paneId: chart.crossEventProducer.crossSubject.getValue()?.[2] ?? '',
            };
        }), setCrossTool);
    }));
    const updateMultiChartCrossToolEffect = pipe(crossTool, observable.filter(_ => multiChartViewModel.hoveredChartId.getValue() === chartId), distinctUntilChanged(crossToolEq.equals), tap(crossTool => {
        multiChartViewModel.updateCrosshair(crossTool);
    }));
    const syncCrossToolFromMultiChartEffect = pipe(combineLatest([
        multiChartViewModel.crosshair,
        multiChartViewModel.state.pipe(map(state => state.isCrosshairSyncEnabled), distinctUntilChanged()),
    ]), observable.filter(([_, isCrossToolSyncEnabled]) => isCrossToolSyncEnabled &&
        // we don't want to apply updates from the same chart
        multiChartViewModel.hoveredChartId.getValue() !== chartId), observable.map(tuple.fst), distinctUntilChanged(crossToolEq.equals), tap(crossTool => {
        setCrossTool(crossTool);
        pipe(crossTool, option.fold(() => chart.crossEventProducer.crossSubject.next(null), crossTool => {
            const pane = chart.paneManager.panes[crossTool.paneId];
            let visualCandle = chart.chartModel.candleFromTimestamp(crossTool.timestamp, true);
            // get right and left candles to check the closest
            const leftVisualCandle = chart.chartModel.getVisualCandle((visualCandle.candle.idx || 1) - 1);
            const rightVisualCandle = chart.chartModel.getVisualCandle((visualCandle.candle.idx || 0) + 1);
            // calculate timestamps
            const currentTimestampDiff = Math.abs(crossTool.timestamp - visualCandle.candle.timestamp);
            const leftTimestampDiff = Math.abs(crossTool.timestamp - (leftVisualCandle?.candle.timestamp || 0));
            const rightTimestampDiff = Math.abs(crossTool.timestamp - (rightVisualCandle?.candle.timestamp || 0));
            if (leftVisualCandle && leftTimestampDiff < currentTimestampDiff) {
                visualCandle = leftVisualCandle;
            }
            if (rightVisualCandle && rightTimestampDiff < currentTimestampDiff) {
                visualCandle = rightVisualCandle;
            }
            chart.crossEventProducer.crossSubject.next([
                pane?.scale.toX(visualCandle.centerUnit),
                pane?.toY(crossTool.price ?? Number.POSITIVE_INFINITY),
                crossTool.paneId,
            ]);
            // we need the code below to complete this REQ: https://jira.in.devexperts.com/browse/DXCHARTBL-268
            // The snap mode setting of the crosshair from the chart settings
            // should NOT be synced as a part of this new check box, which means each chart
            // can have a different snapping setting, but the crosshair and the price/time labels
            // still show the price/time scales on all charts showing the same values as
            // on the currently active (selected) chart regardless of the snap mode in all others charts
            const hover = chart.hoverProducer.hover;
            // we override current crosshair snap with none value to complete the req
            hover && chart.crossToolComponent.model.updateHover(hover, 'none');
        }));
    }));
    const updateCrosshairSettingsEffect = pipe(combineLatest([
        chartConfiguratorVM.state.pipe(map(state => state.settings.chartCore.components.crossTool.type), distinctUntilChanged()),
        multiChartViewModel.state.pipe(map(state => state.isCrosshairSyncEnabled), distinctUntilChanged()),
    ]), filter(() => multiChartViewModel.selectedChartId.getValue() === chartId), tap(([crosshairType]) => {
        multiChartViewModel.setCrosshairSettings({ crosshairType });
    }));
    const crossTypeLenses = chartSettingsLens(['chartCore', 'components', 'crossTool', 'type']);
    const syncCrossToolSettingsFromMultichartEffect = pipe(combineLatest([
        multiChartViewModel.crosshairSettings,
        multiChartViewModel.state.pipe(map(state => state.isCrosshairSyncEnabled), distinctUntilChanged()),
    ]), distinctUntilChanged(), tap(([{ crosshairType }, isCrosshairSyncEnabled]) => {
        if (crosshairType !== 'cross-and-labels') {
            chartConfiguratorVM.setSettingsByPath(crossTypeLenses, isCrosshairSyncEnabled ? 'just-labels' : 'none');
        }
        else {
            chartConfiguratorVM.setSettingsByPath(crossTypeLenses, crosshairType);
        }
    }));
    //#endregion
    const effects = merge(updateCrosshairSettingsEffect, syncCrossToolSettingsFromMultichartEffect, updateCrossToolEffect, updateMultiChartCrossToolEffect, syncCrossToolFromMultiChartEffect);
    return newSink({ crossTool }, effects);
});
export const crossToolEq = option.getEq(eq.struct({ timestamp: number.Eq, price: eqStrict, paneId: string.Eq }));
