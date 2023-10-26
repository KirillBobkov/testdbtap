import React, { useMemo } from 'react';
import { array, option } from 'fp-ts';
import { pipe } from 'fp-ts/function';
import { context } from '../../context/context2';
import { importIdle, namedMemo, useObservable, useProperty } from '../../utils/react.utils';
import { DEFAULT_GROUP_ID } from '../model/drawing-groups.model';
import { resolveComponentWithPredicate } from '../../utils/resolve-component-with-predicate.utils';
const DrawingGroupsDropdown = importIdle(() => import('../components/drawings/drawing-groups/drawing-groups-dropdown.component'));
export const DrawingGroupsContainer = context.combine(context.key()('drawingGroupsViewModel'), context.key()('chartLayersViewModel'), context.key()('localization'), context.key()('chartReactConfig'), (drawingGroupsVM, chartLayersVM, localization, chartReactConfig) => resolveComponentWithPredicate(chartReactConfig.drawings.drawingGroups.enabled, namedMemo('DrawingGroupsContainer', () => {
    const groups = useObservable(drawingGroupsVM.groups, []);
    const selectedGroupId = useProperty(drawingGroupsVM.selectedGroup);
    const selectedGroup = useMemo(() => pipe(groups, array.findFirst(gi => gi.id === selectedGroupId), option.getOrElse(() => ({
        id: DEFAULT_GROUP_ID,
        name: localization.drawingGroups.defaultGroup,
        type: 'group',
        items: [],
        itemsVisibility: [],
    }))), [selectedGroupId, groups]);
    return (React.createElement(DrawingGroupsDropdown, { groups: groups, selectedGroup: selectedGroup, addGroup: drawingGroupsVM.createAndSelectGroup, selectGroup: drawingGroupsVM.selectGroup, deleteGroup: drawingGroupsVM.deleteGroup, renameGroup: chartLayersVM.renameItem }));
})));
