import { Observable } from 'rxjs';
import { ChartReactConfig } from '../../../config/chart-react-config';
import { Localization } from '../../../config/localization/localization';
import { Property } from '../../../utils/property.utils';
import { Sink } from '../../../utils/sink';
import { LayerItemsGroup } from '../../model/chart-layers.model';
import { ChartDataViewModel } from '../data/chart-data.view-model';
import { ChartDrawingViewModel } from '../drawings/drawing.view-model';
import { MultiChartViewModel } from '../multi-chart.view-model';
import { ChartLayersViewModel } from './chart-layers.view-model';
export interface DrawingGroupsViewModel {
    groups: Observable<LayerItemsGroup[]>;
    selectedGroup: Property<string>;
    selectGroup: (id: string) => void;
    createAndSelectGroup: (name: string) => void;
    deleteGroup: (id: string) => void;
}
export declare const createDrawingGroupsViewModel: import("../../../context/context2").Context<Record<"chartLayersViewModel", ChartLayersViewModel> & Record<"multiChartViewModel", MultiChartViewModel> & Record<"chartDataViewModel", ChartDataViewModel> & Record<"drawingViewModel", ChartDrawingViewModel> & Record<"localization", Localization> & Record<"chartReactConfig", ChartReactConfig> & Record<"initialSelectedGroup", string | undefined> & Record<"chartId", string>, Sink<DrawingGroupsViewModel>>;
