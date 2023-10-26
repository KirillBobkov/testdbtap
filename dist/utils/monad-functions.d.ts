import { Option } from 'fp-ts/Option';
import { observableOption } from 'fp-ts-rxjs';
import { Observable } from 'rxjs';
export declare const sequenceTOption: <T extends Option<any>[]>(...t: T & {
    readonly 0: Option<any>;
}) => Option<{ [K in keyof T]: [T[K]] extends [Option<infer A>] ? A : never; }>;
export declare const filterOption: <A>() => (ma: observableOption.ObservableOption<A>) => Observable<A>;
export declare const filterMapOption: <A>(source: Observable<Option<A>>) => Observable<A>;
