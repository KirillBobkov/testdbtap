import React, { ReactNode } from 'react';
import { OnPBounds } from '../../view-models/trading/trading.view-model';
export interface DraggableOrderProps {
    readonly id: string;
    readonly onDragStart: () => void;
    readonly onDrag: (id: string, y: number) => void;
    readonly onDragStop: (id: string, y: number) => void;
    readonly children: ReactNode;
    readonly halfOrderHeight: number;
    readonly disabled?: boolean;
    readonly bounds: OnPBounds;
    readonly y: number;
}
export declare const DraggableOrder: React.NamedExoticComponent<DraggableOrderProps>;
