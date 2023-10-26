import React from 'react';
import { HoveredExecutedOrder } from '@dx-private/dxchart5-modules/dist/executed-orders/model/executed-orders-hit-test.model';
export interface HoveredExecutedOrderComponentProps {
    readonly hoveredExecutedOrder: HoveredExecutedOrder;
}
export declare const HoveredExecutedOrderComponent: React.NamedExoticComponent<HoveredExecutedOrderComponentProps>;
