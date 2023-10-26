export interface ExecutedOrder {
    id: string;
    timestamp: number;
    price: number;
    side: 'buy' | 'sell';
    quantity: number;
}
export type ExecutedOrdersDisplayMode = 'bubbles' | 'labels';
