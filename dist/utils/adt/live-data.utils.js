// TODO: find actual types instead of deprecated
import { getApplicativeComposition, } from 'fp-ts/Applicative';
import { identity } from 'fp-ts/function';
import { isSome, none, some } from 'fp-ts/Option';
import { isLeft, isRight } from 'fp-ts/Either';
import { sequenceT } from 'fp-ts/Apply';
import { not } from 'fp-ts/Predicate';
export function getLiveDataM(Os, Fs) {
    const sequenceTO = sequenceT(Os);
    const sequenceTF = sequenceT(Fs);
    const OF = {
        ...getApplicativeComposition(Os, Fs),
        filter: (ofa, p) => Os.fromObservable({
            subscribe: observer => Os.subscribe(ofa, {
                ...observer,
                next: fa => Fs.foldValue(fa, observer.next, a => p(a) && observer.next(fa)),
            }),
        }),
        filterMap: (ofa, f) => Os.fromObservable({
            subscribe: observer => Os.subscribe(ofa, {
                ...observer,
                next: fa => Fs.foldValue(fa, observer.next, a => {
                    const b = f(a);
                    if (isSome(b)) {
                        observer.next(Fs.of(b.value));
                    }
                }),
            }),
        }),
        compact: ofa => OF.filterMap(ofa, identity),
        partition: (ofa, p) => ({
            left: OF.filter(ofa, not(p)),
            right: OF.filter(ofa, p),
        }),
        partitionMap: (ofa, f) => ({
            left: OF.filterMap(ofa, a => {
                const ebc = f(a);
                return isLeft(ebc) ? some(ebc.left) : none;
            }),
            right: OF.filterMap(ofa, a => {
                const ebc = f(a);
                return isRight(ebc) ? some(ebc.right) : none;
            }),
        }),
        separate: ofeab => OF.partitionMap(ofeab, identity),
        chain: (opa, f) => {
            const onNever = Os.of;
            return Os.chain(opa, pa => Fs.foldValue(pa, onNever, f));
        },
        throwError: e => Os.of(Fs.throwError(e)),
        coproductLeft: (ofa, ofb) => Os.map(sequenceTO(ofa, ofb), ([fa, fb]) => sequenceTF(fa, fb)),
    };
    return OF;
}
