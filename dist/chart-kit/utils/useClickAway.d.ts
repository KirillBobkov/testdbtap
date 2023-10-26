import { RefObject } from 'react';
/**
 * Hook that run callback when click outside of element that attached to containerRef
 */
export declare const useClickAway: <T extends HTMLElement>(ref: RefObject<T>, onClickAwayCallback: () => void) => void;
