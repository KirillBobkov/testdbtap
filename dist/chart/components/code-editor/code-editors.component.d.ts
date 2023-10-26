import React from 'react';
import { DxScriptEditPopupState, TVisualDxScript } from '../../view-models/dx-script-edit.view-model';
import { ModuleKeywords, TDxScriptWithoutId } from '../../../providers/dx-script-provider';
import { Localization } from '../../../config/localization/localization';
export interface CodeEditorsProps {
    readonly popups: DxScriptEditPopupState[];
    readonly keywords: ModuleKeywords[];
    readonly scriptIsInitialized: boolean;
    readonly localization: Localization;
    readonly isMaxStudiesReached: boolean;
    readonly closePopup: (scriptId: string) => void;
    readonly duplicateScript: (script: TDxScriptWithoutId) => void;
    readonly addToChart: (scriptId: string) => void;
    readonly updateScriptOnChart: (scriptId: string) => void;
    readonly onScriptEdit: (script: TVisualDxScript) => void;
    readonly initScript: () => void;
    readonly deleteScript: (scriptId: string) => void;
}
declare const CodeEditors: React.NamedExoticComponent<CodeEditorsProps>;
export default CodeEditors;
