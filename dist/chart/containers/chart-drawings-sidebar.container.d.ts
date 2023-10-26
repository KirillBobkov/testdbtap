/// <reference types="react" />
import { ChartReactConfig } from '../../config/chart-react-config';
import { ChartDrawingViewModel } from '../view-models/drawings/drawing.view-model';
import { MultiChartViewModel } from '../view-models/multi-chart.view-model';
import { UserDataViewModel } from '../view-models/user-data.view-model';
import { MultichartDrawingSyncVM } from '../view-models/drawings/drawing-sync.vm';
export declare const DrawingsSidebarContainer: import("../../context/context2").Context<Record<"drawingViewModel", ChartDrawingViewModel> & Record<"multiChartViewModel", MultiChartViewModel> & Record<"userDataViewModel", UserDataViewModel> & Record<"drawingSyncVM", MultichartDrawingSyncVM> & Record<"chartReactConfig", ChartReactConfig>, import("react").FunctionComponent<{}> | (() => import("react").FunctionComponentElement<{
    children?: import("react").ReactNode;
}>)>;
