import React, { forwardRef, memo, useContext, useEffect, useMemo, useState } from 'react';
import { constNull, constVoid, pipe } from 'fp-ts/function';
import { Popup as DefaultPopup } from '../../../chart-kit/Popup/Popup.lazy-component';
import { NotificationContainerStyled, NotificationStyled } from './notifications.styled';
import { animated, useSpring } from '@react-spring/web';
import { timer } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { ChartReactAppContext } from '../../defaults';
import { option } from 'fp-ts';
import { CHART_REACT_WRAPPER_ID } from '../../chart-react-app.styled';
const PopupUI = memo(
// CHART_REACT_WRAPPER_ID is needed to make css varriables available in scope
forwardRef((props, ref) => (React.createElement("div", { className: `${CHART_REACT_WRAPPER_ID}`, ref: ref }, props.children))));
const Notification = memo(props => {
    const { notification, hideNotification, isSidebarExpanded, position } = props;
    const duration = 250;
    const [animationInProgress, setAnimationInProgress] = useState(false);
    const [styles, startAnimation] = useSpring(() => ({
        config: {
            duration,
        },
        from: { opacity: animationInProgress ? 1 : 0 },
        delay: duration,
    }), [animationInProgress]);
    useEffect(() => {
        setAnimationInProgress(true);
        startAnimation({ opacity: 1 });
        // no need to unsubscribe since timer in this case emits only one value and completes
        const sub = timer(notification.displayTime)
            .pipe(tap(() => startAnimation({ opacity: 0 })), delay(duration), tap(() => {
            setAnimationInProgress(false);
            hideNotification();
        }))
            .subscribe();
        return () => sub.unsubscribe();
    }, [hideNotification, notification, startAnimation]);
    const NotificationContent = (React.createElement(animated.div, { style: styles },
        React.createElement(NotificationStyled, null, notification.message)));
    return (React.createElement(NotificationContainerStyled, { position: position, isSidebarExpanded: isSidebarExpanded }, NotificationContent));
});
export const NotificationsComponent = memo(props => {
    const { notification, hideNotification, isSidebarExpanded } = props;
    const { rootElement } = useContext(ChartReactAppContext);
    const { x, y, width } = rootElement.getBoundingClientRect();
    const notificationPosition = useMemo(() => {
        return {
            x: x + width / 2,
            y: y + 35,
        };
    }, [x, y, width]);
    return pipe(notification, option.fold(constNull, n => (React.createElement(DefaultPopup, { key: 'notification', headerWrapped: false, PopupUI: PopupUI, isOpened: true, onRequestClose: constVoid, container: rootElement },
        React.createElement(Notification, { position: notificationPosition, notification: n, hideNotification: hideNotification, isSidebarExpanded: isSidebarExpanded })))));
});
export default NotificationsComponent;
