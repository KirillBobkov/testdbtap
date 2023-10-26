import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { context } from '../../../context/context2';
import { newSink } from '../../../context/sink2';
import { createPropertyAdapter } from '../../../utils/property.utils';
export const createChartLegendMenuViewModel = context.combine(context.key()('chart'), context.key()('chartLegendVM'), (chart, chartLegendVM) => {
    const [setIsOpened, isOpened] = createPropertyAdapter(false);
    const [setMenuPosition, menuPosition] = createPropertyAdapter({ x: 0, y: 0 });
    const closeMenu = () => setIsOpened(false);
    const openMenuOnRightClickEffect = chartLegendVM.contextMenuSubject.pipe(tap(e => {
        e.preventDefault();
        setMenuPosition({ ...chart.canvasInputListener.currentPointDocument });
        setIsOpened(true);
    }));
    const effects = merge(openMenuOnRightClickEffect);
    return newSink({
        isOpened,
        closeMenu,
        menuPosition,
    }, effects);
});
