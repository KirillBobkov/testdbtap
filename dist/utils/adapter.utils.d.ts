import { Observable } from 'rxjs';
export type Adapter<A> = [(a: A) => void, Observable<A>];
export declare const createAdapter: <A>() => Adapter<A>;
