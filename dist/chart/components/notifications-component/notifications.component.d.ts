import React from 'react';
import { ChartNotification } from '../../view-models/notification.view-model';
import { Option } from 'fp-ts/Option';
import { Point } from '@devexperts/dxcharts-lite/dist/chart/inputlisteners/canvas-input-listener.component';
export interface NotificationProps {
    readonly notification: ChartNotification;
    readonly position: Point;
    readonly hideNotification: () => void;
    readonly isSidebarExpanded: boolean;
}
export type NotificationsComponentProps = Omit<NotificationProps, 'notification' | 'position'> & {
    readonly notification: Option<ChartNotification>;
};
export declare const NotificationsComponent: React.NamedExoticComponent<NotificationsComponentProps>;
export default NotificationsComponent;
