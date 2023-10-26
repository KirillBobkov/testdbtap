import React from 'react';
export interface RightOffsetResizerComponentProps {
    readonly ordersAndPositionsWidth: number;
    readonly rightOffset: number;
    readonly onResizerDrag: (posX: number) => void;
    readonly onResizerDragEnd: (posX: number) => void;
    readonly onResizerHover: () => void;
    readonly chartWidth: number;
    readonly canvasHeight: number;
    readonly children: React.ReactNode;
}
export declare const OE_BTN_OFFSET = 24;
export declare const RightOffsetResizerComponent: React.MemoExoticComponent<React.ForwardRefExoticComponent<RightOffsetResizerComponentProps & React.RefAttributes<HTMLDivElement>>>;
