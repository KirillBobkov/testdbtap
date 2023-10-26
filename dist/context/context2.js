import { memoOnce } from '@devexperts/dxcharts-lite/dist/chart/utils/performance/memoize.utils';
import { array } from 'fp-ts';
import { sequenceT } from 'fp-ts/Apply';
import { eqStrict } from 'fp-ts/Eq';
import { map as readerMap } from 'fp-ts/Reader';
import { getReaderM } from 'fp-ts/ReaderT';
import { constNull, pipe } from 'fp-ts/function';
import React, { useEffect } from 'react';
import { deferReader } from '../utils/adt/reader.utils';
import { instanceSink, sink } from '../utils/sink';
import { waitIdle } from '../utils/browser-api.utils';
export const URI = '@devexperts/dx-utils//Context';
const memo = memoOnce(eqStrict);
export const instanceContext = {
    URI,
    ...getReaderM(instanceSink),
    productLeft: (fa, fb) => e => sink.sequenceT(fa(e), fb(e)),
};
const sequenceT_ = sequenceT(instanceContext);
const sequenceArray = array.sequence(instanceContext);
const defer = (fa, ...keys) => pipe(deferReader(fa, ...keys), readerMap(instanceSink.of));
const combine = (...args) => {
    const last = args.length - 1;
    // eslint-disable-next-line no-restricted-syntax
    const fas = sequenceArray(args.slice(0, last)); // guaranteed by ProductMap
    // eslint-disable-next-line no-restricted-syntax
    const project = memo(args[last]); // guaranteed by ProductMap
    return instanceContext.map(fas, as => project(...as));
};
const key = () => (key) => e => sink.of(e[key]);
/**
 * Extracts all objects from context on this level.
 * @doc-tags tricky
 */
const extract = e => sink.of(e);
const ifInitialized = (arg) => 
// @ts-ignore
(e) => {
    const ctx = sink.of(e);
    // @ts-ignore
    if (ctx.value.initialized) {
        // @ts-ignore
        return arg(ctx.value);
    }
    return ctx;
};
/**
 * Allows to load context lazily if the context returns react component.
 * @param contextPromise - function that returns promise of context (usually dynamic import)
 * @param fallback - fallback component
 * @returns - context, but lazy
 */
export const lazy = (contextPromise, fallback = constNull, waitFor = waitIdle) => {
    let loadedCtx = undefined;
    const loaded = waitFor()
        .then(() => contextPromise())
        .then(module => {
        loadedCtx = module.default;
    });
    return e => {
        return sink.of(props => {
            useEffect(() => {
                loaded.then(() => {
                    loadedCtx && setComponent(loadedCtx(e).value);
                });
            }, []);
            const [Component, setComponent] = React.useState(() => loadedCtx?.(e).value ?? fallback);
            return React.createElement(Component, props);
        });
    };
};
/**
 * Context reader functions.
 * @doc-tags fp
 */
export const context = {
    ...instanceContext,
    ...pipe(instanceContext),
    sequenceT: sequenceT_,
    sequenceArray,
    combine,
    defer,
    key,
    extract,
    ifInitialized,
    lazy,
};
