import { context } from '../../context/context2';
import { createElement } from 'react';
import { createEventDataViewModel } from '../view-models/events-data.view-model';
import { EventPopover } from '../components/event-popover/event-popover.component';
import { namedMemo } from '../../utils/named-memo';
import { useSink } from '../../utils/use-sink';
import { useProperty } from '../../utils/use-property';
import { CanvasElement } from '@devexperts/dxcharts-lite/dist/chart/canvas/canvas-bounds-container';
export const EventPopoverContainer = context.combine(createEventDataViewModel, context.key()('chart'), (createEventDataViewModel, chart) => namedMemo('EventPopoverContainer', () => {
    const vm = useSink(() => createEventDataViewModel, []);
    const hoveredTarget = useProperty(vm.hoveredTarget);
    const chartBounds = chart.canvasBoundsContainer.getBounds(CanvasElement.CHART_WITH_Y_AXIS);
    const eventsPopoverBounds = {
        top: chartBounds.pageY,
        left: chartBounds.pageX,
        width: chartBounds.width,
        height: chartBounds.height,
    };
    return createElement(EventPopover, {
        event: hoveredTarget,
        bounds: eventsPopoverBounds,
    });
}));
