import { deepEqual } from '@devexperts/dxcharts-lite/dist/chart/utils/object.utils';
import { constVoid } from 'fp-ts/function';
import React, { createElement, useEffect, useMemo, useRef, useState } from 'react';
import { CHART_REACT_PRODUCTION_MODE } from '../config/build-config';
import { waitIdle } from './browser-api.utils';
import { valueByPath } from './get-value-by-path.util';
import { instanceObservable } from './observable';
import { createProfileFC } from './react-performance.utils';
import { typedMemo } from './typed-memo';
export const namedMemo = (name, Component, propsAreEqual) => {
    Component.displayName = name;
    if (!CHART_REACT_PRODUCTION_MODE) {
        const profileFC = createProfileFC(name, Component);
        // eslint-disable-next-line no-restricted-syntax
        return React.memo(profileFC, propsAreEqual);
    }
    return React.memo(Component, propsAreEqual);
};
export const namedMemoRef = (name, Component) => {
    const frComponent = React.forwardRef(Component);
    frComponent.displayName = name;
    // eslint-disable-next-line no-restricted-syntax
    return React.memo(frComponent);
};
const observerVoid = {
    next: constVoid,
    end: constVoid,
};
export function dxUseSink(Ms) {
    return (factory, dependencies) => {
        const sa = useMemo(factory, dependencies);
        useEffect(() => {
            const subscription = Ms.subscribe(sa.effects, observerVoid);
            return () => subscription.unsubscribe();
        }, [sa]);
        return sa.value;
    };
}
export const useObservable = (fa, initial) => {
    const [value, setValue] = useState(() => initial);
    useEffect(() => {
        const subscription = fa.subscribe(a => setValue(() => a));
        return () => subscription.unsubscribe();
    }, [fa]);
    return value;
};
export const useProperty = (fa) => {
    return useObservable(fa, fa.getValue());
};
export function useDirectObservable(fa, initial, path) {
    const [value, setValue] = useState(() => initial);
    const ref = useRef(value);
    useEffect(() => {
        const subscription = fa.subscribe(a => {
            // ignore state toggle functions and allow passing functions in Observable
            // @ts-ignore
            const newValue = valueByPath(a, path);
            // if we use directly value inside the subscription, it will recreate the sub on each value change
            // @ts-ignore
            if (typeof newValue === 'object' ? !deepEqual(newValue, ref.current) : newValue !== ref.current) {
                ref.current = newValue;
                setValue(() => newValue);
            }
        });
        return () => subscription.unsubscribe();
    }, [fa, path]);
    return value;
}
export function useDirectProperty(fa, path) {
    // @ts-ignore
    return react.useDirectObservable(fa, valueByPath(fa.getValue(), path), path);
}
//Use this function for changing html element value instead of just directly change innerHTML property
// using innerHTML property invokes hidden html element recreating
export const setDirectHTMLValue = (node, value) => node.childNodes[0] ? (node.childNodes[0].nodeValue = value) : (node.textContent = value);
/**
 * A wrapper for idle react component imports.
 * The import & render will be performed only when chart has finished initialization (wait until idle).
 * @argument componentPromise - a lazy import - `() => import('component')`
 */
export const importIdle = (componentPromise, waitFor = waitIdle) => {
    let memoizedComponent = null;
    // it's needed to request component even if it's not opened, but it will be needed in future
    // so we avoid flickering, when the actual component renders
    const loaded = waitFor()
        .then(() => componentPromise())
        .then(module => {
        memoizedComponent = module.default;
    });
    return (props) => {
        useEffect(() => {
            loaded.then(() => {
                setComponent(() => memoizedComponent);
            });
        }, []);
        const [Component, setComponent] = useState(() => memoizedComponent);
        return Component !== null ? createElement(Component, props) : null;
    };
};
/**
 * React functions library.
 * @doc-tags fp,react
 */
export const react = {
    namedMemo,
    namedMemoRef,
    useSink: dxUseSink(instanceObservable),
    useObservable,
    useProperty,
    useDirectObservable,
    useDirectProperty,
    typedMemo,
};
