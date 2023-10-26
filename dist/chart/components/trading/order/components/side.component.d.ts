import React from 'react';
import { OrderSide } from '../../../../model/trading/order.model';
export interface SideProps {
    readonly side: OrderSide;
    readonly className?: string;
}
export declare const Side: React.NamedExoticComponent<SideProps>;
export declare const renderSide: (side: OrderSide) => JSX.Element;
