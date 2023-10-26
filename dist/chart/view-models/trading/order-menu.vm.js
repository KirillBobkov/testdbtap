import { merge } from 'rxjs';
import { context } from '../../../context/context2';
import { newSink } from '../../../context/sink2';
import { createPropertyAdapter } from '../../../utils/property.utils';
export const createOrderMenuViewModel = context.combine(context.key()('chart'), chart => {
    const [setIsOpened, isOpened] = createPropertyAdapter(false);
    const [setMenuPosition, menuPosition] = createPropertyAdapter({ x: 0, y: 0 });
    const closeMenu = () => setIsOpened(false);
    setMenuPosition({ x: 0, y: 0 });
    // const openMenuOnRightClickEffect = chartLegendVM.contextMenuSubject.pipe(
    // 	tap(e => {
    // 		e.preventDefault();
    // 		setMenuPosition({ ...chart.canvasInputListener.currentPointDocument });
    // 		setIsOpened(true);
    // 	}),
    // );
    const effects = merge();
    return newSink({
        isOpened,
        closeMenu,
        menuPosition,
    }, effects);
});
