import { Option } from 'fp-ts/Option';
import { Observable } from 'rxjs';
import { Localization } from '../../config/localization/localization';
import { Sink } from '../../context/sink2';
import { DxScriptProvider, DxScriptRunner, ModuleKeywords, ScriptError, TDxScriptWithoutCode, TDxScriptWithoutId } from '../../providers/dx-script-provider';
import { DxStudiesProvider } from '../../providers/studies/dx-studies-provider';
import { Property } from '../../utils/property.utils';
import { TStudySettings } from '../model/studies.model';
import { MultiChartViewModel } from './multi-chart.view-model';
export interface DxScriptEditViewModel {
    lastAddedScript: Observable<TDxScriptWithoutCode>;
    lastUpdatedScript: Observable<TDxScriptWithoutCode>;
    popups: Property<Array<DxScriptEditPopupState>>;
    keywords: Array<ModuleKeywords>;
    addNewScript: () => void;
    duplicateScript: (script: TDxScriptWithoutId) => void;
    onScriptEdit: (script: TVisualDxScript) => void;
    onPopupOpen: (scriptId: string) => void;
    onPopupClose: (scriptId: string) => void;
    deleteScript: (scriptId: string) => void;
    onAddedOnChart: (scriptId: string) => void;
    addToChart: (scriptId: string) => void;
    updateScriptOnChart: (scriptId: string) => void;
    removeFromChart: (scriptId: string) => void;
    compileScriptStudy: (study: TStudySettings) => Observable<Option<TStudySettings>>;
}
export interface TVisualDxScript extends TDxScriptWithoutCode {
    errors: Array<ScriptError>;
}
export interface DxScriptEditPopupState {
    dxScript: TVisualDxScript;
    /**
     * Indicates whether an indicator is compiling by the DxScriptRunner or not
     */
    isCompiling: boolean;
    /**
     * Indicates whether an indicator has been added to the chart or not
     */
    addedOnChart: boolean;
    opened: boolean;
    /**
     * This button is shown in the popup when the study is NOT added to the chart
     * and disabled when the dxscript code is EMPTY.
     */
    addButtonDisabled: boolean;
    popupOrder: number;
    /**
     * This button is shown in the popup when the study is succesfully added to the chart
     * and disabled when there are no changes in the dxscript code.
     */
    updateButtonDisabled: boolean;
    /**
     * Autosaving state is shown when script is in sync with the DxScript provider.
     */
    isAutoSaving: boolean;
}
export declare const createDxScriptEditViewModel: import("../../context/context2").Context<Record<"multiChartViewModel", MultiChartViewModel> & Record<"dxStudiesProvider", DxStudiesProvider> & Record<"dxScriptProvider", DxScriptProvider> & Record<"dxScriptRunner", DxScriptRunner> & Record<"localization", Localization> & Record<"initialDxScripts", TDxScriptWithoutCode[]> & Record<"dxScriptKeywords", ModuleKeywords[]>, Sink<DxScriptEditViewModel>>;
