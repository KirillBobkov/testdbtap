import { Observable } from 'rxjs';
import { Property } from '../../../utils/property.utils';
import { Sink } from '../../../utils/sink';
import { ChartWithModules } from '../../components/canvas-chart-renderer/chart-with-modules';
import { ExecutedOrder } from '../../model/executed-orders.model';
import { ChartConfiguratorViewModel } from '../chart-configurator.view-model';
import { HoveredExecutedOrder } from '@dx-private/dxchart5-modules/dist/executed-orders/model/executed-orders-hit-test.model';
import { OrderProvider } from '../../../providers/trading/order.provider';
import { ChartDataViewModel } from '../data/chart-data.view-model';
export interface ExecutedOrdersViewModel {
    readonly executedOrders: Property<ExecutedOrder[]>;
    readonly setExecutedOrders: (executedOrders: ExecutedOrder[]) => void;
    readonly hoveredExecutedOrder: Observable<HoveredExecutedOrder | null>;
}
export declare const createExecutedOrdersViewModel: import("../../../context/context2").Context<Record<"chartConfiguratorViewModel", ChartConfiguratorViewModel> & Record<"chart", ChartWithModules> & Record<"orderProvider", OrderProvider> & Record<"chartDataViewModel", ChartDataViewModel>, Sink<ExecutedOrdersViewModel>>;
