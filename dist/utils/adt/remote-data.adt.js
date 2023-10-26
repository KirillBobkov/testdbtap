import { constant, constFalse, identity, pipe } from 'fp-ts/function';
import { fold as foldO, getShow as getShowOption, isNone, isSome, none, some } from 'fp-ts/Option';
import { fold as foldEither, left, right } from 'fp-ts/Either';
import { sequence } from 'fp-ts/Array';
import { sign } from 'fp-ts/Ordering';
import { pipeable } from 'fp-ts/pipeable';
import { Show as ShowNumber } from 'fp-ts/number';
export const URI = 'RemoteData';
//constructors
export const failure = (error) => ({
    _tag: 'RemoteFailure',
    error,
});
export const success = (value) => ({
    _tag: 'RemoteSuccess',
    value,
});
export const pending = {
    _tag: 'RemotePending',
    progress: none,
};
export const progress = (progress) => ({
    _tag: 'RemotePending',
    progress: some(progress),
});
export const initial = {
    _tag: 'RemoteInitial',
};
//filters
/**
 * Returns true only if {@link RemoteData} is {@link RemoteFailure}
 */
export const isFailure = (data) => data._tag === 'RemoteFailure';
/**
 * Returns true only if {@link RemoteData} is {@link RemoteSuccess}
 */
export const isSuccess = (data) => data._tag === 'RemoteSuccess';
/**
 * Returns true only if {@link RemoteData} is {@link RemotePending}
 */
export const isPending = (data) => data._tag === 'RemotePending';
/**
 * Returns true only if {@link RemoteData} is {@link RemoteInitial}
 */
export const isInitial = (data) => data._tag === 'RemoteInitial';
/**
 * Takes a default value as an argument.
 * If this {@link RemoteData} is "Left" part it will return default value.
 * If this {@link RemoteData} is {@link RemoteSuccess} it will return it's value ("wrapped" value, not default value)
 *
 * Note: Default value should be the same type as {@link RemoteData} (internal) value, if you want to pass different type as default, use {@link fold}.
 *
 * @example
 * getOrElse(() => 999)(some(1)) // 1
 * getOrElseValue(() => 999)(initial) // 999
 */
export const getOrElse = (f) => (ma) => isSuccess(ma) ? ma.value : f();
/**
 * Needed for "unwrap" value from {@link RemoteData} "container".
 * It applies a function to each case in the data structure.
 *
 * @example
 * const onInitial = () => "it's initial"
 * const onPending = () => "it's pending"
 * const onFailure = (err) => "it's failure"
 * const onSuccess = (data) => `${data + 1}`
 * const f = fold(onInitial, onPending, onFailure, onSuccess)
 *
 * f(initial) // "it's initial"
 * f(pending) // "it's pending"
 * f(failure(new Error('error text'))) // "it's failure"
 * f(success(21)) // '22'
 */
export const fold = (onInitial, onPending, onFailure, onSuccess) => (ma) => {
    switch (ma._tag) {
        case 'RemoteInitial': {
            return onInitial();
        }
        case 'RemotePending': {
            return onPending(ma.progress);
        }
        case 'RemoteFailure': {
            return onFailure(ma.error);
        }
        case 'RemoteSuccess': {
            return onSuccess(ma.value);
        }
    }
};
/**
 * A more concise way to "unwrap" values from {@link RemoteData} "container".
 * It uses fold in its implementation, collapsing `onInitial` and `onPending` on the `onNone` handler.
 * When fold's `onInitial` returns, `onNode` is called with `none`.
 *
 * @example
 * const onNone = (progressOption) => "no data to show"
 * const onFailure = (err) => "sorry, the request failed"
 * const onSuccess = (data) => `result is: ${data + 1}`
 * const f = fold(onInitial, onPending, onFailure, onSuccess)
 *
 * f(initial) // "no data to show"
 * f(pending) // "no data to show"
 * f(failure(new Error('error text'))) // "sorry, the request failed"
 * f(success(21)) // "result is: 22"
 */
export const fold3 = (onNone, onFailure, onSuccess) => fold(() => onNone(none), onNone, onFailure, onSuccess);
/**
 * One more way to fold (unwrap) value from {@link RemoteData}.
 * `Left` part will return `null`.
 * {@link RemoteSuccess} will return value.
 *
 * For example:
 *
 * `success(2).toNullable() will return 2`
 *
 * `initial.toNullable() will return null`
 *
 * `pending.toNullable() will return null`
 *
 * `failure(new Error('error text)).toNullable() will return null`
 *
 */
export const toNullable = (ma) => (isSuccess(ma) ? ma.value : null);
export const toUndefined = (ma) => (isSuccess(ma) ? ma.value : undefined);
export function fromOption(option, error) {
    if (isNone(option)) {
        return failure(error());
    }
    else {
        return success(option.value);
    }
}
/**
 * Convert {@link RemoteData} to {@link Option}
 * `Left` part will be converted to {@link None}.
 * {@link RemoteSuccess} will be converted to {@link Some}.
 *
 * @example
 * toOption(success(2)) // some(2)
 * toOption(initial) // none
 * toOption(pending) // none
 * toOption(failure(new Error('error text'))) // none
 */
export function toOption(data) {
    return data._tag === 'RemoteSuccess' ? some(data.value) : none;
}
/**
 * Creates {@link RemoteData} from {@link Either}
 */
// eslint-disable-next-line no-restricted-syntax
export const fromEither = foldEither(failure, success);
/**
 * Convert {@link RemoteData} to `Either`.
 * `Left` part will be converted to `Left<L>`.
 * Since {@link RemoteInitial} and {@link RemotePending} do not have `L` values,
 * you must provide a value of type `L` that will be used to construct
 * the `Left<L>` for those two cases.
 * {@link RemoteSuccess} will be converted to `Right<R>`.
 *
 * @example:
 * const f = toEither(
 * 		() => new Error('Data not fetched'),
 * 		() => new Error('Data is fetching')
 * )
 * f(success(2)) // right(2)
 * f(initial) // right(Error('Data not fetched'))
 * f(pending) // right(Error('Data is fetching'))
 * f(failure(new Error('error text'))) // right(Error('error text'))
 */
export function toEither(onInitial, onPending) {
    return data => pipe(data, fold(() => left(onInitial()), () => left(onPending()), left, right));
}
export function fromPredicate(predicate, whenFalse) {
    return a => (predicate(a) ? success(a) : failure(whenFalse(a)));
}
/**
 * Create {@link RemoteData} from {@link ProgressEvent}
 * @param event
 */
export function fromProgressEvent(event) {
    return progress({
        loaded: event.loaded,
        total: event.lengthComputable ? some(event.total) : none,
    });
}
/**
 * Compare values and returns `true` if they are identical, otherwise returns `false`.
 * `Left` part will return `false`.
 * {@link RemoteSuccess} will call {@link Eq.equals}.
 *
 * If you want to compare {@link RemoteData}'s values better use {@link getEq} or {@link getOrd} helpers.
 *
 */
export function elem(E) {
    return (a, fa) => fa._tag === 'RemoteSuccess' && E.equals(a, fa.value);
}
/**
 * Takes a predicate and apply it to {@link RemoteSuccess} value.
 * `Left` part will return `false`.
 */
export function exists(p) {
    return fa => fa._tag === 'RemoteSuccess' && p(fa.value);
}
/**
 * Maps this RemoteFailure error into RemoteSuccess if passed function `f` return {@link Some} value, otherwise returns self
 */
export function recover(f) {
    const r = recoverMap(f, identity);
    return fa => (fa._tag === 'RemoteFailure' ? r(fa) : fa);
}
/**
 * Recovers {@link RemoteFailure} also mapping {@link RemoteSuccess} case
 * @see {@link recover}
 */
export function recoverMap(f, g) {
    return fa => {
        switch (fa._tag) {
            case 'RemoteInitial': {
                return fa;
            }
            case 'RemotePending': {
                return fa;
            }
            case 'RemoteFailure': {
                const b = f(fa.error);
                return b._tag === 'Some' ? success(b.value) : fa;
            }
            case 'RemoteSuccess': {
                return success(g(fa.value));
            }
        }
    };
}
const concatPendings = (a, b) => {
    if (isSome(a.progress) && isSome(b.progress)) {
        const progressA = a.progress.value;
        const progressB = b.progress.value;
        if (isNone(progressA.total) || isNone(progressB.total)) {
            return progress({
                loaded: progressA.loaded + progressB.loaded,
                total: none,
            });
        }
        const totalA = progressA.total.value;
        const totalB = progressB.total.value;
        const total = totalA + totalB;
        const loaded = (progressA.loaded * totalA + progressB.loaded * totalB) / (total * total);
        return progress({
            loaded,
            total: some(total),
        });
    }
    const noA = isNone(a.progress);
    const noB = isNone(b.progress);
    if (noA && !noB) {
        return b;
    }
    if (!noA && noB) {
        return a;
    }
    return pending;
};
//instance
export const remoteDataInstance = {
    //HKT
    URI,
    //Monad
    of: (value) => success(value),
    ap: (fab, fa) => {
        switch (fa._tag) {
            case 'RemoteInitial': {
                return isFailure(fab) ? fab : initial;
            }
            case 'RemotePending': {
                return isPending(fab) ? concatPendings(fa, fab) : isSuccess(fab) ? fa : fab;
            }
            case 'RemoteFailure': {
                return isFailure(fab) ? fab : fa;
            }
            case 'RemoteSuccess': {
                return isSuccess(fab) ? success(fab.value(fa.value)) : fab;
            }
        }
    },
    map: (fa, f) => isSuccess(fa) ? success(f(fa.value)) : fa,
    chain: (fa, f) => isSuccess(fa) ? f(fa.value) : fa,
    //Foldable
    reduce: (fa, b, f) => pipe(fa, fold(() => b, () => b, () => b, a => f(b, a))),
    reduceRight: (fa, b, f) => (isSuccess(fa) ? f(fa.value, b) : b),
    foldMap: (Ms) => (fa, f) => isSuccess(fa) ? f(fa.value) : Ms.empty,
    //Traversable
    traverse: (Fs) => (ta, f) => {
        if (isSuccess(ta)) {
            return Fs.map(f(ta.value), a => remoteDataInstance.of(a));
        }
        else {
            return Fs.of(ta);
        }
    },
    sequence: (Fs) => (ta) => remoteDataInstance.traverse(Fs)(ta, identity),
    //Bifunctor
    bimap: (fla, f, g) => pipe(fla, fold(() => initial, foldO(() => pending, progress), e => failure(f(e)), a => success(g(a)))),
    mapLeft: (fla, f) => fold(() => initial, foldO(() => pending, progress), e => failure(f(e)), 
    // eslint-disable-next-line no-restricted-syntax
    () => fla)(fla),
    //Alt
    alt: (fx, fy) => fold(fy, fy, fy, () => fx)(fx),
    //Alternative
    zero: () => initial,
    //Extend
    extend: (fla, f) => pipe(fla, fold(() => initial, foldO(() => pending, progress), 
    // eslint-disable-next-line no-restricted-syntax
    () => fla, () => success(f(fla)))),
};
//Eq
export const getEq = (EE, EA) => {
    return {
        equals: (x, y) => pipe(x, fold(() => isInitial(y), () => isPending(y), xError => pipe(y, fold(constFalse, constFalse, yError => EE.equals(xError, yError), constFalse)), ax => pipe(y, fold(constFalse, constFalse, constFalse, ay => EA.equals(ax, ay))))),
    };
};
//Ord
const constLt = constant(-1);
const constEq = constant(0);
const constGt = constant(1);
export const getOrd = (OE, OA) => {
    return {
        ...getEq(OE, OA),
        compare: (x, y) => sign(pipe(x, fold(() => pipe(y, fold(constEq, constLt, constLt, constLt)), () => pipe(y, fold(constGt, constEq, constLt, constLt)), xError => pipe(y, fold(constGt, constGt, yError => OE.compare(xError, yError), constLt)), xValue => pipe(y, fold(constGt, constGt, constGt, yValue => OA.compare(xValue, yValue)))))),
    };
};
//Semigroup
export const getSemigroup = (SE, SA) => {
    return {
        concat: (x, y) => {
            const constX = constant(x);
            const constY = constant(y);
            return pipe(x, fold(() => pipe(y, fold(constY, constY, constY, constY)), () => pipe(y, 
            // eslint-disable-next-line no-restricted-syntax
            fold(constX, () => concatPendings(x, y), constY, constY)), xError => pipe(y, fold(constX, constX, yError => failure(SE.concat(xError, yError)), () => y)), xValue => pipe(y, fold(constX, constX, () => x, yValue => success(SA.concat(xValue, yValue))))));
        },
    };
};
//Monoid
export const getMonoid = (SL, SA) => {
    return {
        ...getSemigroup(SL, SA),
        empty: initial,
    };
};
const showOptionNumber = getShowOption(ShowNumber);
//Show
export const getShow = (SE, SA) => ({
    show: fold(() => 'initial', foldO(() => 'pending', progress => `progress({ loaded: ${ShowNumber.show(progress.loaded)}, total: ${showOptionNumber.show(progress.total)} })`), e => `failure(${SE.show(e)})`, a => `success(${SA.show(a)})`),
});
const { alt, ap, apFirst, apSecond, bimap, chain, chainFirst, duplicate, extend, flatten, foldMap, map, mapLeft, reduce, reduceRight,
// TODO: find actual type instead of deprecated
 } = pipeable(remoteDataInstance);
export { alt, ap, apFirst, apSecond, bimap, chain, chainFirst, duplicate, extend, flatten, foldMap, map, mapLeft, reduce, reduceRight, };
export function combine(...list) {
    if (list.length === 0) {
        return remoteDataInstance.of([]);
    }
    return sequence(remoteDataInstance)(list);
}