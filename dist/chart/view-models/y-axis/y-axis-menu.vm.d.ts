import { Property } from '../../../utils/property.utils';
import { ChartWithModules } from '../../components/canvas-chart-renderer/chart-with-modules';
import { PopoverCoordinates } from '../../../chart-kit/Popover/Popover.model';
export interface YAxisMenuViewModel {
    readonly isOpened: Property<boolean>;
    readonly closeMenu: () => void;
    readonly menuPosition: Property<PopoverCoordinates>;
}
export declare const createYAxisMenuViewModel: import("../../../context/context2").Context<Record<"chart", ChartWithModules>, import("../../../utils/adt/sink.utils").Sink1<"Observable", YAxisMenuViewModel>>;
