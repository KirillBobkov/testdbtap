import { YAxisAlign } from '@devexperts/dxcharts-lite/dist/chart/chart.config';
import React from 'react';
import { TradingDictionary } from '../../../../config/localization/trading';
import { OrderEntryType, OrderSide, OrderType } from '../../../model/trading/order.model';
import { OrderQuantity } from '../../../view-models/trading/order-entry.view-model';
export interface OrderEntryDMProps {
    readonly containerRef: React.RefObject<HTMLDivElement>;
}
export interface OrderEntryProps {
    readonly opened: boolean;
    readonly disabled: boolean;
    readonly setOpened: (opened: boolean) => void;
    readonly resetToDefault: () => void;
    readonly type: OrderEntryType;
    readonly quantity: OrderQuantity;
    readonly quantityPrecision: number;
    readonly quantityStep: number;
    readonly maxQuantity: number;
    readonly padding: number;
    readonly yAxisAlign: YAxisAlign;
    readonly tradingDict: TradingDictionary;
    readonly onChangeQuantity: (q: OrderQuantity) => void;
    readonly onCompleteOrderEntry: () => void;
    readonly createOrder: (type: OrderType, side: OrderSide) => void;
    readonly validate?: () => boolean;
    readonly className?: string;
    readonly domMutationProps: OrderEntryDMProps;
}
export declare const OrderEntry: React.NamedExoticComponent<OrderEntryProps>;
export default OrderEntry;
