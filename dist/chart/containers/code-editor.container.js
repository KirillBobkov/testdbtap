import { createElement, useCallback, useState } from 'react';
import { context } from '../../context/context2';
import { namedMemo } from '../../utils/named-memo';
import { importIdle } from '../../utils/react.utils';
import { useObservable } from '../../utils/use-observable';
import { useProperty } from '../../utils/use-property';
const CodeEditors = importIdle(() => import(/* webpackChunkName: "dxscript" */ '../components/code-editor/code-editors.component'));
export const CodeEditorContainer = context.combine(context.key()('dxScriptEditViewModel'), context.key()('localization'), context.key()('studiesSettingsViewModel'), context.key()('chartReactConfig'), (vm, localization, studiesSettingsViewModel, chartReactConfig) => namedMemo('CodeEditorContainer', () => {
    const popups = useProperty(vm.popups);
    const maxSelectedStudiesCount = chartReactConfig.studies.maxSelectedStudiesCount || 5;
    const addedStudies = useObservable(studiesSettingsViewModel.addedStudies$, []);
    const isMaxStudiesReached = addedStudies.length === maxSelectedStudiesCount;
    const [scriptIsInitialized, initScript] = useState(false);
    const initScriptHandler = useCallback(() => initScript(true), []);
    return createElement(CodeEditors, {
        popups,
        keywords: vm.keywords,
        scriptIsInitialized,
        isMaxStudiesReached,
        localization,
        closePopup: vm.onPopupClose,
        duplicateScript: vm.duplicateScript,
        deleteScript: vm.deleteScript,
        addToChart: vm.addToChart,
        updateScriptOnChart: vm.updateScriptOnChart,
        onScriptEdit: vm.onScriptEdit,
        initScript: initScriptHandler,
    });
}));
