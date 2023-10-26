import { CHART_UUID, CanvasElement } from '@devexperts/dxcharts-lite/dist/chart/canvas/canvas-bounds-container';
import { DataSeriesModel } from '@devexperts/dxcharts-lite/dist/chart/model/data-series.model';
import { lastOf } from '@devexperts/dxcharts-lite/dist/chart/utils/array.utils';
import { format } from 'date-fns';
import { array, option } from 'fp-ts';
import { observable, observableOption } from 'fp-ts-rxjs';
import { none, some } from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { Subject, combineLatest, merge, of, startWith } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { context } from '../../../context/context2';
import { newSink } from '../../../context/sink2';
import { waitForCandlesSet } from '../../../utils/chart';
import { callTracerProxy } from '../../../utils/debug/call-tracer';
import { filterMapOption } from '../../../utils/monad-functions';
import { createPropertyAdapter } from '../../../utils/property.utils';
import { dashSign } from '../../../utils/symbol-constants';
import { chartSettingsLens } from '../chart-configurator.view-model';
export const initialMainSeriesModel = {
    open: '',
    close: '',
    high: '',
    low: '',
    direction: 'none',
    volume: none,
    time: '',
    timestamp: '',
};
const initialLegendState = {
    series: {
        mainSeries: {
            ...initialMainSeriesModel,
        },
        secondarySeries: [],
        stackedStudiesSeries: [],
        separateStudiesSeries: [],
        volume: none,
    },
};
export const DEFAULT_OHLC = { O: true, H: true, L: true, C: true };
const LOPPED_OHLC = { O: false, H: false, L: false, C: true };
const configMapOHLC = {
    line: { ...LOPPED_OHLC },
    area: { ...LOPPED_OHLC },
    scatterPlot: { ...LOPPED_OHLC },
    baseline: { ...LOPPED_OHLC },
    bar: { ...DEFAULT_OHLC },
    histogram: { ...DEFAULT_OHLC },
    candle: { ...DEFAULT_OHLC },
    heikinAshi: { ...DEFAULT_OHLC },
    hollow: { ...DEFAULT_OHLC },
    equivolume: { ...DEFAULT_OHLC },
    trend: { ...DEFAULT_OHLC },
};
export const createChartLegendViewModel = context.combine(context.key()('chartDataViewModel'), context.key()('compareChartViewModel'), context.key()('chartConfiguratorViewModel'), context.key()('studiesSettingsViewModel'), context.key()('chartTypeViewModel'), context.key()('chart'), context.key()('aggregationPeriodViewModel'), context.key()('chartReactConfig'), (chartDataViewModel, compareChartViewModel, chartConfiguratorViewModel, studiesSettingsViewModel, chartTypeViewModel, chart, aggregationPeriodViewModel, chartReactConfig) => {
    //#region state
    const [setState, state] = createPropertyAdapter(initialLegendState);
    const [setShowMainLegendVolumes, showMainLegendVolumes] = createPropertyAdapter(true);
    const [setShowSeparateLegendVolumes, showSeparateLegendVolumes] = createPropertyAdapter(false);
    const [setShowStudies, showStudies] = createPropertyAdapter(true);
    const [setShowSecondarySeries, showSecondarySeries] = createPropertyAdapter(true);
    const [setShowStudiesSeparately, showStudiesSeparately] = createPropertyAdapter(true);
    const [setConfigOHCL, configOHLC] = createPropertyAdapter(DEFAULT_OHLC);
    const contextMenuSubject = new Subject();
    const legendPosition = pipe(combineLatest([
        chart.bounds.observeBoundsChanged(CanvasElement.PANE_UUID(CHART_UUID)),
        chart.crossEventProducer.crossSubject.pipe(observable.filter(c => c !== null)),
        chartConfiguratorViewModel.config$.pipe(observable.map(c => c.chartReact.legend.mode), distinctUntilChanged()),
    ]), observable.map(([bounds, cross, mode]) => ({
        x: mode === 'pinned' ? bounds.x : cross?.[0] ?? bounds.x,
        y: bounds.y,
    })), startWith({ x: 0, y: 0 }));
    const rightClickOnSeries = chart.hitTestCanvasModel.observeRightClickOnElement();
    const [setSelectedSeries, selectedSeries] = createPropertyAdapter(option.none);
    const [setOpenedPopupPosition, openedPopupPosition] = createPropertyAdapter({ x: 0, y: 0 });
    const popupPosition = merge(rightClickOnSeries.pipe(map(_ => ({ ...chart.canvasInputListener.currentPointDocument }))), openedPopupPosition);
    const showVolumesSeparately = pipe(chartConfiguratorViewModel.state, observable.map(s => s.settings.chartCore.components.volumes.showSeparately), distinctUntilChanged());
    const chartCoreVolumesVisible = pipe(chartConfiguratorViewModel.state, observable.map(s => s.settings.chartCore.components.volumes.visible), distinctUntilChanged());
    const showVolumeInLegend = pipe(chartConfiguratorViewModel.state, observable.map(s => s.settings.chartReact.legend.showVolume), distinctUntilChanged());
    //#endregion
    //#region methods
    const onUpdateSecondarySeries = (series) => {
        // sync with compare chart vm
        const seriesConfig = {
            id: series.id,
            chartType: series.chartType,
            color: series.color,
            symbol: series.symbol,
        };
        compareChartViewModel.updateCompareInstrumentConfig(seriesConfig);
    };
    const onDeleteSecondarySeries = (series) => chartDataViewModel.removeCompareInstrument(series.symbol);
    const onDeleteStudySeries = (uuid) => {
        const currentState = state.getValue();
        const { stackedStudiesSeries, separateStudiesSeries } = currentState.series;
        const updatedStackedStudiesSeries = stackedStudiesSeries.filter(currSeries => {
            return currSeries.uuid !== uuid;
        });
        const updatedSeparateStudiesSeries = separateStudiesSeries.filter(currSeries => {
            return currSeries.uuid !== uuid;
        });
        setState({
            ...currentState,
            series: {
                ...currentState.series,
                stackedStudiesSeries: updatedStackedStudiesSeries,
                separateStudiesSeries: updatedSeparateStudiesSeries,
            },
        });
    };
    const takeVolumeFromCandle = (timestamp) => chart.chartModel.candleFromTimestamp(parseInt(timestamp, 10)).candle.volume.toString();
    const setOpenedValue = (opened) => chartConfiguratorViewModel.setSettingsByPath(chartSettingsLens(['chartReact', 'legend', 'opened']), opened);
    const deselectSeries = () => {
        setSelectedSeries(option.none);
    };
    const onOpenSelectedSeriesMenu = (id) => {
        const point = chart.canvasInputListener.currentPointDocument;
        setOpenedPopupPosition({ x: point.x, y: point.y });
        setSelectedSeries(option.some(id));
    };
    //#endregion
    //#region effects
    const mainInstrumentChangedEffect = pipe(chartDataViewModel.instrument, tap(() => {
        const currentState = state.getValue();
        setState({
            ...currentState,
            series: {
                ...currentState.series,
                mainSeries: {
                    ...initialMainSeriesModel,
                },
            },
        });
    }));
    const compareInstrumentsChangedEffect = pipe(compareChartViewModel.compareInstrumentsConfig, observable.filter(() => showSecondarySeries.getValue()), observable.map(compareInstruments => Object.entries(compareInstruments).map(([symbol, info]) => {
        const chartSeries = chart.chartModel.findSecondarySeriesBySymbol(symbol);
        return fromCompareInstrumentToChartLegendSeriesModel(info, chartSeries);
    })), tap(updatedSecondarySeries => {
        const currentState = state.getValue();
        setState({
            ...currentState,
            series: {
                ...currentState.series,
                secondarySeries: [...updatedSecondarySeries],
            },
        });
    }));
    const showVolumesInitialValueEffect = pipe(chartCoreVolumesVisible, observable.filter(visible => visible), tap(() => {
        const currentState = state.getValue();
        const initialVolume = parseInt(takeVolumeFromCandle(currentState.series.mainSeries.timestamp), 10);
        const initialVolumeValue = formatVolumeValue(initialVolume, chart.chartModel.pane.regularFormatter);
        setState({
            ...currentState,
            series: {
                ...currentState.series,
                volume: some(initialVolumeValue),
                mainSeries: {
                    ...currentState.series.mainSeries,
                    volume: some(initialVolumeValue),
                },
            },
        });
    }));
    const showVolumesSeparatelyEffect = pipe(showVolumesSeparately, tap(() => chart.hover.fireLastCross()));
    const showMainLegendVolumeEffect = pipe(combineLatest([showVolumeInLegend, chartCoreVolumesVisible, showVolumesSeparately]), tap(([showVolumeInLegend, chartCoreVolumesVisible, showVolumesSeparately]) => {
        setShowMainLegendVolumes(showVolumeInLegend && chartCoreVolumesVisible && !showVolumesSeparately);
    }));
    const showSeparateLegendVolumeEffect = pipe(combineLatest([showVolumeInLegend, chartCoreVolumesVisible, showVolumesSeparately]), tap(([showVolumeInLegend, chartCoreVolumesVisible, showVolumesSeparately]) => setShowSeparateLegendVolumes(showVolumeInLegend && chartCoreVolumesVisible && showVolumesSeparately)));
    const chartTypeChangeEffect = pipe(chartTypeViewModel.type, tap(chartType => {
        setConfigOHCL(configMapOHLC[chartType]);
    }));
    const studiesVisibilityChangedEffect = pipe(chart.studies.observeStudiesConfigChanged(), observable.map(() => chart.config.components?.studies?.visible), distinctUntilChanged(), tap(studiesVisible => setShowStudies(studiesVisible)));
    const resetLegendEffect = chartDataViewModel.historicalCandlesUpdated.pipe(filter(candles => candles.length === 0), tap(() => setState(initialLegendState)));
    // TODO: rewrite to the right way, like we do for the compareSeries
    // hack, don't do like that
    const studiesUpdatedEffect = pipe(studiesSettingsViewModel.addedStudies$, tap(() => {
        const lastHover = chart.hover.hover;
        const x = lastHover?.x || 0;
        const y = lastHover?.y || 0;
        chart.hover.createAndFireHover([x, y, '']);
    }));
    const hoverEffect = pipe(chart.hover.hoverSubject, observable.map(option.fromNullable), observableOption.fold(() => {
        const lastCandle = lastOf(chart.chartModel.mainCandleSeries.visualPoints);
        lastCandle && chart.hover.createAndFireHoverFromCandle(lastCandle);
        return of();
    }, hover => {
        const hoverValue = hover;
        const currentState = state.getValue();
        const formattedTime = formatTimeValue(hoverValue.timestamp + chart.timeZoneModel.currentTzOffset(hoverValue.timestamp), aggregationPeriodViewModel.selectedPeriod.getValue(), chartReactConfig);
        const secondarySeries = currentState.series.secondarySeries;
        const updatedSecondarySeries = secondarySeries.map(series => {
            const hoveredSeries = hoverValue.compareSeriesHover.find(({ instrument }) => instrument === series.symbol);
            const price = hoveredSeries?.price ?? '';
            const id = hoveredSeries?.id ?? '';
            return {
                ...series,
                id,
                price,
            };
        });
        const stackedStudiesSeries = showStudiesSeparately
            ? hoverValue.studiesHover.overlays
            : hoverValue.studiesHover.studies;
        const separateStudiesSeries = showStudiesSeparately ? hoverValue.studiesHover.underlays : [];
        const separatedVolume = hoverValue.candleHover && {
            volume: showSeparateLegendVolumes.getValue()
                ? some(formatVolumeValue(hoverValue.candleHover.volume, chart.chartModel.pane.regularFormatter))
                : none,
        };
        const mainSeriesVolume = hoverValue.candleHover && {
            volume: showMainLegendVolumes.getValue()
                ? some(formatVolumeValue(hoverValue.candleHover.volume, chart.chartModel.pane.regularFormatter))
                : none,
        };
        const volume = showMainLegendVolumes.getValue() && mainSeriesVolume
            ? mainSeriesVolume.volume
            : showSeparateLegendVolumes.getValue() && separatedVolume
                ? separatedVolume.volume
                : none;
        const candleHover = hoverValue.candleHover && {
            open: hoverValue.candleHover.openFormatted,
            close: hoverValue.candleHover.closeFormatted,
            high: hoverValue.candleHover.highFormatted,
            low: hoverValue.candleHover.lowFormatted,
            direction: hoverValue.candleHover.visualCandle.name,
        };
        setState({
            ...currentState,
            series: {
                ...currentState.series,
                volume,
                mainSeries: {
                    ...currentState.series.mainSeries,
                    ...candleHover,
                    time: formattedTime,
                    timestamp: hoverValue.timestamp.toString(),
                    volume,
                },
                secondarySeries: showSecondarySeries.getValue() ? updatedSecondarySeries : [],
                stackedStudiesSeries,
                separateStudiesSeries,
            },
        });
        return of();
    }));
    const resetDataSeriesWhenStudiesPopupOpenedChangedEffect = pipe(studiesSettingsViewModel.isOpened$, observable.filter(opened => !opened), tap(deselectSeries));
    const selectedSeriesFromRightClickWithEffect = pipe(rightClickOnSeries, observable.map(option.fromPredicate((ev) => ev.model instanceof DataSeriesModel)), observableOption.map(s => s.model.id));
    const getOnSelectStudiesUUID = pipe(selectedSeriesFromRightClickWithEffect, filterMapOption, map(selectedSeriesId => {
        const currentSeries = state.getValue().series;
        const studies = currentSeries.stackedStudiesSeries.concat(currentSeries.separateStudiesSeries);
        return pipe(studies, array.findFirst(s => pipe(s.lines, array.some(line => line.id === selectedSeriesId))), option.map(study => study.uuid));
    }));
    const uuidFromRightClick = pipe(getOnSelectStudiesUUID, filterMapOption);
    const triggerLegendInitEffect = pipe(waitForCandlesSet(chart), tap(() => {
        const lastCandle = chart.chartModel.getLastVisualCandle();
        if (lastCandle !== undefined) {
            const x = lastCandle.xCenter(chart.scale);
            const y = lastCandle.yBodyStart(chart.scale);
            chart.crossEventProducer.crossSubject.next([x, y, CHART_UUID]);
            chart.crossEventProducer.crossSubject.next(null);
        }
    }));
    //#endregion
    const effects$ = merge(mainInstrumentChangedEffect, compareInstrumentsChangedEffect, hoverEffect, showVolumesSeparatelyEffect, showSeparateLegendVolumeEffect, showMainLegendVolumeEffect, showVolumesInitialValueEffect, resetLegendEffect, studiesUpdatedEffect, studiesVisibilityChangedEffect, resetDataSeriesWhenStudiesPopupOpenedChangedEffect, selectedSeriesFromRightClickWithEffect, triggerLegendInitEffect, chartTypeChangeEffect);
    return newSink(callTracerProxy('chartLegendViewModel', {
        state,
        legendPosition,
        selectedSeries,
        popupPosition,
        showStudies,
        showSeparateLegendVolumes,
        showMainLegendVolumes,
        configOHLC,
        uuidFromRightClick,
        contextMenuSubject,
        onUpdateSeries: onUpdateSecondarySeries,
        onDeleteSeries: onDeleteSecondarySeries,
        onOpenSeries: onOpenSelectedSeriesMenu,
        onDeleteStudySeries,
        onCloseSeriesPopup: deselectSeries,
        setShowStudies,
        setShowSecondarySeries,
        setShowStudiesSeparately,
        setOpenedValue,
    }), effects$);
});
const formatVolumeValue = (volume, priceFormatter) => {
    const volumeInt = volume.toString(10);
    return volumeInt.length > 6
        ? priceFormatter(volume / 1000000) + 'M'
        : volumeInt.length > 4
            ? priceFormatter(volume / 1000) + 'K'
            : priceFormatter(volume);
};
// TODO: Refactor in 5.x.x
const formatTimeValue = (time, aggregation, config) => {
    if (config.dateFormatters?.legend) {
        return format(time, config.dateFormatters.legend(aggregation));
    }
    switch (aggregation.durationType) {
        case 'y':
        case 'mo':
        case 'w':
        case 'd':
            return format(time, 'dd MMM yy');
        case 'h':
        case 'm':
            return format(time, 'dd.MM.yyyy HH:mm');
        case 's':
        case 'r':
        case 't':
        default:
            return format(time, 'dd.MM.yyyy HH:mm:ss');
    }
};
export const fromCompareInstrumentToChartLegendSeriesModel = (compareInstrument, series) => {
    const chartType = compareInstrument.chartType;
    const color = compareInstrument.color;
    return {
        id: series?.id ?? '',
        symbol: compareInstrument.symbol,
        chartType,
        color,
        price: dashSign,
    };
};
