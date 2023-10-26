import { ExecutedOrder } from '../../chart/model/executed-orders.model';
import { Order, OrderId, OrderWithId } from '../../chart/model/trading/order.model';
export interface OrderProvider {
    /**
     * Observes the order lines updates.
     * We expect to be the full list of orders - no partial updates, for now the full list will be replaced.
     * @param symbol
     * @param dataCallback
     */
    observeOrders(symbol: string, dataCallback: (orders: OrderWithId[]) => void): void;
    /**
     * Observes the executed orders.
     * We expect to be the full list of executed orders - no partial updates, for now the full list will be replaced.
     * @param symbol
     * @param dataCallback
     */
    observeExecutedOrders(symbol: string, dataCallback: (orders: ExecutedOrder[]) => void): void;
    /**
     * Creates new order
     * We expect creating "id" for order inside this method
     * If you create protection order, please don't forget to link it to original order by "protectionOrderIds" field
     * @param symbol
     * @param order
     */
    createOrder(symbol: string, order: Order): Promise<OrderId>;
    /**
     * Updates single order
     * @param symbol
     * @param order
     */
    updateOrder(symbol: string, order: OrderWithId): Promise<void>;
    /**
     * Deletes single order
     * Please, take a look at "protectionOrdersIds" field: if order with type "original" order was deleted, protection orders should be deleted too.
     * @param symbol
     * @param order
     */
    deleteOrder(symbol: string, order: OrderWithId): Promise<void>;
}
