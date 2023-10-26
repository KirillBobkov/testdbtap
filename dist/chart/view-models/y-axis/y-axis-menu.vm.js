import { merge } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { context } from '../../../context/context2';
import { newSink } from '../../../context/sink2';
import { createPropertyAdapter } from '../../../utils/property.utils';
export const createYAxisMenuViewModel = context.combine(context.key()('chart'), chart => {
    const [setIsOpened, isOpened] = createPropertyAdapter(false);
    const [setMenuPosition, menuPosition] = createPropertyAdapter({ x: 0, y: 0 });
    const closeMenu = () => setIsOpened(false);
    const openMenuOnRightClickEffect = merge(chart.canvasInputListener.observeLongTouch(), chart.canvasInputListener.observeContextMenu().pipe()).pipe(filter(() => {
        return (Object.values(chart.paneManager.panes)
            .flatMap(p => p.yExtentComponents)
            .find(extent => extent.yAxisHT(chart.canvasInputListener.currentPoint.x, chart.canvasInputListener.currentPoint.y)) !== undefined && chart.config.components.yAxis.visible);
    }), tap(() => {
        setMenuPosition({ ...chart.canvasInputListener.currentPointDocument });
        setIsOpened(true);
    }));
    const effects = merge(openMenuOnRightClickEffect);
    return newSink({
        isOpened,
        menuPosition,
        closeMenu,
    }, effects);
});
