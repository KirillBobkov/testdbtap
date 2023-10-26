import React from 'react';
import { Sink } from '../../context/sink2';
import { OrderEntryViewModel } from '../view-models/trading/order-entry.view-model';
interface OrderEntryDomMutationModel {
    readonly containerRef: React.RefObject<HTMLDivElement>;
    readonly updateYPosition: (yPosition: number) => void;
}
export declare const createOrderEntryDomMutationModel: import("../../context/context2").Context<Record<"orderEntryVM", OrderEntryViewModel>, Sink<OrderEntryDomMutationModel>>;
export {};
