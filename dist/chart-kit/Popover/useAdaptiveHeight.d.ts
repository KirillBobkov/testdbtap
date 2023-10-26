import { CSSProperties } from 'react';
interface AdaptiveHeightHookProps {
    readonly contentShift?: number;
    readonly windowMargin?: number;
    readonly maxHeight?: number;
}
/**
 * Checks that element fits viewport.
 * If is does not - reduces maxHeight and returns it. We see scrollbar as a consequence.
 * @param anchorRef
 * @param config
 * @doc-tags popover,hooks
 */
export declare const useAdaptiveHeight: (anchorRef: React.RefObject<HTMLElement | null>, config?: AdaptiveHeightHookProps) => CSSProperties;
export {};
