import { Observable } from 'rxjs';
import { Property } from './property.utils';
type Callback<A> = (value: A) => void;
export interface CallbackAdapter<A> {
    setValue: (a: A) => void;
    value: Property<A>;
    registerCallback: (callback: Callback<A>) => void;
    unregisterCallback: (callback: Callback<A>) => void;
    handleCallbacksEffect: Observable<unknown>;
}
export declare const createCallbackAdapter: <A>(initial: A, cmp?: (a: A, b: A) => boolean) => CallbackAdapter<A>;
export {};
