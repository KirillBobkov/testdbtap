import React from 'react';
import { VisualPosition } from '../../../model/trading/position.model';
import { ProtectionOrderType } from '../../../model/trading/order.model';
export interface PositionProps {
    readonly position: VisualPosition;
    readonly onSelect?: (id: string) => void;
    readonly onDeselect?: (id: string) => void;
    readonly onClose?: (id: string) => void;
    readonly createProtectionOrder?: (type: ProtectionOrderType, originalId: string) => void;
    readonly horizontalLineWidth: number;
    readonly halfOrderHeight: number;
    readonly isLineVisible?: boolean;
    readonly currency: string;
    readonly y: number;
    readonly takeProfitStopLossEnabled?: boolean;
}
type PositionPropsAlt = Omit<PositionProps, 'y' | 'horizontalLineWidth'>;
export declare const Position: React.MemoExoticComponent<(props: PositionProps) => JSX.Element>;
export declare const PositionAlt: React.MemoExoticComponent<(props: PositionPropsAlt) => JSX.Element>;
export {};
