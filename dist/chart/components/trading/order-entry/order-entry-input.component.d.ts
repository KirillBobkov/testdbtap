import React from 'react';
import { OrderEntryType, OrderSide, OrderType } from '../../../model/trading/order.model';
import { TradingDictionary } from '../../../../config/localization/trading';
import { OrderQuantity } from '../../../view-models/trading/order-entry.view-model';
export interface OrderEntryInputProps {
    readonly type: OrderEntryType;
    readonly quantity: OrderQuantity;
    readonly quantityPrecision: number;
    readonly quantityStep: number;
    readonly maxQuantity: number;
    readonly createOrder: (type: OrderType, side: OrderSide) => void;
    readonly tradingDict: TradingDictionary;
    readonly onQuantityChange: (quantity: OrderQuantity) => void;
    readonly className?: string;
    readonly disabled: boolean;
}
export declare const OrderEntryInput: React.NamedExoticComponent<OrderEntryInputProps>;
/**
 * Why do not just sum a + b? because we need to avoid case below:
 * 2 + 0.1 = 2.100000000000001
 */
export declare const sumDecimalNumbers: (a: number, b: number) => string;
export declare const getDecimalRest: (value: number) => string;
