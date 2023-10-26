import React, { ReactNode, CSSProperties } from 'react';
export type ScrollableMode = 'visible' | 'wheeling' | 'none';
export interface ScrollableProps {
    readonly scrollTop?: number;
    readonly onScroll?: (left: number, top: number) => void;
    readonly children: ReactNode;
    readonly containerRef?: React.RefObject<HTMLDivElement>;
    readonly mode?: ScrollableMode;
    readonly style?: CSSProperties;
}
export declare const Scrollable: React.NamedExoticComponent<ScrollableProps>;
