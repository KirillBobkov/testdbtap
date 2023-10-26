import { context } from '../../context/context2';
import { createElement } from 'react';
import { ChartLayoutDropdown } from '../components/chart-layout-settings/chart-layout-dropdown.component';
import { useProperty } from '../../utils/use-property';
import { namedMemo } from '../../utils/named-memo';
import { resolveComponentWithPredicate } from '../../utils/resolve-component-with-predicate.utils';
export const ChartLayoutDropdownContainer = context.combine(context.key()('layoutViewModel'), context.key()('localization'), context.key()('chartReactConfig'), (layoutViewModel, localization, chartReactConfig) => resolveComponentWithPredicate(chartReactConfig.layout.enabled, namedMemo('ChartLayoutDropdownContainer', () => {
    const layoutData = useProperty(layoutViewModel.layoutData);
    const isLayoutSaving = useProperty(layoutViewModel.isLayoutSaving);
    const isErrorLayoutSaving = useProperty(layoutViewModel.isErrorLayoutSaving);
    const lastUpdateTimeStamp = useProperty(layoutViewModel.lastUpdateTimeStamp);
    const isOpened = useProperty(layoutViewModel.popupOpen);
    const editableLayout = useProperty(layoutViewModel.editableLayout);
    return createElement(ChartLayoutDropdown, {
        chartLayoutData: layoutData,
        lastUpdateTimeStamp,
        updateSelectedLayout: layoutViewModel.updateSelectedLayout,
        addLayout: layoutViewModel.addLayout,
        deleteLayout: layoutViewModel.deleteLayout,
        updateLayoutById: layoutViewModel.updateLayoutById,
        localization,
        isLayoutSaving,
        isErrorLayoutSaving,
        togglePopupOpen: layoutViewModel.togglePopupOpen,
        isOpened,
        editableLayoutId: editableLayout,
        setEditableLayoutId: layoutViewModel.onEditLayout,
    });
})));
