import { Dispatch, SetStateAction } from 'react';
import { Lazy } from 'fp-ts/function';
/**
 * TODO describe
 * @param initial
 * @doc-tags utility,hooks
 */
export declare const useToggle: (initial?: boolean) => [boolean, Lazy<void>, Dispatch<SetStateAction<boolean>>];
