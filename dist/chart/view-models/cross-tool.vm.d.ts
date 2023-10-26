import { eq, option } from 'fp-ts';
import { Option } from 'fp-ts/Option';
import { Sink } from '../../context/sink2';
import { Property } from '../../utils/property.utils';
import { ChartWithModules } from '../components/canvas-chart-renderer/chart-with-modules';
import { MultiChartViewModel } from './multi-chart.view-model';
import { ChartConfiguratorViewModel } from './chart-configurator.view-model';
export interface CrosshairData {
    timestamp: number;
    price?: number;
    paneId: string;
}
export interface CrosshairViewModel {
    readonly crossTool: Property<Option<CrosshairData>>;
}
export declare const createCrosshairVM: import("../../context/context2").Context<Record<"chart", ChartWithModules> & Record<"multiChartViewModel", MultiChartViewModel> & Record<"chartConfiguratorViewModel", ChartConfiguratorViewModel> & Record<"chartId", string>, Sink<CrosshairViewModel>>;
export declare const crossToolEq: eq.Eq<option.Option<{
    readonly timestamp: number;
    readonly price?: number | undefined;
    readonly paneId: string;
}>>;
