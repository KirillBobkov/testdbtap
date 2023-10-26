/// <reference types="react" />
import { Localization } from '../../config/localization/localization';
import { IndicatorTemplateViewModel } from '../view-models/studies/indicator-template.view-model';
import { ChartReactConfig } from '../../config/chart-react-config';
export declare const IndicatorTemplatesDropdownContainer: import("../../context/context2").Context<Record<"indicatorsTemplateVM", IndicatorTemplateViewModel> & Record<"localization", Localization> & Record<"chartReactConfig", ChartReactConfig>, import("react").FunctionComponent<{}> | (() => import("react").FunctionComponentElement<{
    children?: import("react").ReactNode;
}>)>;
