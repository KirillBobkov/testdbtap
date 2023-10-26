import { RefObject, AriaRole } from 'react';
interface A11yArrowsFocusControllerProps {
    readonly wrapperRef: RefObject<HTMLElement> | null;
    readonly anchorRef?: RefObject<HTMLButtonElement> | null;
    readonly childrenSelector?: string;
    readonly direction?: 'horizontal' | 'vertical';
    readonly autoFocus?: boolean;
    readonly deps?: any[];
    readonly role?: AriaRole | 'skip';
    readonly childRole?: AriaRole | 'skip';
    readonly initialFocus?: 'first' | 'active';
}
/**
 * Adds arrows-controls for some "listbox"-like element.
 * Searches for children and controls their focus, tabindex programmatically.
 * Hook supports listbox content changes. Use "deps" property to react and recalculate focusable children.
 * @param props
 * @doc-tags a11y
 */
export declare const useA11yListboxArrowsFocusController: (props: A11yArrowsFocusControllerProps) => void;
export {};
