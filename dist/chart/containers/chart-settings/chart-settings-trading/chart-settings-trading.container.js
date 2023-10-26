import { deepEqual } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
import { createElement, useCallback, useContext, useMemo } from 'react';
import { context } from '../../../../context/context2';
import { namedMemo } from '../../../../utils/named-memo';
import { useProperty } from '../../../../utils/react.utils';
import { useDirectProperty } from '../../../../utils/use-property';
import { MultiChartComponentContext } from '../../../components/multi-chart/multi-chart-context';
import { ChartSettingsTabTradingContent } from '../../../components/chart-settings/chart-settings-trading/chart-settings-tab-trading.component';
export const ChartSettingsTradingContainer = context.combine(context.key()('chartConfiguratorViewModel'), chartConfiguratorVM => namedMemo('ChartSettingsTradingContainer', props => {
    const { localization } = useContext(MultiChartComponentContext);
    const settings = useDirectProperty(chartConfiguratorVM.state, ['settings', 'chartReact', 'trading']);
    const { defaultConfig } = props;
    const tradingAllowed = useProperty(chartConfiguratorVM.tradingAllowed);
    const showRestoreToDefault = useMemo(() => !deepEqual(defaultConfig.chartReact.trading, settings), [settings, defaultConfig]);
    const onRestoreDefaultRequest = useCallback(() => chartConfiguratorVM.onRestoreDefaultConfigTab(defaultConfig), [defaultConfig]);
    return createElement(ChartSettingsTabTradingContent, {
        showRestoreToDefault,
        localization,
        onValueChange: chartConfiguratorVM.setSettingsByPath,
        settings,
        tradingAllowed,
        a11yTabProps: props.a11yTabProps,
        onRestoreDefaultRequest,
    });
}));
export default ChartSettingsTradingContainer;
