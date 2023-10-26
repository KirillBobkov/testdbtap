import { merge } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { context } from '../../../context/context2';
import { newSink } from '../../../context/sink2';
import { createPropertyAdapter } from '../../../utils/property.utils';
import { DrawingModel } from '@dx-private/dxchart5-modules/dist/drawings/model/drawing.model';
export const createDrawingsMenuViewModel = context.combine(context.key()('chart'), chart => {
    const [setIsOpened, isOpened] = createPropertyAdapter(false);
    const [setMenuPosition, menuPosition] = createPropertyAdapter({ x: 0, y: 0 });
    const closeMenu = () => setIsOpened(false);
    const openMenuOnRightClickEffect = chart.hitTestCanvasModel.observeRightClickOnElement().pipe(filter(ev => ev.model instanceof DrawingModel), tap(ev => {
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
