import React from 'react';
import { KeyCodeType } from '../Control/Control';
interface UseA11yAnchorKeyDownOptions {
    targetCheck?: EventTarget | null;
    keyCodes?: KeyCodeType[];
}
/**
 * Anchor keyDown handler for a11y.
 * @doc-tags a11y, shortcut
 */
export declare const useA11yAnchorKeyDown: (callback: (e: React.KeyboardEvent) => void, deps: any[], options?: UseA11yAnchorKeyDownOptions) => (e: React.KeyboardEvent) => void;
export {};
