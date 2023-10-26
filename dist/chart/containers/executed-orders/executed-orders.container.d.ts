/// <reference types="react" />
import { ExecutedOrdersViewModel } from '../../view-models/trading/executed-orders.view-model';
import { ChartConfiguratorViewModel } from '../../view-models/chart-configurator.view-model';
export declare const ExecutedOrdersContainer: import("../../../context/context2").Context<Record<"executedOrdersVM", ExecutedOrdersViewModel> & Record<"chartConfiguratorViewModel", ChartConfiguratorViewModel>, import("react").MemoExoticComponent<() => import("react").FunctionComponentElement<import("../../components/executed-orders/hovered-executed-order.component").HoveredExecutedOrderComponentProps> | null>>;
