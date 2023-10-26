import { getLiveDataM } from './adt/live-data.utils';
import { coproductMapLeft } from './typeclasses/product-left-coproduct-left.utils';
import { pipe } from 'fp-ts/function';
import { apply, array } from 'fp-ts';
import { scan, startWith, tap, withLatestFrom } from 'rxjs/operators';
import { observable } from 'fp-ts-rxjs';
import { instanceRemoteData, remoteData } from './remote-data';
import { instanceObservable } from './observable';
const URI = 'LiveData';
const scanLD = (seed, f) => (fa) => pipe(fa, scan((facc, fa) => pipe(remoteData.combine(remoteData.alt(() => remoteData.success(seed))(facc), fa), remoteData.map(([acc, a]) => f(acc, a))), remoteData.success(seed)));
const startWithLD = (a) => startWith(remoteData.success(a));
const tapLD = (f) => tap(a => {
    if (remoteData.isSuccess(a)) {
        f(a.value);
    }
});
const withLatestFromLD = (...inputs) => (source) => 
// @ts-ignore TODO: resolve issue with typing after rxjs updated from 6.5 to 7.5.7
withLatestFrom(...inputs, 
// eslint-disable-next-line no-restricted-syntax
remoteData.combine)(source);
const liveDataM = getLiveDataM(instanceObservable, instanceRemoteData);
const instanceLiveData = { URI, ...liveDataM };
const pipeableLiveData = pipe(instanceLiveData);
export const chainRD = (f) => observable.map(remoteData.chain(f));
export const filterSuccess = (fa) => observable.filterMap(remoteData.toOption)(fa);
/**
 * Folds loaded data into success and error.
 * // TODO add timeout option
 */
const foldWithError = (onSuccess, onError) => (data) => pipe(data, observable.map(rd => {
    if (remoteData.isSuccess(rd)) {
        onSuccess(rd.value);
    }
    else if (remoteData.isFailure(rd)) {
        onError(rd.error);
    }
    return rd;
}));
/**
 * Live data functions.
 * @doc-tags fp
 */
export const liveData = {
    ...instanceLiveData,
    ...pipeableLiveData,
    liveData: instanceLiveData,
    sequenceT: apply.sequenceT(instanceLiveData),
    sequenceArray: array.sequence(instanceLiveData),
    combine: coproductMapLeft(instanceLiveData),
    scan: scanLD,
    startWith: startWithLD,
    withLatestFrom: withLatestFromLD,
    tap: tapLD,
    chainRD,
    combineS: apply.sequenceS(instanceLiveData),
    filterSuccess,
    foldWithError,
};
