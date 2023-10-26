/// <reference types="react" />
import { ChartReactConfig } from '../../config/chart-react-config';
import { Localization } from '../../config/localization/localization';
import { DxScriptEditViewModel } from '../view-models/dx-script-edit.view-model';
import { StudiesSettingsViewModel } from '../view-models/studies/studies-settings.view-model';
export declare const CodeEditorContainer: import("../../context/context2").Context<Record<"dxScriptEditViewModel", DxScriptEditViewModel> & Record<"localization", Localization> & Record<"studiesSettingsViewModel", StudiesSettingsViewModel> & Record<"chartReactConfig", ChartReactConfig>, import("react").FC<Record<string, any>>>;
