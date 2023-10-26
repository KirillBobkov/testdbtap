import { useEffect, useMemo } from 'react';
import { constVoid } from 'fp-ts/function';
import { instanceObservable } from './observable';
const observerVoid = {
    next: constVoid,
    end: constVoid,
};
export function dxUseSink(Ms) {
    return (factory, dependencies, subscribeEffects = true) => {
        const sa = useMemo(factory, [...dependencies, subscribeEffects]);
        useEffect(() => {
            if (subscribeEffects) {
                const subscription = Ms.subscribe(sa.effects, observerVoid);
                return () => subscription.unsubscribe();
            }
            else {
                return;
            }
        }, [sa, subscribeEffects]);
        return sa.value;
    };
}
export const useSink = dxUseSink(instanceObservable);
