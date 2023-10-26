import { createElement } from 'react';
import { context } from '../../../context/context2';
import { useProperty } from '../../../utils/react.utils';
import { useSink } from '../../../utils/use-sink';
import { createDrawingsMenuViewModel } from '../../view-models/drawings/drawings-menu.vm';
import { DrawingsMenu } from '../../components/drawings/drawings-menu/drawings-menu.component';
export const DrawingsMenuContainer = context.combine(createDrawingsMenuViewModel, drawingsMenuVMSink => () => {
    const drawingsMenuVM = useSink(() => drawingsMenuVMSink, []);
    const isOpened = useProperty(drawingsMenuVM.isOpened);
    const position = useProperty(drawingsMenuVM.menuPosition);
    return createElement(DrawingsMenu, { isOpened, position, onClose: drawingsMenuVM.closeMenu });
});
