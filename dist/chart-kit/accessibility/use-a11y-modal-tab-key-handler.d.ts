import { RefObject } from 'react';
/**
 * Hook locks keyboard tabulation inside specific HTML tree.
 * Reference to element is a container. Hook traverses it and finds all interactive elements.
 * When it reaches the last element - it returns focus to first element on next "Tab".
 * @param popupContainerRef - container to loop over
 */
export declare const useA11yModalTabKeyHandler: (popupContainerRef: RefObject<HTMLElement>) => (e: KeyboardEvent) => void;
