import { RefObject } from 'react';
interface A11yPopFocusControllerProps {
    readonly anchorRef: RefObject<HTMLElement>;
    readonly popRef: RefObject<HTMLElement>;
    readonly focusSelector?: string;
}
/**
 * Focuses the focusable element in popup / popover when navigating from anchor.
 * @param props
 * @doc-tags a11y
 */
export declare const useA11yPopFocusController: (props: A11yPopFocusControllerProps) => void;
export {};
