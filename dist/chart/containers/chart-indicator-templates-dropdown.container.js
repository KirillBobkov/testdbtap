import { context } from '../../context/context2';
import { createElement, useCallback } from 'react';
import { ChartIndicatorTemplatesDropdown } from '../components/chart-indicator-templates/chart-indicator-templates-dropdown.component';
import { useProperty } from '../../utils/use-property';
import { namedMemo } from '../../utils/named-memo';
import { resolveComponentWithPredicate } from '../../utils/resolve-component-with-predicate.utils';
export const IndicatorTemplatesDropdownContainer = context.combine(context.key()('indicatorsTemplateVM'), context.key()('localization'), context.key()('chartReactConfig'), (indicatorsTemplateVM, localization, chartReactConfig) => resolveComponentWithPredicate(chartReactConfig.studyTemplates.enabled, namedMemo('IndicatorTemplatesDropdownContainer', () => {
    const vm = indicatorsTemplateVM;
    const templatesData = useProperty(vm.templateData);
    const isOpened = useProperty(vm.isOpened);
    const { addTemplate, deleteTemplate, updateTemplate, selectTemplate, setPopupOpen } = vm;
    const onRequestClose = useCallback(() => vm.setPopupOpen(false), [vm]);
    return createElement(ChartIndicatorTemplatesDropdown, {
        localization,
        onRequestClose,
        templatesData,
        isOpened,
        setPopupOpen,
        addTemplate,
        deleteTemplate,
        updateTemplate,
        selectTemplate,
    });
})));
