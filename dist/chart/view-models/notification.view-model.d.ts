import { Property } from '../../utils/property.utils';
import { Localization } from '../../config/localization/localization';
import { Option } from 'fp-ts/Option';
import { Sink } from '../../utils/sink';
export interface ChartNotification {
    readonly message: string;
    readonly displayTime: number;
}
export interface ChartNotificationOptions {
    readonly displayTime?: number;
}
export interface NotificationViewModel {
    readonly sendNotification: (msg: string, options?: ChartNotificationOptions) => void;
    readonly hideNotification: () => void;
    readonly notification: Property<Option<ChartNotification>>;
}
export declare const createNotificationViewModel: import("../../context/context2").Context<Record<"localization", Localization>, Sink<NotificationViewModel>>;
