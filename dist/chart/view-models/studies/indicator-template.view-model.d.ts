import { MultiChartViewModel } from '../multi-chart.view-model';
import { Property } from '../../../utils/property.utils';
import { IndicatorsTemplateProvider, IndicatorTemplates } from '../../../providers/indicator-templates-provider';
import { DxStudiesProvider } from '../../../providers/studies/dx-studies-provider';
import { StudiesSettingsViewModel } from './studies-settings.view-model';
import { Sink } from '../../../utils/sink';
import { either } from 'fp-ts';
import { ValidationError } from '../utils/validators';
import { Localization } from '../../../config/localization/localization';
export interface IndicatorTemplateViewModel {
    readonly templateData: Property<IndicatorTemplates>;
    readonly addTemplate: (name: string) => either.Either<ValidationError, void>;
    readonly deleteTemplate: (id: string) => void;
    readonly updateTemplate: (id: string, name: string) => either.Either<ValidationError, void>;
    readonly selectTemplate: (id: string) => void;
    readonly isOpened: Property<boolean>;
    readonly setPopupOpen: (value: boolean) => void;
}
export declare const createIndicatorsTemplateViewModel: import("../../../context/context2").Context<Record<"multiChartViewModel", MultiChartViewModel> & Record<"indicatorsTemplateProvider", IndicatorsTemplateProvider> & Record<"dxStudiesProvider", DxStudiesProvider> & Record<"studiesSettingsVMs", StudiesSettingsViewModel[]> & Record<"localization", Localization>, Sink<IndicatorTemplateViewModel>>;
