import { Subject } from 'rxjs';
export const createAdapter = () => {
    const s = new Subject();
    const next = (a) => s.next(a);
    return [next, s.asObservable()];
};
