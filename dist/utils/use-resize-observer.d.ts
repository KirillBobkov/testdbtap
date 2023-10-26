import React from 'react';
/**
 * @param el
 * @param callback
 * @param useAnimationFrame Animation frame prevents error, but in rare cases we need to execute the function within the same animation frame
 */
export declare function useResizeObserver(el: React.RefObject<HTMLElement | null>, callback: ResizeObserverCallback, useAnimationFrame?: boolean): void;
