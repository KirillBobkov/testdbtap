import { pipe } from 'fp-ts/function';
import { createElement, useCallback, useContext, useMemo } from 'react';
import { mapPositionToCoordinates } from '../../chart-kit/Popover/Popover.model';
import { context } from '../../context/context2';
import { getCoords } from '../../utils/coordinates.utils';
import { react } from '../../utils/react.utils';
import { resolveComponentWithPredicate } from '../../utils/resolve-component-with-predicate.utils';
import { useProperty } from '../../utils/use-property';
import { ChartLayers } from '../components/chart-layers/chart-layers.component';
import { ChartReactAppContext } from '../defaults';
const CHART_LAYERS_POPOVER_WIDTH = 176;
const percentPositionInPixels = (pos, rootElement) => {
    // Get shift in pixels to place drawing on chart
    const rootBounds = getCoords(rootElement);
    const top = (pos.top * rootBounds.height) / 100 + rootBounds.top;
    const left = (pos.left * (rootBounds.width - CHART_LAYERS_POPOVER_WIDTH)) / 100 + rootBounds.left;
    return { top, left };
};
const pixelsPositionInPercent = (pos, rootElement) => {
    // Get shift in percents and update state to save in layout
    const rootBounds = getCoords(rootElement);
    const top = ((pos.top - rootBounds.top) / rootBounds.height) * 100;
    const left = ((pos.left - rootBounds.left) / (rootBounds.width - CHART_LAYERS_POPOVER_WIDTH)) * 100;
    return { top, left };
};
export const ChartLayersPopoverContainer = context.combine(context.key()('chartLayersViewModel'), context.key()('chartReactConfig'), context.key()('multiChartViewModel'), context.key()('userDataViewModel'), context.key()('localization'), (chartLayersViewModel, chartReactConfig, multiChartViewModel, userDataViewModel, localization) => resolveComponentWithPredicate(chartReactConfig.layers.enabled, react.namedMemo('ChartLayersPopoverContainer', () => {
    const { rootElement } = useContext(ChartReactAppContext);
    const bounds = rootElement.getBoundingClientRect();
    const customPosition = react.useDirectProperty(userDataViewModel.userData, [
        'positions',
        'chartLayersPopover',
    ]);
    const pixelsCustomPosition = useMemo(() => pipe(percentPositionInPixels(customPosition, rootElement), mapPositionToCoordinates), [customPosition]);
    const layerItems = useProperty(chartLayersViewModel.layerItems);
    const isOpened = useProperty(multiChartViewModel.chartLayersPopoverOpened);
    const updatePopoverCustomPosition = useCallback((coordinates) => {
        const percentPosition = pixelsPositionInPercent(mapCoordinatesToPosition(coordinates), rootElement);
        userDataViewModel.updateWidgetPosition('chartLayersPopover', percentPosition);
    }, [rootElement]);
    return createElement(ChartLayers, {
        updatePopoverCustomPosition,
        customPosition: pixelsCustomPosition,
        layerItems,
        bounds,
        createGroup: chartLayersViewModel.createGroupOnSelectedItems,
        setItemVisible: chartLayersViewModel.setItemVisible,
        setItemLocked: chartLayersViewModel.setItemLock,
        renameItem: chartLayersViewModel.renameItem,
        moveItemDnD: chartLayersViewModel.moveItemDnD,
        deleteItem: chartLayersViewModel.deleteItem,
        isOpened,
        setOpened: multiChartViewModel.setChartLayersPopoverOpened,
        localization,
    });
})));
function mapCoordinatesToPosition(coordinates) {
    return { top: coordinates.y, left: coordinates.x };
}
