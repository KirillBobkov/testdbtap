import { Point } from '@devexperts/dxcharts-lite/dist/chart/inputlisteners/canvas-input-listener.component';
import { Property } from '../../../utils/property.utils';
import { ChartWithModules } from '../../components/canvas-chart-renderer/chart-with-modules';
export interface OrderMenuViewModel {
    readonly isOpened: Property<boolean>;
    readonly closeMenu: () => void;
    readonly menuPosition: Property<Point>;
}
export declare const createOrderMenuViewModel: import("../../../context/context2").Context<Record<"chart", ChartWithModules>, import("../../../utils/adt/sink.utils").Sink1<"Observable", OrderMenuViewModel>>;