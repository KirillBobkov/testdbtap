import { Sink } from '../../context/sink2';
import { Observable } from 'rxjs';
import { Property } from '../../utils/property.utils';
import { Bounds } from '@devexperts/dxcharts-lite/dist/chart/model/bounds.model';
import { ChartConfiguratorViewModel } from './chart-configurator.view-model';
import { ChartWithModules } from '../components/canvas-chart-renderer/chart-with-modules';
export interface ChartZoomingToolViewModel {
    readonly zoomIn: () => void;
    readonly zoomOut: () => void;
    readonly buttonsDisabled: Property<ButtonsDisabledState>;
    readonly marginBottom: Observable<number>;
    readonly observeBounds$: Observable<Bounds>;
}
export interface ButtonsDisabledState {
    zoomIn: boolean;
    zoomOut: boolean;
}
export declare const createZoomingToolViewModel: import("../../context/context2").Context<Record<"chart", ChartWithModules> & Record<"chartConfiguratorViewModel", ChartConfiguratorViewModel>, Sink<ChartZoomingToolViewModel>>;
