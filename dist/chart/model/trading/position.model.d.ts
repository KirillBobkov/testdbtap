import { StopLossId, TakeProfitId } from './order.model';
export type PositionSide = 'buy' | 'sell';
export interface Position {
    id: string;
    side: 'buy' | 'sell';
    type: 'original';
    quantity: number;
    price: number;
    pl: number;
    protectionOrderIds?: [StopLossId | undefined, TakeProfitId | undefined];
}
export type VisualPosition = PositionTradingItem & VisualPositionProps;
export interface VisualPositionProps {
    y?: number;
    visible?: boolean;
    readonly marketPrice?: number;
    readonly selected?: boolean;
    readonly disabled?: boolean;
    formatter?: PositionPLFormatter;
}
export interface PositionTradingItem {
    type: 'position';
    model: Position;
}
export type PositionPLFormatter = (v: number, currency: string) => string;
export declare const defaultPositionPLFormatter: PositionPLFormatter;
