import { createElement, useCallback, useMemo } from 'react';
import { context } from '../../../../context/context2';
import { namedMemo } from '../../../../utils/named-memo';
import { deepEqual } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
import { useDirectProperty } from '../../../../utils/use-property';
import { ChartSettingsPaddingsContent } from '../../../components/chart-settings/chart-settings-paddings/chart-settings-paddings.component';
export const ChartSettingsPaddingsContainer = context.combine(context.key()('chartConfiguratorViewModel'), chartConfiguratorVM => namedMemo('ChartSettingsPaddingsContainer', props => {
    const settings = useDirectProperty(chartConfiguratorVM.state, ['settings']);
    const { defaultConfig } = props;
    const showRestoreToDefault = useMemo(() => !deepEqual(defaultConfig, settings), [settings, defaultConfig]);
    const onRestoreDefaultRequest = useCallback(() => chartConfiguratorVM.onRestoreDefaultConfigTab(defaultConfig), [defaultConfig]);
    return createElement(ChartSettingsPaddingsContent, {
        showRestoreToDefault,
        onValueChange: chartConfiguratorVM.setSettingsByPath,
        value: settings,
        a11yTabProps: props.a11yTabProps,
        onRestoreDefaultRequest,
    });
}));
export default ChartSettingsPaddingsContainer;
