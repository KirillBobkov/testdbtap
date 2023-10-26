import { CanvasElement, CHART_UUID } from '@devexperts/dxcharts-lite/dist/chart/canvas/canvas-bounds-container';
import { deepEqual } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
import { option, record } from 'fp-ts';
import { observable } from 'fp-ts-rxjs';
import { pipe } from 'fp-ts/function';
import { Lens } from 'monocle-ts';
import { merge, pairwise } from 'rxjs';
import { distinctUntilChanged, filter, map, skip, tap, withLatestFrom } from 'rxjs/operators';
import { context } from '../../../context/context2';
import { newSink } from '../../../context/sink2';
import { callTracerProxy } from '../../../utils/debug/call-tracer';
import { convertToProperty, createPropertyAdapter } from '../../../utils/property.utils';
import { chartSettingsAutoScalePriceAxis, chartSettingsPriceAxisFit, } from '../../model/chart.model';
import { lensLockPriceToBarRatio, } from '../chart-configurator.view-model';
const lensYAxisAlign = Lens.fromPath()(['chartCore', 'components', 'yAxis', 'align']);
const priceScaleInverseLens = Lens.fromPath()(['chartCore', 'scale', 'inverse']);
const lensYAxis = Lens.fromPath()(['chartCore', 'components', 'yAxis', 'type']);
const lensAutoScale = Lens.fromPath()(['chartCore', 'scale', 'auto']);
export const createYAxisConfiguratorViewModel = context.combine(context.key()('chartConfiguratorViewModel'), context.key()('actionsHistoryVM'), context.key()('chart'), context.key()('multiChartViewModel'), context.key()('chartDataViewModel'), context.key()('initialGeneralSettings'), context.key()('chartId'), context.key()('chartConfig'), (configVM, actionsHistoryVM, chart, multiChartViewModel, chartDataViewModel, initialGeneralSettings, chartId, chartConfig) => {
    const initialYAxisLabels = fromCoreChartSettingsToLocalLabelsConfig(initialGeneralSettings, chartConfig.components.yAxis.labels);
    const [setLabelsConfig, labelsConfig] = createPropertyAdapter(initialYAxisLabels);
    const yAxisWidth = convertToProperty(chart.canvasBoundsContainer.observeBoundsChanged(CanvasElement.PANE_UUID_Y_AXIS(CHART_UUID)).pipe(map(bounds => bounds.width), distinctUntilChanged()), 0);
    const chartWidth = convertToProperty(chart.canvasBoundsContainer.observeBoundsChanged(CanvasElement.PANE_UUID(CHART_UUID)).pipe(map(bounds => bounds.width), distinctUntilChanged()), 0);
    const yAxisAlign = convertToProperty(pipe(configVM.state, observable.map(s => s.settings.chartCore.components.yAxis.align)), 'right');
    const setAutoScale = (isAutoScaleEnabled) => {
        if (configVM.state.getValue().settings.chartCore.components.yAxis.type === 'percent') {
            return;
        }
        pipe(configVM.state.getValue().settings, chartSettingsAutoScalePriceAxis.set(isAutoScaleEnabled), s => configVM.setConfig(s), () => configVM.setConfig(lensAutoScale.set(isAutoScaleEnabled)(configVM.state.getValue().settings), false));
    };
    const setPriceAxisFitType = (type, active) => {
        const current = configVM.state.getValue();
        if (current.settings.chartCore.components.yAxis.type === 'percent') {
            return;
        }
        const priceAxisFit = getAxisFit(current, type, active);
        configVM.setConfig(chartSettingsPriceAxisFit.set(priceAxisFit)(current.settings));
    };
    const setAxisType = (type, undoable = true) => {
        const current = configVM.state.getValue();
        configVM.setConfig(lensYAxis.set(type)(current.settings), undoable);
    };
    const togglePercentAxis = () => {
        const { lockPriceToBarRatio } = configVM.state.getValue().settings.chartCore.scale;
        if (lockPriceToBarRatio) {
            return;
        }
        const currentType = configVM.state.getValue().settings.chartCore.components.yAxis.type;
        setAxisType(currentType === 'percent' ? 'regular' : 'percent');
    };
    const toggleLogAxis = () => {
        const { lockPriceToBarRatio } = configVM.state.getValue().settings.chartCore.scale;
        if (lockPriceToBarRatio) {
            return;
        }
        const currentType = configVM.state.getValue().settings.chartCore.components.yAxis.type;
        setAxisType(currentType === 'logarithmic' ? 'regular' : 'logarithmic');
    };
    const setPriceScaleInverse = (inverse) => {
        configVM.setConfig(priceScaleInverseLens.set(inverse)(configVM.state.getValue().settings));
    };
    const setLockPriceToBarRatio = (isLocked, undoable = true) => {
        if (isLocked) {
            setAxisType('regular');
            setAutoScale(false);
        }
        configVM.setConfig(lensLockPriceToBarRatio.set(isLocked)(configVM.state.getValue().settings), undoable);
    };
    const changeLabelMode = (type, mode) => {
        const current = labelsConfig.getValue();
        const newLabelsConfig = {
            ...current,
            labels: {
                ...current.labels,
                [type]: mode,
            },
        };
        commitLabelsConfig(current, newLabelsConfig);
    };
    const setYAxisAlign = (type) => {
        configVM.setConfig(lensYAxisAlign.set(type)(configVM.state.getValue().settings));
    };
    const setDescription = (descriptions) => {
        const current = labelsConfig.getValue();
        const newLabelsConfig = {
            ...current,
            descriptions,
        };
        commitLabelsConfig(current, newLabelsConfig);
    };
    const setCountDownBarClose = (countDownToBarClose) => {
        const current = labelsConfig.getValue();
        const newLabelsConfig = {
            ...current,
            countDownToBarClose,
        };
        commitLabelsConfig(current, newLabelsConfig);
    };
    const commitLabelsConfig = (oldLabelsConfig, newLabelsConfig) => {
        // eslint-disable-next-line
        const action = (labels) => {
            if (multiChartViewModel.state.getValue().isGeneralSettingsSyncEnabled) {
                const updatedSettings = fromLocalLabelsConfigToCoreChartSettings(configVM.state.getValue().settings, labels);
                multiChartViewModel.setGeneralSettings(updatedSettings);
            }
            else {
                setLabelsConfig(labels);
            }
        };
        const redo = () => action(newLabelsConfig);
        const undo = () => action(oldLabelsConfig);
        actionsHistoryVM.pushAction({
            type: 'y_axis_labels_change',
            redo,
            undo,
        }, true);
    };
    const togglePriceScaleInverse = () => setPriceScaleInverse(!configVM.state.getValue().settings.chartCore.scale.inverse);
    const toggleLockPriceToBarRatio = () => setLockPriceToBarRatio(!configVM.state.getValue().settings.chartCore.scale.lockPriceToBarRatio);
    //#region effects
    const syncAutoScaleTochartEffect = pipe(configVM.state, observable.map(s => s.settings.chartCore.scale.auto), distinctUntilChanged(), tap(value => {
        chart.setAutoScale(value);
    }));
    const syncLockPriceToBarRatioTochartEffect = pipe(configVM.state, observable.map(s => s.settings.chartCore.scale.lockPriceToBarRatio), distinctUntilChanged(), tap(isLocked => chart.yAxis.setLockPriceToBarRatio(isLocked)));
    const syncDescriptionsToInstanceEffect = pipe(labelsConfig, observable.map(config => config.descriptions), distinctUntilChanged(), tap(descriptions => chart.yAxis.changeLabelsDescriptionVisibility(descriptions)));
    const syncCountdownToInstanceEffect = pipe(labelsConfig, observable.map(config => (config.countDownToBarClose ? 'label' : 'none')), distinctUntilChanged(), tap(countdownMode => chart.yAxis.changeLabelMode('countdownToBarClose', countdownMode)));
    const syncLastPriceLabelToInstanceEffect = pipe(labelsConfig, observable.map(config => config.labels.lastPrice), filter(Boolean), distinctUntilChanged(), tap(lastPrice => chart.yAxis.changeLabelMode('lastPrice', lastPrice)));
    const syncStudiesLabelsToInstanceEffect = pipe(labelsConfig, observable.map(config => config.labels.studies), filter(Boolean), distinctUntilChanged(), tap(studies => {
        const panes = Object.values(chart.paneManager.panes);
        panes.flatMap(p => Array.from(p.dataSeries)).forEach(s => (s.config.labelMode = studies));
        chart.yAxis.changeLabelMode('studies', studies);
    }));
    const syncPrevDayCloseLabelToInstanceEffect = pipe(labelsConfig, observable.map(config => config.labels.prevDayClose), filter(Boolean), distinctUntilChanged(), tap(prevDayClose => chart.yAxis.changeLabelMode('prevDayClose', prevDayClose)));
    const syncPrePostMarketLabelToInstanceEffect = pipe(labelsConfig, observable.map(config => config.labels.prePostMarket), filter(Boolean), distinctUntilChanged(), tap(prePostMarket => chart.yAxis.changeLabelMode('prePostMarket', prePostMarket)));
    const syncHighLowLabelToInstanceEffect = pipe(labelsConfig, observable.map(config => config.labels.highLow), filter(Boolean), distinctUntilChanged(), tap(highLow => chart.yAxis.changeLabelMode('highLow', highLow)));
    const syncBidAskLabelToInstanceEffect = pipe(labelsConfig, observable.map(config => config.labels.bidAsk), filter(Boolean), distinctUntilChanged(), tap(bidAsk => chart.yAxis.changeLabelMode('bidAsk', bidAsk)));
    const syncPriceScaleInverseToInstanceEffect = pipe(configVM.state, observable.map(s => s.settings.chartCore.scale.inverse), distinctUntilChanged(), tap(inverse => chart.yAxis.togglePriceScaleInverse(inverse)));
    const syncAxisTypeTochartEffect = pipe(configVM.state, observable.map(s => s.settings.chartCore.components.yAxis.type), distinctUntilChanged(), tap(value => chart.yAxis.setAxisType(value)));
    const updateLayoutWithYAxisEffect = pipe(labelsConfig, skip(1), observable.map(val => fromLocalLabelsConfigToCoreChartSettings(configVM.state.getValue().settings, val)), tap(updatedSettings => {
        multiChartViewModel.updateLocalChartInfo(chartId, {
            chartSettings: {
                ...updatedSettings,
            },
        });
    }));
    const syncYAxisAlignTochartEffect = pipe(configVM.state, observable.map(s => s.settings.chartCore.components.yAxis.align), distinctUntilChanged(), tap(value => chart.yAxis.setYAxisAlign(value)));
    const syncLabelsConfigFromMultiChartEffect = pipe(multiChartViewModel.state, observable.filter(state => state.isGeneralSettingsSyncEnabled), observable.map(state => state.lastGeneralSettings), observable.map(state => fromCoreChartSettingsToLocalLabelsConfig(state, chartConfig.components.yAxis.labels)), observable.filter(labels => !deepEqual(labels, labelsConfig.getValue())), tap(newLabelsConfig => {
        setLabelsConfig(newLabelsConfig);
    }));
    const switchToRegularScaleEffect = pipe(chartDataViewModel.compareInstruments, skip(1), // don't react on initial compare instrument set
    withLatestFrom(pipe(configVM.state, observable.map(s => s.settings.chartCore.components.yAxis.type))), observable.filter(([instruments, axisType]) => record.keys(instruments).length === 0 && axisType === 'percent'), tap(() => setAxisType('regular', false)));
    const yAxisVisibleEffect = pipe(chartDataViewModel.historicalCandlesUpdated, observable.map(historyData => historyData.length === 0), distinctUntilChanged(), tap(dataEmpty => {
        // we need to toggle yAxis visibility when there's no candles and when they are present
        chart.yAxis.setVisible(!dataEmpty);
    }));
    const switchToPercentScaleEffect = pipe(chartDataViewModel.compareInstruments, pairwise(), withLatestFrom(pipe(configVM.state, observable.map(s => s.settings.chartCore.components.yAxis.type))), observable.filter(([[prevInstruments, instruments], axisType]) => record.keys(prevInstruments).length === 0 &&
        record.keys(instruments).length !== 0 &&
        axisType !== 'percent'), tap(() => {
        setLockPriceToBarRatio(false, false);
        setAxisType('percent', false);
    }));
    const onRestoreDefaultConfig = () => { };
    //#endregion
    const effects = merge(updateLayoutWithYAxisEffect, syncLabelsConfigFromMultiChartEffect, syncCountdownToInstanceEffect, syncDescriptionsToInstanceEffect, syncLastPriceLabelToInstanceEffect, syncStudiesLabelsToInstanceEffect, syncPrevDayCloseLabelToInstanceEffect, syncPrePostMarketLabelToInstanceEffect, syncHighLowLabelToInstanceEffect, syncYAxisAlignTochartEffect, syncBidAskLabelToInstanceEffect, syncPriceScaleInverseToInstanceEffect, syncLockPriceToBarRatioTochartEffect, syncAutoScaleTochartEffect, syncAxisTypeTochartEffect, switchToRegularScaleEffect, switchToPercentScaleEffect, yAxisVisibleEffect);
    return newSink(callTracerProxy('yAxisConfiguratorViewModel', {
        chartWidth,
        yAxisWidth,
        yAxisAlign,
        config$: configVM.config$,
        setAutoScale,
        setPriceAxisFitType,
        setAxisType,
        defaultConfig: configVM.defaultConfig,
        onRestoreDefaultConfig,
        setYAxisAlign,
        setLockPriceToBarRatio,
        labelsConfig,
        changeLabelMode,
        setDescription,
        toggleLogAxis,
        togglePercentAxis,
        setCountDownBarClose,
        togglePriceScaleInverse,
        toggleLockPriceToBarRatio,
        setYAxisLabelsSettings: commitLabelsConfig,
    }), effects);
});
export function fromCoreChartSettingsToLocalLabelsConfig(chartSettings, chartCoreYAxisLabelsConfig) {
    const multichartYAxisLabelsConfig = chartSettings.chartCore.components.yAxis.labels;
    return {
        descriptions: multichartYAxisLabelsConfig.descriptions,
        countDownToBarClose: getYAxisLabelModeFromCoreChartConfig(multichartYAxisLabelsConfig.settings.countdownToBarClose) === 'label',
        labels: {
            lastPrice: getYAxisLabelModeFromCoreChartConfig(multichartYAxisLabelsConfig.settings.lastPrice),
            ...(chartCoreYAxisLabelsConfig.settings.studies && {
                studies: getYAxisLabelModeFromCoreChartConfig(multichartYAxisLabelsConfig.settings.studies),
            }),
            ...(chartCoreYAxisLabelsConfig.settings.bidAsk && {
                bidAsk: getYAxisLabelModeFromCoreChartConfig(multichartYAxisLabelsConfig.settings.bidAsk),
            }),
            ...(chartCoreYAxisLabelsConfig.settings.highLow && {
                highLow: getYAxisLabelModeFromCoreChartConfig(multichartYAxisLabelsConfig.settings.highLow),
            }),
            ...(chartCoreYAxisLabelsConfig.settings.prevDayClose && {
                prevDayClose: getYAxisLabelModeFromCoreChartConfig(multichartYAxisLabelsConfig.settings.prevDayClose),
            }),
            ...(chartCoreYAxisLabelsConfig.settings.prePostMarket && {
                prePostMarket: getYAxisLabelModeFromCoreChartConfig(multichartYAxisLabelsConfig.settings.prePostMarket),
            }),
        },
    };
}
function fromLocalLabelsConfigToCoreChartSettings(chartsettings, labelConfig) {
    const settings = {
        lastPrice: {
            mode: labelConfig.labels.lastPrice,
        },
        countdownToBarClose: {
            mode: labelConfig.countDownToBarClose ? 'label' : 'none',
        },
        ...(labelConfig.labels.bidAsk && {
            bidAsk: {
                mode: labelConfig.labels.bidAsk,
            },
        }),
        ...(labelConfig.labels.studies && {
            studies: {
                mode: labelConfig.labels.studies,
            },
        }),
        ...(labelConfig.labels.highLow && {
            highLow: {
                mode: labelConfig.labels.highLow,
            },
        }),
        ...(labelConfig.labels.prevDayClose && {
            prevDayClose: {
                mode: labelConfig.labels.prevDayClose,
            },
        }),
        ...(labelConfig.labels.prePostMarket && {
            prePostMarket: {
                mode: labelConfig.labels.prePostMarket,
            },
        }),
    };
    const yAxisLabelsData = {
        ...chartsettings.chartCore.components.yAxis.labels,
        descriptions: labelConfig.descriptions,
        settings,
    };
    return labelsConfigLens.set(yAxisLabelsData)({
        ...chartsettings,
    });
}
const labelsConfigLens = Lens.fromPath()(['chartCore', 'components', 'yAxis', 'labels']);
const getAxisFit = (current, type, active) => {
    switch (type) {
        case 'studies': {
            return {
                ...current.settings.chartReact.scale.fit,
                studies: active,
            };
        }
        case 'orders': {
            return {
                ...current.settings.chartReact.scale.fit,
                orders: active,
            };
        }
        case 'positions':
        default: {
            return {
                ...current.settings.chartReact.scale.fit,
                positions: active,
            };
        }
    }
};
function getYAxisLabelModeFromCoreChartConfig(labelConfig) {
    return pipe(option.fromNullable(labelConfig), option.getOrElse(() => ({ mode: 'none' })), s => s.mode);
}
