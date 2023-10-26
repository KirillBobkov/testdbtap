import { Option } from 'fp-ts/Option';
export declare const sequenceTOption: <T extends Option<any>[]>(...t: T & {
    readonly 0: Option<any>;
}) => Option<{ [K in keyof T]: [T[K]] extends [Option<infer A>] ? A : never; }>;
export type OptionType<FA extends Option<any>> = FA extends Option<infer A> ? A : never;
