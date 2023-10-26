import { Lazy } from 'fp-ts/function';
/**
 * TODO describe
 * @param initial
 * @param wait
 * @doc-tags utility,hooks
 */
export declare const useDebounceToggle: (initial?: boolean, wait?: number) => [boolean, Lazy<void>];
