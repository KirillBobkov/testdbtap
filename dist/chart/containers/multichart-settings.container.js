import { createElement, useCallback } from 'react';
import { context } from '../../context/context2';
import { instrumentNameOption } from '../view-models/data/chart-data.view-model';
import { useDirectProperty, useProperty } from '../../utils/use-property';
import { namedMemo } from '../../utils/named-memo';
import { importIdle } from '../../utils/react.utils';
const MultichartSettings = importIdle(() => import('../components/multichart-settings/multichart-settings.component'));
export const MultichartSettingsContainer = context.combine(context.key()('multiChartViewModel'), context.key()('chartDataViewModel'), context.key()('chartTypeViewModel'), context.key()('chartConfiguratorViewModel'), context.key()('aggregationPeriodViewModel'), context.key()('localization'), (vm, chartDataVM, chartTypeVM, chartSettingsVM, aggregationPeriodVM, localization) => namedMemo('MultichartSettingsContainer', (props) => {
    const { onLayoutChange, closePopover } = props;
    const layout = useDirectProperty(vm.state, ['layout']);
    const isInstrumentSyncEnabled = useDirectProperty(vm.state, ['isInstrumentSyncEnabled']);
    const isChartTypeSyncEnabled = useDirectProperty(vm.state, ['isChartTypeSyncEnabled']);
    const isAggregationPeriodTypeSyncEnabled = useDirectProperty(vm.state, [
        'isAggregationPeriodTypeSyncEnabled',
    ]);
    const isAppearanceSyncEnabled = useDirectProperty(vm.state, ['isGeneralSettingsSyncEnabled']);
    const isStudiesSyncEnabled = useDirectProperty(vm.state, ['isStudiesSyncEnabled']);
    const isCrosshairSyncEnabled = useDirectProperty(vm.state, ['isCrosshairSyncEnabled']);
    const setInstrumentSync = useCallback((shouldSync) => {
        if (shouldSync) {
            vm.setInstrument(instrumentNameOption(chartDataVM.instrument.getValue()));
        }
        vm.setInstrumentSync(shouldSync);
    }, []);
    const setAggregationPeriodTypeSync = useCallback((shouldSync) => {
        if (shouldSync) {
            vm.setAggregationPeriodType(aggregationPeriodVM.selectedPeriod.getValue());
        }
        vm.setAggregationPeriodTypeSync(shouldSync);
    }, []);
    const setChartTypeSync = useCallback((shouldSync) => {
        if (shouldSync) {
            vm.setChartType(chartTypeVM.type.getValue());
        }
        vm.setChartTypeSync(shouldSync);
    }, []);
    const settings = useProperty(chartSettingsVM.state);
    const setAppearanceSync = useCallback((shouldSync) => {
        if (shouldSync) {
            vm.setGeneralSettings(settings.settings);
        }
        vm.setGeneralSettingsSync(shouldSync);
    }, [settings]);
    const setLayout = useCallback((layout) => {
        onLayoutChange && onLayoutChange(layout);
        vm.setLayout(layout);
    }, [onLayoutChange]);
    return createElement(MultichartSettings, {
        layout,
        setLayout,
        isInstrumentSyncEnabled,
        isChartTypeSyncEnabled,
        isAggregationPeriodTypeSyncEnabled,
        isAppearanceSyncEnabled,
        isStudiesSyncEnabled,
        isCrosshairSyncEnabled,
        setInstrumentSync,
        setChartTypeSync,
        setAggregationPeriodTypeSync,
        setAppearanceSync,
        setStudiesSync: vm.setStudiesSync,
        setCrosshairSync: vm.setCrosshairSync,
        closePopover,
        localization: localization.toolbar,
    });
}));
