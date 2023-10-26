import React from 'react';
import { VisualOrder } from '../../../model/trading/order.model';
export interface ProtectionOrderProps {
    readonly order: VisualOrder;
    readonly className?: string;
    readonly onSelect?: (id: string) => void;
    readonly onDblClick?: (id: string) => void;
    readonly onClick?: (id: string) => void;
    readonly onDeselect?: (id: string) => void;
    readonly onClose?: (id: string) => void;
    readonly onDragStart?: (id: string) => void;
    readonly showPriceAsLabels?: boolean;
    readonly horizontalLineWidth: number;
    readonly isLineVisible?: boolean;
}
export interface ProtectionOrderAltProps extends Omit<ProtectionOrderProps, 'y' | 'horizontalLineWidth'> {
}
export declare const ProtectionOrder: React.MemoExoticComponent<(props: ProtectionOrderProps) => JSX.Element>;
export declare const ProtectionOrderAlt: React.MemoExoticComponent<(props: ProtectionOrderAltProps) => JSX.Element>;
