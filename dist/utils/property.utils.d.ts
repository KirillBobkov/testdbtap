import { Observable } from 'rxjs';
export interface Property<A> extends Observable<A> {
    readonly getValue: () => A;
}
export type PropertyAdapter<A> = [(a: A) => void, Property<A>];
export declare const createPropertyAdapter: <A>(initial: A, cmp?: (a: A, b: A) => boolean) => PropertyAdapter<A>;
export declare function convertToProperty<T>(observable: Observable<T>, initValue: T): Property<T>;
