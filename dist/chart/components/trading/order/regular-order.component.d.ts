import React from 'react';
import { ProtectionOrderType, VisualOrder } from '../../../model/trading/order.model';
export interface RegularOrderProps {
    readonly order: VisualOrder;
    readonly className?: string;
    readonly onSelect?: (id: string) => void;
    readonly onDblClick?: (id: string) => void;
    readonly onClick?: (id: string) => void;
    readonly onDeselect?: (id: string) => void;
    readonly onClose?: (id: string) => void;
    readonly onDragStart?: (id: string) => void;
    readonly createProtectionOrder?: (type: ProtectionOrderType, originalId: string) => void;
    readonly takeProfitStopLossEnabled?: boolean;
    readonly showPriceAsLabels?: boolean;
    readonly horizontalLineWidth: number;
    readonly isLineVisible?: boolean;
}
export interface RegularOrderAltProps extends Omit<RegularOrderProps, 'horizontalLineWidth' | 'createProtectionOrder' | 'isLineVisible'> {
}
export declare const RegularOrder: React.MemoExoticComponent<(props: RegularOrderProps) => JSX.Element>;
export declare const RegularOrderAlt: React.MemoExoticComponent<(props: RegularOrderAltProps) => JSX.Element>;
