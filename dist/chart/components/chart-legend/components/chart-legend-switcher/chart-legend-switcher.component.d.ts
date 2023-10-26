import React, { ReactNode } from 'react';
export interface ChartLegendSwitcherProps {
    readonly id: string;
    readonly instrument: string | undefined;
    readonly isEmpty: boolean;
    readonly timeRef: React.RefObject<HTMLDivElement>;
    readonly setFitsContentRef: React.MutableRefObject<((fits: boolean) => void) | null>;
    readonly setHeightRef: React.MutableRefObject<((height: number) => void) | null>;
    readonly switcherRef: React.MutableRefObject<HTMLDivElement | null>;
    readonly isOpened?: boolean;
    readonly duration?: number;
    readonly x?: number;
    readonly y?: number;
    readonly children?: ReactNode;
    readonly Header?: ReactNode;
    readonly ariaLabel?: string;
    readonly onContextMenu?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    readonly onOpenedChange: (opened: boolean) => void;
    readonly period: string | undefined;
}
export declare const ChartLegendSwitcher: React.NamedExoticComponent<ChartLegendSwitcherProps>;
