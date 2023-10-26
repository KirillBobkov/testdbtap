import { Property } from '../../../utils/property.utils';
import { ChartWithModules } from '../../components/canvas-chart-renderer/chart-with-modules';
import { Point } from '@devexperts/dxcharts-lite/dist/chart/inputlisteners/canvas-input-listener.component';
import { StudiesSettingsViewModel } from './studies-settings.view-model';
import { DynamicObjectsViewModel } from '../dynamic-objects.view-model';
export interface StudiesMenuViewModel {
    readonly isOpened: Property<boolean>;
    readonly closeMenu: () => void;
    readonly menuPosition: Property<Point>;
    readonly bringToFrontStudy: (uuid: string) => void;
    readonly sendToBackStudy: (uuid: string) => void;
    readonly onOpenSettings: (uuid: string) => void;
    readonly onDuplicateStudy: (uuid: string) => void;
}
export declare const createStudiesMenuViewModel: import("../../../context/context2").Context<Record<"chart", ChartWithModules> & Record<"studiesSettingsViewModel", StudiesSettingsViewModel> & Record<"dynamicObjectsVM", DynamicObjectsViewModel>, import("../../../utils/adt/sink.utils").Sink1<"Observable", StudiesMenuViewModel>>;
