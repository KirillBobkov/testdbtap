import { ForwardedRef, RefObject } from 'react';
/**
 * Use when you have forwardRef and you need another copy of that ref.
 * @param ref - from forwardRef
 * @doc-tags hooks
 */
export declare function useSyncedRef<T>(ref?: ForwardedRef<T>): RefObject<T>;
