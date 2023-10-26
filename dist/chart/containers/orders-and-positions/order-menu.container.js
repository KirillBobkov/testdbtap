import { createElement } from 'react';
import { context } from '../../../context/context2';
import { useProperty } from '../../../utils/react.utils';
import { useSink } from '../../../utils/use-sink';
import { OrderMenu } from '../../components/trading/order-menu.component';
import { createOrderMenuViewModel } from '../../view-models/trading/order-menu.vm';
export const OrderMenuContainer = context.combine(createOrderMenuViewModel, orderMenuVMSink => () => {
    const orderMenuVM = useSink(() => orderMenuVMSink, []);
    const isOpened = useProperty(orderMenuVM.isOpened);
    const position = useProperty(orderMenuVM.menuPosition);
    return createElement(OrderMenu, { isOpened, position, onClose: orderMenuVM.closeMenu });
});
