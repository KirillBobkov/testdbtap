import { newSink } from '../../context/sink2';
import { context } from '../../context/context2';
import { merge } from 'rxjs';
import { createPropertyAdapter } from '../../utils/property.utils';
import { callTracerProxy } from '../../utils/debug/call-tracer';
import { some } from 'fp-ts/Option';
import { option } from 'fp-ts';
const DEFAULT_NOTIFICATION_OPTIONS = {
    displayTime: 4000,
};
export const createNotificationViewModel = context.combine(context.key()('localization'), () => {
    const [setNotification, notification] = createPropertyAdapter(option.none);
    const sendNotification = (msg, options) => {
        const { displayTime } = { ...DEFAULT_NOTIFICATION_OPTIONS, ...options };
        setNotification(some({
            message: msg,
            displayTime,
        }));
    };
    const hideNotification = () => setNotification(option.none);
    const effects = merge();
    const vm = callTracerProxy('notificationViewModel', {
        notification,
        sendNotification,
        hideNotification,
    });
    return newSink(vm, effects);
});
