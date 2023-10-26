import React, { ReactNode } from 'react';
import { VisualOrderProps, OrderSide } from '../../../../model/trading/order.model';
export interface OrderProps extends Readonly<VisualOrderProps> {
    readonly side: OrderSide;
    readonly className?: string;
    readonly children?: ReactNode;
    readonly absoluteChildren?: ReactNode;
    readonly onClick?: () => void;
    readonly onDblClick?: () => void;
    readonly onSelect?: () => void;
    readonly onClose?: () => void;
    readonly onDeselect?: () => void;
    readonly withDeselectBtn?: boolean;
}
export declare const Order: React.MemoExoticComponent<(props: OrderProps) => JSX.Element>;
