import { context } from '../../context/context2';
import { createElement } from 'react';
import { useDirectProperty, useProperty } from '../../utils/use-property';
import { namedMemo } from '../../utils/named-memo';
import { importIdle } from '../../utils/react.utils';
const NotificationsComponent = importIdle(() => import('../components/notifications-component/notifications.component'));
export const NotificationsContainer = context.combine(context.key()('notificationVM'), context.key()('userDataViewModel'), (vm, userDataViewModel) => namedMemo('NotificationsContainer', () => {
    const notification = useProperty(vm.notification);
    const isSidebarExpanded = useDirectProperty(userDataViewModel.userData, ['isSidebarExpanded']);
    return createElement(NotificationsComponent, {
        hideNotification: vm.hideNotification,
        notification,
        isSidebarExpanded,
    });
}));
