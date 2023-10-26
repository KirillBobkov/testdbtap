import { deepEqual } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
import { createElement, useCallback, useContext, useMemo } from 'react';
import { context } from '../../../../context/context2';
import { namedMemo } from '../../../../utils/named-memo';
import { useDirectProperty, useProperty } from '../../../../utils/use-property';
import { MultiChartComponentContext } from '../../../components/multi-chart/multi-chart-context';
import { ChartSettingsTabMarketContent } from '../../../components/chart-settings/chart-settings-market/chart-settings-market.component';
export const ChartSettingsMarketContainer = context.combine(context.key()('chartConfiguratorViewModel'), context.key()('chart'), context.key()('chartReactConfig'), (chartConfiguratorVM, chart, chartReactConfig) => namedMemo('ChartSettingsMarketContainer', props => {
    const { localization } = useContext(MultiChartComponentContext);
    const { a11yTabProps, defaultConfig } = props;
    const sessionBreaksDisabled = useProperty(chartConfiguratorVM.sessionBreaksDisabled);
    const settings = useDirectProperty(chartConfiguratorVM.state, ['settings']);
    const volumesDisabled = chart.volumes?.getState() === 'disabled';
    const showRestoreToDefault = useMemo(() => !deepEqual(defaultConfig, settings), [settings, defaultConfig]);
    const onRestoreDefaultRequest = useCallback(() => chartConfiguratorVM.onRestoreDefaultConfigTab(defaultConfig), [defaultConfig]);
    return createElement(ChartSettingsTabMarketContent, {
        localization,
        showRestoreToDefault,
        a11yTabProps,
        volumesDisabled,
        sessionBreaksDisabled,
        onValueChange: chartConfiguratorVM.setSettingsByPath,
        onRestoreDefaultRequest,
        value: settings,
        chartReactConfig,
    });
}));
export default ChartSettingsMarketContainer;
