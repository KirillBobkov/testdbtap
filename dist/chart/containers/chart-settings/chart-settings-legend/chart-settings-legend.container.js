import { deepEqual } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
import { createElement, useCallback, useMemo } from 'react';
import { context } from '../../../../context/context2';
import { namedMemo } from '../../../../utils/named-memo';
import { useDirectProperty } from '../../../../utils/react.utils';
import { ChartSettingsTabLegendContent } from '../../../components/chart-settings/chart-settings-legend/chart-settings-legend.component';
export const ChartSettingsLegendContainer = context.combine(context.key()('chartConfiguratorViewModel'), chartConfiguratorVM => namedMemo('ChartSettingsLegendContainer', props => {
    const legendSettings = useDirectProperty(chartConfiguratorVM.state, ['settings', 'chartReact', 'legend']);
    const chartCoreVolumesVisible = useDirectProperty(chartConfiguratorVM.state, ['settings', 'chartCore', 'components', 'volumes', 'visible']);
    const { defaultConfig } = props;
    const showRestoreToDefault = useMemo(() => !deepEqual(defaultConfig.chartReact.legend, legendSettings), [legendSettings, defaultConfig]);
    const onRestoreDefaultRequest = useCallback(() => chartConfiguratorVM.onRestoreDefaultConfigTab(defaultConfig), [defaultConfig]);
    return createElement(ChartSettingsTabLegendContent, {
        settings: legendSettings,
        onSettingsChange: chartConfiguratorVM.setSettingsByPath,
        a11yTabProps: props.a11yTabProps,
        showRestoreToDefault,
        chartCoreVolumesVisible,
        onRestoreDefaultRequest,
    });
}));
export default ChartSettingsLegendContainer;
