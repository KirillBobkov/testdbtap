import { getSink } from './adt/sink.utils';
import { apply, array } from 'fp-ts';
import { pipeable } from 'fp-ts/pipeable';
import { merge } from 'rxjs';
import { instanceObservable } from './observable';
const URI = 'Sink';
const sinkObservable = getSink(instanceObservable);
export const instanceSink = { URI, ...sinkObservable };
const getSemigroup = (S) => ({
    concat: (x, y) => sinkObservable.newSink(S.concat(x.value, y.value), merge(x.effects, y.effects)),
});
const getMonoid = (M) => ({
    ...getSemigroup(M),
    empty: instanceSink.of(M.empty),
});
/**
 * Sink functions.
 * @doc-tags fp
 */
export const sink = {
    ...instanceSink,
    // TODO: find actual type instead of deprecated
    ...pipeable(instanceSink),
    sink: instanceSink,
    sequenceT: apply.sequenceT(instanceSink),
    sequenceS: apply.sequenceS(instanceSink),
    sequenceArray: array.sequence(instanceSink),
    getSemigroup,
    getMonoid,
    newSink: sinkObservable.newSink,
};
