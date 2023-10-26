import { createElement } from 'react';
import { context } from '../../../context/context2';
import { useDirectProperty, useProperty } from '../../../utils/react.utils';
import { useSink } from '../../../utils/use-sink';
import { LegendMenu } from '../../components/chart-legend/chart-legend-menu.component';
import { createChartLegendMenuViewModel } from '../../view-models/chart-legend/chart-legend-menu.vm';
export const LegendMenuContainer = context.combine(createChartLegendMenuViewModel, context.key()('chartConfiguratorViewModel'), (chartLegendMenuVMSink, chartConfigVM) => () => {
    const chartLegendMenuVM = useSink(() => chartLegendMenuVMSink, []);
    const legendSettings = useDirectProperty(chartConfigVM.state, ['settings', 'chartReact', 'legend']);
    const chartCoreVolumesVisible = useDirectProperty(chartConfigVM.state, [
        'settings',
        'chartCore',
        'components',
        'volumes',
        'visible',
    ]);
    const isOpened = useProperty(chartLegendMenuVM.isOpened);
    const position = useProperty(chartLegendMenuVM.menuPosition);
    return createElement(LegendMenu, {
        settings: legendSettings,
        chartCoreVolumesVisible,
        isOpened,
        onSettingsChange: chartConfigVM.setSettingsByPath,
        onClose: chartLegendMenuVM.closeMenu,
        position,
    });
});
