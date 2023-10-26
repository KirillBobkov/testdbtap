/// <reference types="react" />
import { ChartLegendViewModel } from '../../view-models/chart-legend/chart-legend.view-model';
export interface StudiesRCMenuItem {
    readonly key: string;
    readonly label: string;
    readonly onItemSelect: () => void;
}
export declare const StudiesMenuContainer: import("../../../context/context2").Context<Record<"chart", import("../../components/canvas-chart-renderer/chart-with-modules").ChartWithModules> & Record<"studiesSettingsViewModel", import("../../view-models/studies/studies-settings.view-model").StudiesSettingsViewModel> & Record<"dynamicObjectsVM", import("../../view-models/dynamic-objects.view-model").DynamicObjectsViewModel> & Record<"chartLegendVM", ChartLegendViewModel>, () => import("react").FunctionComponentElement<import("../../components/studies/studies-menu/studies-menu.component").StudiesMenuProps>>;
