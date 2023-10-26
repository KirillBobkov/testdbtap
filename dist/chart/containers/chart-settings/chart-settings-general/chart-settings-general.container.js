import { deepEqual } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
import { createElement, useCallback, useContext, useMemo } from 'react';
import { context } from '../../../../context/context2';
import { namedMemo } from '../../../../utils/named-memo';
import { useDirectProperty, useProperty } from '../../../../utils/use-property';
import { MultiChartComponentContext } from '../../../components/multi-chart/multi-chart-context';
import { getChartTypeGeneralSettingsDefaultConfig } from './chart-type-general-settings.config';
import { ChartSettingsTabGeneralContent } from '../../../components/chart-settings/chart-settings-general/chart-settings-tab-general.component';
export const ChartSettingsGeneralContainer = context.combine(context.key()('chartConfiguratorViewModel'), context.key()('chartTypeViewModel'), (chartConfiguratorVM, chartTypeVM) => namedMemo('ChartSettingsGeneralContainer', props => {
    const { localization } = useContext(MultiChartComponentContext);
    const settings = useDirectProperty(chartConfiguratorVM.state, ['settings']);
    const { defaultConfig, a11yTabProps } = props;
    const chartType = useProperty(chartTypeVM.type);
    const selectedChartTypeGeneralSettingsDefaultConfig = useMemo(() => getChartTypeGeneralSettingsDefaultConfig(chartType, settings, defaultConfig), []);
    const showRestoreToDefault = useMemo(() => !deepEqual(selectedChartTypeGeneralSettingsDefaultConfig, settings), [settings, selectedChartTypeGeneralSettingsDefaultConfig]);
    const onRestoreDefaultRequest = useCallback(() => chartConfiguratorVM.onRestoreDefaultConfigTab(selectedChartTypeGeneralSettingsDefaultConfig), [selectedChartTypeGeneralSettingsDefaultConfig]);
    return createElement(ChartSettingsTabGeneralContent, {
        chartType,
        showRestoreToDefault,
        localization,
        onValueChange: chartConfiguratorVM.setSettingsByPath,
        value: settings,
        onRestoreDefaultRequest,
        a11yTabProps,
    });
}));
export default ChartSettingsGeneralContainer;
