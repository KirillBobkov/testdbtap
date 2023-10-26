import { createElement } from 'react';
import { context } from '../../../context/context2';
import { useProperty } from '../../../utils/react.utils';
import { useSink } from '../../../utils/use-sink';
import { PositionMenu } from '../../components/trading/position-menu.component';
import { createPositionMenuViewModel } from '../../view-models/trading/position-menu.vm';
export const PositionMenuContainer = context.combine(createPositionMenuViewModel, positionMenuVMSink => () => {
    const positionMenuVM = useSink(() => positionMenuVMSink, []);
    const isOpened = useProperty(positionMenuVM.isOpened);
    const position = useProperty(positionMenuVM.menuPosition);
    return createElement(PositionMenu, { isOpened, position, onClose: positionMenuVM.closeMenu });
});
