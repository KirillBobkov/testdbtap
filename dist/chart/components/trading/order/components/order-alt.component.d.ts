import React from 'react';
import { OrderProps } from './order.component';
export interface OrderAltProps extends Omit<OrderProps, 'y'> {
    onDragStart?: () => void;
}
export declare const OrderAlt: React.MemoExoticComponent<(props: OrderAltProps) => JSX.Element>;
