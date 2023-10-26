/// <reference types="react" />
import { ChartReactConfig } from '../../config/chart-react-config';
import { Localization } from '../../config/localization/localization';
import { ChartLayersViewModel } from '../view-models/layers/chart-layers.view-model';
import { MultiChartViewModel } from '../view-models/multi-chart.view-model';
import { UserDataViewModel } from '../view-models/user-data.view-model';
export declare const ChartLayersPopoverContainer: import("../../context/context2").Context<Record<"chartLayersViewModel", ChartLayersViewModel> & Record<"chartReactConfig", ChartReactConfig> & Record<"multiChartViewModel", MultiChartViewModel> & Record<"userDataViewModel", UserDataViewModel> & Record<"localization", Localization>, import("react").FunctionComponent<{}> | (() => import("react").FunctionComponentElement<{
    children?: import("react").ReactNode;
}>)>;
