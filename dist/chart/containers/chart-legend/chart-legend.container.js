import { option } from 'fp-ts';
import { pipe, constUndefined } from 'fp-ts/function';
import { createElement, useCallback, useContext, useLayoutEffect, useMemo } from 'react';
import { context } from '../../../context/context2';
import { namedMemo } from '../../../utils/named-memo';
import { useObservable } from '../../../utils/use-observable';
import { useDirectProperty, useProperty } from '../../../utils/use-property';
import { useSink } from '../../../utils/use-sink';
import { ChartLegend, } from '../../components/chart-legend/chart-legend.component';
import { ChartReactAppContext } from '../../defaults';
import { createChartLegendDomMutationModel } from '../../dom-mutation-models/chart-legend.dom-mutation-model';
import { CodeEditorContainer } from '../code-editor.container';
import { OrderEntryLegendInput } from '../../components/trading/order-entry/order-entry-legend-input.styled';
import { useUIOverrideComponent } from '../../ui-overrides';
import { createDataMenuViewModel } from '../../view-models/data/data-menu.vm';
const DEFAULT_POSITION = { x: 0, y: 0 };
export const ChartLegendContainer = context.combine(createChartLegendDomMutationModel, createDataMenuViewModel, CodeEditorContainer, context.key()('dxScriptEditViewModel'), context.key()('chartLegendVM'), context.key()('studiesSettingsViewModel'), context.key()('chartDataViewModel'), context.key()('colorPalette'), context.key()('chart'), context.key()('chartConfiguratorViewModel'), context.key()('initialLoaderVM'), context.key()('aggregationPeriodViewModel'), context.key()('orderEntryVM'), context.key()('tradingVM'), context.key()('dataLoaderVM'), context.key()('localization'), context.key()('chartReactConfig'), (createChartLegendDMM, candleSeriesMenuViewModelSink, CodeEditorContainer, dxScriptEditViewModel, chartLegendVM, studiesSettingsViewModel, chartDataViewModel, colorPalette, chart, chartConfiguratorViewModel, initialLoaderVM, aggregationPeriodVM, orderEntryVM, tradingVM, dataLoaderVM, localization, chartReactConfig) => namedMemo('ChartLegendContainer', ({ id }) => {
    const candleSeriesMenuVM = useSink(() => candleSeriesMenuViewModelSink, []);
    const chartLegendDMM = useSink(() => createChartLegendDMM, []);
    const selectedSeries = useObservable(chartLegendVM.selectedSeries, option.none);
    const popupPosition = useObservable(chartLegendVM.popupPosition, DEFAULT_POSITION);
    const showStudies = useObservable(chartLegendVM.showStudies, true);
    const showMainLegendVolumes = useObservable(chartLegendVM.showMainLegendVolumes, false);
    const showSeparateLegendVolumes = useObservable(chartLegendVM.showSeparateLegendVolumes, false);
    const configOHLC = useProperty(chartLegendVM.configOHLC);
    const stackedStudySeries = useProperty(chartLegendDMM.stackedStudySeries);
    const separatedStudySeries = useProperty(chartLegendDMM.separateStudySeries);
    const secondarySeries = useProperty(chartLegendDMM.secondarySeries);
    const optionMainInstrument = useProperty(chartDataViewModel.instrument);
    const legendConfig = useDirectProperty(chartConfiguratorViewModel.state, [
        'settings',
        'chartReact',
        'legend',
    ]);
    const historicalCandles = useObservable(chartDataViewModel.historicalCandlesUpdated, []);
    const dataPresented = historicalCandles.length !== 0;
    const studies = useObservable(studiesSettingsViewModel.studies$, []);
    const addedStudies = useObservable(studiesSettingsViewModel.addedStudies$, []);
    const isLoaded = useProperty(initialLoaderVM.isLoaded);
    const isStudySettingsOpened = useObservable(studiesSettingsViewModel.isOpened$, false);
    const selectedStudySettingsUUID = useObservable(studiesSettingsViewModel.selectedStudyUUID$, '');
    const maxSelectedStudiesCount = chartReactConfig.studies.maxSelectedStudiesCount || 5;
    const { dxScriptEnabled } = chartReactConfig.studies;
    const { isMobile } = useContext(ChartReactAppContext);
    const addStudyButtonEnabled = isMobile ? true : chartReactConfig.studies.addStudyButtonEnabled;
    const uuidFromRightClick = useObservable(chartLegendVM.uuidFromRightClick, '');
    const isLoading = useProperty(dataLoaderVM.isLoading);
    const orderEntry = useProperty(orderEntryVM.orderEntry);
    const orderEntryEnabled = useProperty(orderEntryVM.orderEntryEnabled);
    const DeafultHeader = useMemo(() => orderEntryEnabled && dataPresented && !isLoading
        ? createElement(OrderEntryLegendInput, {
            disabled: orderEntry.disabled,
            quantity: orderEntry.quantity,
            quantityPrecision: orderEntry.quantityPrecision,
            quantityStep: orderEntry.quantityStep,
            maxQuantity: orderEntry.maxQuantity,
            type: 'BuyMarketSellMarket',
            onQuantityChange: orderEntryVM.setOrderQuantity,
            createOrder: tradingVM.createOrderFromOrderEntry,
            tradingDict: localization.trading,
        })
        : null, [
        orderEntryEnabled,
        orderEntry,
        tradingVM.createOrderFromOrderEntry,
        orderEntryVM.setOrderQuantity,
        localization.trading,
    ]);
    const Header = useUIOverrideComponent(['Legend', 'Header']) ?? DeafultHeader;
    const mainInstrumentSymbol = useMemo(() => pipe(optionMainInstrument, option.map(i => i.symbol), option.toUndefined), [optionMainInstrument]);
    const period = useProperty(aggregationPeriodVM.selectedPeriod);
    const onDeleteStudySeries = useCallback((uuid) => {
        chartLegendVM.onDeleteStudySeries(uuid);
        studiesSettingsViewModel.onRemoveStudy(uuid);
        studiesSettingsViewModel.onSave();
    }, []);
    const domMutationProps = useMemo(() => ({
        container: chartLegendDMM.legendContainer,
        open: chartLegendDMM.open,
        close: chartLegendDMM.close,
        high: chartLegendDMM.high,
        low: chartLegendDMM.low,
        time: chartLegendDMM.time,
        mainVolume: chartLegendDMM.volumeMain,
        separateVolume: chartLegendDMM.separateVolume,
        stackedStudySeries,
        separatedStudySeries,
        secondarySeries,
    }), [
        chartLegendDMM.legendContainer,
        chartLegendDMM.close,
        chartLegendDMM.high,
        chartLegendDMM.low,
        chartLegendDMM.open,
        chartLegendDMM.separateVolume,
        chartLegendDMM.time,
        chartLegendDMM.volumeMain,
        secondarySeries,
        separatedStudySeries,
        stackedStudySeries,
    ]);
    const studiesSettingsProps = {
        palette: colorPalette,
        isOpened: isStudySettingsOpened,
        selectedStudySettingsUUID,
        maxCountSelected: maxSelectedStudiesCount,
        studies,
        addedStudies,
        dxScriptEnabled,
        addStudyButtonEnabled,
        CodeEditorContainer,
        uuidFromRightClick,
        onCreateNewScript: dxScriptEditViewModel.addNewScript,
        onEditScript: dxScriptEditViewModel.onPopupOpen,
        onDeleteScript: dxScriptEditViewModel.deleteScript,
        onAddedStudy: studiesSettingsViewModel.onAddedStudy,
        onRemoveStudy: studiesSettingsViewModel.onRemoveStudy,
        onChangeStudy: studiesSettingsViewModel.onChangeStudy,
        onReorderStudies: studiesSettingsViewModel.onReorderStudies,
        onRemoveAllStudies: studiesSettingsViewModel.onRemoveAllStudies,
        onClose: studiesSettingsViewModel.onClose,
        onOpen: studiesSettingsViewModel.onOpen,
        onConfigureStudy: studiesSettingsViewModel.onConfigureStudy,
    };
    const chartLegendConfig = useMemo(() => ({
        opened: legendConfig.opened && isLoaded,
        showMainInstrument: legendConfig.showInstrument,
        showOHLC: legendConfig.showOHLC,
        showPeriod: legendConfig.showPeriod,
        showVolume: legendConfig.showVolume,
        configOHLC,
    }), [
        isLoaded,
        legendConfig.opened,
        legendConfig.showInstrument,
        legendConfig.showOHLC,
        legendConfig.showVolume,
        legendConfig.showPeriod,
        configOHLC,
    ]);
    const contextMenuHandler = useCallback((e) => chartLegendVM.contextMenuSubject.next(e), []);
    // in react 18 render behavior was changed, and react can delay render
    // so, the dmm can receive refs before actual render, to sync state we need this effect
    useLayoutEffect(() => {
        chartLegendDMM.syncState();
    });
    const onOpenSeriesHandler = useCallback((id) => {
        candleSeriesMenuVM.changeSelectedSeries(id, 'compare');
        chartLegendVM.onOpenSeries(id);
    }, []);
    const onCloseSeriesHandler = useCallback(() => {
        chartLegendVM.onCloseSeriesPopup();
    }, []);
    const selectedSeriesDataMenu = useProperty(candleSeriesMenuVM.selectedSeries);
    const selectedSeriesValue = useMemo(() => pipe(selectedSeriesDataMenu, option.getOrElseW(constUndefined)), [selectedSeriesDataMenu]);
    return createElement(ChartLegend, {
        mainInstrumentSymbol,
        chart,
        id,
        selectedSeries,
        popupPosition,
        onCloseSeries: onCloseSeriesHandler,
        onDeleteSeries: chartLegendVM.onDeleteSeries,
        onOpenSeries: onOpenSeriesHandler,
        onDeleteStudySeries,
        onOpenedChange: chartLegendVM.setOpenedValue,
        showStudies,
        isOpened: chartLegendConfig.opened,
        domMutationProps,
        showMainLegendVolumes,
        showSeparateLegendVolumes,
        onContextMenu: contextMenuHandler,
        config: chartLegendConfig,
        period,
        studiesSettingsProps,
        Header,
        // data menu props
        selectedSeriesDataMenu: selectedSeriesValue,
        onChangeSeriesColor: candleSeriesMenuVM.changeSelectedSeriesColor,
        onChangeSeriesChartType: candleSeriesMenuVM.changeSelectedSeriesChartType,
        onSeriesReorder: candleSeriesMenuVM.reorderSeries,
    });
}));
