import { nonEmptyArray, option } from 'fp-ts';
import { observable } from 'fp-ts-rxjs';
import { pipe } from 'fp-ts/function';
import { merge } from 'rxjs';
import { distinctUntilChanged, finalize, tap } from 'rxjs/operators';
import { context } from '../../context/context2';
import { newSink } from '../../context/sink2';
import { callTracerProxy } from '../../utils/debug/call-tracer';
import { createPropertyAdapter } from '../../utils/property.utils';
import { timestampRangeEq } from '../model/timeframe.model';
import { crossToolEq } from './cross-tool.vm';
export const DEFAULT_TIMESTAMP_RANGE = [0, 0];
export const DEFAULT_OFFSETS = {
    visible: true,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
};
export const createMultiChartViewModel = context.of((initial, initialSelectedChartId) => {
    const [setcharts, charts] = createPropertyAdapter([]);
    const [updateState, state] = createPropertyAdapter(initial);
    const [setTimestampRange, timestampRange] = createPropertyAdapter(DEFAULT_TIMESTAMP_RANGE);
    const [setTimeUnits, timeUnits] = createPropertyAdapter(DEFAULT_TIMESTAMP_RANGE);
    const [setSelectedChartId, selectedChartId] = createPropertyAdapter(initialSelectedChartId);
    const [setHoveredChartId, hoveredChartId] = createPropertyAdapter(initialSelectedChartId);
    // this property is here (not in chart-layers) because every chart has it's own chart-layers VM,
    // we need to sync popover state between them
    const [setChartLayersPopoverOpened, chartLayersPopoverOpened] = createPropertyAdapter(false);
    const selectedChartIdChangedSubscribers = new Set();
    //#region selected chart id
    const onSelectedChartIdChanged = (cb) => {
        selectedChartIdChangedSubscribers.add(cb);
        return () => selectedChartIdChangedSubscribers.delete(cb);
    };
    const selectedChartEffect = pipe(charts, observable.chain(instances => merge(instances.map(chart => chart.canvasInputListener.observeMouseDown().pipe(observable.map(() => chart.id))))), observable.flatten, distinctUntilChanged(), tap(setSelectedChartId));
    const notifySelectedChartIdChangedEffect = pipe(selectedChartId, tap(id => selectedChartIdChangedSubscribers.forEach(cb => cb(id))), finalize(() => selectedChartIdChangedSubscribers.clear()));
    //#endregion
    //#region multichart layout
    const setLayout = (layout) => {
        updateState({
            ...state.getValue(),
            layout,
            maximizedChartId: option.none,
        });
    };
    //#endregion
    //#region chart type
    const setChartType = (lastChartType) => {
        updateState({
            ...state.getValue(),
            lastChartType,
        });
    };
    const setChartTypeSync = (value) => {
        updateState({
            ...state.getValue(),
            isChartTypeSyncEnabled: value,
        });
    };
    //#endregion
    //#region instrument
    const setInstrument = (instrument) => {
        updateState({
            ...state.getValue(),
            lastInstrument: instrument,
        });
    };
    const setInstrumentSync = (value) => {
        updateState({
            ...state.getValue(),
            isInstrumentSyncEnabled: value,
        });
    };
    //#endregion
    //#region timezone
    const setTimezone = (timezone) => {
        updateState({
            ...state.getValue(),
            lastTimezone: timezone,
        });
    };
    const setTimezoneSync = (value) => {
        updateState({
            ...state.getValue(),
            isTimezoneSyncEnabled: value,
        });
    };
    //#endregion
    //#region aggregation period type
    const setAggregationPeriodType = (type) => {
        updateState({
            ...state.getValue(),
            lastAggregationPeriodType: type,
        });
    };
    const setAggregationPeriodTypeSync = (value) => {
        updateState({
            ...state.getValue(),
            isAggregationPeriodTypeSyncEnabled: value,
        });
    };
    //#endregion
    //#region cross tool
    const [setCrossTool, crosshair] = createPropertyAdapter(option.none);
    const [setCrosshairSettings, crosshairSettings] = createPropertyAdapter({
        crosshairType: initial.charts[0].chartSettings.chartCore.components.crossTool.type,
    });
    const updateCrosshair = (newCrossTool) => {
        if (!crossToolEq.equals(newCrossTool, crosshair.getValue())) {
            setCrossTool(newCrossTool);
        }
    };
    const setCrosshairSync = (value) => {
        updateState({
            ...state.getValue(),
            isCrosshairSyncEnabled: value,
        });
    };
    //#endregion
    const updateTimestampRange = (newTimeFrame) => {
        if (!timestampRangeEq.equals(newTimeFrame, timestampRange.getValue())) {
            setTimestampRange(newTimeFrame);
        }
    };
    const updateTimeUnits = (newTimeUnits) => {
        if (!timestampRangeEq.equals(newTimeUnits, timeUnits.getValue())) {
            setTimeUnits(newTimeUnits);
        }
    };
    const setOffsets = (offsets) => {
        updateState({
            ...state.getValue(),
            offsets,
        });
    };
    //#region general settings
    const setGeneralSettings = (settings) => {
        updateState({
            ...state.getValue(),
            lastGeneralSettings: settings,
        });
    };
    const setGeneralSettingsSync = (value) => {
        const chart = getSelectedChartInfo();
        updateState({
            ...state.getValue(),
            lastGeneralSettings: chart.chartSettings,
            isGeneralSettingsSyncEnabled: value,
        });
    };
    //#endregion
    const setStudies = (studies) => {
        const updatedCharts = state.getValue().charts.map(c => ({
            ...c,
            studies,
        }));
        setCharts([updatedCharts[0], updatedCharts[1], updatedCharts[2], updatedCharts[3]]);
        updateState({
            ...state.getValue(),
            lastStudies: studies,
        });
    };
    const setStudiesSync = (value) => {
        const chart = getSelectedChartInfo();
        updateState({
            ...state.getValue(),
            isStudiesSyncEnabled: value,
            lastStudies: chart.studies,
        });
    };
    //#region chart instances configs
    const setCharts = (value) => {
        updateState({
            ...state.getValue(),
            charts: value,
        });
    };
    //#region maximized chart
    const maximizeChart = (chartId) => {
        updateState({
            ...state.getValue(),
            maximizedChartId: chartId,
        });
    };
    //#endregion
    //#region local chart
    const getChartInfo = (chartId) => state.getValue().charts.find(chart => chart.id === chartId) ?? state.getValue().charts[0];
    const getSelectedChartInfo = () => getChartInfo(selectedChartId.getValue());
    const getAllCharts = () => state.getValue().charts;
    // TODO this state is used only by layout VM, it's a lifted copy of each chart's local state
    // TODO either destructure the state or move 'charts' state to layoutVM
    const updateLocalChartInfo = (chartId, update) => pipe(state.getValue().charts, nonEmptyArray.map(chartInfo => {
        if (chartInfo.id === chartId) {
            return {
                ...chartInfo,
                ...update,
            };
        }
        return chartInfo;
    }), setCharts);
    //#endregion
    const getLayout = () => pipe(state.getValue(), ({ layout }) => layout.match(/(?<rows>\d)x(?<columns>\d)/), match => [parseInt(match?.groups?.rows ?? '1', 10), parseInt(match?.groups?.columns ?? '1', 10)]);
    //#region drawing mode
    const setDrawingMode = (enabled) => {
        updateState({
            ...state.getValue(),
            drawingMode: enabled,
        });
    };
    // TODO fix
    const syncChartDrawingModeTochartEffect = pipe(state, observable.map(s => s.drawingMode), tap(drawingModeEnabled => charts.getValue().map(chart => chart.drawings.setDrawingMode(drawingModeEnabled))));
    //#endregion
    //#region magnet mode
    const setMagnetMode = (enabled) => {
        updateState({
            ...state.getValue(),
            magnetMode: enabled,
        });
    };
    const syncChartMagnetModeTochartEffect = pipe(state, observable.map(s => s.magnetMode), tap(magnetModeEnabled => charts.getValue().map(chart => chart.drawings.setMagnetMode(magnetModeEnabled))));
    //#endregion
    //#region theme
    const setTheme = (theme) => {
        updateState({
            ...state.getValue(),
            theme,
        });
    };
    //#endregion
    //#region layout
    // if selected chart is no longer available after layout change (for example, 2x2 => 2x1 and the third chart is selected) then select the first one
    const setSelectedChartIfLayoutChangedEffect = pipe(state, observable.map(state => state.layout), tap(l => {
        if (parseInt(selectedChartId.getValue(), 10) >= getChartsAmount(l)) {
            setSelectedChartId('0');
        }
    }));
    //#endregion
    const effects = merge(selectedChartEffect, notifySelectedChartIdChangedEffect, syncChartDrawingModeTochartEffect, syncChartMagnetModeTochartEffect, setSelectedChartIfLayoutChangedEffect);
    return newSink(callTracerProxy('multiChartViewModel', {
        state,
        hoveredChartId,
        setHoveredChartId,
        crosshair,
        setCrosshairSync,
        setCrosshairSettings,
        crosshairSettings,
        updateCrosshair,
        updateTimeUnits,
        setState: updateState,
        setLayout,
        setChartTypeSync,
        setInstrumentSync,
        setChartType,
        setInstrument,
        setTimezone,
        setTimezoneSync,
        setAggregationPeriodType,
        setAggregationPeriodTypeSync,
        setGeneralSettings,
        setGeneralSettingsSync,
        setStudies,
        setStudiesSync,
        maximizeChart,
        getChartInfo,
        getSelectedChartInfo,
        getAllCharts,
        getLayout,
        updateLocalChartInfo,
        updateTimestampRange,
        selectedChartId,
        setSelectedChartId,
        onSelectedChartIdChanged,
        setOffsets,
        setDrawingMode,
        setMagnetMode,
        timestampRange,
        timeUnits,
        charts,
        setcharts,
        chartLayersPopoverOpened,
        setChartLayersPopoverOpened,
        setTheme,
    }), effects);
});
export const getChartsAmount = (layout) => {
    switch (layout) {
        case '1x1':
            return 1;
        case '1x2':
        case '2x1':
            return 2;
        case '1x3':
        case '3x1':
            return 3;
        case '2x2':
            return 4;
    }
};
