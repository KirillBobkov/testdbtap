import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { context } from '../../../context/context2';
import { windowGlobal } from '../../../utils/debug/chart-window-global';
import { namedMemo } from '../../../utils/named-memo';
import { useProperty } from '../../../utils/use-property';
import { LocalChartContext } from '../../model/local-chart-context.model';
import { CreateEffects } from '../../view-models/global-effects/create-effects';
import { ChartLegendContainer } from '../chart-legend/chart-legend.container';
import { ChartPaneContainer } from '../chart-pane.container';
import { DrawingSettingsToolbarContainer } from '../drawing-settings-toolbar.container';
import { EventPopoverContainer } from '../event-popover.container';
import { ChartNewsContainer } from '../news/chart-news.container';
import { TextDrawingContainer } from '../text-drawing.container';
import { TradingContainer } from '../trading.container';
import { ZoomingToolContainer } from '../zooming-tool.container';
import { ChartContainerStyled } from './chart-container.styled';
import { RightClickMenusContainer } from '../right-click-menus/right-click-menus.container';
import { ExecutedOrdersContainer } from '../executed-orders/executed-orders.container';
/**
 * Composes all containers for chart. Renders single chart and utility containers.
 * Requires view-models to function properly.
 */
export const ChartContainer = context.combine(CreateEffects, ChartLegendContainer, EventPopoverContainer, TradingContainer, DrawingSettingsToolbarContainer, TextDrawingContainer, ZoomingToolContainer, ChartNewsContainer, ChartPaneContainer, RightClickMenusContainer, ExecutedOrdersContainer, context.key()('dataLoaderVM'), context.key()('multiChartViewModel'), context.key()('chart'), context.extract, (CreateEffects, ChartLegendContainer, EventPopoverContainer, TradingContainer, DrawingSettingsToolbarContainer, TextDrawingContainer, ChartZoomingToolContainer, ChartNewsContainer, ChartPaneContainer, RightClickMenusContainer, ExecutedOrdersContainer, dataLoaderVM, multiChartViewModel, chart, ctx) => namedMemo('ChartContainer', () => {
    const canvasChartContainer = chart.parentElement;
    const chartId = chart.id;
    const isLoading = useProperty(dataLoaderVM.isLoading);
    const containerRef = useRef(null);
    useEffect(() => {
        const sub = CreateEffects.subscribe();
        return () => sub.unsubscribe();
    }, []);
    useLayoutEffect(() => {
        if (containerRef.current && !canvasChartContainer['__isProxy']) {
            containerRef.current.prepend(canvasChartContainer);
        }
    }, [containerRef, canvasChartContainer]);
    const handleClickCapture = useCallback(() => multiChartViewModel.setSelectedChartId(chartId), [chartId]);
    windowGlobal.chartVMS(chartId, ctx);
    return (React.createElement(LocalChartContext.Provider, { value: { containerRef } },
        React.createElement(ChartContainerStyled, { onClickCapture: handleClickCapture, "data-chart-container": "true", isLoading: isLoading, ref: containerRef },
            React.createElement(ChartLegendContainer, { id: chartId }),
            React.createElement(EventPopoverContainer, null),
            React.createElement(TradingContainer, null),
            React.createElement(DrawingSettingsToolbarContainer, null),
            React.createElement(TextDrawingContainer, null),
            React.createElement(ChartZoomingToolContainer, null),
            React.createElement(ChartNewsContainer, null),
            React.createElement(ChartPaneContainer, null),
            React.createElement(RightClickMenusContainer, null),
            React.createElement(ExecutedOrdersContainer, null))));
}));
export default ChartContainer;
