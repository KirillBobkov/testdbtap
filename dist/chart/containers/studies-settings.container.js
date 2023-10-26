import { createElement, useContext } from 'react';
import { context } from '../../context/context2';
import { namedMemo } from '../../utils/named-memo';
import { useObservable } from '../../utils/use-observable';
import { StudiesSettings } from '../components/studies/studies-settings/studies-settings.component';
import { ChartReactAppContext } from '../defaults';
import { CodeEditorContainer } from './code-editor.container';
export const StudiesSettingsContainer = context.combine(CodeEditorContainer, context.key()('dxScriptEditViewModel'), context.key()('studiesSettingsViewModel'), context.key()('colorPalette'), context.key()('chartReactConfig'), (CodeEditorContainer, dxScriptEditViewModel, vm, colorPalette, chartReactConfig) => namedMemo('StudiesSettingsContainer', () => {
    const studies = useObservable(vm.studies$, []);
    const addedStudies = useObservable(vm.addedStudies$, []);
    const isOpened = useObservable(vm.isOpened$, false);
    const selectedStudySettingsUUID = useObservable(vm.selectedStudyUUID$, '');
    const maxSelectedStudiesCount = chartReactConfig.studies.maxSelectedStudiesCount || 5;
    const { dxScriptEnabled } = chartReactConfig.studies;
    const { isMobile } = useContext(ChartReactAppContext);
    const addStudyButtonEnabled = isMobile ? true : chartReactConfig.studies.addStudyButtonEnabled;
    const studiesSettingsProps = {
        selectedStudySettingsUUID,
        maxCountSelected: maxSelectedStudiesCount,
        studies,
        addedStudies,
        isOpened,
        palette: colorPalette,
        dxScriptEnabled,
        addStudyButtonEnabled,
        CodeEditorContainer,
        onCreateNewScript: dxScriptEditViewModel.addNewScript,
        onEditScript: dxScriptEditViewModel.onPopupOpen,
        onDeleteScript: dxScriptEditViewModel.deleteScript,
        onAddedStudy: vm.onAddedStudy,
        onRemoveStudy: vm.onRemoveStudy,
        onChangeStudy: vm.onChangeStudy,
        onReorderStudies: vm.onReorderStudies,
        onRemoveAllStudies: vm.onRemoveAllStudies,
        onConfigureStudy: vm.onConfigureStudy,
        onClose: vm.onClose,
        onOpen: vm.onOpen,
    };
    return createElement(StudiesSettings, studiesSettingsProps);
}));
