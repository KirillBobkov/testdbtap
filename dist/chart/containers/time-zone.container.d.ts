/// <reference types="react" />
import { TimeZoneViewModel } from '../view-models/time-zone.view-model';
import { ChartReactConfig } from '../../config/chart-react-config';
export declare const TimeZoneContainer: import("../../context/context2").Context<Record<"timeZoneViewModel", TimeZoneViewModel> & Record<"chartReactConfig", ChartReactConfig>, import("react").FunctionComponent<{}> | (() => import("react").FunctionComponentElement<{
    children?: import("react").ReactNode;
}>)>;
