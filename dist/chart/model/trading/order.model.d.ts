export type OrderSide = 'buy' | 'sell';
export type OrderType = 'market' | 'limit' | 'stop';
export type ProtectionOrderType = 'tp' | 'sl';
export type OrderId = string;
export type StopLossId = string;
export type TakeProfitId = string;
export interface OrderData {
    orderType: OrderType;
    side: 'buy' | 'sell';
    quantity: number;
    limitPrice?: number;
    stopPrice?: number;
}
export interface ProtectionOrder extends OrderData {
    type: ProtectionOrderType;
    originalItemId: string;
}
export interface OriginalOrder extends OrderData {
    type: 'original';
    protectionOrderIds?: [StopLossId | undefined, TakeProfitId | undefined];
}
export type Order = ProtectionOrder | OriginalOrder;
export type OrderWithId = Order & {
    id: string;
};
export type VisualOrder = OrderTradingItem & VisualOrderProps;
export interface VisualOrderProps {
    y?: number;
    visible?: boolean;
    readonly marketPrice?: number;
    readonly selected?: boolean;
    readonly disabled?: boolean;
    formatter?: OrderPriceFormatter;
}
export interface OrderTradingItem {
    type: 'order';
    model: OrderWithId;
}
export type OrderPriceFormatter = (v: number) => string;
export declare const defaultOrderPriceFormatter: OrderPriceFormatter;
declare const availableOrderEntryTypes: readonly ["BuyLimitSellStop", "SellLimitBuyStop", "BuyMarketSellMarket"];
export type OrderEntryType = (typeof availableOrderEntryTypes)[number];
export {};
