import { combine, elem, exists, failure, fold, getEq, getMonoid, getOrElse, getSemigroup, initial, isFailure, isInitial, isPending, isSuccess, pending, remoteDataInstance as rdDX, success, toOption, fromProgressEvent, progress, } from './adt/remote-data.adt';
import { pipeable } from 'fp-ts/pipeable';
import { apply } from 'fp-ts';
import { constVoid } from 'fp-ts/function';
const URI = rdDX.URI;
const foldableValueRemoteData = {
    URI,
    foldMap: rdDX.foldMap,
    foldValue: (fa, onNever, onValue) => (isSuccess(fa) ? onValue(fa.value) : onNever(fa)),
    reduce: (fa, b, f) => (isSuccess(fa) ? f(b, fa.value) : b),
    reduceRight: (fa, b, f) => (isSuccess(fa) ? f(fa.value, b) : b),
};
const monadThrowRemoteData = {
    URI,
    ap: rdDX.ap,
    chain: rdDX.chain,
    map: rdDX.map,
    of: rdDX.of,
    throwError: failure,
};
export const instanceRemoteData = {
    ...rdDX,
    ...foldableValueRemoteData,
    ...monadThrowRemoteData,
};
export const toVoid = (rd) => {
    return remoteData.map(constVoid)(rd);
};
/**
 * Remote data functions.
 * @doc-tags fp
 */
export const remoteData = {
    // TODO: find actual type instead of deprecated
    ...pipeable(instanceRemoteData),
    remoteData: instanceRemoteData,
    initial,
    success,
    failure,
    pending,
    isSuccess,
    isFailure,
    isPending,
    isInitial,
    combine,
    toOption,
    elem,
    exists,
    getOrElse,
    getEq,
    getMonoid,
    getSemigroup,
    fold,
    combineS: apply.sequenceS(instanceRemoteData),
    toVoid,
    progress,
    fromProgressEvent,
};
