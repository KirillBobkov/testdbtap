import { merge } from '@devexperts/dxcharts-lite/dist/chart/utils/merge.utils';
import { cloneUnsafe, deepEqual } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
import { createElement, useCallback, useMemo } from 'react';
import { context } from '../../../../context/context2';
import { namedMemo } from '../../../../utils/named-memo';
import { useObservable } from '../../../../utils/use-observable';
import { useDirectProperty, useProperty } from '../../../../utils/use-property';
import { fromCoreChartSettingsToLocalLabelsConfig, } from '../../../view-models/y-axis/y-axis-configurator.view-model';
import { ChartSettingsChartTypeScales } from '../../../components/chart-settings/chart-settings-chart-type-scales/chart-settings-chart-type-scales.component';
export const ChartSettingsChartTypeScalesContainer = context.combine(context.key()('yAxisConfiguratorViewModel'), context.key()('chartConfiguratorViewModel'), context.key()('localization'), context.key()('chartConfig'), (yAxisVM, chartConfiguratorViewModel, localization, chartConfig) => namedMemo('ChartSettingsChartTypeScales', props => {
    const config = useObservable(yAxisVM.config$, yAxisVM.defaultConfig);
    const labelsConfig = useProperty(yAxisVM.labelsConfig);
    const { defaultConfig } = props;
    const settings = useDirectProperty(chartConfiguratorViewModel.state, ['settings']);
    const showRestoreToDefault = useMemo(() => !deepEqual(defaultConfig, merge(cloneUnsafe(defaultConfig), merge(cloneUnsafe(settings), cloneUnsafe(labelsConfig)), {
        overrideExisting: true,
        addIfMissing: false,
    })), [defaultConfig, settings, labelsConfig]);
    const onRestoreDefaultRequest = useCallback(() => {
        const defaultLabels = fromCoreChartSettingsToLocalLabelsConfig(defaultConfig, chartConfig.components.yAxis.labels);
        yAxisVM.setYAxisLabelsSettings(labelsConfig, defaultLabels);
        chartConfiguratorViewModel.onRestoreDefaultConfigTab(defaultConfig);
    }, [labelsConfig, defaultConfig]);
    return createElement(ChartSettingsChartTypeScales, {
        config,
        localization,
        toggleAutoScale: yAxisVM.setAutoScale,
        changeFitType: yAxisVM.setPriceAxisFitType,
        setAxisAlign: yAxisVM.setYAxisAlign,
        setAxisType: yAxisVM.setAxisType,
        toggleLockPriceToBarRatio: yAxisVM.toggleLockPriceToBarRatio,
        togglePriceScaleInverse: yAxisVM.togglePriceScaleInverse,
        labelsConfig,
        setLabelMode: yAxisVM.changeLabelMode,
        selectDescription: yAxisVM.setDescription,
        selectCountDownBarClose: yAxisVM.setCountDownBarClose,
        yAxisDict: localization.yAxis,
        showRestoreToDefault,
        onRestoreDefaultRequest,
    });
}));
export default ChartSettingsChartTypeScalesContainer;
