import { createElement, useContext, useMemo, useCallback } from 'react';
import { context } from '../../../../context/context2';
import { namedMemo } from '../../../../utils/named-memo';
import { deepEqual } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
import { useDirectProperty } from '../../../../utils/use-property';
import { MultiChartComponentContext } from '../../../components/multi-chart/multi-chart-context';
import { ChartSettingsTabEventsContent } from '../../../components/chart-settings/chart-settings-events/chart-settings-tab-events.component';
export const ChartSettingsEventsContainer = context.combine(context.key()('chartConfiguratorViewModel'), chartConfiguratorVM => namedMemo('ChartSettingsEventsContainer', props => {
    const { localization } = useContext(MultiChartComponentContext);
    const settings = useDirectProperty(chartConfiguratorVM.state, ['settings', 'chartCore']);
    const { defaultConfig } = props;
    const showRestoreToDefault = useMemo(() => !deepEqual(defaultConfig.chartCore, settings), [settings, defaultConfig]);
    const onRestoreDefaultRequest = useCallback(() => chartConfiguratorVM.onRestoreDefaultConfigTab(defaultConfig), [defaultConfig]);
    return createElement(ChartSettingsTabEventsContent, {
        showRestoreToDefault,
        localization,
        onValueChange: chartConfiguratorVM.setSettingsByPath,
        value: settings,
        a11yTabProps: props.a11yTabProps,
        onRestoreDefaultRequest,
    });
}));
export default ChartSettingsEventsContainer;
