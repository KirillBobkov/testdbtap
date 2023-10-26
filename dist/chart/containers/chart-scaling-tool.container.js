import { createElement } from 'react';
import { context } from '../../context/context2';
import { ChartScalingTool } from '../components/chart-scaling-tool/chart-scaling-tool.component';
import { createChartScalingViewModel } from '../view-models/chart-scaling.view-model';
import { useProperty } from '../../utils/use-property';
import { namedMemo } from '../../utils/named-memo';
import { useSink } from '../../utils/use-sink';
/**
 * Magnifying tool.
 */
export const ChartScalingToolContainer = context.combine(createChartScalingViewModel, context.key()('localization'), (createChartScalingViewModel, localization) => namedMemo('ChartScalingToolContainer', () => {
    const chartScalingViewModel = useSink(() => createChartScalingViewModel, [createChartScalingViewModel]);
    const isZoomBtnEnabled = useProperty(chartScalingViewModel.isZoomOutBtnEnabled);
    return createElement(ChartScalingTool, {
        zoomIn: chartScalingViewModel.zoomIn,
        zoomOut: chartScalingViewModel.zoomOut,
        isZoomBtnEnabled,
        localization: localization.toolbar,
    });
}));
