import { BehaviorSubject } from 'rxjs';
export const createPropertyAdapter = (initial, cmp = (a, b) => a === b) => {
    const bs = new BehaviorSubject(initial);
    // we can't do `!cmp(bs.getValue(), a) && bs.next(a)` for the first arg, bcs it might return false instead of void
    return [a => (!cmp(bs.getValue(), a) ? bs.next(a) : void 0), bs];
};
export function convertToProperty(observable, initValue) {
    const subject = new BehaviorSubject(initValue);
    observable.subscribe(subject);
    return subject;
}
