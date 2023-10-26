import { Option } from 'fp-ts/Option';
export declare const getQueryParam: (param: string) => Option<string>;
export declare const getQueryParamArray: (param: string) => Option<Array<string>>;
