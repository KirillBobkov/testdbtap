import { CanvasElement } from '@devexperts/dxcharts-lite/dist/chart/canvas/canvas-bounds-container';
import { cloneUnsafe } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
import { array, option } from 'fp-ts';
import { observable } from 'fp-ts-rxjs';
import { constFalse } from 'fp-ts/function';
import { Lens } from 'monocle-ts';
import { combineLatest, finalize, identity, merge } from 'rxjs';
import { distinctUntilChanged, filter, map, share, tap, pairwise } from 'rxjs/operators';
import { context } from '../../context/context2';
import { newSink } from '../../context/sink2';
import { callTracerProxy } from '../../utils/debug/call-tracer';
import { filterOption } from '../../utils/monad-functions';
import { createPropertyAdapter } from '../../utils/property.utils';
import { getReadableString, periodToMinutes } from '../model/aggregation.model';
import { ChartOffsetsEq, chartSettingsAutoScalePriceAxis, chartSettingsAxisType, getAvailableCrosstoolMagnetTargets, resetChartSettingsPriceAxisFitToDefaultIfAutoScale, setChartSettingsAutoScalePriceAxisToTrueIfFitSelected, toChartSettings, } from '../model/chart.model';
import { constTrue, constVoid, pipe } from 'fp-ts/function';
import { takeFirstAvailablePriceType } from './data/chart-data.view-model';
import { isForex, isStock } from '../model/instrument.model';
export const chartSettingsLens = Lens.fromPath();
const lensIsOpened = Lens.fromPath()(['isOpened']);
const lensVolumes = Lens.fromPath()(['chartCore', 'components', 'volumes']);
const lensVolumesShowSeparately = lensVolumes.composeLens(Lens.fromProp()('showSeparately'));
const lensVolumesVisible = lensVolumes.composeLens(Lens.fromProp()('visible'));
const lensOffsets = Lens.fromPath()(['chartCore', 'components', 'offsets']);
const lensOffsetsVisible = lensOffsets.composeLens(Lens.fromProp()('visible'));
const lensSessionBreaks = Lens.fromPath()(['chartReact', 'sessionBreaks', 'visible']);
const lensMagnetMode = Lens.fromPath()(['chartCore', 'components', 'drawings', 'magnet']);
const lensCrossToolMangetTarget = Lens.fromPath()([
    'chartCore',
    'components',
    'crossTool',
    'magnetTarget',
]);
const lensRtlMode = Lens.fromPath()(['chartCore', 'rtl']);
const lensExtendedHours = Lens.fromPath()(['chartReact', 'extendedHours', 'visible']);
export const lensLockPriceToBarRatio = Lens.fromPath()(['chartCore', 'scale', 'lockPriceToBarRatio']);
const lensAggregationTimeframeChangeStrategy = Lens.fromPath()([
    'chartReact',
    'timeframeChangeStrategy',
    'aggregations',
]);
const lensInstrumentTimeframeChangeStrategy = Lens.fromPath()([
    'chartReact',
    'timeframeChangeStrategy',
    'instrument',
]);
const lensApplyPeriodUponCreation = Lens.fromPath()([
    'chartReact',
    'aggregationPeriod',
    'applyUponCreation',
]);
export const createChartConfiguratorViewModel = context.combine(context.key()('chart'), context.key()('multiChartViewModel'), context.key()('chartDataViewModel'), context.key()('chartTypeViewModel'), context.key()('aggregationPeriodViewModel'), context.key()('chartConfig'), context.key()('themeViewModel'), context.key()('actionsHistoryVM'), context.key()('notificationVM'), context.key()('localization'), context.key()('chartReactConfig'), context.key()('initialChartReactSettings'), context.key()('initialChartSettings'), context.key()('chartId'), (chart, multiChartViewModel, chartDataViewModel, chartTypeViewModel, aggregationPeriodViewModel, chartConfig, themeViewModel, actionsHistoryVM, notificationVM, localization, chartReactConfig, initialChartReactSettings, initialChartSettings, chartId) => {
    //#region state
    const defaultChartSettingsConfig = toChartSettings(chartConfig, initialChartReactSettings);
    const initialMultiChartViewModelState = multiChartViewModel.state.getValue();
    const initialSettings = getInitialSettings(initialMultiChartViewModelState, initialChartSettings);
    const [setState, state] = createPropertyAdapter({
        activeTab: 0,
        isOpened: false,
        settings: cloneUnsafe(initialSettings),
    });
    const [setSwitchAxisButtonsTopMargin, switchAxisButtonsTopMargin] = createPropertyAdapter(0);
    const settingsChangedSubscribers = new Set();
    const commit = (settings) => {
        if (multiChartViewModel.state.getValue().isGeneralSettingsSyncEnabled) {
            multiChartViewModel.setGeneralSettings(settings);
        }
        else {
            setState({
                ...state.getValue(),
                settings: cloneUnsafe(settings),
            });
        }
    };
    //#endregion
    const onChartSettingsChanged = (cb) => {
        settingsChangedSubscribers.add(cb);
        return () => settingsChangedSubscribers.delete(cb);
    };
    const setConfig = (settings, undoable = true) => {
        const oldSettings = state.getValue().settings;
        const updatedSettings = pipe(settings, setChartSettingsAutoScalePriceAxisToTrueIfFitSelected(oldSettings), resetChartSettingsPriceAxisFitToDefaultIfAutoScale(oldSettings), resetLockPriceToBarToDefaultIfAutoScale, resetCandlesAlignmentToSessionsIfExtendedHours);
        if (undoable) {
            const action = (settings) => {
                commit(settings);
            };
            const redo = () => action(updatedSettings);
            const undo = () => action(oldSettings);
            actionsHistoryVM.pushAction({
                type: 'settings_change',
                redo,
                undo,
            });
        }
        else {
            commit(updatedSettings);
        }
    };
    const setSettingsByPath = (lens, value) => {
        const stateValue = state.getValue();
        //@ts-ignore
        setConfig(lens.set(value)(stateValue.settings));
    };
    const setTradingBoundaries = ({ min, max }) => {
        if (min !== undefined && !isNaN(min)) {
            setSettingsByPath(chartSettingsLens(['chartReact', 'trading', 'bounds', 'min']), min);
        }
        if (max !== undefined && !isNaN(max)) {
            setSettingsByPath(chartSettingsLens(['chartReact', 'trading', 'bounds', 'max']), max);
        }
    };
    const setActiveTab = (tab) => setState({ ...state.getValue(), activeTab: tab });
    const onOpen = () => setState(lensIsOpened.set(true)(state.getValue()));
    const onClose = () => setState(lensIsOpened.set(false)(state.getValue()));
    const onToggle = (isOpened) => setState(lensIsOpened.set(isOpened)(state.getValue()));
    //#region session breaks
    const isSessionBreaksDisabled = (period) => sessionBreaksDisabledPredicate(period) ||
        pipe(chartDataViewModel.instrument.getValue(), option.map(isForex), option.getOrElse(constFalse));
    const [setSessionBreaksDisabled, sessionBreaksDisabled] = createPropertyAdapter(isSessionBreaksDisabled(aggregationPeriodViewModel.selectedPeriod.getValue()));
    const sessionBreaksDisabledOnPeriodOrInstrumentEffect = combineLatest([
        aggregationPeriodViewModel.selectedPeriod,
        chartDataViewModel.instrument.pipe(filterOption()),
    ]).pipe(tap(([period]) => {
        const disabled = isSessionBreaksDisabled(period);
        setSessionBreaksDisabled(disabled);
    }));
    //#endregion
    //#region trading
    const isTradingAllowed = (instrumentIsTradable) => {
        return instrumentIsTradable !== false;
    };
    const [setTradingAllowed, tradingAllowed] = createPropertyAdapter(pipe(chartDataViewModel.instrument.getValue(), option.map(instrument => isTradingAllowed(instrument.tradable)), option.getOrElse(constTrue)));
    const isTradingAllowedOnInstrumentChangeEffect = pipe(chartDataViewModel.instrument, filterOption(), observable.map(i => i.tradable), distinctUntilChanged(), tap(tradable => setTradingAllowed(isTradingAllowed(tradable))));
    //#endregion
    const setPriceType = (priceType, undoable = true) => setConfig(chartSettingsLens(['chartReact', 'candlesData', 'price']).set(priceType)(state.getValue().settings), undoable);
    const setCandlesAlignment = (alignment) => setConfig(chartSettingsLens(['chartReact', 'candlesData', 'candleAlignment']).set(alignment)(state.getValue().settings));
    const onRestoreDefaultConfigTab = (defaultTabConfig) => setConfig(defaultTabConfig);
    const onRestoreDefaultConfig = () => {
        const defaultSettings = {
            ...state.getValue().settings,
            ...defaultChartSettingsConfig,
        };
        setConfig(defaultSettings);
    };
    const togglePaddings = (value) => {
        const current = state.getValue();
        setConfig(lensOffsetsVisible.set(value)(current.settings));
    };
    const toggleVolumesMode = (showSeparately) => {
        const current = state.getValue();
        setConfig(lensVolumesShowSeparately.set(showSeparately)(current.settings));
    };
    const toggleVolumesVisible = (visible) => {
        const current = state.getValue();
        setConfig(lensVolumesVisible.set(visible)(current.settings));
    };
    const setMagnetMode = (isMagnetModeEnabled, undoable) => {
        const param = isMagnetModeEnabled ? 10 : 0;
        const current = state.getValue();
        setConfig(lensMagnetMode.set(param)(current.settings), undoable);
    };
    const setCrossToolMagnetTarget = (magnetTarget) => {
        const current = state.getValue();
        setConfig(lensCrossToolMangetTarget.set(magnetTarget)(current.settings));
    };
    const setRTLMode = (value) => {
        const current = state.getValue();
        setConfig(lensRtlMode.set(value)(current.settings));
    };
    const toggleSessionBreaks = (active) => {
        const current = state.getValue();
        setConfig(lensSessionBreaks.set(active)(current.settings));
    };
    const toggleExtendedHours = (active) => {
        const current = state.getValue();
        setConfig(lensExtendedHours.set(active)(current.settings));
    };
    const setAggregationTimeframeChangeStrategy = (strategy) => {
        const current = state.getValue();
        setConfig(lensAggregationTimeframeChangeStrategy.set(strategy)(current.settings));
    };
    const setInstrumentTimeframeChangeStrategy = (strategy) => {
        const current = state.getValue();
        setConfig(lensInstrumentTimeframeChangeStrategy.set(strategy)(current.settings));
    };
    const setApplyPeriodUponCreation = (apply) => {
        const current = state.getValue();
        setConfig(lensApplyPeriodUponCreation.set(apply)(current.settings));
    };
    const setVolumesEnabled = (enable) => {
        toggleVolumesVisible(enable);
        enable ? chart.volumes?.enable() : chart.volumes?.disable();
    };
    // #region effects
    const syncSettingsFromMultiChartEffect = multiChartViewModel.state.pipe(observable.filter(multiState => multiState.isGeneralSettingsSyncEnabled &&
        multiState.lastGeneralSettings !== state.getValue().settings), observable.map(multiState => multiState.lastGeneralSettings), tap(settings => setState({
        ...state.getValue(),
        settings,
    })));
    const isPriceTypeAvailable = (priceType) => {
        if (!chartReactConfig.priceTypes.includes(priceType)) {
            setPriceType(takeFirstAvailablePriceType(chartReactConfig['priceTypes']), false);
            return false;
        }
        return true;
    };
    //#region effects
    const syncLocalChartInfoFromMultiChartEffect = multiChartViewModel.state.pipe(observable.filter(multiState => !multiState.isGeneralSettingsSyncEnabled), observable.map(() => multiChartViewModel.getChartInfo(chartId).chartSettings), observable.filter(settings => settings !== state.getValue().settings), tap(settings => {
        setState({
            ...state.getValue(),
            settings,
        });
        const compareInstruments = Object.values(chartDataViewModel.compareInstruments.getValue());
        isPriceTypeAvailable('mark') && hasForex(compareInstruments) && setPriceType('mark');
    }));
    const chartScaleChangedEffect = pipe(chart.scale.changed, map(() => chart.scale.state.auto), distinctUntilChanged(), tap(isAuto => pipe(state.getValue().settings, chartSettingsAutoScalePriceAxis.set(isAuto), settings => setConfig(settings, false))));
    const axisTypeChangedEffect = pipe(chart.yAxis.axisTypeSetSubject.asObservable(), tap(axisType => pipe(state.getValue().settings, chartSettingsAxisType.set(axisType), settings => setConfig(settings, false))));
    const syncLocalSettingsToMultiChartLayoutEffect = pipe(state, observable.map(s => s.settings), distinctUntilChanged(), tap(chartSettings => multiChartViewModel.updateLocalChartInfo(chartId, { chartSettings })));
    const syncPaddingTochartEffect = pipe(state, observable.map(s => s.settings.chartCore.components.offsets), distinctUntilChanged(ChartOffsetsEq.equals), tap(value => chart.data.setOffsets(value)));
    const syncVolumesModeTochartEffect = pipe(state, observable.map(s => s.settings.chartCore.components.volumes.showSeparately), distinctUntilChanged(), tap(value => chart.showSeparateVolumes(value)));
    const syncVolumesVisibleTochartEffect = pipe(state, observable.map(s => s.settings.chartCore.components.volumes.visible), distinctUntilChanged(), tap(value => chart.volumes?.setVisible(value)));
    const syncCrossToolMagnetModeTochartEffect = pipe(state, observable.map(s => s.settings.chartCore.components.crossTool.magnetTarget), distinctUntilChanged(), tap(value => chart.crosshair.setMagnetTarget(value)));
    /**
     * Effect is used to set the crosstool magnet target to `CLOSE`,
     * if selected magnet target option is not exist for the selected chart type
     * @see
     * `Candle` chart type has cross tool magnet target type `OHLC`,
     * but when we select the `Scatterplot` chart type, it doesn't have that kind of option,
     * so we should select the default option, which is `CLOSE`.
     */
    const syncCrossToolMagnetModeOnChartTypeChangeEffect = pipe(chartTypeViewModel.type, tap(chartType => {
        const currentMagnetTarget = state.getValue().settings.chartCore.components.crossTool.magnetTarget;
        pipe(getAvailableCrosstoolMagnetTargets(chartType), array.findFirst(mt => mt === currentMagnetTarget), option.fold(() => setCrossToolMagnetTarget('C'), constVoid));
    }));
    const syncDrawingsMagnetModeTochartEffect = pipe(state, observable.map(s => s.settings.chartCore.components.drawings.magnet), distinctUntilChanged(), tap(value => chart.drawings.setMagnetMode(value !== 0)));
    const syncColorsToChartEffect = pipe(state, observable.map(s => s.settings.chartCore.themes), distinctUntilChanged(), tap(newColors => {
        const currentTheme = themeViewModel.activeTheme.getValue();
        chart.setColors(newColors[currentTheme]);
    }));
    const syncCrossToolVisibleTochartEffect = pipe(state, observable.map(s => s.settings.chartCore.components.crossTool.type), distinctUntilChanged(), tap(type => {
        chart.crosshair.setType(type);
    }));
    const syncShowCandleBordersTochartEffect = pipe(state, observable.map(s => s.settings.chartCore.components.chart.showCandlesBorder), distinctUntilChanged(), tap(value => chart.setShowCandleBorders(value)));
    const syncHighLowVisibleTochartEffect = pipe(state, observable.map(s => s.settings.chartCore.components.highLow.visible), distinctUntilChanged(), tap(value => chart.setHighLowVisible(value)));
    const syncGridVerticalTochartEffect = pipe(state, observable.map(s => s.settings.chartCore.components.grid.vertical), distinctUntilChanged(), tap(value => {
        chart.setGridVertical(value);
    }));
    const syncGridHorizontalTochartEffect = pipe(state, observable.map(s => s.settings.chartCore.components.grid.horizontal), distinctUntilChanged(), tap(value => {
        chart.setGridHorizontal(value);
    }));
    const syncWaterMarkVisibleTochartEffect = pipe(state, observable.map(s => s.settings.chartCore.components.waterMark.visible), distinctUntilChanged(), 
    // do not allow to change watermark visability until instrument and candles appear
    observable.filter(() => chart.chartModel.mainCandleSeries.dataPoints.length > 0 &&
        option.isSome(chartDataViewModel.instrument.getValue())), tap(value => {
        chart.watermark.setWaterMarkVisible(value);
    }));
    const syncWatermarkDataTochartWatermarkEffect = pipe(chartDataViewModel.initialHistoryData, 
    // set watermark data only if instrument loaded and quantity of candles > 0
    observable.filter(historyData => pipe(historyData, array.some(chartData => pipe(chartDataViewModel.instrument.getValue(), option.fold(() => true, i => chartData.instrument === i.symbol && chartData.data.length !== 0))))), tap(() => {
        const period = getReadableString(aggregationPeriodViewModel.selectedPeriod.getValue(), localization.aggregationPeriod);
        const visible = state.getValue().settings.chartCore.components.waterMark.visible;
        const instrument = pipe(chartDataViewModel.instrument.getValue(), option.toUndefined);
        if (instrument) {
            chart.watermark.setWaterMarkData({
                firstRow: instrument.symbol,
                secondRow: instrument.description,
                thirdRow: period,
            });
            chart.watermark.setWaterMarkVisible(visible);
        }
    }));
    const syncShowWicksChartEffect = pipe(state, observable.map(s => s.settings.chartCore.components.chart.showWicks), distinctUntilChanged(), tap(value => chart.data.setShowWicks(value)));
    const syncShowClosePriceChartEffect = pipe(state, observable.map(s => s.settings.chartCore.components.chart.equivolume.showClosePrice), distinctUntilChanged(), tap(value => chart.equivolume.setShowClosePrice(value)));
    const syncRTLModeTochartEffect = pipe(state, observable.map(s => s.settings.chartCore.rtl), distinctUntilChanged(), tap(value => chart.setRtl(value)));
    const xAxisBoundsChangedEffect = pipe(chart.bounds.observeBoundsChanged(CanvasElement.X_AXIS), tap(bounds => setSwitchAxisButtonsTopMargin(bounds.y)));
    const candlesAlignmentToSessionsChangedEffect = pipe(state, observable.map(s => s.settings.chartReact.candlesData.candleAlignment), distinctUntilChanged(), tap(val => {
        chartDataViewModel.changeCandlesAlignment(val);
    }));
    const priceTypeChangedEffect = pipe(state, observable.map(s => s.settings.chartReact.candlesData.price), distinctUntilChanged(), pairwise(), tap(([prevType, nextType]) => {
        notificationVM.sendNotification(`${localization.notifications.notificationDataTypeChanged}: \n
						${localization.settingsPopup.priceTypes[prevType]} → ${localization.settingsPopup.priceTypes[nextType]}`);
        chartDataViewModel.changePriceType(nextType);
    }));
    const switchPriceOnForexInstrumentEffect = pipe(chartDataViewModel.instrument, observable.filterMap(identity), filter(isForex), filter(() => state.getValue().settings.chartReact.candlesData.price === 'last'), tap(() => {
        isPriceTypeAvailable('mark') && setPriceType('mark', false);
    }));
    const switchPriceOnStockInstrumentEffect = pipe(chartDataViewModel.instrument, observable.filterMap(identity), filter(isStock), filter(() => state.getValue().settings.chartReact.candlesData.price !== 'last'), tap(() => {
        const compareInstruments = Object.values(chartDataViewModel.compareInstruments.getValue());
        if (isPriceTypeAvailable('mark') && hasForex(compareInstruments)) {
            setPriceType('mark', false);
            return;
        }
        if (isPriceTypeAvailable('last')) {
            setPriceType('last', false);
        }
    }));
    const switchPriceOnForexIfCompareHasForexEffect = pipe(chartDataViewModel.compareInstruments, tap(() => {
        const compareInstruments = Object.values(chartDataViewModel.compareInstruments.getValue());
        isPriceTypeAvailable('mark') && hasForex(compareInstruments) && setPriceType('mark', false);
    }));
    const notifySettingsChangedEffect = pipe(state, observable.map(state => state.settings), tap(settings => settingsChangedSubscribers.forEach(cb => cb(chartId, settings))), finalize(() => settingsChangedSubscribers.clear()));
    //#endregion
    const effects = pipe(merge(switchPriceOnForexIfCompareHasForexEffect, syncSettingsFromMultiChartEffect, syncPaddingTochartEffect, syncVolumesModeTochartEffect, syncVolumesVisibleTochartEffect, syncColorsToChartEffect, syncCrossToolVisibleTochartEffect, syncShowCandleBordersTochartEffect, syncLocalChartInfoFromMultiChartEffect, syncHighLowVisibleTochartEffect, syncGridVerticalTochartEffect, syncGridHorizontalTochartEffect, syncWaterMarkVisibleTochartEffect, chartScaleChangedEffect, axisTypeChangedEffect, syncRTLModeTochartEffect, syncLocalSettingsToMultiChartLayoutEffect, syncDrawingsMagnetModeTochartEffect, xAxisBoundsChangedEffect, sessionBreaksDisabledOnPeriodOrInstrumentEffect, syncCrossToolMagnetModeTochartEffect, isTradingAllowedOnInstrumentChangeEffect, syncShowWicksChartEffect, syncShowClosePriceChartEffect, candlesAlignmentToSessionsChangedEffect, priceTypeChangedEffect, switchPriceOnForexInstrumentEffect, switchPriceOnStockInstrumentEffect, syncWatermarkDataTochartWatermarkEffect, syncCrossToolMagnetModeOnChartTypeChangeEffect, notifySettingsChangedEffect), share());
    //#endregion effects
    //#region shortcuts to state fields
    const config$ = pipe(state, observable.map(s => s.settings), distinctUntilChanged());
    const isOpened$ = pipe(state, observable.map(s => s.isOpened), distinctUntilChanged());
    const activeTab$ = pipe(state, observable.map(s => s.activeTab), distinctUntilChanged());
    //#endregion
    const observeBounds$ = pipe(chart.bounds.observeBoundsChanged(CanvasElement.CANVAS), observable.map(bounds => ({ ...bounds })), distinctUntilChanged());
    return newSink(callTracerProxy('chartConfiguratorViewModel', {
        setVolumesEnabled,
        //#region state
        state,
        setConfig,
        //#endregion
        //#region shortcuts to state updates
        onTabActivate: setActiveTab,
        setAggregationTimeframeChangeStrategy,
        setInstrumentTimeframeChangeStrategy,
        setApplyPeriodUponCreation,
        toggleVolumesMode,
        toggleVolumesVisible,
        toggleSessionBreaks,
        toggleExtendedHours,
        onOpen,
        onRestoreDefaultConfig,
        onRestoreDefaultConfigTab,
        onClose,
        onToggle,
        togglePaddings,
        setRTLMode,
        setMagnetMode,
        setPriceType,
        setCandlesAlignment,
        onChartSettingsChanged,
        //#endregion
        //#region shortcuts to state fields
        defaultConfig: defaultChartSettingsConfig,
        config$,
        isOpened$,
        activeTab$,
        switchAxisButtonsTopMargin,
        sessionBreaksDisabled,
        tradingAllowed,
        //#endregion
        setSettingsByPath,
        observeBounds$,
        setTradingBoundaries,
        changeConfiguratorState: setState,
    }), effects);
});
const getInitialSettings = (state, defaultSettings) => state.isGeneralSettingsSyncEnabled ? state.lastGeneralSettings : defaultSettings;
/**
 * Disable session breaks if period is >= 1 day.
 * @param period
 * @doc-tags hardcoded-config
 */
function sessionBreaksDisabledPredicate(period) {
    return periodToMinutes(period) >= 1440;
}
function resetLockPriceToBarToDefaultIfAutoScale(newSettings) {
    const isAutoScale = chartSettingsAutoScalePriceAxis.get(newSettings);
    const lockPriceToBar = lensLockPriceToBarRatio.get(newSettings);
    if (isAutoScale && lockPriceToBar) {
        return lensLockPriceToBarRatio.set(false)(newSettings);
    }
    return newSettings;
}
function resetCandlesAlignmentToSessionsIfExtendedHours(newSettings) {
    const isExtendedHoursEnabled = newSettings.chartReact.extendedHours.visible;
    const isCandlesAlignmentEnabled = newSettings.chartReact.candlesData.candleAlignment === 'session_start';
    if (isExtendedHoursEnabled && isCandlesAlignmentEnabled) {
        return chartSettingsLens(['chartReact', 'candlesData', 'candleAlignment']).set('midnight')(newSettings);
    }
    return newSettings;
}
function hasForex(compareInstruments) {
    return compareInstruments.find(i => i.type === 'FOREX');
}
