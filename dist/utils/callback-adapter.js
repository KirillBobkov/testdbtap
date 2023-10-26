import { tap } from 'rxjs/operators';
import { createPropertyAdapter } from './property.utils';
export const createCallbackAdapter = (initial, cmp = (a, b) => a === b) => {
    const [setValue, value] = createPropertyAdapter(initial, cmp);
    const subscribers = new Set();
    const registerCallback = (callback) => subscribers.add(callback);
    const unregisterCallback = (callback) => subscribers.delete(callback);
    const handleCallbacksEffect = value.pipe(tap(value => subscribers.forEach(cb => cb(value))));
    return {
        setValue,
        value,
        registerCallback,
        unregisterCallback,
        handleCallbacksEffect,
    };
};
