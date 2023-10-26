import { ProtectionOrderType, OrderType, Order } from '../../../model/trading/order.model';
import { DraggableEvent } from 'react-draggable';
export declare const getRegularOrderName: (type: OrderType) => "LMT" | "MKT" | "STP";
export declare const getProtectionOrderName: (type: ProtectionOrderType) => "Stop Loss" | "Take Profit";
export declare const getOrderName: (order: Order) => "LMT" | "MKT" | "STP" | "Stop Loss" | "Take Profit";
export declare const skipSelectOrder: (e: DraggableEvent, value: boolean) => void;
export declare const isSelectSkippable: (e: DraggableEvent) => any;
export declare const renderSLTPShortcutSection: (isSLLinked: boolean, isTPLinked: boolean) => string;
