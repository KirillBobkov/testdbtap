import { pipe } from 'fp-ts/function';
import { fromEvent, merge } from 'rxjs';
import { observable } from 'fp-ts-rxjs';
import { createPropertyAdapter } from '../../utils/property.utils';
import { newSink } from '../../context/sink2';
/**
 * Controls that browser has internet.
 */
export const createBrowserApiViewModel = () => {
    const [setIsOnline, isOnline] = createPropertyAdapter(window.navigator.onLine);
    const updateIsOnlineEffect$ = pipe(merge(fromEvent(window, 'online'), fromEvent(window, 'offline')), observable.map(() => setIsOnline(window.navigator.onLine)));
    const effects$ = merge(updateIsOnlineEffect$);
    return newSink({
        isOnline,
    }, effects$);
};
